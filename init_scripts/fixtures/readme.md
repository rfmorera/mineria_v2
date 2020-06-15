# Fixtures Initialization

Guide to insert Custom Groups using fixtures

This must be used to create the custom permission

[How to Provide Test Fixtures for Django Models in Pytest](https://realpython.com/django-pytest-fixtures/ "Provide Text Fixtures")

## Guide


### Creating Django Fixtures

Django provides its own way of creating and loading fixtures for models from files. Django fixture files can be written in either JSON or YAML. In this tutorial, you’ll work with the JSON format.

The easiest way to create a Django fixture is to use an existing object. Start a Django shell:

```bash
python manage.py shell
```

Inside the Django shell, create a new group called appusers:

```python
>>> from django.contrib.auth.models import Group
>>> group = Group.objects.create(name="SuperAdmin")
>>> group.pk
1
```
The Group model is part of Django’s authentication system. Groups are very useful for managing permissions in a Django project.

You created a new group called appusers. The primary key of the group you just created is 1. To create a fixture for the group appusers, you are going to use the Django management command dumpdata.

Exit the Django shell with exit() and execute the following command from your terminal:

```bash
python manage.py dumpdata auth.Group --indent 4 > group.json
```

### Loading Django Fixtures
Now that you have a fixture file, you want to load it into the database. But before you do that, you should open a Django shell and delete the group that you already created:

```python
>>> from django.contrib.auth.models import Group
>>> Group.objects.filter(pk=1).delete()
```
Now that the group is deleted, load the fixture using the loaddata command:

```bash
python manage.py loaddata group.json
```

To make sure the new group was loaded, open a Django shell and fetch it:
```python
>>> from django.contrib.auth.models import Group
>>> group = Group.objects.get(pk=1)
>>> vars(group)
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.