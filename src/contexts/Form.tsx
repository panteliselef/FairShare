import type { FC, PropsWithChildren } from "react";
import { useForm, FormProvider as FormProviderHookForm } from "react-hook-form";
import type { Option } from "./PeopleContext";

export type FormValues = {
  cut: {
    price: number | undefined;
    people: Option[];
  }[];
};

export const FormProvider: FC<PropsWithChildren> = ({ children }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      cut: [
        {
          price: undefined,
          people: [],
        },
      ],
    },
  });

  return <FormProviderHookForm {...methods}>{children}</FormProviderHookForm>;
};
