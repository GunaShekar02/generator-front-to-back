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
          "generator-front-to-back"
        )} generator, Javascript Version!`
      )
    );

    const initialPrompts = [
      {
        type: "input",
        name: "description",
        message: `App description [${this.description}]`
      },
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
      }
    ];

    const frontendPrompts = [
      {
        type: "confirm",
        name: "router",
        message: "Would you like to install React Router?",
        default: true
      },
      {
        type: "confirm",
        name: "redux",
        message: "Would you like to install Redux?",
        default: true
      },
      {
        type: "confirm",
        name: "axios",
        message:
          "Would you like to install Axios to connect to a backend server?",
        default: true
      }
    ];

    frontendPrompts.forEach(prompt => {
      prompt.when = answers =>
        answers.type === "frontend" || answers.type === "fullstack";
    });

    const backendPrompts = [
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
        name: "authentication",
        message: `What kind of authentication would you like in your app?`,
        choices: [
          { name: "JSON Web Token", value: "jwt" },
          { name: "Session Based", value: "session" },
          { name: "None", value: "none" }
        ],
        default: "jwt"
      },
      {
        type: "list",
        name: "database",
        message: `What kind of database would you like in your app?`,
        choices: [
          { name: "SQL (MySQL + Sequelize)", value: "sql" },
          { name: "No-SQL (MongoDB + Mongoose)", value: "mongo" },
          { name: "None", value: "none" }
        ],
        default: "sql"
      },
      {
        type: "confirm",
        name: "cors",
        message: "Would you like to install CORS?",
        default: true
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

    backendPrompts.forEach(prompt => {
      prompt.when = answers =>
        answers.type === "backend" || answers.type === "fullstack";
    });

    if (!this.options.appname) {
      initialPrompts.unshift({
        type: "input",
        name: "name",
        message: `App name [${this.name}]`
      });
    }

    const results = await this.prompt([
      ...initialPrompts,
      ...frontendPrompts,
      ...backendPrompts
    ]).then(r => {
      this.name = r.name ? r.name : this.name;
      this.type = r.type;
      this.router = r.router;
      this.redux = r.redux;
      this.axios = r.axios;
      this.description = r.description ? r.description : this.description;
      this.version = r.version ? r.version : this.version;
      this.apiRoot = r.apiRoot ? r.apiRoot.replace(/^\/?/, "/") : this.apiRoot;
      this.authentication = r.authentication;
      this.database = r.database;
      this.cors = r.cors;
      this.linter = r.linter;
      this.specification = r.specification;
    });

    return results;
  }

  writing() {
    this.log(chalk.blue("Setting up required files..."));
    if (this.type === "fullstack" || this.type === "frontend") {
      const src = this.sourceRoot() + "/frontend/**";
      const dest = this.destinationPath(`${this.name}/frontend`);
      const copyOpts = {
        globOptions: {
          ignore: []
        }
      };

      if (!this.redux) {
        copyOpts.globOptions.ignore.push(src + "/src/Redux/ActionTypes.js");
        copyOpts.globOptions.ignore.push(src + "/src/Redux/ConfigureStore.js");
        copyOpts.globOptions.ignore.push(
          src + "/src/Redux/Reducers/example.reducer.js"
        );
      }

      if (!this.axios) {
        copyOpts.globOptions.ignore.push(
          src + "/src/Services/example.service.js"
        );
        copyOpts.globOptions.ignore.push(src + "/src/Utils/constants.js");
      }

      this.fs.copy(src, dest, copyOpts);

      const files = [
        "package.json",
        "src/App.js",
        "src/index.js",
        "src/Containers/Home/Home.js"
      ];

      const opts = {
        router: this.router,
        redux: this.redux,
        axios: this.axios
      };

      files.forEach(f => {
        this.fs.copyTpl(
          this.templatePath(`frontend/${f}`),
          this.destinationPath(`${this.name}/frontend/${f}`),
          opts,
          copyOpts
        );
      });
    }

    if (this.type === "fullstack" || this.type === "backend") {
      const src = this.sourceRoot() + "/backend/**";
      const dest = this.destinationPath(`${this.name}/backend`);
      const files = [
        "package.json",
        "README.md",
        ".env",
        "docker-compose.yml",
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

      if (this.authentication === "none") {
        copyOpts.globOptions.ignore.push(
          src + "/server/api/middlewares/isAuthenticated.session.js"
        );
        copyOpts.globOptions.ignore.push(
          src + "/server/api/middlewares/isAuthenticated.jwt.js"
        );
        copyOpts.globOptions.ignore.push(
          src + "/server/api/services/authentication.service.js"
        );
      } else if (this.authentication === "session") {
        copyOpts.globOptions.ignore.push(
          src + "/server/api/services/authentication.service.js"
        );
        copyOpts.globOptions.ignore.push(
          src + "/server/api/middlewares/isAuthenticated.jwt.js"
        );
      } else {
        copyOpts.globOptions.ignore.push(
          src + "/server/api/middlewares/isAuthenticated.session.js"
        );
      }

      if (this.database === "mongo") {
        copyOpts.globOptions.ignore.push(src + "/server/common/sequelize.js");
        copyOpts.globOptions.ignore.push(src + "/server/models/User.js");
      } else if (this.database === "sql") {
        copyOpts.globOptions.ignore.push(src + "/server/common/mongo.js");
        copyOpts.globOptions.ignore.push(src + "/server/models/UserModel.js");
      } else {
        copyOpts.globOptions.ignore.push(src + "/server/common/sequelize.js");
        copyOpts.globOptions.ignore.push(src + "/server/common/mongo.js");
        copyOpts.globOptions.ignore.push(src + "/server/models/User.js");
        copyOpts.globOptions.ignore.push(src + "/server/models/UserModel.js");
      }

      this.fs.copy(src, dest, copyOpts);
      this.fs.copy(this.templatePath("backend/.*"), dest, copyOpts);

      const opts = {
        name: this.name,
        title: this.name,
        description: this.description,
        version: this.version,
        apiRoot: this.apiRoot,
        authentication: this.authentication,
        database: this.database,
        cors: this.cors,
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
  }

  install() {
    if (this.type === "backend" || this.type === "fullstack") {
      this.log(chalk.blue("Installing backend dependencies..."));
      let appDir;
      appDir = path.join(process.cwd(), `${this.name}/backend`);
      process.chdir(appDir);
      if (this.useYarn) {
        this.yarnInstall();
      } else {
        this.npmInstall();
      }
    }
  }

  end() {
    if (this.type === "frontend" || this.type === "fullstack") {
      this.log(chalk.blue("Installing frontend dependencies..."));
      let appDir = process.cwd();
      if (appDir.includes(this.name))
        appDir = path.join(process.cwd(), `../frontend`);
      else appDir = path.join(process.cwd(), `${this.name}/frontend`);
      process.chdir(appDir);
      if (this.useYarn) {
        this.yarnInstall();
      } else {
        this.npmInstall();
      }
    }
  }
};
