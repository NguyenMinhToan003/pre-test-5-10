/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

type CustomOptions = RequestInit & {
  baseUrl?: string;
};
class HttpError extends Error {
  status: number;
  payload: any;

  constructor({ status, payload }: { status: number; payload: any }) {
    super("HTTP error");
    this.status = status;
    this.payload = payload;
  }
}

const request = async <Response>(
  method: "GET" | "POST" | "DELETE" | "PUT",
  url: string,
  option?: CustomOptions
) => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(option?.headers || {}),
    };
    const body = option?.body ? JSON.stringify(option.body) : undefined;
    delete option?.body;

    const res = await fetch(url, {
      method,
      headers,
      body,
      credentials: "include",
      ...option,
    });

    const payload = (await res.json()) as Response;
    const data = {
      status: res.status,
      payload,
    };

    if (!res.ok) {
      toast.error(payload?.message || "Something went wrong");
      throw new HttpError({ status: res.status, payload });
    }
    return data;
  } catch (error) {
    throw new HttpError({ status: 500, payload: error });
  }
};

export const http = {
  get: <Response>(url: string, options?: CustomOptions) =>
    request<Response>("GET", url, options),
  post: <Response>(url: string, body: any, options?: CustomOptions) =>
    request<Response>("POST", url, { ...options, body }),
  put: <Response>(url: string, body: any, options?: CustomOptions) =>
    request<Response>("PUT", url, { ...options, body }),
  delete: <Response>(url: string, options?: Omit<CustomOptions, "body">) =>
    request<Response>("DELETE", url, options),
};
