import { openBrowser } from "@/util/ipc";
import { useCommandsState } from "../../../hooks/useCommands";
import useRunCommands from "./useRunCommands";

export default function useRunCurrentCommands(browserId: null | string) {
	const { commands, startUrl, parameters } = useCommandsState();
	const runCommands = useRunCommands();

	return async function (repeatCount: number = 1) {
		runCommands({
			browserId: browserId ? browserId : (await openBrowser(startUrl)).id,
			commands,
			parameters,
			repeatCount,
		});
	};
}
