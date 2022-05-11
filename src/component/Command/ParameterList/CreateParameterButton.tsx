import { AddIcon } from "@chakra-ui/icons";
import { Button, Tooltip } from "@chakra-ui/react";
import React from "react";
import { useCommandsDispatch } from "../../../hooks/useCommands";

const CreateParameterButton: React.FC = () => {
	const dispatch = useCommandsDispatch();

	return (
		<Tooltip label="동작 추가">
			<Button
				colorScheme={"blue"}
				variant="ghost"
				onClick={() => {
					dispatch({
						type: "CreateParameter",
					});
				}}
				marginLeft="1"
				size={"sm"}
			>
				<AddIcon fontSize={"md"} />
			</Button>
		</Tooltip>
	);
};

export default CreateParameterButton;
