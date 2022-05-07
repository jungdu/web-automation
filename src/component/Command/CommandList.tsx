import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import CommandItem from "./CommandItem";
import { useCommandsState } from "../../hooks/useCommands";
import CreateCommandButton from "./CreateCommandButton";

const CommandList: React.FC = () => {
	const { commands } = useCommandsState();

	return (
		<>
			<Flex alignItems={"center"} marginTop="3" marginBottom="3">
				<Heading size="lg" color="gray.600">
					동작 리스트
				</Heading>
				<CreateCommandButton />
			</Flex>
			<Flex direction={"column"} overflowY={"scroll"}>
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
		</>
	);
};

export default CommandList;
