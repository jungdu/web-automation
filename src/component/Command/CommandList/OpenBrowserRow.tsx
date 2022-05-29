import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import RunAllCommandsButton from "./RunAllCommandsButton";
import StartUrlInput from "./StartUrlInput";
import AutoRenewIcon from "@/component/Icon/AutoRenewIcon";
import { useConnectedBrowserProgressState } from "@/hooks/useConnectedBrowserProgress";

const OpenBrowserRow: React.FC = () => {
	const { browserId, running } = useConnectedBrowserProgressState();

	return (
		<Flex marginTop="1">
			<StartUrlInput />
			<Button
				colorScheme={"green"}
				paddingX="5px"
				marginRight="1"
				disabled={!browserId || running}
			>
				<AutoRenewIcon />
			</Button>
			<RunAllCommandsButton />
		</Flex>
	);
};

export default OpenBrowserRow;
