import { OrderBy } from "@/context/\bcommandGroupDisplayContext";
import useCommandGroupDisplay from "@/hooks/useCommandGroupDisplay";
import { Select } from "@chakra-ui/react";
import React from "react";

const orderByOptions: { value: OrderBy; text: string }[] = [
	{
		value: "createdAtAsc",
		text: "최신순",
	},
	{
		value: "createdAtDesc",
		text: "최신순(역순)",
	},
	{
		value: "titleAsc",
		text: "타이틀",
	},
	{
		value: "titleDesc",
		text: "타이틀(역순)",
	},
];

const OrderBySelector: React.FC = () => {
	const {
		dispatch,
		commandGroupDisplayState: { orderBy },
	} = useCommandGroupDisplay();

	return (
		<Select
			marginLeft="auto"
			flex="130px 0 0"
			value={orderBy || ""}
			onChange={(event) => {
				dispatch({
					type: "SetOrderBy",
					orderBy: (event.currentTarget.value || null) as OrderBy,
				});
			}}
		>
			{orderByOptions.map((orderByOption) => (
				<option
					value={orderByOption.value || ""}
					key={orderByOption.value || "null"}
				>
					{orderByOption.text}
				</option>
			))}
		</Select>
	);
};

export default OrderBySelector;
