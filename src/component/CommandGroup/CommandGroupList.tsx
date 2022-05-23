import useCommandGroupDisplay from "@/hooks/useCommandGroupDisplay";
import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useCommandGroupsState } from "../../hooks/useCommandGroups";
import CommandGroupItem from "./CommandGroupItem";

function useFilteredOrderedCommandGroups() {
	const {
		commandGroupDisplayState: { searchWord, orderBy },
	} = useCommandGroupDisplay();
	const commandGroups = useCommandGroupsState();

	const filteredCommandGroups = commandGroups.filter(
		(commandGroup) => commandGroup.title.indexOf(searchWord) !== -1
	);
	console.log("orderBy :", orderBy);
	// @ts-expect-error
	window.filteredCommandGroups = filteredCommandGroups;

	switch (orderBy) {
		case "createdAtAsc":
			return filteredCommandGroups.sort((a, b) => b.createdAt - a.createdAt);
		case "createdAtDesc":
			return filteredCommandGroups.sort((a, b) => a.createdAt - b.createdAt);
		case "titleAsc":
			return filteredCommandGroups.sort((a, b) => (a.title < b.title ? -1 : 0));
		case "titleDesc":
			return filteredCommandGroups.sort((a, b) => (a.title < b.title ? 0 : -1));
		default:
			return filteredCommandGroups;
	}
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
