import { Routes, Route, MemoryRouter, Navigate } from "react-router-dom";
import { CommandContextProvider } from "./context/commandContext";
import CommandGroup from "./component/CommandGroup";
import { routes } from "./constants";
import { CommandContextGroupProvider } from "./context/commandGroupContext";
import Command from "./component/Command";
import ChromeStorageSync from "./component/ChromeStorageSync";
import Navbar from "./component/Navbar";
import Guide from "./component/Guide";

function App() {
	return (
		<CommandContextProvider>
			<CommandContextGroupProvider>
				<ChromeStorageSync>
					<MemoryRouter>
						<Navbar />
						<Routes>
							<Route
								path={routes.home}
								element={<Navigate to={routes.group} />}
							></Route>
							<Route path={routes.editor} element={<Command />} />
							<Route path={routes.group} element={<CommandGroup />} />
							<Route path={routes.guide} element={<Guide />} />
						</Routes>
					</MemoryRouter>
				</ChromeStorageSync>
			</CommandContextGroupProvider>
		</CommandContextProvider>
	);
}

export default App;
