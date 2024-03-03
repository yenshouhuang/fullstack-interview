// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  booking: string;
  listing: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
    const { background, roomDetails, confirmed, house, documentSigned } = req.body;
  res.status(200).json({ success: true, data: {message:"Booking Created", background, roomDetails, confirmed, house, documentSigned} });
}
