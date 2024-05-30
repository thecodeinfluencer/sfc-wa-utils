import crypto from "node:crypto";

// Not insecure
const key2Base64 = "QkZKeTBENTcydXNxNVZ3aA==";
const iv2Base64 = "emhUNzg3bTJZSFpiVG1keQ==";

export const getAlgorithm = (
  keyBase64: WithImplicitCoercion<string>
): string => {
  const key = Buffer.from(keyBase64, "base64");

  switch (key.length) {
    case 16:
      return "aes-128-cbc";
    case 32:
      return "aes-256-cbc";
    default:
      throw new Error("Invalid key length: " + key.length);
  }
};

export default function unspice(cipherText: string): string {
  const algorithm = getAlgorithm(key2Base64);
  const key = Buffer.from(key2Base64, "base64");
  const iv = Buffer.from(iv2Base64, "base64");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(
    cipherText || "hZHgOYbd2zg95LeESbasoA==",
    "base64",
    "utf8"
  );
  decrypted += decipher.final("utf8");

  return decrypted;
}
