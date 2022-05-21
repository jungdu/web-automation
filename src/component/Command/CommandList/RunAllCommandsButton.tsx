import { useCommandProgressState } from "@/hooks/useCommandProgress";
import { Button, Spinner, Tooltip } from "@chakra-ui/react";
import React from "react";
import useRunCurrentCommands from "@/component/Command/hooks/useRunCurrentCommands";
import { ArrowRightIcon, SpinnerIcon } from "@chakra-ui/icons";

const RunAllCommandsButton: React.FC = () => {
	const { connectedBrowserId, running } = useCommandProgressState();
	const runCurrentCommands = useRunCurrentCommands(connectedBrowserId);

	return (
		<Tooltip label="모든 동작 실행">
			<Button
				disabled={!connectedBrowserId || running}
				colorScheme={"green"}
				onClick={async () => {
					if (!connectedBrowserId) {
						throw new Error("Requires connectedBrowserId");
					}

					await runCurrentCommands();
				}}
				flex="45px 0 0"
			>
				{running ? <SpinnerIcon /> : <ArrowRightIcon fontSize={"md"} />}
			</Button>
		</Tooltip>
	);
};

export default RunAllCommandsButton;
