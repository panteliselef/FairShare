import {
  FormProvider,
  useController,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import type { ValueContainerProps } from "react-select";
import Select, { components } from "react-select";
import type { Option } from "../contexts/PeopleContext";
import { usePeople } from "../contexts/PeopleContext";

import { Plus } from "react-feather";
import type { FC } from "react";
import { useMemo } from "react";

const ValueContainer = ({
  children,
  ...props
}: ValueContainerProps<Option>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [values, input] = children as any;
  const val = (i: number) => props.getValue()?.[i]?.label;

  return (
    <components.ValueContainer {...props}>
      {/* {values} */}
      {Array.isArray(values) &&
        values.map((v, index) => (
          <span
            key={index}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-600"
          >
            <span className="text-xs font-medium leading-none text-white">
              {(val(index) as string).slice(0, 2)}
            </span>
          </span>
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
    <div className="w-full shrink-0 grow basis-3/6">
      <label className="mb-2 block text-sm font-medium dark:text-white">
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
        styles={{
          control: (base) => ({ ...base, minHeight: "46px" }),
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
    console.log("-peopleMap", _peopleMap);

    values?.cut?.map((item) => {
      item?.people?.forEach((p) => {
        if (p.value)
          _peopleMap[p.value] +=
            (item?.price || 0) / (item?.people?.length || 1);
      });
    });
    return _peopleMap;
  }, [values, people]);
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="inline-block min-w-full p-1.5 align-middle">
          <div className="overflow-hidden rounded-lg border shadow dark:border-gray-700 dark:shadow-gray-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="divide-x divide-gray-200 dark:divide-gray-700">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500"
                  >
                    Pay
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
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

type FormValues = {
  cut: {
    price: number | undefined;
    people: Option[];
  }[];
};

export const ItemForm = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      cut: [
        {
          price: 10,
          people: [{ value: "pantelis", label: "pantelis" }],
        },
      ],
    },
  });

  const { register, control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cut",
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={void handleSubmit((data) => console.log(data))}
        className="flex w-full flex-col gap-4"
      >
        <ul className="flex flex-col gap-4">
          {fields.map((item, index) => (
            <li key={item.id} className="flex items-end gap-4">
              <div className="w-full  basis-3/6">
                <label className="mb-2 block text-sm font-medium dark:text-white">
                  Price
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className=" w-full rounded-md border border-gray-200 py-3 px-4 pl-9 pr-16 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
                    placeholder="0.00"
                    {...register(`cut.${index}.price`)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4">
                    <span className="text-gray-500">€</span>
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4">
                    <span className="text-gray-500">EUR</span>
                  </div>
                </div>
              </div>

              <PayersInput index={index} />

              <button type="button" onClick={() => remove(index)}>
                x
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent py-2 px-3 text-sm font-semibold text-blue-500 transition-all hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => append({ price: undefined, people: [] })}
        >
          <Plus className="w-4" />
          New Item
        </button>

        <Results />
      </form>
    </FormProvider>
  );
};
