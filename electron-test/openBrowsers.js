const { chromium } = require("playwright");

async function main() {
	const browser = await chromium.launch({
		headless: false,
	});
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto("https://watcha.com");
}

main();
