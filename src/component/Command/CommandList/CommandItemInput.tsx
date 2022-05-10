import { Input } from "@chakra-ui/react";
import React from "react";
import InputNumber from "../../InputNumber";
import { CommandData } from "../type";
import { useCommandsDispatch } from "../../../hooks/useCommands";

const CommandItemInput: React.FC<{
	command: CommandData;
	index: number;
}> = ({ command, index }) => {
	const dispatch = useCommandsDispatch();

	const handleChange = (newCommandData: CommandData) => {
		dispatch({
			type: "ChangeCommand",
			index,
			newCommandData,
		});
	};

	switch (command.type) {
		case "click":
			return (
				<Input
					placeholder="Target selector"
					value={command.selector}
					errorBorderColor="red.200"
					isInvalid={!command.selector}
					onChange={(event) => {
						handleChange({ ...command, selector: event.currentTarget.value });
					}}
				/>
			);
		case "replacePage":
			return (
				<Input
					placeholder="이동할 페이지 주소"
					value={command.href}
					errorBorderColor="red.200"
					isInvalid={!command.href}
					onChange={(event) => {
						handleChange({ ...command, href: event.currentTarget.value });
					}}
				/>
			);
		case "delay":
			return (
				<InputNumber
					flexGrow={1}
					defaultValue={command.seconds}
					value={command.seconds}
					step={0.1}
					onChange={(event) => {
						handleChange({ ...command, seconds: Number.parseFloat(event) });
					}}
				/>
			);
		case "input":
			return (
				<>
					<Input
						placeholder="Selector"
						value={command.selector}
						errorBorderColor="red.200"
						isInvalid={!command.selector}
						onChange={(event) => {
							handleChange({ ...command, selector: event.currentTarget.value });
						}}
						marginRight="1"
					/>
					<Input
						placeholder="Target selector"
						value={command.value}
						errorBorderColor="red.200"
						isInvalid={!command.value}
						onChange={(event) => {
							handleChange({ ...command, value: event.currentTarget.value });
						}}
					/>
				</>
			);
		default:
			return null;
	}
};

export default CommandItemInput;
