import fetch from "node-fetch";

export default async (url: string, setUp: any) =>
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(setUp),
  });
