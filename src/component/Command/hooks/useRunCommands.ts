import { useToast } from "@chakra-ui/react";
import { useCommandProgressDispatch } from "@/hooks/useCommandProgress";
import { CommandData, ParameterData } from "../type";
import { commandRunnerManager } from "@/managers/CommandRunnerManager";

interface UseRunCommandGroupParam {
	browserId: string;
	startUrl: string;
	commands: CommandData[];
	parameters: ParameterData[];
	repeatCount: number;
}

export default function useRunCommands() {
	const dispatch = useCommandProgressDispatch();
	const toast = useToast();

	return function (params: UseRunCommandGroupParam) {
		const { browserId, commands, parameters, repeatCount, startUrl } = params;

		console.log("StartCommand");
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
