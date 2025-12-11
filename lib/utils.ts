import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ActionResult<T> = { data?: T; error?: string };

export function safeAction<TArgs extends unknown[], TResult>(
  action: (...args: TArgs) => Promise<TResult>
) {
  return async (...args: TArgs): Promise<ActionResult<TResult>> => {
    try {
      const result = await action(...args);
      return { data: result };
    } catch (err) {
      console.error("[ServerActionError]", err);
      return { error: err instanceof Error ? err.message : "Something went wrong!" };
    }
  };
}