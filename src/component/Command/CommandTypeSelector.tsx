import { Select } from "@chakra-ui/react";
import React from "react";
import { useCommandsDispatch } from "../../hooks/useCommands";
import { CommandType } from "./type";

const commandTypes: { type: CommandType; text: string }[] = [
	{
		type: "click",
		text: "클릭",
	},
	{
		type: "replacePage",
		text: "페이지 이동",
	},
	{
		type: "delay",
		text: "딜레이(초)",
	},
	{
		type: "input",
		text: "키보드 입력",
	},
];

const CommandTypeSelector: React.FC<{
	type: CommandType;
	index: number;
}> = ({ type, index }) => {
	const dispatch = useCommandsDispatch();

	return (
		<Select
			marginRight="1"
			value={type}
			onChange={(e) => {
				const type = e.currentTarget.value as CommandType;
				dispatch({
					type: "ChangeCommandType",
					index,
					newCommandType: type,
				});
			}}
			flex="125px 0 0"
		>
			{commandTypes.map((commandType) => (
				<option key={commandType.type} value={commandType.type}>
					{commandType.text}
				</option>
			))}
		</Select>
	);
};

export default CommandTypeSelector;
