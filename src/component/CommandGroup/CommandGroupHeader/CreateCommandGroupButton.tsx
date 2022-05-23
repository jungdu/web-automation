import { useCommandsDispatch } from "@/hooks/useCommands";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "@/constants";

const CreateCommandGroupButton: React.FC = () => {
	const commandsDispatch = useCommandsDispatch();
	const navigate = useNavigate();

	const handleClickCreate = () => {
		commandsDispatch({
			type: "InitCommand",
			commandState: {
				currentCommandGroupId: null,
				startUrl: "",
				commands: [],
				parameters: [],
				edited: false,
			},
		});
		navigate(routes.editor);
	};

	return (
		<Button colorScheme={"blue"} onClick={handleClickCreate} flexShrink="0">
			추가
		</Button>
	);
};

export default CreateCommandGroupButton;
