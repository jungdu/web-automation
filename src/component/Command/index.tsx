import { AddIcon } from "@chakra-ui/icons";
import { Button, Container, Flex } from "@chakra-ui/react";
import React from "react";
import CommandHeader from "./CommandHeader";
import CommandList from "./CommandList";
import useCommands from "../../hooks/useCommands";
import CommandButtons from "./CommandButtons";
import OpenBrowserRow from "./OpenBrowserRow";

const Command: React.FC = () => {
	const { dispatch: commandsDispatch } = useCommands();

	const handleClickCreateCommand = () => {
		commandsDispatch({ type: "CreateCommandData" });
	};

	return (
		<Container maxWidth="800px">
			<Flex width="100%" direction={"column"} padding="3">
				<CommandHeader />
				<CommandButtons />
				<OpenBrowserRow />
				<CommandList />
				<Button colorScheme={"blue"} onClick={handleClickCreateCommand}>
					<AddIcon fontSize={"xl"} />
				</Button>
			</Flex>
		</Container>
	);
};

export default Command;
