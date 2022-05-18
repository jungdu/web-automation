import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useCommandsDispatch } from "../../../../hooks/useCommands";

const DeleteButton: React.FC<{
	index: number;
}> = ({ index }) => {
	const dispatch = useCommandsDispatch();

	const handleClickDelete = () => {
		dispatch({
			type: "DeleteCommand",
			index: index,
		});
	};

	return (
		<Button
			colorScheme={"pink"}
			marginLeft="1"
			onClick={handleClickDelete}
			flex="42px 0 0"
		>
			<CloseIcon />
		</Button>
	);
};

export default DeleteButton;
