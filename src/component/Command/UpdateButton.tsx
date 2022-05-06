import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { useCommandGroupsDispatch } from "../../hooks/useCommandGroups";
import { useCommandsState } from "../../hooks/useCommands";

const UpdateButton: React.FC = () => {
	const { commands, currentCommandGroupId } = useCommandsState();
	const dispatch = useCommandGroupsDispatch();
	const toast = useToast();

	const handleClick = () => {
		if (currentCommandGroupId) {
			dispatch({
				type: "UpdateCommandGroups",
				commandGroupId: currentCommandGroupId,
				commands,
				lastEditedAt: new Date().getDate(),
			});
			toast({
				title: "업데이트 완료",
				status: "success",
				duration: 1000,
			});
		}
	};

	return <Button onClick={handleClick}>업데이트</Button>;
};

export default UpdateButton;
