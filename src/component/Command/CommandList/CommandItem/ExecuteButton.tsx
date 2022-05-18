import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useCommandsState } from "../../../../hooks/useCommands";
import { executeCommand } from "../../../../util";
import { CommandData } from "../../type";

const ExecuteButton: React.FC<{
	command: CommandData;
}> = ({ command }) => {
	const { connectedBrowserId, parameters } = useCommandsState();

	const handleClickExecute = () => {
		if (connectedBrowserId) {
			executeCommand(connectedBrowserId, command, parameters);
		} else {
			throw new Error("Require connected browser to execute");
		}
	};

	return (
		<Button
			colorScheme={"green"}
			marginLeft="1"
			onClick={handleClickExecute}
			flex="42px 0 0"
			disabled={!connectedBrowserId}
		>
			<ChevronRightIcon w={8} h={8} />
		</Button>
	);
};

export default ExecuteButton;
