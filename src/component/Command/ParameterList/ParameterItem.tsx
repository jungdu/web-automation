import { CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import { useCommandsDispatch } from "../../../hooks/useCommands";
import { ParameterData } from "../type";

const ParameterItem: React.FC<{
	parameter: ParameterData;
	index: number;
}> = ({ parameter, index }) => {
	const dispatch = useCommandsDispatch();

	return (
		<Flex marginBottom="2">
			<Input
				marginRight="4"
				value={parameter.key}
				onChange={(event) => {
					dispatch({
						type: "ChangeParameter",
						index,
						parameterData: {
							key: event.currentTarget.value,
							value: parameter.value,
						},
					});
				}}
			/>
			<Input
				value={parameter.value}
				onChange={(event) => {
					dispatch({
						type: "ChangeParameter",
						index,
						parameterData: {
							key: parameter.key,
							value: event.currentTarget.value,
						},
					});
				}}
			/>
			<Button
				colorScheme="pink"
				mr={3}
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
