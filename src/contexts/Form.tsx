import { useForm, FormProvider as FormProviderHookForm } from "react-hook-form";

import type { FC, PropsWithChildren } from "react";
import type { Item } from "@models/item";
import useFormPersist from "react-hook-form-persist";

export const FormProvider: FC<PropsWithChildren> = ({ children }) => {
  const methods = useForm<Item>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { watch, setValue } = methods;

  useFormPersist("fair-share", {
    watch, 
    setValue,
    storage: window.localStorage,
    exclude: ['baz']
  });

  return <FormProviderHookForm {...methods}>{children}</FormProviderHookForm>;
};
