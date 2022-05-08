import { useContext } from "react";
import { commandProgressContext } from "../context/commandProgressContext";

export default function useCommandProgress() {
	const context = useContext(commandProgressContext);
	if (!context) {
		throw new Error("Invalid commandProgressContext");
	}

	return context;
}

export function useCommandProgressState() {
	const context = useContext(commandProgressContext);
	if (!context) {
		throw new Error("Invalid commandProgressContext");
	}

	return context.commandProgress;
}

export function useCommandProgressDispatch() {
	const context = useContext(commandProgressContext);
	if (!context) {
		throw new Error("Invalid commandProgressContext");
	}

	return context.dispatch;
}
