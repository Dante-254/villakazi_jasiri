from django.contrib import admin
from .models import Event, GalleryImage, Patrol, PatrolMember, CrewLeader

# Register your models here.

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'location', 'is_featured', 'created_at']
    list_filter = ['is_featured', 'date', 'created_at']
    search_fields = ['title', 'description', 'location']
    date_hierarchy = 'date'
    fieldsets = (
        ('Event Information', {
            'fields': ('title', 'description', 'date', 'location', 'is_featured')
        }),
        ('Image', {
            'fields': ('image',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ['created_at', 'updated_at']

class GalleryImageInline(admin.TabularInline):
    model = GalleryImage
    extra = 1
    fields = ('image', 'caption')

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['event', 'caption', 'uploaded_at']
    list_filter = ['event', 'uploaded_at']
    search_fields = ['event__title', 'caption']

class PatrolMemberInline(admin.TabularInline):
    model = PatrolMember
    extra = 1
    fields = ('name', 'role', 'image', 'bio')

@admin.register(Patrol)
class PatrolAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name', 'description']
    inlines = [PatrolMemberInline]

@admin.register(PatrolMember)
class PatrolMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'patrol', 'role', 'added_at']
    list_filter = ['patrol', 'added_at']
    search_fields = ['name', 'role', 'bio']

@admin.register(CrewLeader)
class CrewLeaderAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'email', 'created_at']
    search_fields = ['name', 'position', 'email']
    readonly_fields = ['created_at', 'updated_at']
