from django.db import models

# Create your models here.
class SearchLog(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    search = models.BooleanField()  # does the user searched for a query
    search_query = models.CharField(max_length=255, null=True, blank=True)  # the search query (if the user searched)
    api_response_time = models.FloatField()  # the time in seconds it takes for get the response from the api

    def __str__(self):
        return f"Search Log - {self.date}"