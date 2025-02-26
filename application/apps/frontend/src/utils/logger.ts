type CONSOLE = keyof Pick<
  typeof console,
  "log" | "warn" | "error" | "info" | "debug"
>;

type LoggerPayload = {
  type: CONSOLE;
  message: string;
};

export const logger = ({ type, message }: LoggerPayload) => {
  if (import.meta.env.MODE === "production") return;

  const logFn = console[type];

  if (typeof logFn === "function") {
    logFn(message);
  }
};
