import {chromium} from "@playwright/test";

export let config = {
    role:               "admin",
    app:                "fb",
    assessmentAccess:   false,
    browserName :       chromium,
    sleep: {
        short:          1000,
        medium:         3000,
        long:           5000
    },
    timeouts: {
        actionBtn:      3000,
        screenShot:     4000,
        pageLoad:       120000
    }
};
