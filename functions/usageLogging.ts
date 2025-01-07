interface LogEntry {
  exactTime: string;
  timestamp: string;
  level: string;
  type: string;
  statusCode: number | string;
  status: string;
  message: string;
  payload: Record<string, unknown>;
}

type Response = {
  responseCode: number | string;
  responseMessage: string;
  timestamp?: string;
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

export const logEntry = (
  payload: Record<string, unknown>,
  { responseMessage, responseCode, timestamp }: Response
): void => {
  const localTimestamp = new Date().toISOString();
  const exactTime = new Date().toLocaleTimeString() || "";
  const errorCode = responseCode || "200";

  const logEntry: LogEntry = {
    exactTime,
    timestamp: timestamp ?? localTimestamp,
    level: "INFO",
    type: "stats",
    statusCode: responseCode || 400,
    status: errorCode == "200" || errorCode == "201" ? "SUCCESS" : "FAILURE", //
    message: responseMessage,
    payload,
  };

  const logMessage = logEntryToString(logEntry) || "[ERROR] Log Entry Failed]";

  if (!isDev) console.log(logMessage);
};
