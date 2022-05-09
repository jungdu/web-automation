import { CommandData, CommandGroupData } from "../component/Command/type";
import { clickElement, openBrowser, typeKeyboard } from "./ipc";

export async function executeCommand(browserId: string, command: CommandData) {
	switch (command.type) {
		case "delay":
			await delay(command.seconds);
			return true;
		case "click":
			await clickElement(browserId, command.selector);
			return true;
		case "input":
			await clickElement(browserId, command.selector);
			await typeKeyboard(browserId, command.value);
			return true;
		default:
			return false;
	}
	// TODO
}

export async function executeCommands(
	browserId: string,
	commands: CommandData[],
	repeatCount: number = 1,
	callbacks?: {
		onCommandItemSuccess?: (repeatIdx: number, commandIdx: number) => void;
	}
) {
	for (const repeatIdx of new Array(repeatCount).fill(0).map((_, i) => i)) {
		for (const [itemIdx, command] of commands.entries()) {
			await executeCommand(browserId, command);
			callbacks &&
				callbacks.onCommandItemSuccess &&
				callbacks.onCommandItemSuccess(repeatIdx, itemIdx);
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
	const { id } = await openBrowser(startUrl);
	await executeCommands(id, commands, repeatCount);
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
