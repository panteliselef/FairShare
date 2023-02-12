import { useEffect, useMemo, useState } from "react";

async function fetchCurrency(timezone: string) {
  const { currency } = await fetch(`/api/currency?timezone=${timezone}`).then(
    (res) => res.json() as Promise<{ currency: string }>
  );

  return currency;
}

function retrieveCurrencySymbol(currency: string) {
  const currencySymbol = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(1);

  const r = new RegExp(/[^0-9\s]+/g);
  const arr = r.exec(currencySymbol);
  return arr?.[0] || "";
}

const cache: Record<string, unknown> = {};
const fetching: Record<string, boolean> = {};

export const useCurrency = () => {
  const [currencySymbol, setCurrencySymbol] = useState("€");
  const [currency, setCurrency] = useState("EUR");
  const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  useEffect(() => {
    let ignore = false;

    if (cache[timezone] || fetching[timezone]) return;

    fetching[timezone] = true;

    fetchCurrency(timezone)
      .then((currency) => {
        if (!ignore) {
          cache[timezone] = currency;
          setCurrencySymbol(retrieveCurrencySymbol(currency));
          setCurrency(currency);
        }
      })
      .catch((e) => {
        if(process.env.NODE_ENV !== 'production') console.error(e);
      })
      .finally(() => (fetching[timezone] = false));

    return () => {
      ignore = true;
    };
  }, [timezone]);

  return {
    currencySymbol,
    currency,
  };
};

export const useWithCurrency = (price: number) => {
  const { currency } = useCurrency();

  return useMemo(() => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(price);
  }, [currency, price]);
};
