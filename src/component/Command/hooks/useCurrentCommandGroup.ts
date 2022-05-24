import { useCommandGroupsState } from "@/hooks/useCommandGroups";
import { useCommandsState } from "@/hooks/useCommands";

export default function useCurrentCommandGroup() {
	const { currentCommandGroupId } = useCommandsState();
	const commandGroups = useCommandGroupsState();
	if (!currentCommandGroupId) {
		return null;
	}

	return commandGroups.find(
		(commandGroup) => commandGroup.id === currentCommandGroupId
	);
}
