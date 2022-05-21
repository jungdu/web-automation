import useCommands from "@/hooks/useCommands";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import React from "react";

const StartUrlInput: React.FC = () => {
	const {
		commandsState: { startUrl },
		dispatch: commandsDispatch,
	} = useCommands();

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		commandsDispatch({
			type: "SetStartUrl",
			startUrl: e.currentTarget.value,
		});
	};

	return (
		<InputGroup>
			<InputLeftAddon children="시작 URL" />
			<Input
				type="tel"
				placeholder="https://xxxxxx.com"
				onChange={handleChange}
				value={startUrl}
			/>
		</InputGroup>
	);
};

export default StartUrlInput;
