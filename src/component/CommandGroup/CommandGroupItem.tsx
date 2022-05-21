import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import useCommands from "../../hooks/useCommands";
import { CommandGroupData } from "../Command/type";
import ExportCommandGroupButton from "./ExportCommandGroupButton";
import DeleteCommandGroupButton from "./DeleteCommandGroupButton";

const CommandGroupItem: React.FC<{
	commandGroup: CommandGroupData;
}> = ({ commandGroup }) => {
	const { dispatch: commandsDispatch } = useCommands();
	const navigate = useNavigate();

	const handleClickItem = () => {
		commandsDispatch({
			type: "InitCommand",
			commandState: {
				parameters: commandGroup.parameters,
				startUrl: commandGroup.startUrl,
				currentCommandGroupId: commandGroup.id,
				commands: commandGroup.commands,
				edited: false,
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
			<ExportCommandGroupButton commandGroup={commandGroup} />
			<DeleteCommandGroupButton commandGroup={commandGroup} />
		</Flex>
	);
};

export default CommandGroupItem;
