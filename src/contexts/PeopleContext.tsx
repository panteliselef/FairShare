import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export interface Option {
  readonly label: string;
  readonly value: string;
}

const PeopleContext = createContext<{
  people: readonly Option[];
  setPeople: React.Dispatch<React.SetStateAction<readonly Option[]>>;
}>({
  people: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPeople: () => {},
});

export const usePeople = () => useContext(PeopleContext);

export const PeopleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [people, setPeople] = useState<readonly Option[]>([
    {
      value: "pantelis",
      label: "pantelis",
    },
    {
      value: "john",
      label: "john",
    },
    {
      value: "dimitris",
      label: "dimitris",
    },
    {
      value: "babis",
      label: "babis",
    },

  ]);
  return (
    <PeopleContext.Provider value={{ people, setPeople }}>
      {children}
    </PeopleContext.Provider>
  );
};
