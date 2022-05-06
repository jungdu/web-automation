import { useCommandGroupsState } from "../../../hooks/useCommandGroups";
import { useCommandsState } from "../../../hooks/useCommands";

export default function useEditingCommandGroup() {
	const { currentCommandGroupId } = useCommandsState();
	const commandGroups = useCommandGroupsState();

	return (
		commandGroups.find(
			(commandGroup) => commandGroup.id === currentCommandGroupId
		) || null
	);
}
