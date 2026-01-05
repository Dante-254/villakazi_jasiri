from django.urls import path, include
from . import views


urlpatterns = [
    path("", views.home, name="home"),
    path("about/", views.about, name="about"),
    path("contact/", views.contact, name="contact"),

    path("what-we-do/news/", views.news, name="news"),
    path("what-we-do/upcoming-events/", views.upcoming_events, name="upcoming_events"),
    path("what-we-do/past-events/", views.past_events, name="past_events"),
    path("events/<int:event_id>/gallery/", views.event_gallery, name="event_gallery"),
    path("events/", views.events, name="events"),
    path("patrols/", views.patrols, name="patrols"),
    path("patrols/<str:patrol_name>/", views.patrol_detail, name="patrol_detail"),
    path("crew-leaders/", views.crew_leaders, name="crew_leaders"),
    # Crew leaders admin CRUD
    path("manage/create/crew-leader/", views.create_crew_leader, name="create_crew_leader"),
    path("manage/edit/crew-leader/<int:pk>/", views.edit_crew_leader, name="edit_crew_leader"),
    path("manage/delete/crew-leader/<int:pk>/", views.delete_crew_leader, name="delete_crew_leader"),
    # Event admin CRUD
    path("manage/create/event/", views.create_event, name="create_event"),
    path("manage/edit/event/<int:pk>/", views.edit_event, name="edit_event"),
    path("manage/delete/event/<int:pk>/", views.delete_event, name="delete_event"),
    # Patrol admin CRUD
    path("manage/create/patrol/", views.create_patrol, name="create_patrol"),
    path("manage/edit/patrol/<int:pk>/", views.edit_patrol, name="edit_patrol"),
    path("manage/delete/patrol/<int:pk>/", views.delete_patrol, name="delete_patrol"),
    # Patrol member admin CRUD
    path("manage/create/patrol-member/", views.create_patrol_member, name="create_patrol_member"),
    path("manage/edit/patrol-member/<int:pk>/", views.edit_patrol_member, name="edit_patrol_member"),
    path("manage/delete/patrol-member/<int:pk>/", views.delete_patrol_member, name="delete_patrol_member"),
    # Supabase auth routes (to be implemented)
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
]