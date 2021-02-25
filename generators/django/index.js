"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");

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
      {
          type: "input",
          name: "docker",
          message: `Would yuou like docker`
        },
    ]

    const djangoReactPrompts = [
      {
        type: "djangoreactprompt",
        name: "djangoreactprompt",
        message: `These are django react prompts`
      },
    ]

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
      // this.description = r.description ? r.description : this.description;
      // this.version = r.version ? r.version : this.version;
      // this.apiRoot = r.apiRoot ? r.apiRoot.replace(/^\/?/, "/") : this.apiRoot;
      // this.test = r.test ? r.test : this.test;
      // this.docker = r.docker;
      if (this.stack == "django"){
        return this.prompt(djangoPrompts).then(r => {
          console.log(r.djangoprompt)
        })
      }else{
        return this.prompt(djangoReactPrompts).then(r => {
          console.log(r.djangoreactprompt)
        })
      }
    });
  }

  writing() {
    const src = this.sourceRoot() + "/**";
    const dest = this.destinationPath(this.name);

    // Const files = [
    //   "package.json",
    //   "README.md",
    //   ".env",
    //   ".eslintrc.json",
    //   "server/routes.js",
    //   "test/examples.controller.js",
    //   "server/common/api.yml",
    //   "server/common/server.js",
    //   "server/api/middlewares/error.handler.js",
    //   "server/api/controllers/examples/controller.js",
    //   "public/api-explorer/index.html",
    //   "public/api-explorer/swagger-ui-standalone-preset.js",
    //   "public/index.html",
    //   "gitignore"
    // ];

    const files = [];

    const copyOpts = {
      globOptions: {
        ignore: []
      }
    };

    if (this.stack == "django") {
      //Payas's files
      files.push("django/");
    } else {
      //My files
      files.push("django-react/");
    }

    // This.fs.copy(src, dest, copyOpts);
    // this.fs.copy(this.templatePath(""), dest, copyOpts);

    const opts = {
      name: this.name,
      title: this.name,
      description: this.description,
      version: this.version,
      apiRoot: this.apiRoot
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

  //   Install() {
  //     const appDir = path.join(process.cwd(), this.name);
  //     process.chdir(appDir);
  //     if (this.useYarn) {
  //       this.yarnInstall();
  //     } else {
  //       this.npmInstall();
  //     }
  //   }

  end() {
    // If (this.useYarn) {
    //   this.spawnCommandSync("yarn", ["lint:fix"]);
    // } else {
    //   this.spawnCommandSync("npm", ["run", "lint:fix"]);
    // }
  }
};
