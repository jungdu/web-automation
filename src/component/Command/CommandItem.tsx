import { ChevronRightIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { executeCommand } from "../../util";
import CommandItemInput from "./CommandItemInput";
import CommandTypeSelector from "./CommandTypeSelector";
import { CommandData } from "./type";
import useCommands from "../../hooks/useCommands";

const CommandItem: React.FC<{
	command: CommandData;
	index: number;
}> = ({ command, index }) => {
	const {
		commandsState: { pageConnected },
		dispatch,
	} = useCommands();

	const handleClickDelete = () => {
		dispatch({
			type: "DeleteCommand",
			index: index,
		});
	};

	const handleClickExecute = () => {
		executeCommand(command);
	};

	return (
		<Flex key={index} marginBottom="2">
			<CommandTypeSelector type={command.type} index={index} />
			<CommandItemInput command={command} index={index} />
			<Button
				colorScheme={"green"}
				marginLeft="1"
				onClick={handleClickExecute}
				flex="42px 0 0"
				disabled={!pageConnected}
			>
				<ChevronRightIcon w={8} h={8} />
			</Button>
			<Button
				colorScheme={"pink"}
				marginLeft="1"
				onClick={handleClickDelete}
				flex="42px 0 0"
			>
				<CloseIcon />
			</Button>
		</Flex>
	);
};

export default CommandItem;
