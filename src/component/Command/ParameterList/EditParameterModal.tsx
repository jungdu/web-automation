import React, { useEffect, useState } from "react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Modal,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Select,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useCommandsDispatch } from "../../../hooks/useCommands";
import useInput from "../../../hooks/useInput";
import { ParamInputInfo } from "../type";

// TODO ParamInputInfo에 checkbox도 추후에 추가하기
const parameterTypes: ParamInputInfo["type"][] = [
	"text",
	"selector",
	"password",
];

const initialParameterInfo = {
	type: "text",
	options: [],
};

const EditParameterModal: React.FC<{
	isOpen: boolean;
	onClose: () => void;
}> = ({ isOpen, onClose }) => {
	const dispatch = useCommandsDispatch();
	const {
		value: paramKey,
		setValue: setParamKey,
		handleChange: handleChangeParamKey,
	} = useInput("");
	const {
		value: paramType,
		setValue: setParamType,
		handleChange: handleChangeParamType,
	} = useInput("text");
	const [options, setOptions] = useState<string[]>([""]);

	useEffect(() => {
		setParamKey("");
		setParamType("text");
		setOptions([""]);
	}, [isOpen]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<Box paddingX={6} paddingTop={6}>
					<Heading size="md" color="gray.600" marginBottom="4">
						파라미터 추가
					</Heading>
					<Stack spacing={"4"}>
						<FormControl isRequired>
							<FormLabel htmlFor="parameter-key">파라미터 키</FormLabel>
							<Input
								id="parameter-key"
								value={paramKey}
								onChange={handleChangeParamKey}
								placeholder="<파라미터 키>"
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel htmlFor="parameter-type">파라미터 타입</FormLabel>
							<Select
								id="parameter-type"
								onChange={handleChangeParamType}
								value={paramType}
							>
								{parameterTypes.map((paramType) => (
									<option key={paramType} value={paramType}>
										{paramType}
									</option>
								))}
							</Select>
						</FormControl>

						{paramType === "selector" && (
							<FormControl>
								<Flex alignItems={"center"} marginBottom="1">
									<Text>옵션</Text>
									<Text color="red.500" marginLeft={"1"}>
										*
									</Text>
									<Button
										size="sm"
										variant={"ghost"}
										colorScheme="blue"
										width="30px"
										onClick={() => {
											setOptions([...options, ""]);
										}}
									>
										<AddIcon fontSize={"sm"} />
									</Button>
								</Flex>
								<Stack spacing={"2"} height="200px" overflow={"scroll"}>
									{options.map((option, i) => (
										<Flex>
											<Input
												id="parameter-key"
												key={i}
												value={option}
												onChange={(e) => {
													console.log("e.currentTarget :", e.currentTarget);
													const value = e.currentTarget.value;
													setOptions(() => {
														const nextOptions = [...options];
														nextOptions[i] = value;
														return nextOptions;
													});
												}}
												placeholder={`옵션${i + 1}`}
											/>
											<Button
												colorScheme={"pink"}
												marginLeft="1"
												onClick={() => {}}
												flex="42px 0 0"
											>
												<CloseIcon />
											</Button>
										</Flex>
									))}
								</Stack>
							</FormControl>
						)}
					</Stack>
				</Box>
				<ModalFooter>
					<Button
						colorScheme="blue"
						mr={3}
						onClick={() => {
							switch (paramType) {
								case "text":
								case "password":
									dispatch({
										type: "CreateParameter",
										parameterData: {
											key: paramKey,
											inputInfo: {
												type: paramType,
											},
											value: "",
										},
									});
									break;
								case "selector":
									dispatch({
										type: "CreateParameter",
										parameterData: {
											key: paramKey,
											inputInfo: {
												type: paramType,
												options,
											},
											value: options[0],
										},
									});
									break;
								default:
									throw new Error("invalid paramType");
							}
							onClose();
						}}
					>
						추가
					</Button>
					<Button variant="outline" onClick={onClose}>
						취소
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default EditParameterModal;
