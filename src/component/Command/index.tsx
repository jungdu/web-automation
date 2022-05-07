import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import CommandHeader from "./CommandHeader";
import CommandList from "./CommandList";
import CommandButtons from "./CommandButtons";
import OpenBrowserRow from "./OpenBrowserRow";

const Command: React.FC = () => {
	return (
		<Container maxWidth="800px">
			<Flex width="100%" direction={"column"} padding="3">
				<CommandHeader />
				<CommandButtons />
				<OpenBrowserRow />
				<CommandList />
			</Flex>
		</Container>
	);
};

export default Command;
