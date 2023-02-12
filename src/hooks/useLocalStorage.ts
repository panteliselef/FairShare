import { useCallback, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export const useLocalStorage = <T extends unknown[]>(key: string): {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
} => {
  const [_data, _setData] = useState<T>([] as unknown[] as T);

  useEffect(() => {
    const localData = JSON.parse(
      window.localStorage.getItem(key) || "[]"
    ) as T;
    if (localData.length) _setData(localData);
  }, [key]);

  const customOptionDispatch: Dispatch<SetStateAction<T>> = useCallback(
    (d: T | ((prev: T) => T)) => {
      if (typeof d === "function") {
        _setData((prev) => {
          const newData = d(prev);
          window.localStorage.setItem(key, JSON.stringify(newData));
          return newData;
        });
        return;
      }
      window.localStorage.setItem(key, JSON.stringify(d));
      _setData(d);
    },
    [key]
  );

  return { data: _data, setData: customOptionDispatch };
};
