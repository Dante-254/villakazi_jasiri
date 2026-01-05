from django.shortcuts import render, get_object_or_404
from collections import OrderedDict
from .models import Event, GalleryImage, Patrol, PatrolMember, CrewLeader

# Create your views here.
from django.conf import settings
from django.core.mail import send_mail

def home(request):
    # Handle join requests via the request form
    if request.method == 'POST':
        guardian_name = request.POST.get('guardian_name')
        guardian_email = request.POST.get('guardian_email')
        child_name = request.POST.get('child_name')
        child_contact = request.POST.get('child_contact')
        motivation = request.POST.get('motivation', '')

        subject = f"Joining request from {guardian_name} for {child_name}"
        message = (
            f"Guardian: {guardian_name}\n"
            f"Guardian email: {guardian_email}\n"
            f"Child: {child_name}\n"
            f"Contact: {child_contact}\n\n"
            f"Motivation:\n{motivation}\n"
        )
        to = [getattr(settings, 'CREW_CONTACT_EMAIL', 'villakazijasiriscouts@gmail.com')]
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, to)
        messages.success(request, 'Request submitted. We will contact you soon.')
        return redirect('home')

    # Get featured events for home page (limit to 3 most recent) and crew leaders
    featured_events = Event.objects.filter(is_featured=True)[:3]
    crew_leaders = CrewLeader.objects.all()[:6]
    context = {
        'featured_events': featured_events,
        'crew_leaders': crew_leaders,
    }
    return render(request, "home.html", context)

def about(request):
    return render(request, "about.html")

def contact(request):
    return render(request, "contact.html")



def news(request):
    return render(request, "news.html")

def upcoming_events(request):
    # Get upcoming events (events with date >= today)
    from django.utils import timezone
    events = Event.objects.filter(date__gte=timezone.now()).order_by('date')
    context = {
        'events': events
    }
    return render(request, "upcoming_events.html", context)

def past_events(request):
    # Get past events (events with date < today)
    from django.utils import timezone
    events = Event.objects.filter(date__lt=timezone.now()).order_by('-date')
    context = {
        'events': events
    }
    return render(request, "past_events.html", context)


def event_gallery(request, event_id):
    # Get specific event and its gallery images
    event = get_object_or_404(Event, id=event_id)
    gallery_images = event.gallery_images.all()
    context = {
        'event': event,
        'gallery_images': gallery_images
    }
    return render(request, "event_gallery.html", context)

def patrols(request):
    # Get all patrols
    patrols_list = Patrol.objects.all()
    context = {
        'patrols': patrols_list
    }
    return render(request, "patrols.html", context)

def patrol_detail(request, patrol_name):
    # Get specific patrol and its members, grouped by role
    patrol = get_object_or_404(Patrol, name=patrol_name.upper())
    members = patrol.members.all().order_by('name')

    # Group members by role into an ordered dict for template display
    roles = ['PL', 'APL', 'Secretary', 'Treasurer', 'Member', 'Other']
    role_labels = {
        'PL': 'Patrol Leader',
        'APL': 'Assistant Patrol Leader',
        'Secretary': 'Secretary',
        'Treasurer': 'Treasurer',
        'Member': 'Member',
        'Other': 'Other',
    }
    grouped = OrderedDict()
    for r in roles:
        grouped[role_labels.get(r, r)] = members.filter(role=r)

    context = {
        'patrol': patrol,
        'grouped_members': grouped,
    }
    return render(request, "patrol_detail.html", context)

def crew_leaders(request):
    leaders = CrewLeader.objects.all().order_by('name')
    context = {
        'crew_leaders': leaders
    }
    return render(request, "crew_leaders.html", context)


def events(request):
    # List all events (upcoming and past) with links to their galleries
    events_qs = Event.objects.order_by('-date')
    context = {
        'events': events_qs
    }
    return render(request, 'events.html', context)

# Placeholder auth views - will be replaced with Supabase integration
from django.contrib import messages
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from .forms import CrewLeaderForm, PatrolForm, PatrolMemberForm


from django.contrib.auth import authenticate, login, logout


def login_view(request):
    # Supabase-backed login (username or email)
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        # Use the SupabaseAuthBackend via Django authenticate API
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # Create Django session
            login(request, user, backend='main.auth_backends.SupabaseAuthBackend')
            messages.success(request, 'Logged in successfully via Supabase')
            if user.is_staff:
                return redirect('/admin/')
            return redirect('home')
        else:
            messages.error(request, 'Invalid credentials')
            return redirect('login')
    return render(request, 'login.html')


def logout_view(request):
    """Sign out from Supabase (if possible) then clear Django session.

    Supabase server-side sign_out may be best-effort; we catch and log errors
    without preventing the Django logout to ensure the user is logged out locally.
    """
    try:
        from supabase import create_client
        import logging
        supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        # Try to sign out; if this fails, log and continue
        try:
            supabase.auth.sign_out()
        except Exception as e:
            logging.exception("Supabase sign_out failed: %s", e)
    except Exception as e:
        # If the Supabase client can't be created, log and continue
        import logging
        logging.exception("Failed to initialize Supabase client for sign_out: %s", e)

    # Clear Django session
    logout(request)
    try:
        messages.info(request, 'Logged out')
    except Exception:
        # Messages framework or middleware may not be present in tests
        pass
    return redirect('home')


# CrewLeader CRUD (admin-only for now via is_staff)
@login_required
def create_crew_leader(request):
    if not request.user.is_staff:
        messages.error(request, 'Admin access required')
        return redirect('crew_leaders')

    if request.method == 'POST':
        form = CrewLeaderForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Crew leader created')
            return redirect('crew_leaders')
    else:
        form = CrewLeaderForm()
    return render(request, 'forms/crew_leader_form.html', {'form': form})

# Event CRUD (admin-only)
from .forms import EventForm

@login_required
def create_event(request):
    if not request.user.is_staff:
        messages.error(request, 'Admin access required')
        return redirect('gallery')

    if request.method == 'POST':
        form = EventForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Event created')
            return redirect('gallery')
    else:
        form = EventForm()
    return render(request, 'forms/event_form.html', {'form': form})

@login_required
def edit_event(request, pk):
    if not request.user.is_staff:
        messages.error(request, 'Admin access required')
        return redirect('gallery')
    event = get_object_or_404(Event, id=pk)
    if request.method == 'POST':
        form = EventForm(request.POST, request.FILES, instance=event)
        if form.is_valid():
            form.save()
            messages.success(request, 'Event updated')
            return redirect('gallery')
    else:
        form = EventForm(instance=event)
    return render(request, 'forms/event_form.html', {'form': form, 'event': event})

@login_required
def delete_event(request, pk):
    if not request.user.is_staff:
        messages.error(request, 'Admin access required')
        return redirect('gallery')
    event = get_object_or_404(Event, id=pk)
    if request.method == 'POST':
        event.delete()
        messages.success(request, 'Event deleted')
        return redirect('gallery')
    return render(request, 'forms/confirm_delete.html', {'object': event})

# Patrol CRUD (admin-only)
@login_required
def create_patrol(request):
    if not request.user.is_staff:
        messages.error(request, 'Admin access required')
        return redirect('patrols')
    if request.method == 'POST':
        form = PatrolForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Patrol created')
            return redirect('patrols')
    else:
        form = PatrolForm()
    return render(request, 'forms/patrol_form.html', {'form': form})

@login_required
def edit_patrol(request, pk):
    if not request.user.is_staff:
        messages.error(request, 'Admin access required')
        return redirect('patrols')
    patrol = get_object_or_404(Patrol, id=pk)
    if request.method == 'POST':
        form = PatrolForm(request.POST, instance=patrol)
        if form.is_valid():
            form.save()
            messages.success(request, 'Patrol updated')
            return redirect('patrols')
    else:
        form = PatrolForm(instance=patrol)
    return render(request, 'forms/patrol_form.html', {'form': form, 'patrol': patrol})

@login_required
def delete_patrol(request, pk):
    if not request.user.is_staff:
        messages.error(request, 'Admin access required')
        return redirect('patrols')
    patrol = get_object_or_404(Patrol, id=pk)
    if request.method == 'POST':
        patrol.delete()
        messages.success(request, 'Patrol deleted')
        return redirect('patrols')
    return render(request, 'forms/confirm_delete.html', {'object': patrol})

# PatrolMember CRUD (admin-only)
@login_required
def create_patrol_member(request):
    if not request.user.is_staff:
        messages.error(request, 'Admin access required')
        return redirect('patrols')
    if request.method == 'POST':
        form = PatrolMemberForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Patrol member created')
            return redirect('patrols')
    else:
        form = PatrolMemberForm()
    return render(request, 'forms/patrol_member_form.html', {'form': form})

@login_required
def edit_patrol_member(request, pk):
    if not request.user.is_staff:
        messages.error(request, 'Admin access required')
        return redirect('patrols')
    member = get_object_or_404(PatrolMember, id=pk)
    if request.method == 'POST':
        form = PatrolMemberForm(request.POST, request.FILES, instance=member)
        if form.is_valid():
            form.save()
            messages.success(request, 'Patrol member updated')
            return redirect('patrols')
    else:
        form = PatrolMemberForm(instance=member)
    return render(request, 'forms/patrol_member_form.html', {'form': form, 'member': member})

@login_required
def delete_patrol_member(request, pk):
    if not request.user.is_staff:
        messages.error(request, 'Admin access required')
        return redirect('patrols')
    member = get_object_or_404(PatrolMember, id=pk)
    if request.method == 'POST':
        member.delete()
        messages.success(request, 'Patrol member deleted')
        return redirect('patrols')
    return render(request, 'forms/confirm_delete.html', {'object': member})

@login_required
def edit_crew_leader(request, pk):
    if not request.user.is_staff:
        messages.error(request, 'Admin access required')
        return redirect('crew_leaders')
    leader = get_object_or_404(CrewLeader, id=pk)
    if request.method == 'POST':
        form = CrewLeaderForm(request.POST, request.FILES, instance=leader)
        if form.is_valid():
            form.save()
            messages.success(request, 'Crew leader updated')
            return redirect('crew_leaders')
    else:
        form = CrewLeaderForm(instance=leader)
    return render(request, 'forms/crew_leader_form.html', {'form': form, 'leader': leader})

@login_required
def delete_crew_leader(request, pk):
    if not request.user.is_staff:
        messages.error(request, 'Admin access required')
        return redirect('crew_leaders')
    leader = get_object_or_404(CrewLeader, id=pk)
    if request.method == 'POST':
        leader.delete()
        messages.success(request, 'Crew leader deleted')
        return redirect('crew_leaders')
    return render(request, 'forms/confirm_delete.html', {'object': leader})