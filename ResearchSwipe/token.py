from django.contrib.auth.tokens import PasswordResetTokenGenerator

class EmailVerificationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        # Ensure that the token is invalid after its intended use.
        return (
            str(user.pk) + 
            str(timestamp) + 
            str(user.is_verified) +
            str(user.date_joined.replace(microsecond=0, tzinfo=None))
        )

email_verification_token_generator = EmailVerificationTokenGenerator()
