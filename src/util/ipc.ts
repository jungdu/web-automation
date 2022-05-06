const ipcRenderer = window.ipcRenderer;

export function openBrowser() {
	ipcRenderer.invoke("");
}
