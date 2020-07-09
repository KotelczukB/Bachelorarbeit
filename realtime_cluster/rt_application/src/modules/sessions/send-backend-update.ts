import fetch from "node-fetch";

export default async (backendURL: string, body: string) => fetch(`${backendURL}/sessions`, {
  method: 'update',
  body,
})