"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("appname", { type: String, required: false });
    this.option("yarn", {
      description: "Use Yarn as the package manager"
    });

    this.useYarn = this.options.yarn;
    this.name = this.options.appname || "myapp";
    this.description = "My cool app";
    this.version = "1.0.0";
    this.apiRoot = "/api/v1";
    this.specification = "openapi_3";
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the supreme ${chalk.red(
          "generator-fullstack-bootstrapper"
        )} generator, Javascript Version!`
      )
    );

    const prompts = [
      {
        type: "list",
        name: "type",
        message: `What kind of an app would you like?`,
        choices: [
          { name: "Frontend (React.js)", value: "frontend" },
          { name: "Backend (Node.js + Express.js)", value: "backend" },
          {
            name: "Fullstack (Node.js + Express.js + React.js)",
            value: "fullstack"
          }
        ],
        default: "fullstack"
      },
      {
        type: "input",
        name: "description",
        message: `App description [${this.description}]`
      },
      {
        type: "input",
        name: "apiRoot",
        message: `API Root [${this.apiRoot}]`
      },
      {
        type: "input",
        name: "apiVersion",
        message: `Version [${this.version}]`
      },
      {
        type: "list",
        name: "specification",
        message: `OpenAPI spec version`,
        choices: [
          { name: "OpenApi 3", value: "openapi_3" },
          { name: "Swagger 2", value: "swagger_2" }
        ],
        default: "openapi_3"
      },
      {
        type: "list",
        name: "linter",
        message: `Linter`,
        choices: [
          { name: "Prettier", value: "prettier" },
          { name: "Airbnb", value: "airbnb" }
        ],
        default: "prettier"
      }
    ];

    prompts.forEach(
      prompt =>
        (prompt.when = answers =>
          answers.type === "backend" || answers.type === "fullstack")
    );

    delete prompts[0].when;

    if (!this.options.appname) {
      prompts.unshift({
        type: "input",
        name: "name",
        message: `App name [${this.name}]`
      });
    }

    return await this.prompt(prompts).then(r => {
      this.log("You have chosen " + chalk.red(r.type));

      this.name = r.name ? r.name : this.name;
      this.type = r.type;
      this.description = r.description ? r.description : this.description;
      this.version = r.version ? r.version : this.version;
      this.apiRoot = r.apiRoot ? r.apiRoot.replace(/^\/?/, "/") : this.apiRoot;
      this.linter = r.linter;
      this.specification = r.specification;
    });
  }

  writing() {
    this.log("In writing");
    if (this.type === "fullstack" || this.type === "frontend") {
      this.log("In frontend");
      const src = this.sourceRoot() + "/frontend/**";
      const dest = this.destinationPath(`${this.name}/frontend`);
      this.log(src, dest);
      const copyOpts = {
        globOptions: {
          ignore: []
        }
      };
      this.log("Copy starting!");
      this.fs.copy(src, dest, copyOpts);
      // this.fs.copy(this.templatePath("frontend/.*"), dest, copyOpts);
      this.log("Copy done!");
    }
    if (this.type === "fullstack" || this.type === "backend") {
      this.log("In backend");

      const src = this.sourceRoot() + "/backend/**";
      const dest = this.destinationPath(`${this.name}/backend`);
      const files = [
        "package.json",
        "README.md",
        ".env",
        ".eslintrc.json",
        "server/routes.js",
        "test/examples.controller.js",
        "server/common/api.yml",
        "server/common/server.js",
        "server/api/middlewares/error.handler.js",
        "server/api/controllers/examples/controller.js",
        "public/api-explorer/index.html",
        "public/api-explorer/swagger-ui-standalone-preset.js",
        "public/index.html",
        "gitignore"
      ];

      const copyOpts = {
        globOptions: {
          ignore: []
        }
      };

      if (this.specification === "openapi_3") {
        copyOpts.globOptions.ignore.push(src + "/server/common/swagger.js");
        copyOpts.globOptions.ignore.push(src + "/server/common/api.v2.yml");
      } else {
        files.push("server/common/api.v2.yml");
        copyOpts.globOptions.ignore.push(src + "/server/common/api.yml");
      }
      if (!this.docker) {
        copyOpts.globOptions.ignore.push(src + "/+(Dockerfile|.dockerignore)");
      }

      this.fs.copy(src, dest, copyOpts);
      this.fs.copy(this.templatePath("backend/.*"), dest, copyOpts);

      const opts = {
        name: this.name,
        title: this.name,
        description: this.description,
        version: this.version,
        apiRoot: this.apiRoot,
        linter: this.linter,
        specification: this.specification
      };

      files.forEach(f => {
        this.fs.copyTpl(
          this.templatePath(`backend/${f}`),
          this.destinationPath(`${this.name}/backend/${f}`),
          opts,
          copyOpts
        );
      });

      this.fs.move(
        this.destinationPath(`${this.name}/backend`, "gitignore"),
        this.destinationPath(`${this.name}/backend`, ".gitignore")
      );
      if (this.specification !== "openapi_3") {
        this.fs.move(
          this.destinationPath(
            `${this.name}/backend`,
            "server/common/api.v2.yml"
          ),
          this.destinationPath(`${this.name}/backend`, "server/common/api.yml")
        );
      }
    }
    this.log("outside");
  }

  install() {
    this.log("In Install");
    if (this.type === "backend" || this.type === "fullstack") {
      const appDir = path.join(process.cwd(), `${this.name}/backend`);
      process.chdir(appDir);
      if (this.useYarn) {
        this.yarnInstall();
      } else {
        this.npmInstall();
      }
    }
    if (this.type === "frontend" || this.type === "fullstack") {
      const appDir = path.join(process.cwd(), `../frontend`);
      process.chdir(appDir);
      if (this.useYarn) {
        this.yarnInstall();
      } else {
        this.npmInstall();
      }
    }
  }
};
