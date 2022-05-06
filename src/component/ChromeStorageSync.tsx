import React from "react";
import {
	useSyncCommandGroupsStorage,
	useSyncCommandsStorage,
} from "../hooks/useSyncChromeStorage";

const ChromeStorageSync: React.FC<{ children: JSX.Element }> = ({
	children,
}) => {
	useSyncCommandsStorage();
	useSyncCommandGroupsStorage();

	return children;
};

export default ChromeStorageSync;
