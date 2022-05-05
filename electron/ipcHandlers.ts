import { ipcMain } from "electron";
import { chromium, Page } from "playwright";

export function addIpcHandlers() {
	let page: null | Page;

	ipcMain.handle("openBrowser", async () => {
		const browser = await chromium.launch({
			headless: false,
		});
		const context = await browser.newContext();
		page = await context.newPage();
		await page.goto("https://google.com");
	});
}
