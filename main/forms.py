from django import forms
from .models import Event, GalleryImage, Patrol, PatrolMember, CrewLeader

class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = ['title', 'description', 'image', 'date', 'location', 'is_featured']

class GalleryImageForm(forms.ModelForm):
    class Meta:
        model = GalleryImage
        fields = ['event', 'image', 'caption']

class PatrolForm(forms.ModelForm):
    class Meta:
        model = Patrol
        fields = ['name', 'description']

class PatrolMemberForm(forms.ModelForm):
    class Meta:
        model = PatrolMember
        fields = ['patrol', 'name', 'role', 'bio', 'image']

class CrewLeaderForm(forms.ModelForm):
    class Meta:
        model = CrewLeader
        fields = ['name', 'position', 'bio', 'image', 'email', 'phone', 'facebook_url', 'instagram_url', 'tiktok_url']