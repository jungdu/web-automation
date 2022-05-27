import { Flex } from "@chakra-ui/react";
import React from "react";
import CommandTitle from "./CommandTitle";

const CommandHeader: React.FC = () => {
	return (
		<Flex marginBottom={2} alignItems="center">
			<CommandTitle />
		</Flex>
	);
};

export default CommandHeader;
