import produce from "immer";
import React, { createContext, useReducer } from "react";
import { CommandData } from "../component/Command/type";

interface StartCommandAction {
	type: "StartCommand";
	payload: {
		commands: CommandData[];
	};
}

interface FailedCommandAction {
	type: "FailedCommand";
}

interface UpdateProgressAction {
	type: "UpdateProgress";
	payload: {
		successItemIdx: number;
	};
}

interface SuccessProgressAction {
	type: "SuccessProgress";
}

type CommandProgressAction =
	| StartCommandAction
	| FailedCommandAction
	| UpdateProgressAction
	| SuccessProgressAction;

export interface CommandProgressState {
	commands: CommandData[];
	failed: boolean;
	progress: number;
	running: boolean;
}

const initialCommandProgressState: CommandProgressState = {
	running: false,
	failed: false,
	progress: 0,
	commands: [],
};

function commandProgressReducer(
	state: CommandProgressState,
	action: CommandProgressAction
) {
	switch (action.type) {
		case "StartCommand":
			return {
				commands: action.payload.commands,
				failed: false,
				progress: 0,
				running: true,
			};
		case "FailedCommand":
			return produce(state, (draft) => {
				draft.failed = true;
				draft.running = false;
			});
		case "UpdateProgress":
			return produce(state, (draft) => {
				draft.progress =
					((action.payload.successItemIdx + 1) / state.commands.length) * 100;
			});
		case "SuccessProgress":
			return produce(state, (draft) => {
				draft.running = false;
			});
		default:
			// @ts-expect-error
			throw new Error(`Invalid type of action ${action.type}`);
	}
}

export const commandProgressContext = createContext<{
	commandProgress: CommandProgressState;
	dispatch: React.Dispatch<CommandProgressAction>;
} | null>(null);

export const CommandProgressProvider: React.FC<{
	children: JSX.Element;
}> = ({ children }) => {
	const [commandProgress, dispatch] = useReducer(
		commandProgressReducer,
		initialCommandProgressState
	);

	return (
		<commandProgressContext.Provider
			value={{
				commandProgress,
				dispatch,
			}}
		>
			{children}
		</commandProgressContext.Provider>
	);
};
