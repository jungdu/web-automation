import { useContext, useState } from "react";
import { draggableListContext } from "../context/draggableListContext";

function useDraggableList() {
	const context = useContext(draggableListContext);
	if (!context) {
		throw new Error("Invalid DraggableListContext");
	}

	return context;
}

export default function useDraggableItem(idx: number) {
	const {
		dispatch,
		draggableListState: { dragging, enteredItemIdx },
	} = useDraggableList();
	const [grabbed, setGrabbed] = useState(false);

	function handleDragStart() {
		setGrabbed(true);
		dispatch({
			type: "StartDrag",
		});
	}

	function handleDragEnd() {
		setGrabbed(false);
		dispatch({
			type: "EndDrag",
		});
	}

	function handleDragBoxEnter() {
		dispatch({
			type: "EnterItem",
			idx,
		});
	}

	function handleDragBoxLeave() {
		dispatch({
			type: "LeaveItem",
			idx,
		});
	}

	return {
		dragging,
		enteredItemIdx,
		grabbed,
		handleDragBoxEnter,
		handleDragBoxLeave,
		handleDragEnd,
		handleDragStart,
	};
}
