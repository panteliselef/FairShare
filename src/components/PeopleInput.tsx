import clx from "classnames";
import { useId, useState } from "react";
import { useFormContext } from "react-hook-form";
import { components, MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

import { PersonAvatar } from "@components";
import { usePeople } from "@contexts/PeopleContext";

import type { KeyboardEventHandler } from "react";
import type { ControlProps, GroupBase, MultiValueProps } from "react-select";
import type { Item } from "@models/item";
import type { Option } from "@models/option";

const MultiValue = (props: MultiValueProps<Option>) => {
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

  const { setValue, getValues } = useFormContext<Item>();
  const [errorMsg, setErrorMsg] = useState("");

  const canCreateOption = (value: string) => {
    const peopleSet = new Set(people.map((a) => a.value));
    return !peopleSet.has(value);
  };

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        if (!canCreateOption(inputValue)) {
          setErrorMsg("Person already exists, please use a different name.");
          return;
        }

        setPeople((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        setErrorMsg("");
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
        const filtered = v.filter((item) => newValue.map((a) => a.value).includes(item.value));
        setValue(`cut.${index}.people`, filtered);
      });
    }

    // perform actual update for people
    setPeople((prev) => {
      if (prev.length > newValue.length) {
        removePeopleFromForm();
      }
      return newValue as Option[];
    });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <CreatableSelect
        id={id}
        instanceId={id}
        className="h-full w-full"
        unstyled
        classNames={{
          container: () => clx("min-h-[48px] flex flex-col"),
          control: (state: ControlProps<Option, true, GroupBase<Option>>) =>
            clx(
              state.isFocused ? "border-black dark:border-white" : "border-gray-200 dark:border-zinc-700",
              "grow border bg-white dark:bg-zinc-900 text-sm font-medium p-2 rounded-md dark:text-white"
            ),
          multiValue: () => clx(`flex gap-1 overflow-y-hidden rounded bg-gray-200 dark:bg-black h-7 pr-1.5`),

          valueContainer: () => clx("flex gap-2"),
          indicatorsContainer: () => clx("p-2 text-zinc-900 dark:text-gray-200 cursor-pointer hover:opacity-75"),
        }}
        components={_components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={onChange}
        onInputChange={(newValue) => {
          setInputValue(newValue);
          setErrorMsg("");
        }}
        onKeyDown={handleKeyDown}
        placeholder="Type your pal's name and press enter..."
        value={people}
      />
      {errorMsg && <div className="text-sm text-zinc-800 dark:text-zinc-300">{errorMsg}</div>}
    </div>
  );
};
