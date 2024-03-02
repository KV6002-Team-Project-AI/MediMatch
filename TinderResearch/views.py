from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from django.utils.decorators import method_decorator
from django.http import HttpResponse
from django.conf import settings
import os
import logging

class FrontendAppView(TemplateView):
    template_name = os.path.join(settings.REACT_APP_DIR, 'index.html')

    @method_decorator(never_cache)
    def get(self, request, *args, **kwargs):
        try:
            with open(self.template_name, 'rb') as f:
                return HttpResponse(f.read(), content_type='text/html')
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `npm run build` to test the production version.
                """,
                status=501,
            )
