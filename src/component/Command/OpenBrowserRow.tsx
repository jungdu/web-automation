import { ChevronRightIcon } from "@chakra-ui/icons";
import {
	Button,
	Flex,
	Input,
	InputGroup,
	InputLeftAddon,
} from "@chakra-ui/react";
import React from "react";
import useInput from "../../hooks/useInput";
import { openBrowser } from "../../util/ipc";

const OpenBrowserRow: React.FC = () => {
	const { value, handleChange } = useInput();

	return (
		<Flex>
			<InputGroup marginBottom="2">
				<InputLeftAddon children="시작 URL" />
				<Input
					type="tel"
					placeholder="https://xxxxxx.com"
					onChange={handleChange}
					value={value}
				/>
			</InputGroup>
			<Button
				colorScheme={"green"}
				marginLeft="1"
				onClick={async () => {
					await openBrowser(value);
				}}
				flex="42px 0 0"
			>
				<ChevronRightIcon w={8} h={8} />
			</Button>
		</Flex>
	);
};

export default OpenBrowserRow;
