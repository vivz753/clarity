/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

const browsers = {
    chrome_latest_win_10: {
        base: "SauceLabs",
        browserName: "chrome",
        version: "latest",
        platform: "Windows 10"
    },
    firefox_latest_win_10: {
        base: "SauceLabs",
        browserName: "firefox",
        version: "latest",
        platform: "Windows 10"
    },
    safari_latest_osx_11: {
        base: "SauceLabs",
        browserName: "safari",
        version: "latest",
        platform: "macOS 10.13"
    },
    ie_11_win_8_1: {
        base: "SauceLabs",
        browserName: "internet explorer",
        version: "latest",
        platform: "Windows 8.1"
    },
    edge_latest_win_10: {
        base: "SauceLabs",
        browserName: "MicrosoftEdge",
        version: "latest",
        platform: "Windows 10"
    }
};

module.exports = function(karma) {
    "use strict";

    console.log(process.env);

    karma.set({
        autoWatch: true,
        basePath: "",
        frameworks: ["jasmine", "jasmine-matchers"],
        files: [
            // PrismJS
            { pattern: './node_modules/prismjs/themes/prism.css', included: true, watched: false },
            { pattern: './node_modules/prismjs/prism.js', included: true, watched: false },
            { pattern: './node_modules/prismjs/components/prism-typescript.min.js', included: true, watched: false },

            // Polyfills
            { pattern: './node_modules/@webcomponents/custom-elements/custom-elements.min.js', included: true, watched: false },

            // Clarity
            { pattern: './dist/clr-ui/clr-ui.min.css', included: true, watched: true },

            // Entry point to all our spec files
            { pattern: "./tests/tests.entry.ts", watched: false }
        ],
        exclude: [ 'node_modules/**/*spec.js' ],
        preprocessors: {
            "./tests/tests.entry.ts": ["webpack"]
        },
        mime: {
            'text/x-typescript': ['ts','tsx']
        },
        reporters: ["mocha", "saucelabs", "coverage-istanbul"],
        coverageIstanbulReporter: {
            dir: "./reports/coverage/",
            fixWebpackSourcePaths: true,
            reports: ["html", "lcovonly", "cobertura"]
        },
        browsers: [
            "chrome_latest_win_10", 
            // "firefox_latest_win_10", 
            // "safari_latest_osx_11"
        ],
        browserNoActivityTimeout: 100000,
        captureTimeout: 90000,
        colors: true,
        logLevel: karma.LOG_DEBUG,
        singleRun: true,
        concurrency: Infinity,
        webpackServer: { noInfo: true, quiet: true },
        webpackMiddleware: { noInfo: true, quiet: true },
        webpack: require("./webpack.test.config"),
        customLaunchers: browsers,
        mochaReporter: {
            ignoreSkipped: true
        },
        sauceLabs: {
            testName: "Unit Tests",
            startConnect: true,
            username: "claritydesignsystem",
            accessKey: process.env.SAUCE_ACCESS_KEY,
            // If you need to debug, here are some options
            // connectOptions: { 
            //     verbose: true,
            //     logfile: './sauceconnect.log'
            // }
        }
    });
};
