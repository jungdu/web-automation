import { useContext } from "react";
import { commandGroupContext } from "../context/commandGroupContext";

export default function useCommandGroups() {
	const context = useContext(commandGroupContext);
	if (!context) {
		throw new Error("Invalid CommandGroupContext");
	}

	return context;
}

export function useCommandGroupsState() {
	const context = useContext(commandGroupContext);
	if (!context) {
		throw new Error("Invalid CommandContext");
	}

	return context.commandGroups;
}

export function useCommandGroupsDispatch() {
	const context = useContext(commandGroupContext);
	if (!context) {
		throw new Error("Invalid CommandContext");
	}

	return context.dispatch;
}
