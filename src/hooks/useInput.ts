import { useState } from "react";

export default function useInput<T>(initValue: string = "") {
	const [value, setValue] = useState(initValue);

	const handleChange = (
		e: React.FormEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setValue(e.currentTarget.value);
	};

	return { value, setValue, handleChange };
}
