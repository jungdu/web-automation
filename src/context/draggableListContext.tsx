import produce from "immer";
import { createContext, useReducer } from "react";

interface StartDragAction {
	type: "StartDrag";
}

interface EnterItemAction {
	type: "EnterItem";
	idx: number;
}

interface LeaveItemAction {
	type: "LeaveItem";
	idx: number;
}

interface EndDragAction {
	type: "EndDrag";
}

type DraggableListAction =
	| StartDragAction
	| EnterItemAction
	| LeaveItemAction
	| EndDragAction;

interface DraggableListState {
	dragging: boolean;
	enteredItemIdx: number | null;
}

export const draggableListContext = createContext<{
	draggableListState: DraggableListState;
	dispatch: React.Dispatch<DraggableListAction>;
} | null>(null);

function draggableListReducer(
	state: DraggableListState,
	action: DraggableListAction
) {
	switch (action.type) {
		case "EnterItem":
			return produce(state, (draft) => {
				draft.enteredItemIdx = action.idx;
			});
		case "StartDrag":
			return {
				dragging: true,
				enteredItemIdx: null,
			};
		case "LeaveItem":
			return produce(state, (draft) => {
				if (state.enteredItemIdx === action.idx) {
					draft.enteredItemIdx = null;
				}
			});
		case "EndDrag":
			return {
				dragging: false,
				enteredItemIdx: null,
			};
		default:
			// @ts-expect-error
			throw new Error(`Invalid type of action ${action.type}`);
	}
}

export const DraggableListProvider: React.FC<{ children: JSX.Element }> = ({
	children,
}) => {
	const [draggableListState, dispatch] = useReducer(draggableListReducer, {
		dragging: false,
		enteredItemIdx: null,
	});

	return (
		<draggableListContext.Provider
			value={{
				draggableListState,
				dispatch,
			}}
		>
			{children}
		</draggableListContext.Provider>
	);
};
