import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import CommandItemInput from "./CommandItemInput";
import CommandTypeSelector from "../../CommandTypeSelector";
import { CommandData } from "../../type";
import { useCommandsDispatch } from "../../../../hooks/useCommands";
import InsertItemBar from "./InsertItemBar";
import GrabIcon from "./GrabIcon";
import ExecuteButton from "./ExecuteButton";
import DeleteButton from "./DeleteButton";
import useDraggableItem from "../../../../hooks/useDraggableItem";
import DraggableItemCover from "../../../common/DraggableItemCover";

const CommandItem: React.FC<{
	command: CommandData;
	index: number;
}> = ({ command, index }) => {
	const dispatch = useCommandsDispatch();
	const {
		dragging,
		handleDragBoxEnter,
		handleDragBoxLeave,
		handleDragEnd,
		handleDragStart: handleDraggableItemDragStart,
		enteredItemIdx,
		grabbed,
	} = useDraggableItem(index);

	const handleDragStart: React.DragEventHandler<HTMLDivElement> = (event) => {
		handleDraggableItemDragStart();
		event.dataTransfer.setData("commandItemIndex", index.toString());
	};

	const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
		const from = Number.parseInt(e.dataTransfer.getData("commandItemIndex"));
		const to = index;
		if (from !== to) {
			dispatch({
				type: "MoveCommandItem",
				from,
				to,
			});
		}
	};

	return (
		<Box
			draggable
			onDragStart={handleDragStart}
			onDrop={handleDrop}
			onDragEnd={handleDragEnd}
			onDragOver={(event) => {
				event.preventDefault();
			}}
			position="relative"
			opacity={grabbed ? 0.3 : 1}
		>
			<InsertItemBar index={index} />
			{!grabbed && enteredItemIdx === index && (
				<Box
					height="35px"
					border="1px"
					marginBottom="1"
					borderStyle={"dashed"}
				/>
			)}
			<Flex alignItems={"center"}>
				<GrabIcon />
				<CommandTypeSelector type={command.type} index={index} />
				<CommandItemInput command={command} index={index} />
				<ExecuteButton command={command} />
				<DeleteButton index={index} />
			</Flex>
			{dragging && (
				<DraggableItemCover
					handleDragEnter={handleDragBoxEnter}
					handleDragLeave={handleDragBoxLeave}
				/>
			)}
		</Box>
	);
};

export default CommandItem;
