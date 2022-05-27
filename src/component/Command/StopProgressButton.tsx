import PauseIcon from "@/component/Icon/PauseIcon";
import { useCommandProgressState } from "@/hooks/useCommandProgress";
import { Button } from "@chakra-ui/react";
import React from "react";
import useStopRunningCommands from "./hooks/useStopRunningCommands";

const StopProgressButton: React.FC = () => {
	const { running } = useCommandProgressState();
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

export default StopProgressButton;
