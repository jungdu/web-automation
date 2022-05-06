import { useState } from "react";

export default function useInput(initValue: string = "") {
	const [value, setValue] = useState(initValue);

	const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value);
	};

	return { value, handleChange };
}
