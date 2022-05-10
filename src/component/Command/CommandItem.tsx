import { ArrowUpDownIcon, ChevronRightIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Flex } from "@chakra-ui/react";
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
		commandsState: { connectedBrowserId },
		dispatch,
	} = useCommands();

	const handleClickDelete = () => {
		dispatch({
			type: "DeleteCommand",
			index: index,
		});
	};

	const handleClickExecute = () => {
		if (connectedBrowserId) {
			executeCommand(connectedBrowserId, command);
		} else {
			throw new Error("Require connected browser to execute");
		}
	};

	return (
		<Box
			marginBottom="2"
			draggable
			onDragStart={(event) => {
				event.dataTransfer.setData("commandItemIndex", index.toString());
			}}
			onDrop={(e) => {
				const from = Number.parseInt(
					e.dataTransfer.getData("commandItemIndex")
				);
				const to = index;
				if (from !== to) {
					dispatch({
						type: "MoveCommandItem",
						from,
						to,
					});
				}
			}}
			onDragOver={(event) => {
				event.preventDefault();
			}}
		>
			<Flex alignItems={"center"}>
				<Box
					color="gray.300"
					_hover={{ color: "gray.700" }}
					paddingRight="1"
					style={{ cursor: "grab" }}
				>
					<ArrowUpDownIcon fontSize="lg" />
				</Box>
				<CommandTypeSelector type={command.type} index={index} />
				<CommandItemInput command={command} index={index} />
				<Button
					colorScheme={"green"}
					marginLeft="1"
					onClick={handleClickExecute}
					flex="42px 0 0"
					disabled={!connectedBrowserId}
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
		</Box>
	);
};

export default CommandItem;
