import { Button } from "@chakra-ui/react";
import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	Input,
	ModalFooter,
	useDisclosure,
	Heading,
	Box,
	useToast,
} from "@chakra-ui/react";
import useInput from "../../hooks/useInput";
import useSaveCommandGroup from "../../hooks/useSaveCommandGroup";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";

const SaveButton: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { value: title, handleChange: handleChangeTitle } = useInput();
	const { value: startUrl, handleChange: handleChangeStartUrl } = useInput();
	const saveCommandGroup = useSaveCommandGroup();
	const navigate = useNavigate();
	const toast = useToast();

	const handleClickSave = () => {
		if (title) {
			saveCommandGroup({
				title,
				startUrl,
			});
			toast({
				title: "저장되었습니다",
				status: "success",
				duration: 1000,
			});
			navigate(routes.group);
			onClose();
		} else {
			toast({
				title: "타이틀을 입력해주세요",
				status: "error",
				duration: 1000,
			});
		}
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
						<Heading size="sm" color="gray.600" marginBottom="1">
							타이틀
						</Heading>
						<Input
							marginBottom="3"
							value={title}
							onChange={handleChangeTitle}
							errorBorderColor="red.200"
							isInvalid={!title}
						/>
						<Heading size="sm" color="gray.600" marginBottom="1">
							시작 주소
						</Heading>
						<Input
							marginBottom="3"
							placeholder="https://xxx.com"
							value={startUrl}
							onChange={handleChangeStartUrl}
						/>
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
