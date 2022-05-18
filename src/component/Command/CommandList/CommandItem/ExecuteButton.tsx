import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { useCommandsState } from "../../../../hooks/useCommands";
import { executeCommand } from "../../../../util";
import { CommandData } from "../../type";

const ExecuteButton: React.FC<{
	command: CommandData;
}> = ({ command }) => {
	const { connectedBrowserId, parameters } = useCommandsState();
	const toast = useToast();

	const handleClickExecute = async () => {
		if (connectedBrowserId) {
			try {
				await executeCommand(connectedBrowserId, command, parameters);
			} catch (e) {
				if (e instanceof Error) {
					toast({
						title: "동작 실행 중 에러가 발생했습니다.",
						description: e.message,
						status: "error",
						position: "bottom",
						duration: 5000,
					});
				}
			}
		} else {
			throw new Error("Require connected browser to execute");
		}
	};

	return (
		<Button
			colorScheme={"green"}
			marginLeft="1"
			onClick={handleClickExecute}
			flex="42px 0 0"
			disabled={!connectedBrowserId}
		>
			<ChevronRightIcon w={8} h={8} />
		</Button>
	);
};

export default ExecuteButton;
