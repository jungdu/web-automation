import { CommandData, CommandGroupData } from "../component/Command/type";
import { clickElement, openBrowser, typeKeyboard } from "./ipc";

export async function executeCommand(command: CommandData) {
	switch (command.type) {
		case "delay":
			await delay(command.seconds);
			return true;
		case "click":
			await clickElement(command.selector);
			return true;
		case "input":
			await clickElement(command.selector);
			await typeKeyboard(command.value);
			return true;
		default:
			return false;
	}
	// TODO
}

export async function executeCommands(
	commands: CommandData[],
	repeatCount: number
) {
	for (const idx of new Array(repeatCount).fill(0)) {
		for (const command of commands) {
			await executeCommand(command);
		}
	}
}

function delay(seconds: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, seconds * 1000);
	});
}

export async function runCommandGroup(
	startUrl: string,
	commands: CommandData[],
	repeatCount: number = 1
) {
	await openBrowser(startUrl);
	await executeCommands(commands, repeatCount);
}

export function serializeCommandGroupData(
	commandGroupData: CommandGroupData
): string {
	const { commands, startUrl, title } = commandGroupData;
	return JSON.stringify(
		{
			startUrl,
			title,
			commands,
		},
		null,
		2
	);
}

export function deserializeCommandGroupData(
	data: string
): Pick<CommandGroupData, "startUrl" | "title" | "commands"> {
	return JSON.parse(data);
}
