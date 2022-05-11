import produce from "immer";
import { createContext, useReducer } from "react";
import { CommandGroupData, ParameterData } from "../component/Command/type";

export type CommandGroupState = CommandGroupData[];

interface CreateCommandGroupAction {
	type: "CreateCommandGroup";
	commandGroupData: CommandGroupData;
}

interface DeleteCommandGroupAction {
	type: "DeleteCommandGroup";
	id: string;
}

interface InitCommandGroupsAction {
	type: "InitCommandGroups";
	commandGroupState: CommandGroupState;
}

interface UpdateCommandGroupAction {
	type: "UpdateCommandGroups";
	startUrl: string;
	commandGroupId: string;
	commands: CommandGroupData["commands"];
	parameters: ParameterData[];
	lastEditedAt: CommandGroupData["lastEditedAt"];
}

type CommandGroupAction =
	| CreateCommandGroupAction
	| DeleteCommandGroupAction
	| InitCommandGroupsAction
	| UpdateCommandGroupAction;

function commandGroupReducer(
	state: CommandGroupState,
	action: CommandGroupAction
) {
	switch (action.type) {
		case "CreateCommandGroup":
			return [...state, action.commandGroupData];
		case "DeleteCommandGroup":
			return state.filter((commandGroup) => commandGroup.id !== action.id);
		case "InitCommandGroups":
			return action.commandGroupState;
		case "UpdateCommandGroups":
			const groupIndex = state.findIndex(
				(group) => group.id === action.commandGroupId
			);
			return produce(state, (draft) => {
				draft[groupIndex].parameters = action.parameters;
				draft[groupIndex].commands = action.commands;
				draft[groupIndex].lastEditedAt = action.lastEditedAt;
				draft[groupIndex].startUrl = action.startUrl;
			});
		default:
			return state;
	}
}

export const commandGroupContext = createContext<{
	commandGroups: CommandGroupState;
	dispatch: React.Dispatch<CommandGroupAction>;
} | null>(null);

export const CommandContextGroupProvider: React.FC<{
	children: JSX.Element;
}> = ({ children }) => {
	const [commandGroups, dispatch] = useReducer(commandGroupReducer, []);

	return (
		<commandGroupContext.Provider
			value={{
				commandGroups,
				dispatch,
			}}
		>
			{children}
		</commandGroupContext.Provider>
	);
};
