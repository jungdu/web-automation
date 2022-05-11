import { Input, Select } from "@chakra-ui/react";
import React from "react";
import { useCommandsDispatch } from "../../../hooks/useCommands";
import { ParameterData } from "../type";

const ParameterInput: React.FC<{
	parameter: ParameterData;
	index: number;
}> = ({ parameter, index }) => {
	const dispatch = useCommandsDispatch();

	switch (parameter.inputInfo.type) {
		case "text":
		case "password":
			return (
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
					placeholder="값을 입력하세요"
					type={parameter.inputInfo.type}
				/>
			);
		case "selector":
			return (
				<Select>
					{parameter.inputInfo.options.map((option) => (
						<option value={option}>{option}</option>
					))}
				</Select>
			);
		default:
			return null;
	}
};

export default ParameterInput;
