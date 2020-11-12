from rest_framework_mongoengine.serializers import DocumentSerializer

from mineriaApp.models_v2.entry import Entry


class EntrySerializer(DocumentSerializer):
    class Meta:
        model = Entry
        depth = 2
        fields = ('id', 'name', 'content', 'date', 'source', 'entities')


class CreateEntrySerializer(DocumentSerializer):
    class Meta:
        model = Entry
        fields = ('id', 'name', 'content', 'date', 'source', 'entities')
