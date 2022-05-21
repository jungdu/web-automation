import { useEffect, useState } from "react";
import useCommands from "./useCommands";
import { getStoredData, storeData } from "@/util/localStorage";
import { CommandState } from "../context/commandContext";
import useCommandGroups from "./useCommandGroups";
import { CommandGroupState } from "../context/commandGroupContext";

const CURRENT_COMMANDS_STATE_STORAGE_KEY = "current_commands_state";
const COMMAND_GROUPS_STORAGE_KEY = "command_groups";

export function useSyncCommandsStorage() {
	const [initiated, setInitiated] = useState(false);
	const { dispatch, commandsState } = useCommands();

	useEffect(() => {
		(async () => {
			const storedCommandsState = getStoredData<CommandState>(
				CURRENT_COMMANDS_STATE_STORAGE_KEY
			);
			if (storedCommandsState) {
				dispatch({
					type: "InitCommand",
					commandState: {
						...storedCommandsState,
						parameters: storedCommandsState.parameters || [],
					},
				});
			}
			setInitiated(true);
		})();
	}, []);

	useEffect(() => {
		if (initiated) {
			storeData(CURRENT_COMMANDS_STATE_STORAGE_KEY, commandsState);
		}
	}, [commandsState]);
}

export function useSyncCommandGroupsStorage() {
	const [initiated, setInitiated] = useState(false);
	const { dispatch, commandGroups } = useCommandGroups();

	useEffect(() => {
		(async () => {
			const storedCommandGroups = getStoredData<CommandGroupState>(
				COMMAND_GROUPS_STORAGE_KEY
			);
			if (storedCommandGroups) {
				dispatch({
					type: "InitCommandGroups",
					commandGroupState: storedCommandGroups,
				});
			}

			setInitiated(true);
		})();
	}, []);

	useEffect(() => {
		if (initiated) {
			storeData(COMMAND_GROUPS_STORAGE_KEY, commandGroups);
		}
	});
}
