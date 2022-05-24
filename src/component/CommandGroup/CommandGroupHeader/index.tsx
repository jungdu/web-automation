import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import OrderBySelector from "../OrderBySelector";
import CreateCommandGroupButton from "./CreateCommandGroupButton";
import GroupTitleSearchInput from "./GroupTitleSearchInput";
import ImportCommandGroupButton from "./ImportCommandGroupButton";

const CommandGroupHeader: React.FC = () => {
	const navigate = useNavigate();

	const handleClickBack = () => {
		navigate(-1);
	};

	return (
		<>
			<Flex marginBottom={"5"} alignItems="center">
				<CreateCommandGroupButton />
				<ImportCommandGroupButton />
				<OrderBySelector />
				<GroupTitleSearchInput />
			</Flex>
		</>
	);
};

export default CommandGroupHeader;
