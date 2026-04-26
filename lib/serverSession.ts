import { auth } from "./authInstance";
import type { Session } from "next-auth";

export async function getAuthSession(): Promise<Session | null> {
  return await auth();
}
