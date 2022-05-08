import { HamburgerIcon } from "@chakra-ui/icons";
import { Button, Flex, Progress } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import CommandTitle from "./CommandTitle";

const CommandHeader: React.FC = () => {
	const navigate = useNavigate();
	const handleClickHamburger = () => {
		navigate(routes.group);
	};

	return (
		<Flex marginBottom={2} alignItems="center">
			<CommandTitle />
			<Button marginLeft={"auto"} onClick={() => handleClickHamburger()}>
				<HamburgerIcon fontSize={"2xl"} />
			</Button>
		</Flex>
	);
};

export default CommandHeader;
