import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import CommandHeader from "./CommandHeader";
import CommandList from "./CommandList";
import CommandButtons from "./CommandButtons";
import OpenBrowserRow from "./OpenBrowserRow";
import CommandProgress from "./CommandProgress";
import CommandListTitle from "./CommandListTitle";
import { CommandProgressProvider } from "../../context/commandProgressContext";

const Command: React.FC = () => {
	return (
		<CommandProgressProvider>
			<Container maxWidth="800px">
				<Flex width="100%" direction={"column"} padding="3">
					<CommandHeader />
					<CommandButtons />
					<CommandProgress />
					<CommandListTitle />
					<OpenBrowserRow />
					<CommandList />
				</Flex>
			</Container>
		</CommandProgressProvider>
	);
};

export default Command;
