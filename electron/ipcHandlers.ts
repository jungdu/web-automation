import { ipcMain, IpcMainInvokeEvent } from "electron";
import {
	ClickElementMessage,
	IpcMessage,
	OpenBrowserMessage,
	TypeKeyboardMessage,
	ReplacePageMessage,
} from "../common/ipcType";
import { browserCtrl } from "./BrowserCtrl";

function addIpcMainHandler<T extends IpcMessage>(
	type: T["type"],
	handler: (
		event: IpcMainInvokeEvent,
		param: T["param"]
	) => Promise<T["return"]>
) {
	ipcMain.handle(type, handler);
}

export function addIpcHandlers() {
	addIpcMainHandler<OpenBrowserMessage>("openBrowser", async (e) => {
		const browserId = await browserCtrl.createBrowser();
		return {
			id: browserId,
		};
	});

	addIpcMainHandler<ClickElementMessage>(
		"clickElement",
		async (e, { browserId, selector }) => {
			const page = browserCtrl.getPage(browserId);
			await page.click(selector, {
				timeout: 10000,
			});
		}
	);

	addIpcMainHandler<TypeKeyboardMessage>(
		"typeKeyboardMessage",
		async (e, { browserId, text }) => {
			const page = browserCtrl.getPage(browserId);
			await page.keyboard.type(text, { delay: 100 });
		}
	);

	addIpcMainHandler<ReplacePageMessage>(
		"replacePageMessage",
		async (e, { browserId, url }) => {
			const page = browserCtrl.getPage(browserId);
			await page.goto(url);
		}
	);
}
