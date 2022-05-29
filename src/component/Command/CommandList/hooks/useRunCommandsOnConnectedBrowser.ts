import { useCommandsState } from "@/hooks/useCommands";
import useConnectedBrowserProgress from "@/hooks/useConnectedBrowserProgress";
import { commandRunnerManager } from "@/managers/CommandRunnerManager";
import { useToast } from "@chakra-ui/react";

export default function useRunCommandsOnConnectedBrowser() {
	const { commands, startUrl, parameters } = useCommandsState();
	const {
		dispatch,
		commandProgress: { browserId },
	} = useConnectedBrowserProgress();
	const toast = useToast();

	return function (repeatCount: number = 1) {
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
