import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import CommandHeader from "./CommandHeader";
import CommandList from "./CommandList";
import CommandButtons from "./CommandButtons";
import CommandProgress from "./CommandProgress";
import { CommandProgressProvider } from "../../context/commandProgressContext";

const Command: React.FC = () => {
	return (
		<CommandProgressProvider>
			<Container maxWidth="800px">
				<Flex width="100%" direction={"column"} padding="3">
					<CommandHeader />
					<CommandButtons />
					<CommandProgress />
					<CommandList />
				</Flex>
			</Container>
		</CommandProgressProvider>
	);
};

export default Command;
