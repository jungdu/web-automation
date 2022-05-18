import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { useCommandGroupsDispatch } from "../../hooks/useCommandGroups";
import { useCommandsDispatch, useCommandsState } from "../../hooks/useCommands";

const UpdateButton: React.FC = () => {
	const { commands, currentCommandGroupId, startUrl, parameters, edited } =
		useCommandsState();
	const dispatch = useCommandGroupsDispatch();
	const commandsDispatch = useCommandsDispatch();
	const toast = useToast();

	const handleClick = () => {
		if (currentCommandGroupId) {
			dispatch({
				type: "UpdateCommandGroups",
				commandGroupId: currentCommandGroupId,
				commands,
				lastEditedAt: new Date().getDate(),
				startUrl,
				parameters,
			});
			commandsDispatch({
				type: "OnUpdateCommandGroup",
			});
			toast({
				title: "업데이트 완료",
				status: "success",
				duration: 1000,
				position: "bottom",
			});
		}
	};

	return (
		<Button onClick={handleClick} disabled={!edited}>
			업데이트
		</Button>
	);
};

export default UpdateButton;
