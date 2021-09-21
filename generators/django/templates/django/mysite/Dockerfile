FROM python:3.8

ENV PYTHONUNBUFFERED=1

WORKDIR /generators/django/templates/django/mysite

COPY requirements.txt /generators/django/templates/django/mysite
RUN pip3 install --no-cache-dir --upgrade pip -r requirements.txt

COPY . /generators/django/templates/django/mysite

EXPOSE 8000
CMD python3 manage.py runserver 0.0.0.0:8000