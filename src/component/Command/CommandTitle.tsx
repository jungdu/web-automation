import { Heading } from "@chakra-ui/react";
import React from "react";
import useEditingCommandGroup from "./hooks/useEditingCommandGroup";

const CommandTitle: React.FC = () => {
	const editingCommandGroup = useEditingCommandGroup();

	return (
		<Heading fontSize={"2xl"} marginLeft="2" color="gray.600">
			{(editingCommandGroup && editingCommandGroup.title) ||
				"저장이 필요합니다."}
		</Heading>
	);
};

export default CommandTitle;
