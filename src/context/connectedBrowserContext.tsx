import produce from "immer";
import { createContext, useReducer } from "react";

interface ConnectedBrowserState {
	browserId: string | null;
	running: boolean;
}

interface ConnectBrowserAction {
	type: "ConnectBrowser";
	browserId: string;
}

interface DisconnectBrowserAction {
	type: "DisconnectBrowser";
}

interface ChangeRunningStateAction {
	type: "ChangeRunningState";
	running: boolean;
}

type ConnectedBrowserAction =
	| ConnectBrowserAction
	| DisconnectBrowserAction
	| ChangeRunningStateAction;

function connectedBrowserReducer(
	state: ConnectedBrowserState,
	action: ConnectedBrowserAction
) {
	switch (action.type) {
		case "ConnectBrowser":
			return {
				browserId: action.browserId,
				running: false,
			};
		case "DisconnectBrowser":
			return {
				browserId: null,
				running: false,
			};
		case "ChangeRunningState":
			return produce(state, (draft) => {
				draft.running = action.running;
			});
		default:
			// @ts-expect-error
			throw new Error(`Invalid type of action ${action.type}`);
	}
}

const initialConnectedBrowserState: ConnectedBrowserState = {
	browserId: null,
	running: false,
};

export const connectedBrowserContext = createContext<{
	connectedBrowserState: ConnectedBrowserState;
	dispatch: React.Dispatch<ConnectedBrowserAction>;
} | null>(null);

export const ConnectedBrowserContextProvider: React.FC<{
	children: JSX.Element;
}> = ({ children }) => {
	const [connectedBrowserState, dispatch] = useReducer(
		connectedBrowserReducer,
		initialConnectedBrowserState
	);

	return (
		<connectedBrowserContext.Provider
			value={{ connectedBrowserState, dispatch }}
		>
			{children}
		</connectedBrowserContext.Provider>
	);
};
