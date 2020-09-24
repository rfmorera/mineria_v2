# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from mineriaApp.models.models import User, Client


class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'cliente')
    fieldsets = (
        (None, {'fields': ('username', 'password', 'cliente')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'cliente', 'password1', 'password2'),
        }),
    )
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups', 'cliente')


admin.site.register(User, CustomUserAdmin)


class ClientAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')
    fieldsets = (
        ('Información General', {
            'fields': ('nombre', 'descripcion')
        }),
        # ('Address info', {
        #     'fields': ('address', ('city', 'zip'))
        # }),
    )
    pass


admin.site.register(Client, ClientAdmin)
