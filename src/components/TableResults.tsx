import { useMemo } from "react";
import { useWatch } from "react-hook-form";

import { usePeople } from "@contexts/PeopleContext";
import { NoDataIllustration } from "@components/index";
import { useWithCurrency } from "@hooks/useCurrency";

import type { Item } from "@models/item";

export const TableResults = () => {
  const { people } = usePeople();
  const values = useWatch<Item>();

  const peopleMap = useMemo(() => {
    const _peopleMap = {} as Record<string, number>;
    people.forEach((a) => (_peopleMap[a.value] = 0));

    values?.cut?.map((item) => {
      item?.people?.forEach((p) => {
        if (p.value) {
          _peopleMap[p.value] += (item?.price || 0) / (item?.people?.length || 1);
        }
      });
    });

    return _peopleMap;
  }, [values, people]);

  const peopleExist = Object.entries(peopleMap).length > 0;

  if (!peopleExist) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-1.5">
        <NoDataIllustration className="mb-2 w-20 fill-gray-100 dark:fill-zinc-600" />
        <h2 className="mb-1 text-base font-medium text-zinc-900 dark:text-white">No people added</h2>
        <p className="text-sm text-zinc-500">Add names to view the results</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="inline-block min-w-full p-1.5 align-middle">
          <div className="overflow-hidden rounded-lg border shadow dark:border-zinc-700 dark:shadow-zinc-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
              <thead>
                <tr className="divide-x divide-gray-200 dark:divide-zinc-700 dark:bg-zinc-900">
                  <th scope="col" className="w-3/5 px-6 py-3 text-left text-xs font-medium capitalize text-zinc-500">
                    Name
                  </th>
                  <th scope="col" className="w-2/5 px-6 py-3 text-left text-xs font-medium capitalize text-zinc-500">
                    Pay
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
                {Object.entries(peopleMap).map(([k, v]) => (
                  <PersonRow key={k} name={k} price={v} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const PersonRow = ({ name, price }: { name: string; price: number }) => {
  const fmtPrice = useWithCurrency(price);

  return (
    <tr>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">{name}</td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">{fmtPrice}</td>
    </tr>
  );
};
