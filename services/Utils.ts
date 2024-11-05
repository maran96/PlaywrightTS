import {expect, Locator, Page} from "@playwright/test";
import * as Console from "console";
import * as assert from "assert";
import * as app from "../app";

export class Utils {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    async takeAndVerifyScreenshot(name: string) {
        try {
            expect(await this.page.screenshot()).toMatchSnapshot(name + '.png');
        } catch (e) {
            Console.log("Exception in taking Screenshot of a chart: " + e.toString());
            assert.fail('Chart Comparison Failed');
        }
    }

    /**
     * To print all the error logs on console appears while execution.
     */
    async printConsoleErrorLogs() {
        this.page.on('console', msg => {
                if (msg.type() === 'error')
                    console.log(`Error text: "${msg.text()}"`);
            }
        );
    }
}

