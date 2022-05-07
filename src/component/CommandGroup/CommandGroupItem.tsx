import { CopyIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import useCommands from "../../hooks/useCommands";
import { CommandGroupData } from "../Command/type";
import DeleteCommandGroupButton from "./DeleteCommandGroupButton";

const CommandGroupItem: React.FC<{
	commandGroup: CommandGroupData;
}> = ({ commandGroup }) => {
	const {
		dispatch: commandsDispatch,
		commandsState: { currentCommandGroupId },
	} = useCommands();
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
				onClick={() => {}}
				flex="42px 0 0"
				variant={"ghost"}
				marginLeft="1"
			>
				<CopyIcon />
			</Button>
			<DeleteCommandGroupButton commandGroup={commandGroup} />
		</Flex>
	);
};

export default CommandGroupItem;
