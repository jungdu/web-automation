import AutoRenewIcon from "@/component/Icon/AutoRenewIcon";
import { useConnectedBrowserProgressState } from "@/hooks/useConnectedBrowserProgress";
import { Button } from "@chakra-ui/react";
import React from "react";
import useRunCommandsOnConnectedBrowser from "./hooks/useRunCommandsOnConnectedBrowser";

const RunAllCommandsRepeatedlyButton: React.FC = () => {
	const { browserId, running } = useConnectedBrowserProgressState();
	const runCommands = useRunCommandsOnConnectedBrowser();

	function handleClick() {
		runCommands(999999);
	}

	return (
		<Button
			colorScheme={"green"}
			paddingX="5px"
			disabled={!browserId || running}
			flex="42px 0 0"
			marginLeft="1"
			onClick={handleClick}
		>
			<AutoRenewIcon />
		</Button>
	);
};

export default RunAllCommandsRepeatedlyButton;
