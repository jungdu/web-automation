import produce from "immer";
import React, { createContext, useReducer } from "react";
import { CommandData } from "../component/Command/type";

interface ConnectBrowserAction {
	type: "ConnectBrowser";
	payload: {
		browserId: string;
	};
}

interface DisconnectBrowserAction {
	type: "DisconnectBrowser";
}
interface StartCommandAction {
	type: "StartCommand";
	payload: {
		commands: CommandData[];
		browserId?: string;
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

interface StopProgressAction {
	type: "StopProgress";
}

type CommandProgressAction =
	| StartCommandAction
	| FailedCommandAction
	| UpdateProgressAction
	| SuccessProgressAction
	| ConnectBrowserAction
	| DisconnectBrowserAction
	| StopProgressAction;

export interface CommandProgressState {
	connectedBrowserId: string | null;
	commands: CommandData[];
	failed: boolean;
	progress: number;
	running: boolean;
}

const initialCommandProgressState: CommandProgressState = {
	connectedBrowserId: null,
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
			return produce(state, (draft) => {
				if (action.payload.browserId) {
					draft.connectedBrowserId = action.payload.browserId;
				}
				draft.failed = false;
				draft.commands = action.payload.commands;
				draft.progress = 0;
				draft.running = true;
			});
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
		case "StopProgress":
			return produce(state, (draft) => {
				draft.running = false;
			});
		case "ConnectBrowser":
			return {
				...initialCommandProgressState,
				connectedBrowserId: action.payload.browserId,
			};
		case "DisconnectBrowser":
			return {
				...initialCommandProgressState,
			};
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
