import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send({ error: "method not allowed" });
  }
  console.log(req.body, "154");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, max-age=60, stale-while-revalidate=60"
  );

  res.status(200).json({
    title: "test",
  });
};
