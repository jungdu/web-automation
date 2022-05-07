import React, { createContext, useReducer } from "react";
import { CommandData, CommandType } from "../component/Command/type";
import produce from "immer";

export type CommandState = {
	commands: CommandData[];
	currentCommandGroupId: string | null;
	pageConnected: boolean;
	startUrl: string;
};
interface CreateCommandAction {
	type: "CreateCommandData";
}

interface ChangeCommandAction {
	type: "ChangeCommand";
	index: number;
	newCommandData: CommandData;
}

interface ChangeCommandTypeAction {
	type: "ChangeCommandType";
	index: number;
	newCommandType: CommandType;
}

interface DeleteCommandAction {
	type: "DeleteCommand";
	index: number;
}

interface InitCommandAction {
	type: "InitCommand";
	commandState: CommandState;
}

interface SetStartUrlAction {
	type: "SetStartUrl";
	startUrl: string;
}

interface SetPageConnectedAction {
	type: "SetPageConnected";
	pageConnected: boolean;
}

type CommandAction =
	| CreateCommandAction
	| ChangeCommandAction
	| ChangeCommandTypeAction
	| DeleteCommandAction
	| InitCommandAction
	| SetStartUrlAction
	| SetPageConnectedAction;

function getDefaultCommand(type: CommandType): CommandData {
	switch (type) {
		case "click":
			return {
				type: "click",
				selector: "",
			};
		case "replacePage":
			return {
				type: "replacePage",
				href: "",
			};
		case "delay":
			return {
				type: "delay",
				seconds: 1,
			};
		case "input":
			return {
				type: "input",
				selector: "",
				value: "",
			};
		default:
			throw new Error("Invalid command type");
	}
}

const initialCommandData: CommandState = {
	pageConnected: false,
	startUrl: "",
	currentCommandGroupId: null,
	commands: [
		{
			type: "click",
			selector: "#plus-btn",
		},
	],
};

function commandReducer(
	state: CommandState,
	action: CommandAction
): CommandState {
	switch (action.type) {
		case "CreateCommandData":
			return produce(state, (draft) => {
				draft.commands = [...state.commands, { type: "click", selector: "" }];
			});
		case "ChangeCommand":
			return produce(state, (draft) => {
				draft.commands[action.index] = action.newCommandData;
			});
		case "ChangeCommandType":
			return produce(state, (draft) => {
				draft.commands[action.index] = getDefaultCommand(action.newCommandType);
			});
		case "DeleteCommand":
			return produce(state, (draft) => {
				draft.commands = state.commands.filter(
					(_, idx) => idx !== action.index
				);
			});
		case "InitCommand":
			return action.commandState;
		case "SetStartUrl":
			return produce(state, (draft) => {
				draft.startUrl = action.startUrl;
			});
		case "SetPageConnected":
			return produce(state, (draft) => {
				draft.pageConnected = action.pageConnected;
			});
		default:
			// @ts-expect-error
			throw new Error(`Invalid type of action ${action.type}`);
	}
}

export const commandContext = createContext<{
	commandsState: CommandState;
	dispatch: React.Dispatch<CommandAction>;
} | null>(null);

export const CommandContextProvider: React.FC<{ children: JSX.Element }> = ({
	children,
}) => {
	const [commands, dispatch] = useReducer(commandReducer, initialCommandData);
	return (
		<commandContext.Provider
			value={{
				commandsState: commands,
				dispatch,
			}}
		>
			{children}
		</commandContext.Provider>
	);
};