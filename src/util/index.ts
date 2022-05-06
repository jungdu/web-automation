import { CommandData } from "../component/Command/type";

export async function executeCommand(command: CommandData) {
	if (command.type === "delay") {
		await delay(command.seconds);
		return true;
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
