import useConnectedBrowserProgress from "@/hooks/useConnectedBrowserProgress";
import { executeCommand } from "@/util";
import { openBrowser } from "@/util/ipc";
import { LinkIcon } from "@chakra-ui/icons";
import { Box, Button, Tooltip, keyframes } from "@chakra-ui/react";
import React from "react";
import StopCommandsButton from "./StopCommandsButton";

const animationKeyframes = keyframes`
	0% {opacity: 1};
	50% {opacity: 0.3};
	100% {opacity: 1};
`;

const animation = `${animationKeyframes} 1.2s infinite`;

const connectBrowserGuideUrl =
	"https://gist.github.com/jungdu/cc2d22df7c37b043d82a7ee3a7fa3711#file-2-connect_browser-md";

const LinkBrowserButton: React.FC = () => {
	const {
		dispatch,
		commandProgress: { browserId, running },
	} = useConnectedBrowserProgress();

	async function handleClick() {
		const { id } = await openBrowser(() => {
			dispatch({
				type: "DisconnectBrowser",
			});
		});
		await executeCommand(
			id,
			{
				type: "replacePage",
				href: connectBrowserGuideUrl,
			},
			null
		);
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
						animation={running ? animation : undefined}
					/>
				</Box>
			</Tooltip>
		</>
	);
};

export default LinkBrowserButton;
