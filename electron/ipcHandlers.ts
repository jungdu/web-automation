import { ipcMain, IpcMainInvokeEvent } from "electron";
import { chromium, Page } from "playwright";
import {
	ClickElementMessage,
	IpcMessage,
	OpenBrowserMessage,
	TypeKeyboardMessage,
} from "../common/ipcType";

function addIpcMainHandler<T extends IpcMessage>(
	type: T["type"],
	handler: (event: IpcMainInvokeEvent, param: T["param"]) => T["return"]
) {
	ipcMain.handle(type, handler);
}

export function addIpcHandlers() {
	let page: null | Page;

	addIpcMainHandler<OpenBrowserMessage>(
		"openBrowser",
		async (e, { startUrl }) => {
			const browser = await chromium.launch({
				headless: false,
			});
			const context = await browser.newContext();
			page = await context.newPage();

			try {
				await page.goto(startUrl);
			} catch (e) {
				browser.close();
				throw new Error("Invalid startUrl");
			}
		}
	);

	addIpcMainHandler<ClickElementMessage>(
		"clickElement",
		async (e, { selector }) => {
			await page.click(selector, {
				timeout: 10000,
			});
		}
	);

	addIpcMainHandler<TypeKeyboardMessage>(
		"typeKeyboardMessage",
		async (e, { text }) => {
			await page.keyboard.type(text, { delay: 100 });
		}
	);
}
