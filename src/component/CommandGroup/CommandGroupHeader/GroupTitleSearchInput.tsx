import useCommandGroups from "@/hooks/useCommandGroups";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

const GroupTitleSearchInput: React.FC = () => {
	const {} = useCommandGroups();

	return (
		<InputGroup marginLeft="auto" width="200px">
			<InputLeftElement
				pointerEvents="none"
				children={<SearchIcon color="gray.300" />}
			/>
			<Input type="text" placeholder="제목 검색" />
		</InputGroup>
	);
};

export default GroupTitleSearchInput;
