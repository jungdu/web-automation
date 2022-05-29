import { Button, Tooltip, useToast } from "@chakra-ui/react";
import React from "react";
import useRunCurrentCommands from "@/component/Command/hooks/useRunCurrentCommands";
import { ArrowRightIcon, SpinnerIcon } from "@chakra-ui/icons";
import useConnectedBrowserProgress, {
	useConnectedBrowserProgressState,
} from "@/hooks/useConnectedBrowserProgress";
import { useCommandsState } from "@/hooks/useCommands";
import { commandRunnerManager } from "@/managers/CommandRunnerManager";

function useRunCommands() {
	const { commands, startUrl, parameters } = useCommandsState();
	const {
		dispatch,
		commandProgress: { browserId },
	} = useConnectedBrowserProgress();
	const toast = useToast();
	// TODO repeatCount 설정 추가해야함
	const repeatCount = 1;

	return function () {
		if (!browserId) {
			throw new Error("Requires connected Browser");
		}

		dispatch({
			type: "StartCommand",
			payload: {
				commands,
			},
		});

		commandRunnerManager.runCommands({
			browserId,
			commands,
			startUrl,
			parameters,
			repeatCount,
			callbacks: {
				onCommandItemSuccess: (_, itemIdx) => {
					dispatch({
						type: "UpdateProgress",
						payload: {
							successItemIdx: itemIdx,
						},
					});
				},
				onCommandsSuccess: () => {
					dispatch({
						type: "SuccessProgress",
					});
				},
				onError: (e) => {
					toast({
						title: "동작 실행 중 에러가 발생했습니다.",
						description: e.message,
						status: "error",
						position: "bottom",
						duration: 5000,
					});
					dispatch({
						type: "FailedCommand",
					});
				},
			},
		});
	};
}

const RunAllCommandsButton: React.FC = () => {
	const { browserId, running } = useConnectedBrowserProgressState();
	const runCommands = useRunCommands();

	return (
		<Tooltip label="모든 동작 실행">
			<Button
				disabled={!browserId || running}
				colorScheme={"green"}
				onClick={async () => {
					if (!browserId) {
						throw new Error("Requires connectedBrowserId");
					}

					runCommands();
				}}
				flex="45px 0 0"
			>
				{running ? <SpinnerIcon /> : <ArrowRightIcon fontSize={"md"} />}
			</Button>
		</Tooltip>
	);
};

export default RunAllCommandsButton;
