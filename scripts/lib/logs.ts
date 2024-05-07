const reportLogRegex = /REPORT RequestId: (.+)\tDuration: (.+) ms\tBilled Duration: (.+) ms\tMemory Size: (.+) MB\tMax Memory Used: (.+?) MB\t(Init Duration: (.+) ms\t)?$/;
export function parseLogs(logsBase64: string) {
  const logs = atob(logsBase64);
  const split = logs.split('\n');
  const report = split.find((line) => line.startsWith('REPORT'));
  if (!report) {
    throw new Error('No report found in logs');
  }
  return parseReportLog(report);
}

function parseReportLog(log: string) {
  const match = log.match(reportLogRegex);
  if (!match) {
    throw new Error('Could not parse report log');
  }

  const [
    _,
    requestId,
    durationStr,
    billedDurationStr,
    memorySizeStr,
    maxMemoryUsedStr,
    _initDurationStr,
    initDurationStr,
  ] = match;


  return {
    requestId,
    duration: Number(durationStr),
    billedDuration: Number(billedDurationStr),
    memorySize: Number(memorySizeStr),
    maxMemoryUsed: Number(maxMemoryUsedStr),
    initDuration: Number(initDurationStr),
  };
}
