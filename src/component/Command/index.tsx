import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import CommandHeader from "./CommandHeader";
import CommandList from "./CommandList";
import CommandButtons from "./CommandButtons";
import CommandProgress from "./CommandProgress";
import { CommandProgressProvider } from "../../context/commandProgressContext";
import ParameterList from "./ParameterList";

const Command: React.FC = () => {
	return (
		<Container maxWidth="800px">
			<Flex width="100%" direction={"column"} padding="3">
				<CommandHeader />
				<CommandProgressProvider>
					<>
						<CommandButtons />
						<CommandProgress />
					</>
				</CommandProgressProvider>
				<ParameterList />
				<CommandProgressProvider>
					<CommandList />
				</CommandProgressProvider>
			</Flex>
		</Container>
	);
};

export default Command;
