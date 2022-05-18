import { Box } from "@chakra-ui/react";
import React from "react";
import { useCommandsDispatch } from "../../../../hooks/useCommands";

const InsertItemBar: React.FC<{
	index: number;
}> = ({ index }) => {
	const dispatch = useCommandsDispatch();

	const handleClickInsert = () => {
		dispatch({
			type: "InsertCommandItem",
			index,
		});
	};

	return (
		<Box
			height="2"
			margin="0 auto"
			borderRadius={"full"}
			_hover={{ background: "blue.400" }}
			marginLeft="6"
			cursor="pointer"
			onClick={handleClickInsert}
		/>
	);
};

export default InsertItemBar;
