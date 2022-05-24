import { useCommandsDispatch, useCommandsState } from "@/hooks/useCommands";
import { Button, Tooltip } from "@chakra-ui/react";
import React from "react";
import RefreshIcon from "../Icon/RefreshIcon";
import useCurrentCommandGroup from "./hooks/useCurrentCommandGroup";

const ResetCommandButton: React.FC = () => {
	const { edited } = useCommandsState();
	const dispatch = useCommandsDispatch();
	const currentCommandGroup = useCurrentCommandGroup();

	const handleClick = () => {
		if (!currentCommandGroup) {
			throw new Error("Requires currentCommandGroup");
		}

		const { commands, parameters, startUrl, id } = currentCommandGroup;

		dispatch({
			type: "InitCommand",
			commandState: {
				parameters,
				commands,
				startUrl,
				edited: false,
				currentCommandGroupId: id,
			},
		});
	};

	return (
		<Tooltip label="변경 사항 초기화" placement="top">
			<Button marginLeft="2" disabled={!edited} onClick={handleClick}>
				<RefreshIcon />
			</Button>
		</Tooltip>
	);
};

export default ResetCommandButton;
