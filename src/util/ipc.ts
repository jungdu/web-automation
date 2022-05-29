import { getCloseBrowserEventName } from "../../common/eventName";
import {
	ClickElementMessage,
	IpcMessage,
	OpenBrowserMessage,
	ReplacePageMessage,
	TypeKeyboardMessage,
} from "../../common/ipcType";

const ipcRenderer = window.ipcRenderer;

export async function openBrowser(onClose?: () => void) {
	const { id } = await invoke<OpenBrowserMessage>("openBrowser", null);

	if (onClose) {
		ipcRenderer.once(getCloseBrowserEventName(id), onClose);
	}

	return { id };
}

export async function clickElement(browserId: string, selector: string) {
	return await invoke<ClickElementMessage>("clickElement", {
		browserId,
		selector,
	});
}

export async function typeKeyboard(browserId: string, text: string) {
	return await invoke<TypeKeyboardMessage>("typeKeyboardMessage", {
		browserId,
		text,
	});
}

export async function replacePage(browserId: string, url: string) {
	return await invoke<ReplacePageMessage>("replacePageMessage", {
		browserId,
		url,
	});
}

async function invoke<T extends IpcMessage>(
	type: T["type"],
	param: T["param"]
): Promise<T["return"]> {
	return await ipcRenderer.invoke(type, param);
}
