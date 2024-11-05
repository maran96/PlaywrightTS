import {Page, test} from '@playwright/test'
import {InitializeBrowser} from "../services/InitializeBrowser";
import * as app from '../app';
import {LoginPage} from "../pageObjects/LoginPage";
import {Utils} from "../services/Utils";
import {NavUtils} from "../services/NavUtils";

test.describe('NavBar Test', () => {

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
     * Verify the navbar contains the matching list
     */
    let specId_0 = "fb_navbar_0";
    test(specId_0, async () => {
        let optionsToBeValidated = ['Home',
            'Watch',
            'Marketplace',
            'Groups',
            'Gaming'
        ];
        await navUtils.getHeaderNavBarList(optionsToBeValidated);

    })

    test.beforeEach(async () => {
        await utils.printConsoleErrorLogs();
    })
});