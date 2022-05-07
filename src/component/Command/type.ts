export interface ClickCommand {
	type: "click";
	selector: string;
}

export interface ReplacePageCommand {
	type: "replacePage";
	href: string;
}

export interface DelayCommand {
	type: "delay";
	seconds: number;
}

export interface InputCommand {
	type: "input";
	selector: string;
	value: string;
}

export type CommandData =
	| ClickCommand
	| ReplacePageCommand
	| DelayCommand
	| InputCommand;

export type CommandType = CommandData["type"];

export interface CommandGroupData {
	commands: CommandData[];
	createdAt: number;
	id: string;
	lastEditedAt?: number;
	startUrl: string;
	title: string;
}
