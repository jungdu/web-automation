import { useCommandsState } from "@/hooks/useCommands";
import { useConnectedBrowserProgressState } from "@/hooks/useConnectedBrowserProgress";
import { executeCommand } from "@/util";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Tooltip } from "@chakra-ui/react";
import React from "react";

const GotoStartUrlButton: React.FC = () => {
	const { startUrl } = useCommandsState();
	const { browserId, running } = useConnectedBrowserProgressState();

	function handleClick() {
		if (!browserId) {
			throw new Error("Requires browser to replace page");
		}

		executeCommand(browserId, { type: "replacePage", href: startUrl }, null);
	}

	return (
		<Tooltip label="시작 URL로 페이지 이동" placement="top">
			<Button
				colorScheme={"green"}
				marginLeft="1"
				onClick={handleClick}
				flex="42px 0 0"
				// TODO 왜 disable 되었는지 사용자에게 노출이 필요할 듯
				disabled={!browserId || !startUrl || running}
			>
				<ChevronRightIcon w={8} h={8} />
			</Button>
		</Tooltip>
	);
};

export default GotoStartUrlButton;
