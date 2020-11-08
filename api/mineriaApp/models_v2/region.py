from django_mongoengine import Document
from mongoengine import StringField, ReferenceField


class Region(Document):
    name = StringField(required=True)
    description = StringField()
    super_region = ReferenceField('SuperRegion')
