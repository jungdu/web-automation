import useCommandProgress from "@/hooks/useCommandProgress";
import { commandRunnerManager } from "@/managers/CommandRunnerManager";

export default function useStopRunningCommands() {
	const {
		commandProgress: { running, browserId },
		dispatch,
	} = useCommandProgress();

	return function () {
		if (!running) {
			throw new Error("Can not stop because commands is not running");
		}

		if (browserId) {
			commandRunnerManager.stopCommands(browserId);
			dispatch({
				type: "StopProgress",
			});
		}
	};
}
