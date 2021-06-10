import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

/**
 * Promisifies the scrypt function
 */
const scryptAsync = promisify(scrypt);

/**
 * Defines the Password Manager Service
 */
export class PasswordManager {
  /**
   * Handles hashing the provided string
   */
  static async hash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buffer.toString("hex")}.${salt}`;
  }

  /**
   * Handles comparing the stored password with the supplied password
   */
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buffer.toString("hex") === hashedPassword;
  }
}
