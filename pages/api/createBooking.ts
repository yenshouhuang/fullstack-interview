// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  booking: string;
  listing: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    const { listing } = req.body;
  res.status(200).json({ booking: "Booking created", listing: listing.address.fullAddress});
}
