import { CopyIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	Modal,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Textarea,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import React from "react";
import { useCommandGroupsDispatch } from "../../hooks/useCommandGroups";
import useInput from "../../hooks/useInput";
import { deserializeCommandGroupData } from "../../util";

const CopyButton: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useCommandGroupsDispatch();
	const {
		value: textValue,
		setValue: setTextValue,
		handleChange: handleTextChange,
	} = useInput("");
	const toast = useToast();

	const handleClickOpen = () => {
		setTextValue("");
		onOpen();
	};

	const handleClickImport = () => {
		if (!textValue) {
			toast({
				title: "불러올 데이터가 없습니다.",
				description: "내보내기한 자동화 데이터를 입력해주세요.",
				status: "error",
				duration: 1000,
				position: "bottom",
			});
			return;
		}

		try {
			const { commands, startUrl, title } =
				deserializeCommandGroupData(textValue);
			dispatch({
				type: "CreateCommandGroup",
				commandGroupData: {
					commands,
					startUrl,
					id: nanoid(),
					title,
					createdAt: new Date().getDate(),
				},
			});
			toast({
				title: `\`${title}\`을(를) 불러오기에 성공했습니다.`,
				status: "success",
				duration: 1000,
				position: "bottom",
			});
			onClose();
		} catch (e) {
			toast({
				title: "불러오기에 실패했습니다.",
				description: "불러올 데이터 형식을 확인해주세요.",
				status: "error",
				duration: 1000,
				position: "bottom",
			});
		}
	};

	return (
		<>
			<Button marginLeft="1" onClick={handleClickOpen}>
				불러오기
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
				<ModalOverlay />
				<ModalContent>
					<Box paddingX={6} paddingTop={6}>
						<Heading size={"md"} color="gray.600" marginBottom={"4"}>
							자동화 데이터 불러오기
						</Heading>
						<Textarea
							minHeight={"320px"}
							value={textValue}
							onChange={handleTextChange}
						/>
					</Box>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleClickImport}>
							불러오기
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

export default CopyButton;
