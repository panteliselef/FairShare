import clx from "classnames";
import type { KeyboardEventHandler } from "react";
import { useId, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ControlProps, GroupBase, MultiValueProps } from "react-select";
import { components, MultiValue } from "react-select";

import CreatableSelect from "react-select/creatable";
import type { FormValues } from "../contexts/Form";
import type { Option } from "../contexts/PeopleContext";
import { usePeople } from "../contexts/PeopleContext";
import PersonAvatar from "./PersonAvatar";

const MultiValue = ({ children, ...props }: MultiValueProps<Option>) => {
  return (
    <components.MultiValue {...props}>
      <div className="relative flex h-full items-center pl-8 pr-2">
        <div className="absolute left-0 -translate-x-1/4">
          <PersonAvatar size={32} person={props.data} />
        </div>
        {props.data.label}
      </div>
    </components.MultiValue>
  );
};

const _components = {
  DropdownIndicator: null,
  MultiValue,
};

const createOption = (label: string) => ({
  label,
  value: label,
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
        container: () => clx("min-h-[48px] flex flex-col"),
        control: (state: ControlProps<Option, true, GroupBase<Option>>) =>
          clx(
            state.isFocused
              ? "border-black dark:border-white"
              : "border-gray-200 dark:border-zinc-700",
            "grow border bg-white dark:bg-zinc-900 text-sm font-medium p-2 rounded-md dark:text-white"
          ),
        multiValue: () =>
          clx(
            `flex gap-1  overflow-y-hidden rounded bg-gray-200 dark:bg-black h-7 pr-1.5`
          ),

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
