"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const { file } = require("assert");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("appname", { type: String, required: false });

    this.name = this.options.appname || "myapp";
    this.description = "My cool app";
    this.version = "1.0.0";
    this.apiRoot = "/api/v1";
    this.test = "one";
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the supreme ${chalk.red(
          "generator-front-to-back"
        )} generator, Django Version!`
      )
    );

    const prompts = [
      {
        type: "list",
        name: "stack",
        message: `Would you like Django or Django + React`,
        choices: [
          { name: "Django", value: "django" },
          { name: "Django + React", value: "django_react" }
        ],
        default: "django"
      }
      // {
      //   type: "input",
      //   name: "description",
      //   message: `App description [${this.description}]`
      // },
      // {
      //   type: "input",
      //   name: "apiRoot",
      //   message: `API Root [${this.apiRoot}]`
      // },
      // {
      //   type: "input",
      //   name: "apiVersion",
      //   message: `Version [${this.version}]`
      // },
      // {
      //   type: "list",
      //   name: "stack",
      //   message: `Would you like Django or Django + React`,
      //   choices: [
      //     { name: "Django", value: "django" },
      //     { name: "Django + React", value: "django_react" }
      //   ],
      //   default: "django"
      // }
    ];

    const djangoPrompts = [
      // {
      //   type: "list",
      //   name: "stack",
      //   message: `Would you like Django or Django + React`,
      //   choices: [
      //     { name: "Django", value: "django" },
      //     { name: "Django + React", value: "django_react" }
      //   ],
      //   default: "django"
      // }
    ];

    const djangoReactPrompts = [
      {
        type: "list",
        name: "docker",
        message: `Would you like to include Docker`,
        choices: [
          { name: "Yes", value: "yes" },
          { name: "No", value: "no" }
        ],
        default: "yes"
      },
      {
        type: "list",
        name: "swagger",
        message: `Would you like to include Swagger?`,
        choices: [
          { name: "Yes", value: "yes" },
          { name: "No", value: "no" }
        ],
        default: "yes"
      }
    ];

    if (!this.options.appname) {
      prompts.unshift({
        type: "input",
        name: "name",
        message: `App name [${this.name}]`
      });
    }

    return await this.prompt(prompts).then(r => {
      this.name = r.name ? r.name : this.name;
      this.stack = r.stack;
      // This.description = r.description ? r.description : this.description;
      // this.version = r.version ? r.version : this.version;
      // this.apiRoot = r.apiRoot ? r.apiRoot.replace(/^\/?/, "/") : this.apiRoot;
      // this.test = r.test ? r.test : this.test;
      // this.docker = r.docker;
      if (this.stack == "django") {
        return this.prompt(djangoPrompts).then(r => {
          console.log(r.djangoprompt);
        });
      }
      else{
        return this.prompt(djangoReactPrompts).then(r => {
          this.docker = r.docker;
          this.swagger = r.swagger;
        });
      }
      
    });
  }

  writing() {
    const src = this.sourceRoot() + "/**";
    const dest = this.destinationPath(this.name);

    const files = [];

    const copyOpts = {
      globOptions: {
        ignore: []
      }
    };

    if (this.stack == "django") {
      // Payas's files
      files.push("django/");
    } else {
      files.push("django-react/backend/api/");
      files.push("django-react/backend/requirements.txt");
      files.push("django-react/frontend/public/");
      files.push("django-react/frontend/src/");
      files.push("django-react/frontend/package-lock.json");
      files.push("django-react/frontend/package.json");
      files.push("django-react/frontend/README.MD");
      if (this.docker == "yes") {
        files.push("django-react/backend/Dockerfile");
        files.push("django-react/backend/entrypoint.sh");
        files.push("django-react/frontend/Dockerfile");
        files.push("django-react/frontend/Dockerfile-dev.dockerfile");
        files.push("django-react/docker-compose.yml");
        files.push("django-react/webserver");
      }
    }


    const opts = {
      swagger: this.swagger
    };

    files.forEach(f => {
      this.log(f);
      this.fs.copyTpl(
        this.templatePath(f),
        this.destinationPath(`${this.name}/${f}`),
        opts,
        copyOpts
      );
    });

    // This.fs.move(
    //   this.destinationPath(`${this.name}`, "gitignore"),
    //   this.destinationPath(`${this.name}`, ".gitignore")
    // );
  }

    // Install() {
    //   const appDir = path.join(process.cwd(), this.name);
    //   process.chdir(appDir);
    //   if (this.useYarn) {
    //     this.yarnInstall();
    //   } else {
    //     this.npmInstall();
    //   }
    // }

  //end() {
    // If (this.useYarn) {
    //   this.spawnCommandSync("yarn", ["lint:fix"]);
    // } else {
    //   this.spawnCommandSync("npm", ["run", "lint:fix"]);
    // }
  //}
};
