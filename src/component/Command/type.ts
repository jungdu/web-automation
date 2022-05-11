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

interface CheckBoxParameter {
	type: "checkbox";
}

interface SelectorParameter {
	type: "selector";
	options: string[];
}

interface PasswordParameter {
	type: "password";
}

interface TextParameter {
	type: "text";
}

export type ParamInputInfo =
	| CheckBoxParameter
	| SelectorParameter
	| TextParameter
	| PasswordParameter;

export interface ParameterData {
	key: string;
	value: string;
	inputInfo: ParamInputInfo;
}

export interface CommandGroupData {
	commands: CommandData[];
	createdAt: number;
	id: string;
	lastEditedAt?: number;
	parameters: ParameterData[];
	startUrl: string;
	title: string;
}
