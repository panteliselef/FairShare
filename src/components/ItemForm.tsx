import { useController, useFieldArray, useFormContext } from "react-hook-form";
import Select, { components } from "react-select";
import { Plus, Trash2 } from "react-feather";
import clx from "classnames";

import { PersonAvatar } from "@components";

import type { ControlProps, GroupBase, ValueContainerProps } from "react-select";
import type { FC } from "react";
import type { Item } from "@models/item";
import type { Option } from "@models/option";
import { usePeople } from "@contexts/PeopleContext";
import { useCurrency } from "@hooks/useCurrency";
import classNames from "classnames";

const ValueContainer = ({ children, ...props }: ValueContainerProps<Option>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [values, input] = children as any;

  return (
    <components.ValueContainer {...props}>
      <div className="flex w-full">
        <div className="flex h-full -space-x-3 overflow-auto">
          {Array.isArray(values) &&
            values.map((_, i) => <PersonAvatar key={i} withBorder={true} person={props.getValue()[i]!} />)}
        </div>

        {input}
      </div>
    </components.ValueContainer>
  );
};

const PayersInput: FC<{ index: number }> = ({ index }) => {
  const { people } = usePeople();
  const { control } = useFormContext<Item>();

  const {
    field: { onChange, value },
  } = useController<Item>({
    control,
    name: `cut.${index}.people`,
  });

  return (
    <div className="h-full w-full shrink-0 grow basis-3/6">
      <label className="mb-2 block border-gray-200 bg-zinc-900 bg-transparent text-sm font-medium dark:text-white">
        People
      </label>
      <Select
        instanceId="payers-input"
        isMulti
        name="colors"
        components={{
          ValueContainer,
        }}
        value={(value || []) as Option[]}
        options={people}
        onChange={onChange}
        isSearchable={false}
        unstyled
        classNames={{
          container: () => clx("min-h-[48px] flex flex-col"),
          control: (state: ControlProps<Option, true, GroupBase<Option>>) =>
            clx(
              state.isFocused ? "border-black dark:border-white" : "border-gray-200 dark:border-zinc-700",
              "grow w-full h-full rounded-md border border-gray-200 pl-2 text-sm font-medium dark:bg-zinc-900 dark:text-white"
            ),
          indicatorsContainer: () => clx("text-zinc-900 dark:text-gray-200"),
          clearIndicator: () => clx("px-2 cursor-pointer hover:opacity-75"),
          dropdownIndicator: () => clx("px-2 cursor-pointer hover:opacity-75"),
          indicatorSeparator: () => clx("bg-gray-200 dark:bg-zinc-700"),
          menuList: () =>
            clx(
              "mt-2 border border-gray-100 bg-white overflow-hidden rounded-md py-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            ),
          option: () => clx("py-1 px-3 hover:bg-gray-100 hover:dark:bg-zinc-800 focus:dark:bg-zinc-800"),
        }}
      />
    </div>
  );
};

export const ItemForm = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext<Item>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cut",
  });

  const { currencySymbol } = useCurrency();

  return (
    <form onSubmit={void handleSubmit((data) => console.log(data))} className="flex w-full flex-col gap-4">
      <ul className="flex flex-col gap-4">
        {fields.map((item, index) => (
          <li key={item.id} className="flex h-full items-end gap-3">
            <div className="w-full basis-3/12">
              <label className="mb-2 block text-sm font-medium dark:text-white">Price</label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  className={classNames(
                    `h-12 w-full rounded-md border px-4 pr-8 text-sm font-medium  focus:outline-none focus:ring-black dark:bg-zinc-900 dark:text-white focus:dark:ring-white`,
                    {
                      "border-gray-200 focus:border-black dark:border-zinc-700 focus:dark:border-white ":
                        !errors?.cut?.[index]?.price?.message,
                      "border-red-500 focus:border-red-600": errors?.cut?.[index]?.price?.message,
                    }
                  )}
                  placeholder="0.00"
                  {...register(`cut.${index}.price`, {
                    validate(v) {
                      if (typeof v === "undefined" || isNaN(v)) return "Invalid number";
                      return true;
                    },
                    setValueAs(value) {
                      if (typeof value === "number") return value;
                      return Number((value as string)?.replaceAll(",", "."));
                    },
                  })}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4">
                  <span className="text-zinc-500">{currencySymbol}</span>
                </div>
              </div>
            </div>

            <PayersInput index={index} />

            <button
              className="h-12 rounded-md border border-transparent px-1 text-white transition-all hover:border-red-500 saturate-[75%] focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
              type="button"
              onClick={() => remove(index)}
            >
              <Trash2 width={20} className="text-red-600" />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex w-full flex-row-reverse">
        <button
          type="button"
          className={classNames([
            `inline-flex grow items-center justify-center gap-2 rounded-md py-2 px-3 transition-all lg:grow-0`,
            `text-sm font-medium`,
            `border border-black bg-black text-white hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white`,
            `focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:focus:ring-white`,
          ])}
          onClick={() => append({ price: undefined, people: [] })}
        >
          <Plus className="w-4" />
          New Item
        </button>
      </div>
    </form>
  );
};
