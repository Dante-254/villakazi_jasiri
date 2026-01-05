from django.db import models
from django.utils import timezone

# Create your models here.

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='events/', blank=True, null=True)
    date = models.DateTimeField()
    location = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_featured = models.BooleanField(default=False, help_text="Featured events appear on home page")
    
    class Meta:
        ordering = ['-date']
    
    def __str__(self):
        return self.title

class GalleryImage(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='gallery/')
    caption = models.CharField(max_length=200, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-uploaded_at']
    
    def __str__(self):
        return f"{self.event.title} - {self.caption or 'Image'}"

class Patrol(models.Model):
    PATROL_CHOICES = [
        ('DOVE', 'DOVE'),
        ('LIO', 'LIO'),
        ('CAT', 'CAT'),
    ]
    
    name = models.CharField(max_length=10, choices=PATROL_CHOICES, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name

class PatrolMember(models.Model):
    ROLE_CHOICES = [
        ('PL', 'Patrol Leader'),
        ('APL', 'Assistant Patrol Leader'),
        ('Secretary', 'Secretary'),
        ('Treasurer', 'Treasurer'),
        ('Member', 'Member'),
        ('Other', 'Other'),
    ]

    patrol = models.ForeignKey(Patrol, on_delete=models.CASCADE, related_name='members')
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Member', help_text="Role within the patrol")
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to='patrol_members/', blank=True, null=True)
    added_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return f"{self.name} - {self.patrol.name} ({self.role})"

class CrewLeader(models.Model):
    name = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to='crew_leaders/', blank=True, null=True)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, null=True)
    facebook_url = models.URLField(blank=True, null=True)
    instagram_url = models.URLField(blank=True, null=True)
    tiktok_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} - {self.position}"
