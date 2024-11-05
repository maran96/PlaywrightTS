import {Page, test} from '@playwright/test'
import {InitializeBrowser} from "../services/InitializeBrowser";
import * as app from '../app';
import {LoginPage} from "../pageObjects/LoginPage";
import {Utils} from "../services/Utils";
import {NavUtils} from "../services/NavUtils";

test.describe('Login Test', () => {

    let page: Page;
    let utils: Utils;
    let loginPage: LoginPage;
    let navUtils: NavUtils;


    test.beforeAll(async () => {
        page = await InitializeBrowser.getPage();
        loginPage = new LoginPage(page);
        await loginPage.navigateToApp();
        utils = new Utils(page)
        navUtils = new NavUtils(page);
    })

    /**
     * Verify the user is directed to correct page after login is successfull through global setup
     */
    let specId_0 = "fb_login_0";
    test(specId_0, async () => {
        await navUtils.navigateToRHSItems('Profile');
        await page.waitForTimeout(app.config.sleep.medium)
        await utils.takeAndVerifyScreenshot(specId_0 + "Profile_Screenshots")
    })

    test.beforeEach(async () => {
        await utils.printConsoleErrorLogs();
    })
});