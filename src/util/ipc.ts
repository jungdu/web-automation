import {
	ClickElementMessage,
	IpcMessage,
	OpenBrowserMessage,
	TypeKeyboardMessage,
} from "../../common/ipcType";

const ipcRenderer = window.ipcRenderer;

export async function openBrowser(startUrl: string) {
	return await invoke<OpenBrowserMessage>("openBrowser", { startUrl });
}

export async function clickElement(selector: string) {
	return await invoke<ClickElementMessage>("clickElement", { selector });
}

export async function typeKeyboard(text: string) {
	return await invoke<TypeKeyboardMessage>("typeKeyboardMessage", { text });
}

async function invoke<T extends IpcMessage>(
	type: T["type"],
	param: T["param"]
): Promise<T["return"]> {
	return await ipcRenderer.invoke(type, param);
}
