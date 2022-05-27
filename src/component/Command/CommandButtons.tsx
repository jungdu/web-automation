import React, { useState } from "react";
import { useCommandsState } from "../../hooks/useCommands";
import SaveButton from "./SaveButton";
import UpdateButton from "./UpdateButton";
import { Button, Flex, Spinner } from "@chakra-ui/react";
import { useCommandProgressState } from "../../hooks/useCommandProgress";
import useRunCurrentCommands from "./hooks/useRunCurrentCommands";
import ResetCommandButton from "./ResetCommandButton";
import PlayIcon from "@/component/Icon/PlayIcon";
import StopProgressButton from "./StopProgressButton";

const CommandButtons: React.FC = () => {
	const { currentCommandGroupId } = useCommandsState();
	const { running } = useCommandProgressState();
	const runCurrentCommands = useRunCurrentCommands(null);
	const [repeatCount, setRepeatCount] = useState(1);

	const handleClickRepeatExecuteAllCommand = async () => {
		runCurrentCommands();
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
				disabled={running}
				paddingX="10px"
			>
				{running ? <Spinner /> : <PlayIcon />}
			</Button>
			<StopProgressButton />
			{currentCommandGroupId ? <UpdateButton /> : <SaveButton />}
			{currentCommandGroupId && <ResetCommandButton />}
		</Flex>
	);
};

export default CommandButtons;
