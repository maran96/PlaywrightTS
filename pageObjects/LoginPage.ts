import {Locator, Page} from "@playwright/test";
import * as app from '../app';
import * as assert from "assert";
import config from "../config";
import {env} from 'process';

export class LoginPage {

    readonly homePage: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly clickLogIn: Locator;
    readonly passExpired: Locator;

    constructor(homePage: Page) {
        this.homePage = homePage;
        this.username = homePage.locator('input[name="email"]');
        this.password = homePage.locator('input[name="pass"]');
        this.clickLogIn = homePage.locator('._6ltg >> button');
        this.passExpired = homePage.locator('#callback_2');
    }

    async login() {
        try {
            await this.homePage.goto(config.use.baseURL, {
                timeout: app.config.timeouts.pageLoad,
                waitUntil: "load"
            });
            await this.enterUsernameAndPassword();
        } catch (e) {
            console.log("Exception in login to app " + e.toString());
            assert.fail("Unable to Login into app " + e.toString());
        }
    }

    async enterUsernameAndPassword() {
        try {
            await this.username.type(env.WEB_APP_USER);
            await this.password.type(env.WEB_APP_PASS);
            await this.clickLogIn.click();
        } catch (e) {
            console.log("Exception in entering username and password " + e.toString());
            assert.fail("Unable to enter username and password " + e.toString());
        }
    }

    async waitForLandingPage() {
        try {
            let timeout = app.config.timeouts.pageLoad;
            while (timeout > 0) {
                if (!(this.homePage.url().includes(config.use.baseURL))) {
                    await this.homePage.waitForTimeout(app.config.sleep.short);
                    timeout = timeout - app.config.sleep.short;
                } else {
                    break;
                }
                if (timeout === 0) {
                    console.log("Application not loaded: ");
                }
            }
        } catch (e) {
            console.log("Exception in waiting for landing page: " + e.toString());
            assert.fail("Application not loaded: " + e.toString());
        }
    }

    // by using skip login method , we can use this method for login
    async navigateToApp() {
        try {
            await this.homePage.goto(config.use.baseURL, {
                timeout: app.config.timeouts.pageLoad,
                waitUntil: "load"
            });
            await this.waitForLandingPage();
        } catch (e) {
            console.log("Exception in navigating to app : " + e.toString());
            assert.fail(" url is not loaded : " + e.toString());
        }
    }

    async verifyLoginStatus() {
        try {
            if (await this.passExpired.isEnabled()) {
                console.log("Login was unsuccessful");
                return await this.passExpired.innerText();
            }
        } catch (e) {
            console.log("Login was successful");
            return "null";
        }
        return "null";
    }
}



