import { Box } from "@chakra-ui/react";
import React from "react";

const DraggableItemCover: React.FC<{
	handleDragEnter: () => void;
	handleDragLeave: () => void;
}> = ({ handleDragEnter, handleDragLeave }) => {
	return (
		<Box
			position="absolute"
			top="0"
			right="0"
			bottom="0"
			left="0"
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
		/>
	);
};

export default DraggableItemCover;
