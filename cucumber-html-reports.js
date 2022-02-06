const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "cypress/cucumber-json",
    reportPath: "./reports/cucumber-html-report.html",
    metadata: {
        browser: {
            name: "chrome"
        },
        device: "Local Test Device",
        platform: {
            name: "windows",
            version: "windows 10",
        }
    }
})