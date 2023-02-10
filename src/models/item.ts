import type { Option } from "@models/option";

export type Item = {
  cut: {
    price: number | undefined;
    people: Option[];
  }[];
};
