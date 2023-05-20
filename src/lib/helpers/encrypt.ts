import { AES } from "crypto-js";
import { SECRET_PASSWORD_KEY } from "~lib/utils/constants";

export function encrypt(message: string) {
  const cipherText = AES.encrypt(message, SECRET_PASSWORD_KEY).toString();
  return encodeURIComponent(cipherText);
}
