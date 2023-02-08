import clx from "classnames";
import type { KeyboardEventHandler } from "react";
import { useId, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ControlProps, GroupBase, MultiValue } from "react-select";

import CreatableSelect from "react-select/creatable";
import type { FormValues } from "../contexts/Form";
import type { Option } from "../contexts/PeopleContext";
import { usePeople } from "../contexts/PeopleContext";
import { AVATARCOLORS, getRandomColor, shuffleArray } from "../utils/colors";

const _components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
  color: getRandomColor(),
  avatarColors: shuffleArray(AVATARCOLORS),
});

export const PeopleInput = () => {
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const { people, setPeople } = usePeople();

  const { setValue, getValues } = useFormContext<FormValues>();

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

  const onChange = (newValue: MultiValue<Option>) => {
    /**
     * In case we remove a person from `people` array
     * also delete them from the form
     */
    function removePeopleFromForm() {
      const items = getValues("cut");
      items.forEach(({ people: itemPeople }, index) => {
        const v = itemPeople || [];
        const filtered = v.filter((item) =>
          newValue.map((a) => a.value).includes(item.value)
        );
        setValue(`cut.${index}.people`, filtered);
      });
    }

    // perform actual update for people
    setPeople((old) => {
      if (old.length > newValue.length) {
        removePeopleFromForm();
      }
      return newValue;
    });
  };

  return (
    <CreatableSelect
      id={id}
      className="h-full w-full"
      unstyled
      classNames={{
        container: () => clx("h-12"),
        control: (state: ControlProps<Option, true, GroupBase<Option>>) =>
          clx(
            state.isFocused
              ? "border-black dark:border-white"
              : "border-gray-200 dark:border-zinc-700",
            "border-2 bg-white dark:bg-zinc-900 text-sm font-medium p-2 rounded-md dark:text-white"
          ),
        multiValue: ({ data }) =>
          clx(`py-1 px-1.5 flex gap-1 rounded`, {
            "bg-pink-50 text-pink-800": data.color === "pink",
            "bg-red-50 text-red-800": data.color === "red",
            "bg-amber-50 text-amber-800": data.color === "amber",
            "bg-emerald-50 text-emerald-800": data.color === "emerald",
            "bg-cyan-50 text-cyan-800": data.color === "cyan",
            "bg-indigo-50 text-indigo-800": data.color === "indigo",
            "bg-lime-50 text-lime-800": data.color === "lime",
            "bg-teal-50 text-teal-800": data.color === "teal",
            "bg-blue-50 text-blue-800": data.color === "blue",
            "bg-violet-50 text-violet-800": data.color === "violet",
          }),

        valueContainer: () => clx("flex gap-2"),
        indicatorsContainer: () =>
          clx(
            "p-2 text-zinc-900 dark:text-gray-200 cursor-pointer hover:opacity-75"
          ),
      }}
      components={_components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={onChange}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder="Type your pal's name and press enter..."
      value={people}
    />
  );
};
