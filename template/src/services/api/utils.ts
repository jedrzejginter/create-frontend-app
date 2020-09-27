import { AxiosResponse } from "axios";

export function isAxiosError(
  err: unknown,
): err is Error & { response: AxiosResponse<{ errors?: Record<string | "general", string> }> } {
  return err instanceof Error && "response" in err;
}

export function getErrorMessage(err: unknown, fallbackMessage: string): string {
  if (isAxiosError(err)) {
    const res = err.response;

    if (res.data.errors) {
      return res.data.errors.general ?? fallbackMessage;
    }
  }

  return fallbackMessage;
}
