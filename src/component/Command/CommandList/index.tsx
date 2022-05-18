import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import CommandItem from "./CommandItem";
import { useCommandsState } from "../../../hooks/useCommands";
import CommandListTitle from "./CommandListTitle";
import OpenBrowserRow from "./OpenBrowserRow";
import { DraggableListProvider } from "../../../context/draggableListContext";

const CommandList: React.FC = () => {
	const { commands } = useCommandsState();

	return (
		<>
			<CommandListTitle />
			<OpenBrowserRow />
			<DraggableListProvider>
				<Flex direction={"column"} overflowY={"scroll"} paddingBottom="2">
					{commands.length > 0 ? (
						commands.map((command, idx) => (
							<CommandItem command={command} index={idx} key={idx} />
						))
					) : (
						<Text
							fontSize={"md"}
							textAlign="center"
							background={"gray.100"}
							padding="2"
							marginTop="1"
						>
							실행할 동작이 없습니다.
						</Text>
					)}
				</Flex>
			</DraggableListProvider>
		</>
	);
};

export default CommandList;
