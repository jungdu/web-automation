import { CommandGroupDisplayContextProvider } from "@/context/\bcommandGroupDisplayContext";
import { Box, Container } from "@chakra-ui/react";
import React from "react";
import CommandGroupHeader from "./CommandGroupHeader";
import CommandGroupList from "./CommandGroupList";

const CommandGroup: React.FC = () => {
	return (
		<CommandGroupDisplayContextProvider>
			<Container maxWidth="800px">
				<Box padding="3">
					<CommandGroupHeader />
					<CommandGroupList />
				</Box>
			</Container>
		</CommandGroupDisplayContextProvider>
	);
};

export default CommandGroup;
