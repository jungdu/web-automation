import InputNumber from "../InputNumber";
import React, { useState } from "react";
import { runCommandGroup } from "../../util";
import { useCommandsState } from "../../hooks/useCommands";
import SaveButton from "./SaveButton";
import UpdateButton from "./UpdateButton";
import { Button, Flex } from "@chakra-ui/react";

const CommandButtons: React.FC = () => {
	const { commands, currentCommandGroupId, startUrl } = useCommandsState();
	const [repeatCount, setRepeatCount] = useState(1);

	const handleClickRepeatExecuteAllCommand = async () => {
		await runCommandGroup(startUrl, commands, repeatCount);
	};

	return (
		<Flex width="100%" marginBottom={"3"}>
			<InputNumber
				min={1}
				step={1}
				flex="80px 0 0"
				marginRight={1}
				value={repeatCount}
				onChange={(event) => {
					const nextCount = Number.parseInt(event);
					setRepeatCount(nextCount >= 1 ? nextCount : 1);
				}}
			/>
			<Button
				colorScheme={"green"}
				onClick={handleClickRepeatExecuteAllCommand}
				marginRight={2}
			>
				실행
			</Button>
			{currentCommandGroupId ? <UpdateButton /> : <SaveButton />}
		</Flex>
	);
};

export default CommandButtons;
