import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import CommandItem from "./CommandItem";
import { useCommandsState } from "../../hooks/useCommands";

const CommandList: React.FC = () => {
	const { commands } = useCommandsState();

	return (
		<Flex direction={"column"} height="400px" overflowY={"scroll"}>
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
	);
};

export default CommandList;