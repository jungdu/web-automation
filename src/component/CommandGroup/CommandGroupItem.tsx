import { CloseIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import { useCommandGroupsDispatch } from "../../hooks/useCommandGroups";
import useCommands from "../../hooks/useCommands";
import { CommandGroupData } from "../Command/type";

const CommandGroupItem: React.FC<{
	commandGroup: CommandGroupData;
}> = ({ commandGroup }) => {
	const {
		dispatch: commandsDispatch,
		commandsState: { currentCommandGroupId },
	} = useCommands();
	const commandGroupsDispatch = useCommandGroupsDispatch();
	const navigate = useNavigate();

	const handleClickItem = () => {
		commandsDispatch({
			type: "InitCommand",
			commandState: {
				pageConnected: false,
				startUrl: commandGroup.startUrl,
				currentCommandGroupId: commandGroup.id,
				commands: commandGroup.commands,
			},
		});
		navigate(routes.editor);
	};

	const handleClickDelete = () => {
		if (currentCommandGroupId === commandGroup.id) {
			commandsDispatch({
				type: "InitCommand",
				commandState: {
					pageConnected: false,
					startUrl: commandGroup.startUrl,
					currentCommandGroupId: null,
					commands: [],
				},
			});
		}

		commandGroupsDispatch({
			type: "DeleteCommandGroup",
			id: commandGroup.id,
		});
	};

	return (
		<Flex alignItems={"center"} width="100%" padding="1">
			<Button
				flexGrow={1}
				colorScheme="blue"
				variant="outline"
				textAlign={"left"}
				onClick={handleClickItem}
			>
				{commandGroup.title}
			</Button>
			<Button
				colorScheme={"pink"}
				onClick={handleClickDelete}
				flex="42px 0 0"
				variant={"outline"}
				marginLeft="1"
			>
				<CloseIcon />
			</Button>
		</Flex>
	);
};

export default CommandGroupItem;
