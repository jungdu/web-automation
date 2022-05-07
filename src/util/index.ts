import { CommandData } from "../component/Command/type";
import { clickElement, typeKeyboard } from "./ipc";

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
