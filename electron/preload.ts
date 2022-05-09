import { contextBridge } from "electron";

const ipcRenderer = require("electron").ipcRenderer;
contextBridge.exposeInMainWorld("ipcRenderer", {
	...ipcRenderer,
	on: (
		channel: string,
		fn: (event: Electron.IpcRendererEvent, ...args: any[]) => void
	) => {
		ipcRenderer.on(channel, fn);
	},
	once: (
		channel: string,
		fn: (event: Electron.IpcRendererEvent, ...args: any[]) => void
	) => {
		ipcRenderer.once(channel, fn);
	},
});
