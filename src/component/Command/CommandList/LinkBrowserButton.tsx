import useCommandProgress from "@/hooks/useCommandProgress";
import { useCommandsState } from "@/hooks/useCommands";
import { openBrowser } from "@/util/ipc";
import { LinkIcon } from "@chakra-ui/icons";
import { Button, Tooltip } from "@chakra-ui/react";
import React from "react";

const LinkBrowserButton: React.FC = () => {
	const { startUrl } = useCommandsState();
	const {
		commandProgress: { connectedBrowserId },
		dispatch: commandProgressDispatch,
	} = useCommandProgress();

	return (
		<Tooltip label="동작 리스트와 연결된 브라우저 실행">
			<Button
				disabled={!!connectedBrowserId}
				colorScheme={"green"}
				marginLeft="1"
				marginRight="1"
				onClick={async () => {
					const { id } = await openBrowser(startUrl, () => {
						commandProgressDispatch({
							type: "DisconnectBrowser",
						});
					});
					commandProgressDispatch({
						type: "ConnectBrowser",
						payload: { browserId: id },
					});
				}}
				flex="42px 0 0"
			>
				<LinkIcon />
			</Button>
		</Tooltip>
	);
};

export default LinkBrowserButton;
