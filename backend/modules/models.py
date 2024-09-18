from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None, username=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        if not username:
            raise ValueError('A username is required.')

        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, username=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        if not username:
            raise ValueError('A username is required.')

        user = self.create_user(email, password, username)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = AppUserManager()

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='appuser_set',
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='appuser_set',
        blank=True,
    )

    def __str__(self):
        return self.username


class PersonalStatement(models.Model):
    field_of_study = models.TextField()
    essay = models.TextField()
    reparagraphed_essay = models.TextField(null=True)


class Argument(models.Model):
    idea = models.TextField()
    evidence = models.TextField(null=True)
    explanation = models.TextField(null=True)
    personal_statement = models.ForeignKey(
        PersonalStatement, on_delete=models.CASCADE)


class Specificity(models.Model):
    is_specific = models.BooleanField()
    reason = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)


class Relevance(models.Model):
    is_relevant = models.BooleanField()
    reason = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)


class Suitability(models.Model):
    has_interest = models.BooleanField()
    has_interest_reason = models.TextField()
    is_capable = models.BooleanField()
    is_capable_reason = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)


class Comment(models.Model):
    comment = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)


class ArgumentEvaluations(models.Model):
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)
    specificity = models.ForeignKey(Specificity, on_delete=models.CASCADE)
    relevance = models.ForeignKey(Relevance, on_delete=models.CASCADE)
    suitability = models.ForeignKey(Suitability, on_delete=models.CASCADE)

    class Meta:
        managed = False


class GeneralComment(models.Model):
    comment = models.TextField()
    personal_state = models.ForeignKey(
        PersonalStatement, on_delete=models.CASCADE)
