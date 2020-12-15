from rest_framework_mongoengine.serializers import DocumentSerializer

from mineriaApp.models_v2.report_data import ReportDSentiment
from mineriaApp.models_v2.report_param import ReportPSentiment, ReportPSentimentPlanteamientos


class ReportPSentimentSerializer(DocumentSerializer):
    class Meta:
        model = ReportPSentiment
        fields = (
            'id', 'name', 'description', 'start_date', 'end_date', 'delta_type', 'delta_value', 'entities_id', 'favorite')


class ReportDSentimentSerializer(DocumentSerializer):
    class Meta:
        model = ReportDSentiment
        fields = (
            'start_date', 'total_opinion', 'total_positive', 'total_negative', 'total_neutral', 'ratio')


class ReportPSentimentPlanteamientoSerializer(DocumentSerializer):
    class Meta:
        model = ReportPSentimentPlanteamientos
        fields = (
            'id', 'name', 'description', 'start_date', 'end_date', 'delta_type', 'delta_value',
            'super_regions', 'regions', 'entities')


class ReportFullSentintimentSerializer(DocumentSerializer):
    result = ReportDSentimentSerializer(many=True)

    class Meta:
        model = ReportPSentiment
        depth = 1
        fields = (
            'id', 'name', 'description', 'start_date', 'end_date', 'delta_type', 'delta_value', 'result')
