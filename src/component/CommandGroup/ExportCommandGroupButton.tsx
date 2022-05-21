import { CopyIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	Modal,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Text,
	Textarea,
	useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import useInput from "../../hooks/useInput";
import { serializeCommandGroupData } from "@/util";
import { CommandGroupData } from "../Command/type";

const CopyButton: React.FC<{
	commandGroup: CommandGroupData;
}> = ({ commandGroup }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		value: textValue,
		setValue: setTextValue,
		handleChange: handleTextChange,
	} = useInput("");

	const handleModalOpen = () => {
		setTextValue(serializeCommandGroupData(commandGroup));
		onOpen();
	};

	return (
		<>
			<Button
				onClick={handleModalOpen}
				flex="42px 0 0"
				variant={"ghost"}
				marginLeft="1"
			>
				<CopyIcon />
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
				<ModalOverlay />
				<ModalContent>
					<Box paddingX={6} paddingTop={6}>
						<Heading size={"md"} color="gray.600" marginBottom={"4"}>
							자동화 데이터 내보내기
						</Heading>

						<Textarea
							minHeight={"320px"}
							value={textValue}
							onChange={handleTextChange}
						/>
						<Text
							color="tomato"
							wordBreak={"keep-all"}
							marginTop="2"
							fontWeight={"bold"}
						>
							데이터를 전달할 때 비밀번호와 같은 개인정보 포함되지 않도록
							주의하세요
						</Text>
					</Box>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={() => {}}>
							복사
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
