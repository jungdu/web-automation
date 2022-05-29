import { Button, Tooltip } from "@chakra-ui/react";
import React from "react";
import { ArrowRightIcon, SpinnerIcon } from "@chakra-ui/icons";
import { useConnectedBrowserProgressState } from "@/hooks/useConnectedBrowserProgress";
import useRunCommandsOnConnectedBrowser from "./hooks/useRunCommandsOnConnectedBrowser";

const RunAllCommandsButton: React.FC = () => {
	const { browserId, running } = useConnectedBrowserProgressState();
	const runCommands = useRunCommandsOnConnectedBrowser();

	function handleClick() {
		runCommands();
	}

	return (
		<Tooltip label="모든 동작 실행" placement="top">
			<Button
				disabled={!browserId || running}
				colorScheme={"green"}
				onClick={handleClick}
				flex="42px 0 0"
				marginLeft="1"
			>
				{running ? <SpinnerIcon /> : <ArrowRightIcon fontSize={"md"} />}
			</Button>
		</Tooltip>
	);
};

export default RunAllCommandsButton;
