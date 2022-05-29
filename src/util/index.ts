import {
	CommandData,
	CommandGroupData,
	ParameterData,
} from "../component/Command/type";
import { clickElement, openBrowser, replacePage, typeKeyboard } from "./ipc";

function applyParameter(
	command: CommandData,
	parameters: ParameterData[]
): CommandData {
	// TODO 불안정함. 에러날 확률 높으므로 개선 필요
	const commandStr = parameters.reduce((prev, cur) => {
		return prev.replaceAll(cur.key, cur.value);
	}, JSON.stringify(command));

	return JSON.parse(commandStr) as CommandData;
}

export async function executeCommand(
	browserId: string,
	origCommand: CommandData,
	parameters: ParameterData[] | null
) {
	const command = parameters
		? applyParameter(origCommand, parameters)
		: origCommand;

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
		case "replacePage":
			await replacePage(browserId, command.href);
			return true;
		default:
			return false;
	}
	// TODO
}

function delay(seconds: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, seconds * 1000);
	});
}

export function serializeCommandGroupData(
	commandGroupData: CommandGroupData
): string {
	const { commands, startUrl, title, parameters } = commandGroupData;
	return JSON.stringify(
		{
			startUrl,
			title,
			commands,
			parameters,
		},
		null,
		2
	);
}

export function deserializeCommandGroupData(data: string): Pick<
	CommandGroupData,
	"startUrl" | "title" | "commands"
> & {
	parameters?: ParameterData[];
} {
	return JSON.parse(data);
}

export function debounce<T extends any[]>(
	func: (...args: T) => void,
	timeout: number
): (...args: T) => void {
	let timer: NodeJS.Timeout;
	return (...args: T) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func(...args);
		}, timeout);
	};
}
