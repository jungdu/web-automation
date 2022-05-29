import useConnectedBrowserProgress from "@/hooks/useConnectedBrowserProgress";
import { openBrowser } from "@/util/ipc";
import { LinkIcon } from "@chakra-ui/icons";
import { Box, Button, Tooltip } from "@chakra-ui/react";
import React from "react";
import StopCommandsButton from "./StopCommandsButton";

const LinkBrowserButton: React.FC = () => {
	const {
		dispatch,
		commandProgress: { browserId },
	} = useConnectedBrowserProgress();

	async function handleClick() {
		const { id } = await openBrowser(() => {
			dispatch({
				type: "DisconnectBrowser",
			});
		});
		dispatch({
			type: "ConnectBrowser",
			payload: { browserId: id },
		});
	}

	return (
		<>
			<Tooltip placement="bottom" label="연결 브라우저 열기">
				<Button
					colorScheme={"green"}
					marginLeft="auto"
					onClick={handleClick}
					disabled={!!browserId}
				>
					<LinkIcon />
				</Button>
			</Tooltip>
			<StopCommandsButton />
			<Tooltip label="브라우저 연결 상태" placement="bottom-end">
				<Box padding="3" marginLeft="2">
					<Box
						borderRadius={"50%"}
						bgColor={browserId ? "green.400" : "red.400"}
						width="10px"
						height="10px"
					/>
				</Box>
			</Tooltip>
		</>
	);
};

export default LinkBrowserButton;
