import { useToast } from "@chakra-ui/react";
import { useCommandProgressDispatch } from "@/hooks/useCommandProgress";
import { executeCommands } from "@/util";
import { CommandData, ParameterData } from "../type";

interface UseRunCommandGroupParam {
	browserId: string;
	commands: CommandData[];
	parameters: ParameterData[];
	repeatCount: number;
}

export default function useRunCommands() {
	const dispatch = useCommandProgressDispatch();
	const toast = useToast();

	return async function (params: UseRunCommandGroupParam) {
		const { browserId, commands, parameters, repeatCount } = params;

		try {
			dispatch({
				type: "StartCommand",
				payload: {
					commands,
				},
			});

			// CommandRunnerManager 사용하도록 executeCommand를로 대체 해야함
			await executeCommands(browserId, commands, parameters, repeatCount, {
				onCommandItemSuccess: (_, itemIdx) => {
					dispatch({
						type: "UpdateProgress",
						payload: {
							successItemIdx: itemIdx,
						},
					});
				},
			});
			dispatch({
				type: "SuccessProgress",
			});
		} catch (e) {
			if (e instanceof Error) {
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
			} else {
				throw e;
			}
		}
	};
}
