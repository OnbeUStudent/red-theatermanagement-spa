// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// Look for the word NOTE to describe the differences between this file and karma.conf.js

var path = require("path"); // NOTE this was added

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
      require("@pact-foundation/karma-pact"), // NOTE this line was added
    ],
    files: [
      // NOTE this section was added
      "node_modules/@pact-foundation/pact-web/pact-web.js",
    ],
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    concurrency: 1, // Run each browser's tests sequentially.
    logLevel: config.LOG_ERROR, // NOTE this was LOG_INFO
    autoWatch: false, // NOTE this was true
    browsers: ["ChromeHeadlessCI"], // NOTE this was ['Chrome']
    customLaunchers: {
      // NOTE this section was added
      ChromeHeadlessCI: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
    },
    singleRun: true, // NOTE this was false
    restartOnFileChange: false, // NOTE this was true
    browserNoActivityTimeout: 40000, // NOTE this wasn't specified
    pact: [
      {
        // NOTE this section was added
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
