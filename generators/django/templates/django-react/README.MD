## Welcome to the Django React Generator

There are two methods of using the django-react template generated. You can do it with or without docker.

You will first need to enter the django-react directory, you can do so by running\
`cd django-react`

### Without Docker:

To start the frontend simply run these commands\
`cd frontend`\
`npm i`\
`npm start`

These commands install the necessary dependencies and start your react app on `localhost:3000`

To start the backend simply run these commands\
`cd backend/api`\
`python manage.py runserver`

When making changes to the django template afterwards you will need to run these commands so your local dev server reflects the changes\
`python manage.py makemigrations`\
`python manage.py migrate`

### With Docker

Simply run\
`docker-compose up --build`

in the django-react directory! It's that easy!