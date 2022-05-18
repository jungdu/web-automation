import { ArrowRightIcon, LinkIcon } from "@chakra-ui/icons";
import {
	Button,
	Flex,
	Input,
	InputGroup,
	InputLeftAddon,
	Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useCommands from "../../../hooks/useCommands";
import { executeCommands } from "../../../util";
import { openBrowser } from "../../../util/ipc";
import InputNumber from "../../InputNumber";

const OpenBrowserRow: React.FC = () => {
	const {
		commandsState: { startUrl, connectedBrowserId, commands, parameters },
		dispatch,
	} = useCommands();
	const [repeatCount, setRepeatCount] = useState(1);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		dispatch({
			type: "SetStartUrl",
			startUrl: e.currentTarget.value,
		});
	};

	const handleChangeRepeatCount = (event: string) => {
		const count = Number.parseInt(event);
		setRepeatCount(count > 1 ? count : 1);
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
					marginRight="1"
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
			<InputNumber
				flex="70px 0 0"
				min={1}
				value={repeatCount}
				onChange={handleChangeRepeatCount}
			/>
			<Tooltip label="모든 동작 실행">
				<Button
					disabled={!connectedBrowserId}
					colorScheme={"green"}
					onClick={() => {
						if (!connectedBrowserId) {
							throw new Error("Requires connectedBrowserId");
						}

						executeCommands(
							connectedBrowserId,
							commands,
							parameters,
							repeatCount
						);
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
