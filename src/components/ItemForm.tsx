import { useFieldArray, useForm } from "react-hook-form";
import Select, {
  components,
  MultiValueGenericProps,
  ValueContainerProps,
} from "react-select";
import { Option, usePeople } from "../contexts/PeopleContext";

import { Plus } from "react-feather";

const ValueContainer = ({
  children,
  ...props
}: ValueContainerProps<Option>) => {
  let [values, input] = children as any;

  const val = (i: number) => values[i].props.children;

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

export const ItemForm = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      test: [
        {
          price: undefined,
          people: [],
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });
  const { people } = usePeople();

  console.log(people);

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="flex w-full flex-col gap-4"
    >
      <ul className="flex flex-col gap-4">
        {fields.map((item, index) => (
          <li key={item.id} className="flex items-end gap-4">
            {/* <input {...register(`test.${index}.firstName`)} />
            <Controller
              render={({ field }) => <input {...field} />}
              name={`test.${index}.lastName`}
              control={control}
            /> */}

            <div className="w-full  basis-3/6">
              <label className="mb-2 block text-sm font-medium dark:text-white">
                Price
              </label>
              <div className="relative">
                <input
                  type="text"
                  className=" w-full rounded-md border border-gray-200 py-3 px-4 pl-9 pr-16 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
                  placeholder="0.00"
                  {...register(`test.${index}.price`)}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4">
                  <span className="text-gray-500">€</span>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4">
                  <span className="text-gray-500">EUR</span>
                </div>
              </div>
            </div>

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
                options={people}
                styles={{
                  control: (base) => ({ ...base, minHeight: "46px" }),
                }}
              />
            </div>

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
        Append
      </button>

      {/* <button className="inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75">
        <span className="block rounded-sm bg-white px-8 py-3 text-sm font-medium hover:bg-transparent">
          Submit
        </span>
      </button> */}

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
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                      John Brown
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                      45
                    </td>
                  </tr>

                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                      Jim Green
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                      27
                    </td>
                  </tr>

                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                      Joe Black
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                      31
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
