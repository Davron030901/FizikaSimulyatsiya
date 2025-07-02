from django.contrib import admin
from .models import Simulation


@admin.register(Simulation)
class SimulationAdmin(admin.ModelAdmin):
    list_display = ['title', 'simulation_type', 'subcategory', 'created_at']
    list_filter = ['simulation_type', 'subcategory', 'created_at']
    search_fields = ['title', 'description']
    readonly_fields = ['created_at']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Asosiy ma\'lumotlar', {
            'fields': ('title', 'description')
        }),
        ('Kategoriya', {
            'fields': ('simulation_type', 'subcategory')
        }),
        ('Kodlar', {
            'fields': ('html_code', 'css_code', 'js_code'),
            'classes': ('collapse',)
        })
    )
