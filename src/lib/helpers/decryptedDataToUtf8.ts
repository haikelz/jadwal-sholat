import { AES, enc } from "crypto-js";
import { SECRET_PASSWORD_KEY } from "~lib/utils/constants";

export function decryptedDataToUtf8(message: string) {
  const decoded = decodeURIComponent(message);
  return AES.decrypt(decoded, SECRET_PASSWORD_KEY).toString(enc.Utf8);
}
