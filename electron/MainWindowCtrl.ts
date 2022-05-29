import { app, BrowserWindow } from "electron";
import * as path from "path";

function isDev() {
	return process.env.NODE_ENV === "development";
}

class MainWindowCtrl {
	mainWindow: null | BrowserWindow = null;
	closed = false;

	createWindow() {
		const window = new BrowserWindow({
			height: 1000,
			width: isDev() ? 1920 : 800,
			webPreferences: {
				nodeIntegration: true,
				preload: path.join(__dirname, "preload.js"),
			},
		});

		console.log("process.env.NODE_ENV", process.env.NODE_ENV);
		if (isDev()) {
			window.loadURL("http://localhost:3000/");
			window.webContents.openDevTools();
		} else {
			window.loadFile(path.join(__dirname, "../client/index.html"));
		}

		window.on("closed", () => {
			this.closed = true;
		});

		this.closed = false;
		this.mainWindow = window;
	}

	getMainWindow() {
		if (!this.mainWindow) {
			throw new Error("Requires mainWindow");
		}
		return this.mainWindow;
	}

	getMainWindowContents() {
		return this.getMainWindow().webContents;
	}
}

export const mainWindowCtrl = new MainWindowCtrl();
