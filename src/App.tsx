function App() {
	const handleClick = () => {
		window.ipcRenderer.invoke("openBrowser");
	};

	return (
		<div>
			<h1>Hello World</h1>
			<button onClick={handleClick}>클릭!</button>
		</div>
	);
}

export default App;
