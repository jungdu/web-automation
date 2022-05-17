import { CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useCommandsDispatch } from "../../../hooks/useCommands";
import { ParameterData } from "../type";
import EditParameterButton from "./EditParameterButton";
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
			{/* <EditParameterButton parameter={parameter} index={index} /> */}
			<Button
				colorScheme="pink"
				onClick={() => {
					dispatch({
						type: "DeleteParameter",
						index,
					});
				}}
				marginLeft="1"
			>
				<CloseIcon />
			</Button>
		</Flex>
	);
};

export default ParameterItem;
