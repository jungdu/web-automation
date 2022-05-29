import { Flex } from "@chakra-ui/react";
import React from "react";
import RunAllCommandsButton from "./RunAllCommandsButton";
import StartUrlInput from "./StartUrlInput";
import RunAllCommandsRepeatedlyButton from "./RunAllCommandsRepeatedlyButton";

const OpenBrowserRow: React.FC = () => {
	return (
		<Flex marginTop="1">
			<StartUrlInput />
			<RunAllCommandsButton />
			<RunAllCommandsRepeatedlyButton />
		</Flex>
	);
};

export default OpenBrowserRow;
