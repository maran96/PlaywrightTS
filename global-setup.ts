import {FullConfig} from '@playwright/test';
import {InitializeBrowser} from "./services/InitializeBrowser";
import {LoginPage} from "./pageObjects/LoginPage";
import * as assert from "assert";
import {NavUtils} from "./services/NavUtils";

async function globalSetup(config: FullConfig) {
    const maxTries = 3;
    for (let i = 0; i <= maxTries; i++) {
        try {
            const {baseURL, storageState} = config.projects[0].use;
            const page = await InitializeBrowser.getPage();
            const loginPage = new LoginPage(page);
            const navUtils = new NavUtils(page);
            await loginPage.login();
            await loginPage.waitForLandingPage();
            await navUtils.navigateToRHSItems('Profile');
            await page.waitForLoadState("load");
            await page.context().storageState({path: storageState as string});
            await page.close();
            break;
        } catch (e) {
            console.log("Exception in global Setup page.Retrying attempt: " + i + " " + e.toString());
            if (i == maxTries) {
                console.log("Max Attempt reached for re-trying the login through global setup. Therefore Terminating the job");
                assert.fail("Unable to login through global-setup" + e.toString());
            }
        }
    }
}

export default globalSetup;