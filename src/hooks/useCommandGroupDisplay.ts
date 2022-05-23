import { commandGroupDisplayContext } from "@/context/\bcommandGroupDisplayContext";
import { useContext } from "react";

export default function useCommandGroupDisplay() {
	const commandGroupDisplay = useContext(commandGroupDisplayContext);
	if (!commandGroupDisplay) {
		throw new Error("Invalid CommandGroupDisplayContext");
	}

	return commandGroupDisplay;
}
