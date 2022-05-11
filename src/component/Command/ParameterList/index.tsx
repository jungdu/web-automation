import { Flex, Heading, Box } from "@chakra-ui/react";
import React from "react";
import { useCommandsState } from "../../../hooks/useCommands";
import CreateParameter from "./CreateParameterButton";
import ParameterItem from "./ParameterItem";

const ParameterList: React.FC = () => {
	const { parameters } = useCommandsState();
	console.log("parameters :", parameters);

	return (
		<Box>
			<Flex marginTop="3" marginBottom="3" alignItems={"center"}>
				<Heading size="md" color="gray.600">
					실행 파라미터
				</Heading>
				<CreateParameter />
			</Flex>
			<Box>
				{parameters.map((parameter, i) => (
					<ParameterItem key={i} parameter={parameter} index={i} />
				))}
			</Box>
		</Box>
	);
};

export default ParameterList;
