import {
  useController,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import type {
  ControlProps,
  GroupBase,
  ValueContainerProps,
} from "react-select";
import Select, { components } from "react-select";
import type { Option } from "../contexts/PeopleContext";
import { usePeople } from "../contexts/PeopleContext";

import { Plus, Trash2 } from "react-feather";
import { useMemo } from "react";
import type { FC } from "react";
import type { FormValues } from "../contexts/Form";
import clx from "classnames";
import PersonAvatar from "./PersonAvatar";

const ValueContainer = ({
  children,
  ...props
}: ValueContainerProps<Option>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [values, input] = children as any;

  return (
    <components.ValueContainer {...props}>
      {/* {values} */}
      {Array.isArray(values) &&
        values.map((_, i) => (
          <PersonAvatar key={i} person={props.getValue()[i]!} />
        ))}

      {input}
    </components.ValueContainer>
  );
};

const PayersInput: FC<{ index: number }> = ({ index }) => {
  const { people } = usePeople();
  const { control } = useFormContext<FormValues>();

  const {
    field: { onChange, value },
  } = useController<FormValues>({
    control,
    name: `cut.${index}.people`,
  });

  return (
    <div className="h-full w-full shrink-0 grow basis-3/6">
      <label className="mb-2 block border-gray-200 bg-zinc-900 bg-transparent text-sm font-medium dark:text-white">
        People
      </label>
      <Select
        isMulti
        name="colors"
        components={{
          ValueContainer,
        }}
        value={(value || []) as Option[]}
        options={people}
        onChange={onChange}
        unstyled
        classNames={{
          container: () => clx("h-12"),
          control: (state: ControlProps<Option, true, GroupBase<Option>>) =>
            clx(
              state.isFocused
                ? "border-black dark:border-white"
                : "border-gray-200 dark:border-zinc-700",
              "w-full h-full rounded-md border-2 border-gray-200 pl-2  text-sm font-medium dark:bg-zinc-900 dark:text-white"
            ),
          indicatorsContainer: () => clx("text-zinc-900 dark:text-gray-200"),
          clearIndicator: () => clx("px-2 cursor-pointer hover:opacity-75"),
          dropdownIndicator: () => clx("px-2 cursor-pointer hover:opacity-75"),
          indicatorSeparator: () =>
            clx("bg-gray-200 dark:bg-zinc-700 px-[1px]"),

          valueContainer: () => clx("h-full flex gap-2"),
          menuList: () =>
            clx(
              "mt-2 border border-gray-100 bg-white overflow-hidden rounded-md py-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            ),
          option: () =>
            clx(
              "py-1 px-3 hover:bg-gray-100 hover:dark:bg-zinc-800 focus:dark:bg-zinc-800"
            ),
        }}
      />
    </div>
  );
};

const Results = () => {
  const { people } = usePeople();
  const values = useWatch<FormValues>();

  const peopleMap = useMemo(() => {
    const _peopleMap = {} as Record<string, number>;
    people.forEach((a) => (_peopleMap[a.value] = 0));

    values?.cut?.map((item) => {
      item?.people?.forEach((p) => {
        if (p.value) {
          _peopleMap[p.value] +=
            (item?.price || 0) / (item?.people?.length || 1);
        }
      });
    });

    return _peopleMap;
  }, [values, people]);

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="inline-block min-w-full p-1.5 align-middle">
          <div className="overflow-hidden rounded-lg border shadow dark:border-zinc-700 dark:shadow-zinc-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
              <thead>
                <tr className="divide-x divide-gray-200 dark:divide-zinc-700 dark:bg-zinc-900">
                  <th
                    scope="col"
                    className="w-3/5 px-6 py-3 text-left text-xs font-medium uppercase text-zinc-500"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="w-2/5 px-6 py-3 text-left text-xs font-medium uppercase text-zinc-500"
                  >
                    Pay
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
                {Object.entries(peopleMap).map(([k, v]) => (
                  <Row key={k} name={k} price={v} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const Row = ({ name, price }: { name: string; price: number }) => {
  const priceMemo = useMemo(() => {
    return Intl.NumberFormat("en-US", {
      currency: "EUR",
      style: "currency",
    }).format(price);
  }, [price]);

  return (
    <tr>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
        {name}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
        {priceMemo}
      </td>
    </tr>
  );
};

export const ItemForm = () => {
  const { control, handleSubmit, register } = useFormContext<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cut",
  });

  return (
    <form
      onSubmit={void handleSubmit((data) => console.log(data))}
      className="flex w-full flex-col gap-4"
    >
      <ul className="flex flex-col gap-4">
        {fields.map((item, index) => (
          <li key={item.id} className="flex h-full items-end gap-3">
            <div className="w-full basis-3/12">
              <label className="mb-2 block text-sm font-medium dark:text-white">
                Price
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="h-12 w-full rounded-md border-2 border-gray-200 px-4 pr-8 text-sm font-medium focus:border-black focus:outline-none focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white focus:dark:border-white focus:dark:ring-white"
                  placeholder="0.00"
                  {...register(`cut.${index}.price`)}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4">
                  <span className="text-zinc-500">€</span>
                </div>
              </div>
            </div>

            <PayersInput index={index} />

            <button
              className="h-12 rounded-md bg-red-600 px-1 text-white saturate-[75%] focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
              type="button"
              onClick={() => remove(index)}
            >
              <Trash2 width={20} />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex w-full flex-row-reverse">
        <button
          type="button"
          className="inline-flex grow items-center justify-center gap-2 rounded-md border border-transparent py-2 px-3 text-sm font-semibold text-blue-500 transition-all hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:grow-0"
          onClick={() => append({ price: undefined, people: [] })}
        >
          <Plus className="w-4" />
          New Item
        </button>
      </div>

      <Results />
    </form>
  );
};
