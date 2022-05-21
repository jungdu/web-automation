import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import InputNumber from "../../InputNumber";
import RunAllCommandsButton from "./RunAllCommandsButton";
import StartUrlInput from "./StartUrlInput";
import LinkBrowserButton from "./LinkBrowserButton";

const OpenBrowserRow: React.FC = () => {
	const [repeatCount, setRepeatCount] = useState(1);

	const handleChangeRepeatCount = (event: string) => {
		const count = Number.parseInt(event);
		setRepeatCount(count > 1 ? count : 1);
	};

	return (
		<Flex marginTop="1">
			<StartUrlInput />
			<LinkBrowserButton />
			<InputNumber
				flex="70px 0 0"
				min={1}
				value={repeatCount}
				onChange={handleChangeRepeatCount}
			/>
			<RunAllCommandsButton />
		</Flex>
	);
};

export default OpenBrowserRow;
