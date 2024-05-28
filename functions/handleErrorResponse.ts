import { logEntry } from "./usageLogging";

const isDev = process.env.NODE_ENV === "development";

export default function handleErrorResponse(request: Request, error: any) {
  const { url, method } = request;

  if (isDev)
    console.warn(`${url} ${method} error =====>> `, error?.response?.data);

  const responseCode = error.response?.data?.header?.responseCode || 400;
  const responseMessage =
    error.response?.data?.message ||
    error.response?.data?.header?.customerMessage ||
    "Something went wrong";

  (async () => {
    if (!isDev)
      logEntry(
        {
          url,
          method,
          secretKey: undefined,
          password: undefined,
          phoneNumber: undefined,
          phone: undefined,
        },
        error.response?.data || error?.message
      );
  })();

  return Response.json(
    { error: error.response?.data, message: responseMessage },
    { status: responseCode }
  );
}

export function handleNormalError(tag: string, error: any, payload?: any) {
  const err =
    error.response?.data?.header?.customerMessage ||
    error.response?.data ||
    error.message;

  if (isDev) console.warn(`${tag}  error =====> `, err);

  if (!isDev) logEntry(payload as Record<string, unknown>, err);
}
