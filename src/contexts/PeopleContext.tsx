import { createContext, useContext } from "react";
import { usePeopleLocalStorage } from "@hooks/usePeopleLocalStorage";

import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import type { Option } from "@models/option";

const PeopleContext = createContext<{
  people: Option[];
  setPeople: Dispatch<SetStateAction<Option[]>>;
}>({
  people: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPeople: () => {},
});

export const usePeople = () => useContext(PeopleContext);

export const PeopleProvider: FC<PropsWithChildren> = ({ children }) => {
  const { people, setPeople } = usePeopleLocalStorage();

  return (
    <PeopleContext.Provider value={{ people, setPeople }}>
      {children}
    </PeopleContext.Provider>
  );
};
