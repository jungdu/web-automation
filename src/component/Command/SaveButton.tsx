import {
	Button,
	Heading,
	Input,
	InputGroup,
	InputLeftAddon,
} from "@chakra-ui/react";
import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalFooter,
	useDisclosure,
	Box,
	useToast,
} from "@chakra-ui/react";
import useInput from "../../hooks/useInput";
import useSaveCommandGroup from "../../hooks/useSaveCommandGroup";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";

const SaveButton: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const saveCommandGroup = useSaveCommandGroup();
	const navigate = useNavigate();
	const { value: title, handleChange: handleTitleChange } = useInput();
	const toast = useToast();

	const handleClickSave = () => {
		if (!title) {
			toast({
				title: "타이틀을 입력해주세요.",
				status: "error",
				duration: 1000,
				position: "bottom",
			});
			return;
		}

		saveCommandGroup(title);
		navigate(routes.group);
		onClose();
	};

	return (
		<>
			<Button
				onClick={() => {
					onOpen();
				}}
			>
				저장
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<Box paddingX={6} paddingTop={6}>
						<Heading size="md" color="gray.600">
							저장하시겠습니까?
						</Heading>
						<InputGroup marginTop="5" marginBottom="2">
							<InputLeftAddon children="타이틀" />
							<Input type="tel" onChange={handleTitleChange} value={title} />
						</InputGroup>
					</Box>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleClickSave}>
							저장
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

export default SaveButton;
