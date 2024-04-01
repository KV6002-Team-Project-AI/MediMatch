# This is All Jeds code

from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest
from google.oauth2 import service_account
from datetime import datetime, timedelta



class GoogleAnalyticsReporter:
    def __init__(self, key_file_location, property_id):
        self.client = self.initialize_analytics_data_client(key_file_location)
        self.property_id = property_id

    def initialize_analytics_data_client(self, key_file_location):
        credentials = service_account.Credentials.from_service_account_file(
            key_file_location, scopes=["https://www.googleapis.com/auth/analytics.readonly"]
        )
        return BetaAnalyticsDataClient(credentials=credentials)

    def get_daily_views(self):
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=7)
        request = RunReportRequest(
            property=f'properties/{self.property_id}',
            dimensions=[{'name': 'date'}],
            metrics=[{'name': 'screenPageViews'}],
            date_ranges=[{'start_date': start_date.strftime('%Y-%m-%d'), 'end_date': end_date.strftime('%Y-%m-%d')}]
        )
        return self.client.run_report(request)

    def run_report(self):
        request = RunReportRequest(
            property=f'properties/{self.property_id}',
            dimensions=[{'name': 'city'}],
            metrics=[{'name': 'activeUsers'}],
            date_ranges=[{'start_date': '2020-03-31', 'end_date': 'today'}]
        )
        return self.client.run_report(request)