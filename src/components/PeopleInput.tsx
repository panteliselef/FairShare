import clx from "classnames";
import type { KeyboardEventHandler } from "react";
import { useId, useState } from "react";

import CreatableSelect from "react-select/creatable";
import { usePeople } from "../contexts/PeopleContext";
import { getRandomColor } from "../utils/colors";

const _components = {
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
      unstyled
      classNames={{
        container: () => clx("border dark:border-zinc-700 rounded"),
        control: () =>
          clx("bg-white dark:bg-zinc-900 dark:text-white text-sm px-2 rounded"),
        multiValue: ({ data }) =>
          clx(`py-1 px-1.5 flex gap-1 rounded`, {
            "bg-pink-50 text-pink-700": data.color === "pink",
            "bg-red-50 text-red-700": data.color === "red",
            "bg-orange-50 text-orange-700": data.color === "orange",
            "bg-amber-50 text-amber-700": data.color === "amber",
            "bg-emerald-50 text-emerald-700": data.color === "emerald",
            "bg-cyan-50 text-cyan-700": data.color === "cyan",
            "bg-indigo-50 text-indigo-700": data.color === "indigo",
          }),

        valueContainer: () => clx("flex gap-2"),
      }}
      components={_components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => setPeople(newValue)}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder="Type your pal's name and press enter..."
      value={people}
    />
  );
};
