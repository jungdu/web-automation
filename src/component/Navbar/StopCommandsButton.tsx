import PauseIcon from "@/component/Icon/PauseIcon";
import useConnectedBrowserProgress, {
	useConnectedBrowserProgressState,
} from "@/hooks/useConnectedBrowserProgress";
import { commandRunnerManager } from "@/managers/CommandRunnerManager";
import { Button, Tooltip } from "@chakra-ui/react";
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
		<Tooltip placement="bottom" label="실행중인 작업 정지">
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
		</Tooltip>
	);
};

export default StopCommandsButton;
