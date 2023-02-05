import type { KeyboardEventHandler } from "react";
import { useId, useState } from "react";

import CreatableSelect from "react-select/creatable";
import { usePeople } from "../contexts/PeopleContext";
import { getRandomColor } from "../utils/colors";

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
  color: getRandomColor(),
});

export const PeopleInput = () => {
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const { people, setPeople } = usePeople();

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setPeople((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  return (
    <CreatableSelect
      id={id}
      className="w-full"
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => setPeople(newValue)}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder="Type something and press enter..."
      value={people}
    />
  );
};
