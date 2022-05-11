import { ArrowRightIcon, LinkIcon } from "@chakra-ui/icons";
import {
	Button,
	Flex,
	Input,
	InputGroup,
	InputLeftAddon,
	Tooltip,
} from "@chakra-ui/react";
import React from "react";
import useCommands from "../../../hooks/useCommands";
import { executeCommands } from "../../../util";
import { openBrowser } from "../../../util/ipc";

const OpenBrowserRow: React.FC = () => {
	const {
		commandsState: { startUrl, connectedBrowserId, commands, parameters },
		dispatch,
	} = useCommands();

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		dispatch({
			type: "SetStartUrl",
			startUrl: e.currentTarget.value,
		});
	};

	return (
		<Flex marginTop="1">
			<InputGroup>
				<InputLeftAddon children="시작 URL" />
				<Input
					type="tel"
					placeholder="https://xxxxxx.com"
					onChange={handleChange}
					value={startUrl}
				/>
			</InputGroup>
			<Tooltip label="동작 리스트와 연결된 브라우저 실행">
				<Button
					disabled={!!connectedBrowserId}
					colorScheme={"green"}
					marginLeft="1"
					onClick={async () => {
						const { id } = await openBrowser(startUrl, () => {
							dispatch({
								type: "SetConnectedBrowserId",
								connectedBrowserId: null,
							});
						});
						dispatch({
							type: "SetConnectedBrowserId",
							connectedBrowserId: id,
						});
					}}
					flex="42px 0 0"
				>
					<LinkIcon />
				</Button>
			</Tooltip>
			<Tooltip label="모든 동작 실행">
				<Button
					disabled={!connectedBrowserId}
					colorScheme={"green"}
					marginLeft="1"
					onClick={() => {
						if (!connectedBrowserId) {
							throw new Error("Requires connectedBrowserId");
						}

						executeCommands(connectedBrowserId, commands, parameters);
					}}
					flex="42px 0 0"
				>
					<ArrowRightIcon fontSize={"md"} />
				</Button>
			</Tooltip>
		</Flex>
	);
};

export default OpenBrowserRow;
