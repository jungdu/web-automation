import { AddIcon } from "@chakra-ui/icons";
import { Button, Tooltip } from "@chakra-ui/react";
import React from "react";
import useCommands from "../../../hooks/useCommands";

const CreateCommandButton: React.FC = () => {
	const { dispatch: commandsDispatch } = useCommands();

	const handleClickCreateCommand = () => {
		commandsDispatch({ type: "CreateCommandData" });
	};

	return (
		<Tooltip label="동작 추가" placement="top">
			<Button
				colorScheme={"blue"}
				variant="ghost"
				onClick={handleClickCreateCommand}
				marginLeft="1"
				size={"sm"}
			>
				<AddIcon fontSize={"md"} />
			</Button>
		</Tooltip>
	);
};

export default CreateCommandButton;
