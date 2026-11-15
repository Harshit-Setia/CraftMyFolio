import fs from "fs";
import path from "path";
import morgan from "morgan";

const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const accessLogStream = fs.createWriteStream(
  path.join(logDir, "access.log"),
  { flags: "a" }
);

const format =
  ":remote-addr - :method :url :status :res[content-length] - :response-time ms";

export const consoleLogger = morgan(format);
export const fileLogger = morgan(format, {
  stream: accessLogStream,
});