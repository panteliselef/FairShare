import { useForm, FormProvider as FormProviderHookForm } from "react-hook-form";

import type { FC, PropsWithChildren } from "react";
import type { Item } from "@models/item";

export const FormProvider: FC<PropsWithChildren> = ({ children }) => {
  const methods = useForm<Item>({
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
