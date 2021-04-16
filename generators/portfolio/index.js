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
    this.name = "";
    this.description = "My cool app";
    this.version = "1.0.0";
    this.apiRoot = "/api/v1";
    this.specification = "openapi_3";
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the mind-blowing ${chalk.red(
          "generator-porfolio"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: `App name [myapp]`
      }
    ];

    return this.prompt(prompts).then(props => {
      // This.log(this.props)
      // this.log(this.name)
      // this.props.name = this.prompts.name || "myapp"
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const file = this.props.name || "myapp";
    const src = this.sourceRoot() + "/frontend/**";
    const dest = this.destinationPath(`${file}/frontend`);

    // The ignore array is used to ignore files, push file names into this array that you want to ignore.
    const copyOpts = {
      globOptions: {
        ignore: []
      }
    };

    // If (!this.props.mongodb)
    //    copyOpts.globOptions.ignore.push(src + "/mongoose.js");

    this.fs.copy(src, dest, copyOpts);

    /* Const files = ["index.js", "package.json"];

        const opts = {
            name: this.props.name,
            mongodb: this.props.mongodb
        };

        files.forEach(file => {
            this.fs.copyTpl(
                this.templatePath(file),
                this.destinationPath(`${this.props.name}/${file}`),
                opts,
                copyOpts
            );
        }); */
  }

  install() {
    const dir = this.props.name || "myapp";
    const appDir = path.join(process.cwd(), dir);
    process.chdir(appDir + "/frontend");
    this.npmInstall();
    this.log("portfolio created Succesfully");
  }
};
