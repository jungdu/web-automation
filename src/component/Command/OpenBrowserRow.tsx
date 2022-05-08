import { ChevronRightIcon } from "@chakra-ui/icons";
import {
	Button,
	Flex,
	Input,
	InputGroup,
	InputLeftAddon,
} from "@chakra-ui/react";
import React from "react";
import useCommands from "../../hooks/useCommands";
import { openBrowser } from "../../util/ipc";

const OpenBrowserRow: React.FC = () => {
	const { commandsState, dispatch } = useCommands();

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		dispatch({
			type: "SetStartUrl",
			startUrl: e.currentTarget.value,
		});
	};

	return (
		<Flex marginTop="1">
			<InputGroup marginBottom="2">
				<InputLeftAddon children="시작 URL" />
				<Input
					type="tel"
					placeholder="https://xxxxxx.com"
					onChange={handleChange}
					value={commandsState.startUrl}
				/>
			</InputGroup>
			<Button
				colorScheme={"green"}
				marginLeft="1"
				onClick={async () => {
					await openBrowser(commandsState.startUrl);
					dispatch({
						type: "SetPageConnected",
						pageConnected: true,
					});
				}}
				flex="42px 0 0"
			>
				<ChevronRightIcon w={8} h={8} />
			</Button>
		</Flex>
	);
};

export default OpenBrowserRow;
