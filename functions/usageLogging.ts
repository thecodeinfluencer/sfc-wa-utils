interface LogEntry {
  exactTime: string;
  timestamp: string;
  level: string;
  type: string;
  statusCode: number;
  status: string;
  message: string;
  payload: Record<string, unknown>;
}

type Response = {
  errorCode?: string;
  errorMessage?: string;
  message?: string;
  header: {
    responseCode: number;
    responseMessage: string;
    customerMessage: string;
    timestamp: string;
  };
};

const isDev = process.env.NODE_ENV === "development";

function logEntryToString(logEntry: LogEntry): string {
  const logString = `[${logEntry.timestamp}] [${logEntry.exactTime}] [${
    logEntry.level
  }] [TYPE: ${logEntry.type}] [STATUS_CODE: ${logEntry.statusCode}] [STATUS: ${
    logEntry.status
  }] [MESSAGE: "${logEntry.message}"] [PAYLOAD: ${JSON.stringify(
    logEntry.payload
  )}]\n`;

  return logString;
}

const logEntry = (
  payload: Record<string, unknown>,
  response: Response
): void => {
  const localTimestamp = new Date().toISOString();
  const exactTime = new Date().toLocaleTimeString() || "";
  const errorCode = `${response?.header?.responseCode}` || response?.errorCode;
  const headerMessage = `${response?.header?.responseMessage} . ${response?.header?.customerMessage}`;
  const responseMessage: string =
    headerMessage.length > 0
      ? headerMessage
      : response?.errorMessage ?? response?.message ?? "Something went wrong";

  const logEntry: LogEntry = {
    exactTime,
    timestamp: response?.header?.timestamp || localTimestamp,
    level: "INFO",
    type: "stats",
    statusCode: response?.header?.responseCode || 400,
    status: errorCode == "200" || errorCode == "201" ? "success" : "failure",
    message: responseMessage || "request failed",
    payload,
  };

  const logMessage = logEntryToString(logEntry) || "[ERROR] Log entry failed]";

  if (isDev) console.info(logMessage);
};

export { logEntry };
