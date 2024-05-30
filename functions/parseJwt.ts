export default function parseJwt(token: string): {} {
  if (!token || token == "null") return {};
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}
