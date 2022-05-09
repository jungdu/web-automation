import { ipcMain, IpcMainInvokeEvent } from "electron";
import {
	ClickElementMessage,
	IpcMessage,
	OpenBrowserMessage,
	TypeKeyboardMessage,
} from "../common/ipcType";
import { browserCtrl } from "./BrowserCtrl";
import { mainWindowCtrl } from "./MainWindowCtrl";

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
	addIpcMainHandler<OpenBrowserMessage>(
		"openBrowser",
		async (e, { startUrl }) => {
			const mainWindow = mainWindowCtrl.getMainWindow();
			mainWindow.webContents.send("ssibal");
			const browserId = await browserCtrl.createBrowser(startUrl);
			return {
				id: browserId,
			};
		}
	);

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
}
