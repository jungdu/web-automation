import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import CreateCommandButton from "./CreateCommandButton";

const CommandListTitle: React.FC = () => {
	return (
		<Flex alignItems={"center"} marginTop="4" marginBottom="1">
			<Heading size="md" color="gray.600">
				동작 리스트
			</Heading>
			<CreateCommandButton />
		</Flex>
	);
};

export default CommandListTitle;
