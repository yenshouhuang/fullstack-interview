// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// Assuming you're fetching an array of items from an external API
type Data = {
  items: any[]; // Adjust the type according to the actual data structure
};

export default async function fetchData(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = "https://www.common.com/cmn-api/listings/common"; // The URL of the external API

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Assuming 'data' is an array of items; adjust if the structure is different
    // Slice the array to get only the first 10 items
    const firstTenItems = data.slice(0, 10);

    // Send the first 10 items as a response
    res.status(200).json({ items: firstTenItems });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    res.status(500).json({ items: [] });
  }
}