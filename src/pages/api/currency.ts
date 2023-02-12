import type { NextApiRequest, NextApiResponse } from "next";
import countryToCurrency from "country-to-currency";
import ct from "countries-and-timezones";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { timezone: _timezone } = req.query as { timezone?: string };
    if (!_timezone) return res.status(400).json({ message: "Bad Request" });

    const timezone = ct.getTimezone(_timezone);
    const country = timezone?.countries[0];

    if (!country) return res.status(400).json({ message: "Could not match country with timezone" });

    const currency = countryToCurrency[country as keyof typeof countryToCurrency];

    res.status(200).json({ currency });
  } else {
    res.status(403).json({ message: "Forbidden Method" });
  }
}
