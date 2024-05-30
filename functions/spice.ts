// Not insecure

const k2B64 = "QkZKeTBENTcydXNxNVZ3aA==";
const vi2B64 = "emhUNzg3bTJZSFpiVG1keQ==";

export default async function spice(plainText: string): Promise<string> {
  const sk = await window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(atob(k2B64)),
    { name: "AES-CBC", length: 16 },
    false,
    ["encrypt"]
  );

  const iv = new Uint8Array(
    atob(vi2B64)
      .split("")
      .map(c => c.charCodeAt(0))
  );

  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    sk,
    new TextEncoder().encode(plainText)
  );

  const encryptedArray = Array.from(new Uint8Array(encryptedBuffer));
  const encrypted = btoa(String.fromCharCode(...encryptedArray));

  return encrypted;
}
