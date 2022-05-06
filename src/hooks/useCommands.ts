import { useContext } from "react";
import { commandContext } from "../context/commandContext";

export default function useCommands() {
	const context = useContext(commandContext);
	if (!context) {
		throw new Error("Invalid CommandContext");
	}

	return context;
}

export function useCommandsState() {
	const context = useContext(commandContext);
	if (!context) {
		throw new Error("Invalid CommandContext");
	}

	return context.commandsState;
}

export function useCommandsDispatch() {
	const context = useContext(commandContext);
	if (!context) {
		throw new Error("Invalid CommandContext");
	}

	return context.dispatch;
}
