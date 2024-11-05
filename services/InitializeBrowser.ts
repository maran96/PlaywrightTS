import {Browser, BrowserContext, Page} from "@playwright/test";
import * as app from "../app";
import * as assert from "assert";

export class InitializeBrowser {

    static browser: Browser;
    static context: BrowserContext;
    static page: Page;

  /**
   * setup and launch the browser before performing test execution
   */
    static async getPage() {
        try {
            await this.closeBrowserIfOpen();
            this.browser = await app.config.browserName.launch();
            this.context = await this.browser.newContext();
            this.page = await this.context.newPage();
            return this.page;
        } catch (e) {
            console.log("Exception in Initializing browser " + e.toString());
            assert.fail("Unable to Initialize browser " + e.toString());
        }
    }

    /**
     * Method to close existing browser session
     */
    static async closeBrowserIfOpen() {
        try {
            if (this.page != null) {
                await this.page.close();
            }
        } catch (e) {
            console.log("Exception in closing browser " + e.toString());
            assert.fail("Unable to close browser " + e.toString());
        }
    }
}

