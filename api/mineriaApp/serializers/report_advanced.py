from rest_framework_mongoengine.serializers import DocumentSerializer

from mineriaApp.models_v2.report_advanced import ReportAdvanced


class ReportAdvancedSerializer(DocumentSerializer):
    class Meta:
        model = ReportAdvanced
        fields = (
            'id', 'name', 'description', 'basic_reports')
