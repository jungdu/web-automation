import { nanoid } from "nanoid";
import { chromium, Browser, Page } from "playwright";
import { mainWindowCtrl } from "./MainWindowCtrl";
import { getCloseBrowserEventName } from "../common/eventName";

interface BrowserInfo {
	id: string;
	browser: Browser;
	page: Page;
}

class BrowserCtrl {
	browsers: BrowserInfo[] = [];

	private addBrowserInfo(browserInfo: BrowserInfo) {
		this.browsers.push(browserInfo);
	}

	private deleteBrowserInfo(browserId: string) {
		this.browsers = this.browsers.filter((browser) => browser.id !== browserId);
	}

	private getBrowserInfo(id: string): BrowserInfo {
		const browserInfo = this.browsers.find((browser) => browser.id === id);
		if (!browserInfo) {
			throw new Error("No browserInfo to find");
		}

		return browserInfo;
	}

	async createBrowser(startUrl: string, onClose?: () => void) {
		const browserId = nanoid();

		const browser = await chromium.launch({
			channel: "chrome",
			headless: false,
		});

		const page = await browser.newPage();

		this.addBrowserInfo({
			id: browserId,
			browser,
			page,
		});

		page.on("close", () => {
			if (onClose) {
				onClose();
			}

			mainWindowCtrl
				.getMainWindowContents()
				.send(getCloseBrowserEventName(browserId));

			browser.close();

			this.deleteBrowserInfo(browserId);
		});

		try {
			await page.goto(startUrl);
		} catch (e) {
			browser.close();
			throw new Error("Invalid startUrl");
		}

		return browserId;
	}

	getPage(id: string) {
		return this.getBrowserInfo(id).page;
	}
}

export const browserCtrl = new BrowserCtrl();
