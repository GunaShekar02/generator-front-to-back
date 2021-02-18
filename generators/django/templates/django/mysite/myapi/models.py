from django.db import models

# Create your models here.
# this is a sample model for a blog entry

class BlogEntry(models.Model):
    blog_id = models.AutoField(primary_key=True)            # optional field. If primary key is not specified, it will be created by default
    blog_name = models.CharField(max_length=200)
    blog_text = models.TextField(max_length=500)
    pub_date = models.DateField('date published')           # this field has been provided a human readable field 

    # optional method. It tells Django what to print when it needs to print out an instance of he BlogEntry model
    def __str__(self):
        return self.blog_name