// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  items: any[];
};

export default async function fetchData(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = "https://www.common.com/cmn-api/listings/common"; // The URL of the API

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Slice the array to get only the first 10 items
    const firstTenItems = data.slice(0, 10);
    // Send the first 10 items as a response
    res.status(200).json({ items: firstTenItems });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    res.status(500).json({ items: [] });
  }
}
