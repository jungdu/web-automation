import { CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useCommandsDispatch } from "../../../hooks/useCommands";
import { ParameterData } from "../type";
import ParameterInput from "./ParameterInput";

const ParameterItem: React.FC<{
	parameter: ParameterData;
	index: number;
}> = ({ parameter, index }) => {
	const dispatch = useCommandsDispatch();

	return (
		<Flex marginBottom="2" alignItems={"center"}>
			<Text flex="200px 0 0" marginRight="4" fontSize={"md"} textAlign="right">
				{parameter.key} :
			</Text>
			<ParameterInput index={index} parameter={parameter} />
			<Button
				colorScheme="pink"
				onClick={() => {
					dispatch({
						type: "DeleteParameter",
						index,
					});
				}}
				marginLeft="2"
			>
				<CloseIcon />
			</Button>
		</Flex>
	);
};

export default ParameterItem;
