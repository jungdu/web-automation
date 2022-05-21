import React, { useState } from "react";
import { useCommandsState } from "../../hooks/useCommands";
import SaveButton from "./SaveButton";
import UpdateButton from "./UpdateButton";
import { Button, Flex, Spinner } from "@chakra-ui/react";
import { useRunCommandGroup } from "./hooks/useRunCommandGroup";
import { useCommandProgressState } from "../../hooks/useCommandProgress";

const CommandButtons: React.FC = () => {
	const { currentCommandGroupId } = useCommandsState();
	const { running } = useCommandProgressState();
	const runCommandGroup = useRunCommandGroup(null);
	const [repeatCount, setRepeatCount] = useState(1);

	const handleClickRepeatExecuteAllCommand = async () => {
		runCommandGroup(repeatCount);
	};

	return (
		<Flex width="100%" marginBottom={"2"}>
			{/* <InputNumber
				min={1}
				step={1}
				flex="80px 0 0"
				marginRight={1}
				value={repeatCount}
				onChange={(event) => {
					const nextCount = Number.parseInt(event);
					setRepeatCount(nextCount >= 1 ? nextCount : 1);
				}}
			/> */}
			<Button
				colorScheme={"green"}
				onClick={handleClickRepeatExecuteAllCommand}
				marginRight={2}
				disabled={running}
			>
				{running ? <Spinner /> : "실행"}
			</Button>
			{currentCommandGroupId ? <UpdateButton /> : <SaveButton />}
		</Flex>
	);
};

export default CommandButtons;
