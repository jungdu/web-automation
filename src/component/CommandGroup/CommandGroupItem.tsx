import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import useCommands from "../../hooks/useCommands";
import { CommandGroupData } from "../Command/type";
import ExportCommandGroupButton from "./ExportCommandGroupButton";
import DeleteCommandGroupButton from "./DeleteCommandGroupButton";
import { formatTime } from "@/util/time";

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
		<Flex shadow="md" borderWidth={"1px"} padding="4" width="100%">
			<Box flexGrow={1}>
				<Link
					fontSize={"lg"}
					paddingY="3"
					fontWeight="bold"
					color="blue.500"
					variant="outline"
					textAlign={"left"}
					onClick={handleClickItem}
				>
					{commandGroup.title}
				</Link>
				<Box>
					<Text color="gray.600" fontSize={"sm"}>
						<b>작업 수: </b> {commandGroup.commands.length} | <b>생성 시간:</b>{" "}
						{formatTime(commandGroup.createdAt)}
					</Text>
				</Box>
			</Box>
			<ExportCommandGroupButton commandGroup={commandGroup} />
			<DeleteCommandGroupButton commandGroup={commandGroup} />
		</Flex>
	);
};

export default CommandGroupItem;
