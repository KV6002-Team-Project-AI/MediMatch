from .token import EmailVerificationTokenGenerator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.conf import settings

# Initialize your custom token generator
email_verification_token_generator = EmailVerificationTokenGenerator()

class EmailService:
    @staticmethod
    def send_verification_email(user, domain='localhost:3000', use_https=False):
        # Use your custom token generator here
        token = email_verification_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        protocol = 'https' if use_https else 'http'
        verification_url = f"{protocol}://{domain}/verify-email/{uid}/{token}"

        subject = 'Verify your email'
        message = f'Please click the following link to verify your email: {verification_url}'
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [user.email]

        send_mail(subject, message, from_email, recipient_list, fail_silently=False)



def send_notification_email(user, message, subject):
    send_mail(
        subject,
        message,
        'bywaterjed@gmail.com',  # Use the email set as DEFAULT_FROM_EMAIL
        [user.email],
        fail_silently=False,
    )
