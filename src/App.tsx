import { Routes, Route, MemoryRouter, Navigate } from "react-router-dom";
import { CommandContextProvider } from "./context/commandContext";
import CommandGroup from "./component/CommandGroup";
import { routes } from "./constants";
import { CommandContextGroupProvider } from "./context/commandGroupContext";
import Command from "./component/Command";
import ChromeStorageSync from "./component/ChromeStorageSync";

function App() {
	return (
		<CommandContextProvider>
			<CommandContextGroupProvider>
				<ChromeStorageSync>
					<MemoryRouter>
						<Routes>
							<Route
								path={routes.home}
								element={<Navigate to={routes.editor} />}
							></Route>
							<Route path={routes.editor} element={<Command />} />
							<Route path={routes.group} element={<CommandGroup />} />
						</Routes>
					</MemoryRouter>
				</ChromeStorageSync>
			</CommandContextGroupProvider>
		</CommandContextProvider>
	);
}

export default App;
