import { useCommandsState } from "@/hooks/useCommands";
import { useConnectedBrowserProgressState } from "@/hooks/useConnectedBrowserProgress";
import { executeCommand } from "@/util";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
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
		<Button
			colorScheme={"green"}
			marginLeft="1"
			onClick={handleClick}
			flex="42px 0 0"
			disabled={!browserId || running}
		>
			<ChevronRightIcon w={8} h={8} />
		</Button>
	);
};

export default GotoStartUrlButton;
