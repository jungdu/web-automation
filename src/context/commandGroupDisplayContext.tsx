import produce from "immer";
import { createContext, useReducer } from "react";

export type OrderBy =
	| "createdAtAsc"
	| "createdAtDesc"
	| "titleAsc"
	| "titleDesc"
	| null;

interface CommandGroupDisplayState {
	searchWord: string;
	orderBy: OrderBy;
}

const initialState: CommandGroupDisplayState = {
	searchWord: "",
	orderBy: "createdAtAsc",
};

interface InitDisplayConditionAction {
	type: "InitDisplayCondition";
}

interface SetSearchWordAction {
	type: "SetSearchWord";
	searchWord: string;
}

interface SetOrderByAction {
	type: "SetOrderBy";
	orderBy: OrderBy;
}

type CommandGroupDisplayAction =
	| InitDisplayConditionAction
	| SetSearchWordAction
	| SetOrderByAction;

function commandGroupDisplayReducer(
	state: CommandGroupDisplayState,
	action: CommandGroupDisplayAction
) {
	switch (action.type) {
		case "InitDisplayCondition":
			return {
				...initialState,
			};
		case "SetSearchWord":
			return produce(state, (draft) => {
				draft.searchWord = action.searchWord;
			});
		case "SetOrderBy":
			return produce(state, (draft) => {
				draft.orderBy = action.orderBy;
			});
		default:
			// @ts-expect-error
			throw new Error(`Invalid type of action ${action.type}`);
	}
}

export const commandGroupDisplayContext = createContext<{
	commandGroupDisplayState: CommandGroupDisplayState;
	dispatch: React.Dispatch<CommandGroupDisplayAction>;
} | null>(null);

export const CommandGroupDisplayContextProvider: React.FC<{
	children: JSX.Element;
}> = ({ children }) => {
	const [commandGroupDisplayState, dispatch] = useReducer(
		commandGroupDisplayReducer,
		initialState
	);

	return (
		<commandGroupDisplayContext.Provider
			value={{
				commandGroupDisplayState,
				dispatch,
			}}
		>
			{children}
		</commandGroupDisplayContext.Provider>
	);
};
