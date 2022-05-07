import { Heading } from "@chakra-ui/react";
import React from "react";
import useEditingCommandGroup from "./hooks/useEditingCommandGroup";

const CommandTitle: React.FC = () => {
	const editingCommandGroup = useEditingCommandGroup();

	return (
		<Heading size={"lg"} color="gray.600">
			{(editingCommandGroup && editingCommandGroup.title) ||
				"저장되지 않은 작업"}
		</Heading>
	);
};

export default CommandTitle;
