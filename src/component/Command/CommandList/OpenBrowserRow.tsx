import { Flex } from "@chakra-ui/react";
import React from "react";
import RunAllCommandsButton from "./RunAllCommandsButton";
import StartUrlInput from "./StartUrlInput";
import RunAllCommandsRepeatedlyButton from "./RunAllCommandsRepeatedlyButton";
import GotoStartUrlButton from "./GotoStartUrlButton";

const OpenBrowserRow: React.FC = () => {
	return (
		<Flex marginTop="1">
			<StartUrlInput />
			<GotoStartUrlButton />
			<RunAllCommandsButton />
			<RunAllCommandsRepeatedlyButton />
		</Flex>
	);
};

export default OpenBrowserRow;
