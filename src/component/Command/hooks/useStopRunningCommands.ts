import useCommandProgress from "@/hooks/useCommandProgress";
import { commandRunnerManager } from "@/managers/CommandRunnerManager";

export default function useStopRunningCommands() {
	const {
		commandProgress: { running, connectedBrowserId },
		dispatch,
	} = useCommandProgress();

	return function () {
		if (!running) {
			throw new Error("Can not stop because commands is not running");
		}

		if (connectedBrowserId) {
			commandRunnerManager.stopCommands(connectedBrowserId);
			dispatch({
				type: "StopProgress",
			});
		}
	};
}
