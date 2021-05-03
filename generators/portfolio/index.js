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

    this.fs.copy(src, dest, copyOpts);
  }

  install() {
    const dir = this.props.name || "myapp";
    const appDir = path.join(process.cwd(), dir);
    process.chdir(appDir + "/frontend");
    this.npmInstall();
  }
};
