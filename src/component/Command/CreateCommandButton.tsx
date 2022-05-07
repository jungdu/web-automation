import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";
import useCommands from "../../hooks/useCommands";

const CreateCommandButton: React.FC = () => {
	const { dispatch: commandsDispatch } = useCommands();

	const handleClickCreateCommand = () => {
		commandsDispatch({ type: "CreateCommandData" });
	};

	return (
		<Button
			colorScheme={"blue"}
			onClick={handleClickCreateCommand}
			marginLeft="2"
			size={"sm"}
		>
			<AddIcon fontSize={"lg"} />
		</Button>
	);
};

export default CreateCommandButton;
