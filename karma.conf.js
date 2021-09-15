// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

var path = require("path");

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular", "pact"], // NOTE the addition of 'pact'
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
      require("@pact-foundation/karma-pact"),
    ],
    files: ["node_modules/@pact-foundation/pact-web/pact-web.js"],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/project"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    concurrency: 1, // Run each browser's tests sequentially.
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true,
    browserNoActivityTimeout: 40000,
    pact: [
      {
        cors: true,
        port: 1234,
        consumer: "red-theatermanagement-spa",
        provider: "red-theatermanagement-bff",
        logLevel: "DEBUG",
        log: path.resolve(process.cwd(), "logs", "pact.log"),
        dir: "pacts",
      },
    ],
  });
};
