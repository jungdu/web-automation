import React, { createContext, useReducer } from "react";
import {
	CommandData,
	CommandType,
	ParameterData,
	ParamInputInfo,
} from "../component/Command/type";
import produce from "immer";

export type CommandState = {
	commands: CommandData[];
	parameters: ParameterData[];
	currentCommandGroupId: string | null;
	connectedBrowserId: string | null;
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

interface SetConnectedBrowserIdAction {
	type: "SetConnectedBrowserId";
	connectedBrowserId: string | null;
}

interface MoveCommandItemAction {
	type: "MoveCommandItem";
	from: number;
	to: number;
}

interface InsertCommandItemAction {
	type: "InsertCommandItem";
	index: number;
}

interface CreateParameterAction {
	type: "CreateParameter";
	parameterData: ParameterData;
}

interface DeleteParameterAction {
	type: "DeleteParameter";
	index: number;
}

interface UpdateParameterAction {
	type: "UpdateParameter";
	index: number;
	parameterData: ParameterData;
}

interface ChangeParameterAction {
	type: "ChangeParameter";
	index: number;
	parameterData: Pick<ParameterData, "key" | "value">;
}

type CommandAction =
	| CreateCommandAction
	| ChangeCommandAction
	| ChangeCommandTypeAction
	| DeleteCommandAction
	| InitCommandAction
	| SetStartUrlAction
	| SetConnectedBrowserIdAction
	| MoveCommandItemAction
	| InsertCommandItemAction
	| CreateParameterAction
	| DeleteParameterAction
	| UpdateParameterAction
	| ChangeParameterAction;

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
	connectedBrowserId: null,
	commands: [
		{
			type: "click",
			selector: "#plus-btn",
		},
	],
	currentCommandGroupId: null,
	parameters: [],
	startUrl: "",
};

const defaultCommandItem: CommandData = { type: "click", selector: "" };

function commandReducer(
	state: CommandState,
	action: CommandAction
): CommandState {
	console.log("action.type :", action.type);
	console.log("state :", state);
	switch (action.type) {
		case "CreateCommandData":
			return produce(state, (draft) => {
				draft.commands = [...state.commands, { ...defaultCommandItem }];
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
		case "SetConnectedBrowserId":
			return produce(state, (draft) => {
				draft.connectedBrowserId = action.connectedBrowserId;
			});
		case "MoveCommandItem":
			return produce(state, (draft) => {
				const { commands } = state;
				const item = commands[action.from];
				const filtered = commands.filter((_, idx) => idx !== action.from);
				filtered.splice(action.to, 0, item);
				draft.commands = filtered;
			});
		case "InsertCommandItem":
			return produce(state, (draft) => {
				draft.commands.splice(action.index, 0, { ...defaultCommandItem });
			});
		case "CreateParameter":
			return produce(state, (draft) => {
				draft.parameters = [...state.parameters, action.parameterData];
			});
		case "DeleteParameter":
			return produce(state, (draft) => {
				draft.parameters = state.parameters.filter(
					(_, idx) => idx !== action.index
				);
			});
		case "UpdateParameter":
			return produce(state, (draft) => {
				draft.parameters[action.index] = action.parameterData;
			});
		case "ChangeParameter":
			return produce(state, (draft) => {
				draft.parameters[action.index].key = action.parameterData.key;
				draft.parameters[action.index].value = action.parameterData.value;
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
