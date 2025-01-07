import { logEntry } from "./usageLogging";

const isDev = process.env.NODE_ENV === "development";

export default function handleErrorResponse(request: Request, error: any) {
  const { url, method, body } = request;

  const headers = error?.response?.config?.headers;
  const fullURL = error?.response?.config?.url;
  const data = error?.response?.config?.data;

  if (isDev) {
    console.warn(
      `===== START ERROR =====\n${url} ${method} => `,
      error?.response?.data || error?.message || error,
      { fullURL, body, data, headers },
      `\n===== END ERROR =====`
    );
  }

  const responseCode =
    error?.response?.status ||
    error?.header?.responseCode ||
    error.response?.data?.header?.responseCode ||
    400;

  const responseMessage =
    error?.header?.customerMessage ||
    error?.message ||
    error.response?.data?.header?.customerMessage ||
    error.response?.data?.message ||
    "Something went wrong";

  if (!isDev) {
    logEntry(
      { url, method, secretKey: undefined, password: undefined },
      { responseMessage, responseCode }
    );
  }

  return Response.json(
    { error: error.response?.data, message: responseMessage },
    { status: responseCode }
  );
}

export function handleNormalError(tag: string, error: any, payload?: any) {
  const responseCode =
    error?.response?.status ||
    error?.header?.responseCode ||
    error.response?.data?.header?.responseCode ||
    400;

  const responseMessage =
    error?.header?.customerMessage ||
    error?.message ||
    error.response?.data?.header?.customerMessage ||
    error.response?.data?.message ||
    "Something went wrong";

  if (isDev) console.warn(`${tag} ERROR =====> `, responseMessage);

  if (!isDev)
    logEntry(payload as Record<string, unknown>, {
      responseMessage,
      responseCode,
    });
}
