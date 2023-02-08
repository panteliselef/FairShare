import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import type { Color } from "../utils/colors";
import { AVATARCOLORS, shuffleArray } from "../utils/colors";

import { createContext, useContext, useState } from "react";
import { getRandomColor } from "../utils/colors";

export interface Option {
  readonly label: string;
  readonly value: string;
  readonly color: Color;
  readonly avatarColors: string[];
}

const PeopleContext = createContext<{
  people: readonly Option[];
  setPeople: Dispatch<SetStateAction<readonly Option[]>>;
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
      color: getRandomColor(),
      avatarColors: shuffleArray(AVATARCOLORS),
    },
    {
      value: "john",
      label: "john",
      color: getRandomColor(),
      avatarColors: shuffleArray(AVATARCOLORS),
    },
    {
      value: "dimitris",
      label: "dimitris",
      color: getRandomColor(),
      avatarColors: shuffleArray(AVATARCOLORS),
    },
    {
      value: "babis",
      label: "babis",
      color: getRandomColor(),
      avatarColors: shuffleArray(AVATARCOLORS),
    },
  ]);
  return (
    <PeopleContext.Provider value={{ people, setPeople }}>
      {children}
    </PeopleContext.Provider>
  );
};
