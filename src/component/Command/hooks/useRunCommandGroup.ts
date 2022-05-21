import { useToast } from "@chakra-ui/react";
import { useCommandProgressDispatch } from "../../../hooks/useCommandProgress";
import { useCommandsState } from "../../../hooks/useCommands";
import { executeCommands } from "@/util";
import { openBrowser } from "@/util/ipc";

export function useRunCommandGroup(connectedBrowserId: string | null) {
	const { commands, startUrl, parameters } = useCommandsState();
	const dispatch = useCommandProgressDispatch();
	const toast = useToast();

	return async function (repeatCount: number = 1) {
		try {
			let browserId = connectedBrowserId;
			if (!connectedBrowserId) {
				const { id } = await openBrowser(startUrl);
				browserId = id;
			}

			if (!browserId) {
				throw new Error("No browser id");
			}

			dispatch({
				type: "StartCommand",
				payload: {
					commands,
					browserId,
				},
			});

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
