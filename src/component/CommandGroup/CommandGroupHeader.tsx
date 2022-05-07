import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import { useCommandsDispatch } from "../../hooks/useCommands";

const CommandGroupHeader: React.FC = () => {
	const commandsDispatch = useCommandsDispatch();
	const navigate = useNavigate();

	const handleClickBack = () => {
		navigate(-1);
	};

	const handleClickCreate = () => {
		commandsDispatch({
			type: "InitCommand",
			commandState: {
				currentCommandGroupId: null,
				startUrl: "",
				commands: [],
			},
		});
		navigate(routes.editor);
	};

	return (
		<Flex alignItems={"center"} marginBottom={"1"}>
			<Heading size="lg" color="gray.600">
				명령어 리스트
			</Heading>
			<Button marginLeft="4" colorScheme={"blue"} onClick={handleClickCreate}>
				명령어 추가
			</Button>
			<Button marginLeft="1">가져오기</Button>
		</Flex>
	);
};

export default CommandGroupHeader;
