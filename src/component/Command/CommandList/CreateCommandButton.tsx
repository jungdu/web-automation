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
		<Tooltip label="동작 추가">
			<Button
				colorScheme={"blue"}
				onClick={handleClickCreateCommand}
				marginLeft="2"
				size={"sm"}
			>
				<AddIcon fontSize={"lg"} />
			</Button>
		</Tooltip>
	);
};

export default CreateCommandButton;
