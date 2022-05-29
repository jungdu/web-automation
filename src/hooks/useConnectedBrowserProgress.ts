import { useContext } from "react";
import { connectedBrowserProgressContext } from "../context/commandProgressContext";

export default function useConnectedBrowserProgress() {
	const context = useContext(connectedBrowserProgressContext);
	if (!context) {
		throw new Error("Invalid connectedBrowserProgressContext");
	}

	return context;
}

export function useConnectedBrowserProgressState() {
	const context = useContext(connectedBrowserProgressContext);
	if (!context) {
		throw new Error("Invalid connectedBrowserProgressContext");
	}

	return context.commandProgress;
}

export function useConnectedBrowserProgressDispatch() {
	const context = useContext(connectedBrowserProgressContext);
	if (!context) {
		throw new Error("Invalid connectedBrowserProgressContext");
	}

	return context.dispatch;
}
