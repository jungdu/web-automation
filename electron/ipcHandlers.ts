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
			console.log("startUrl :", startUrl);
			const browser = await chromium.launch({
				headless: false,
			});
			const context = await browser.newContext();
			page = await context.newPage();
			await page.goto(startUrl);
		}
	);

	addIpcMainHandler<ClickElementMessage>(
		"clickElement",
		async (e, { selector }) => {
			await page.click(selector);
		}
	);

	addIpcMainHandler<TypeKeyboardMessage>(
		"typeKeyboardMessage",
		async (e, { text }) => {
			await page.keyboard.type(text, { delay: 100 });
		}
	);
}
