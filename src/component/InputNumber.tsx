import {
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputProps,
	NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";

const InputNumber: React.FC<NumberInputProps> = ({ ...props }) => {
	return (
		<NumberInput {...props}>
			<NumberInputField />
			<NumberInputStepper>
				<NumberIncrementStepper />
				<NumberDecrementStepper />
			</NumberInputStepper>
		</NumberInput>
	);
};

export default InputNumber;
