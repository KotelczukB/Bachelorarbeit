import fetch from "node-fetch";

export default async (backend_url: string, body: string) => fetch(`${backend_url}/sessions`, {
  method: 'update',
  body,
})