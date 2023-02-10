import { useCallback, useEffect, useState } from "react";

import type { Dispatch, SetStateAction } from "react";
import type { Option } from "@models/option";

export const usePeopleLocalStorage = (): {
  people: Option[];
  setPeople: Dispatch<SetStateAction<Option[]>>;
} => {
  const [people, setPeople] = useState<Option[]>([]);

  useEffect(() => {
    const localPeople = JSON.parse(
      window.localStorage.getItem("people") || "[]"
    ) as Option[];
    if (localPeople.length) setPeople(localPeople);
  }, []);

  const customOptionDispatch: Dispatch<SetStateAction<Option[]>> = useCallback(
    (people: Option[] | ((prev: Option[]) => Option[])) => {
      if (typeof people === "function") {
        setPeople((prev) => {
          const newPeople = people(prev);
          window.localStorage.setItem("people", JSON.stringify(newPeople));
          return newPeople;
        });
        return;
      }
      window.localStorage.setItem("people", JSON.stringify(people));
      setPeople(people);
    },
    []
  );

  return { people, setPeople: customOptionDispatch };
};
