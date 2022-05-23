import useCommandGroupDisplay from "@/hooks/useCommandGroupDisplay";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

const GroupTitleSearchInput: React.FC = () => {
	const {
		dispatch,
		commandGroupDisplayState: { searchWord },
	} = useCommandGroupDisplay();

	return (
		<InputGroup marginLeft="1" width="200px">
			<InputLeftElement
				pointerEvents="none"
				children={<SearchIcon color="gray.300" />}
			/>
			<Input
				type="text"
				placeholder="제목 검색"
				value={searchWord}
				onChange={(event) => {
					dispatch({
						type: "SetSearchWord",
						searchWord: event.currentTarget.value,
					});
				}}
			/>
		</InputGroup>
	);
};

export default GroupTitleSearchInput;
