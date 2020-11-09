# Register your models_v2 here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from mineriaApp.models import Client, User


class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'client')
    fieldsets = (
        (None, {'fields': ('username', 'password', 'client')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'client', 'password1', 'password2'),
        }),
    )
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups', 'client')


admin.site.register(User, CustomUserAdmin)


class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    fieldsets = (
        ('Información General', {
            'fields': ('name', 'description')
        }),
        # ('Address info', {
        #     'fields': ('address', ('city', 'zip'))
        # }),
    )
    pass


admin.site.register(Client, ClientAdmin)
