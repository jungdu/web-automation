import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import { useCommandsDispatch } from "../../hooks/useCommands";
import ImportCommandGroupButton from "./ImportCommandGroupButton";

const CommandGroupHeader: React.FC = () => {
	const commandsDispatch = useCommandsDispatch();
	const navigate = useNavigate();

	const handleClickBack = () => {
		navigate(-1);
	};

	const handleClickCreate = () => {
		commandsDispatch({
			type: "InitCommand",
			// TODO 아래 commandState 설정안해도 되게 수정
			commandState: {
				currentCommandGroupId: null,
				startUrl: "",
				commands: [],
				parameters: [],
				edited: false,
			},
		});
		navigate(routes.editor);
	};

	return (
		<Flex alignItems={"center"} marginBottom={"5"}>
			<Heading size="lg" color="gray.600">
				자동화 리스트
			</Heading>
			<Button marginLeft="4" colorScheme={"blue"} onClick={handleClickCreate}>
				추가
			</Button>
			<ImportCommandGroupButton />
			<Button marginLeft="auto" onClick={handleClickBack}>
				<ArrowBackIcon fontSize={"2xl"} />
			</Button>
		</Flex>
	);
};

export default CommandGroupHeader;
