import React from "react";
import {
	Box,
	Button,
	Heading,
	Modal,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useCommandGroupsDispatch } from "../../hooks/useCommandGroups";
import useCommands from "../../hooks/useCommands";
import { CommandGroupData } from "../Command/type";

const DeleteCommandGroupButton: React.FC<{
	commandGroup: CommandGroupData;
}> = ({ commandGroup }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		dispatch: commandsDispatch,
		commandsState: { currentCommandGroupId },
	} = useCommands();
	const commandGroupsDispatch = useCommandGroupsDispatch();

	const handleClickDelete = () => {
		if (currentCommandGroupId === commandGroup.id) {
			commandsDispatch({
				type: "InitCommand",
				commandState: {
					pageConnected: false,
					startUrl: commandGroup.startUrl,
					currentCommandGroupId: null,
					commands: [],
				},
			});
		}

		commandGroupsDispatch({
			type: "DeleteCommandGroup",
			id: commandGroup.id,
		});
	};

	return (
		<>
			<Button
				colorScheme={"pink"}
				marginLeft="1"
				flex="25px 0 0"
				variant={"ghost"}
				onClick={onOpen}
			>
				<CloseIcon />
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<Box paddingX={6} paddingTop={6} marginBottom="4">
						<Heading fontSize={"2xl"} color="gray.600">
							<Text display={"inline"} color="blue.600">
								{commandGroup.title}
							</Text>
							을(를) 삭제하시겠습니까?
						</Heading>
					</Box>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleClickDelete}>
							삭제
						</Button>
						<Button variant="outline" onClick={onClose}>
							취소
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default DeleteCommandGroupButton;
