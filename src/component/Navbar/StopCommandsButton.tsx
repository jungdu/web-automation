import PauseIcon from "@/component/Icon/PauseIcon";
import useConnectedBrowserProgress, {
	useConnectedBrowserProgressState,
} from "@/hooks/useConnectedBrowserProgress";
import { commandRunnerManager } from "@/managers/CommandRunnerManager";
import { Button } from "@chakra-ui/react";
import React from "react";

function useStopRunningCommands() {
	const {
		commandProgress: { running, browserId },
		dispatch,
	} = useConnectedBrowserProgress();

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

const StopCommandsButton: React.FC = () => {
	const { running } = useConnectedBrowserProgressState();
	const stopProgress = useStopRunningCommands();

	function handleClick() {
		stopProgress();
	}

	return (
		<Button
			colorScheme={"pink"}
			paddingX={"2px"}
			marginLeft={1}
			flex="42px 0 0"
			onClick={handleClick}
			disabled={!running}
		>
			<PauseIcon />
		</Button>
	);
};

export default StopCommandsButton;
