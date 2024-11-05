import {PlaywrightTestConfig} from '@playwright/test';
import path = require('path');

const config: PlaywrightTestConfig = {
    globalSetup: require.resolve('./global-setup'),
    testDir: 'tests/',
    testMatch: /.*\.js/,
    grep: [
        /Login/
    ],
    timeout: 7200000,
    retries: 0,
    snapshotDir: 'snapShots',
    workers: 1,
    reporter: [['allure-playwright'], ['html', {open: 'always'}], ['line']],
    use: {
        storageState: 'state.json',
        baseURL: 'https://www.facebook.com/',
        actionTimeout: 30000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'only-on-failure',
        channel: "chrome"
    },
    projects: [
        {
            name: 'pipeline',
            use: {
                headless: true,
                viewport: {width: 1920, height: 1080}
            },
        },
        {
            name: 'local',
            use: {
                headless: false,
                viewport: null,
                launchOptions: {
                    args: ["--start-maximized"]
                },
            },
        }
    ]
}

export default config;