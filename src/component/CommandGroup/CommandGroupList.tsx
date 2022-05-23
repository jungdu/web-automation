import useCommandGroupDisplay from "@/hooks/useCommandGroupDisplay";
import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useCommandGroupsState } from "../../hooks/useCommandGroups";
import CommandGroupItem from "./CommandGroupItem";

function useFilteredOrderedCommandGroups() {
	const {
		commandGroupDisplayState: { searchWord },
	} = useCommandGroupDisplay();
	const commandGroups = useCommandGroupsState();

	return commandGroups.filter(
		(commandGroup) => commandGroup.title.indexOf(searchWord) !== -1
	);
}

const CommandGroupList: React.FC = () => {
	const commandGroups = useFilteredOrderedCommandGroups();

	if (commandGroups.length === 0) {
		return (
			<Text
				fontSize={"md"}
				textAlign="center"
				background={"gray.100"}
				padding="3"
				marginTop="3"
			>
				저장된 명령어가 없습니다.
			</Text>
		);
	}

	return (
		<VStack spacing={3}>
			{commandGroups.map((commandGroup) => {
				return (
					<CommandGroupItem key={commandGroup.id} commandGroup={commandGroup} />
				);
			})}
		</VStack>
	);
};

export default CommandGroupList;
