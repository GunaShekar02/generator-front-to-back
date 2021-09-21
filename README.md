# Generator Front to Back

A fullstack template generator. Get reliable starter templates for your React.js, Node.js, React.js + Node.js, Django, or Django + React.js apps. Configure authentication types, databases and much more in a matter of seconds instead of having to go through the hassle of industry research and setting it up yourselves.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-front-to-back using [npm](https://www.npmjs.com/package/generator-front-to-back) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-front-to-back
```

Then generate your new project:

For React.js, Node.js or React.js + Node.js projects:-

```bash
yo front-to-back:javascript
```

For Django or Django + React.js projects:-

```bash
yo front-to-back:django
```

Answer a few simple questions and configure your app in a few seconds!

## Using Docker


Build the Docker images:

```bash
docker build -t generator-front-to-back:latest .
```

Make a folder where you want to generate the Service:

```bash
mkdir service
cd service
```

Run the generator from image to generate service:

```bash
docker run -it --rm -v $PWD:/home/yo/app generator-front-to-back
```

Run and attach interactive shell to the generator docker container to work from inside the running container:

```bash
docker run -it --rm -v $PWD:/home/yo/app generator-front-to-back /bin/bash
```

## Features

### Javascript

- React Router - optionally add react router to your project
- Redux - optionally use Redux with your React app for global state management. (Comes fully configured)
- Axios - optionally add axios configuration to start interacting with your backend right away
- Authentication support - setup JWT or session based authentication out of the box
- Database configuration - choose between a SQL or a No-SQL database and have it fully configured
- CORS - optionally add CORS to your backend
- Docker support - the project includes Dockerfile and Docker Compose as well for easy deployment
- Swagger - tool to design, build, document, and use RESTful web services

### Django 

- Django+React - quickly set up an already configured Django+React project 
- Redux - optionally use Redux with your Django+React app for application state management
- Swagger - tool to design, build, document, and use RESTful web services 
- Docker support - the project includes Dockerfile for easy set up 
- JSON Web Tokens - use JWT to securely transmit information between parties as a JSON object 
- PostgreSQL - front-to-back generator comes with an already configured Relational Database Management System, PostrgreSQL  
- Heroku - quickly deploy your Django+React app to Heroku

## License

MIT © [Guna Shekar]()
