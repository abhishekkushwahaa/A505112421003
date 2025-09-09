const LOGGING_API_URL = "http://20.244.56.144/evaluation-service/logs";

const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhYmhpc2hlay5rdXNod2FoYTFAcy5hbWl0eS5lZHUiLCJleHAiOjE3NTc0MDMzMzUsImlhdCI6MTc1NzQwMjQzNSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImNmZDdkNTIwLWI4NjItNDAxNS1iYTlmLTM2ZTNkNDc5ZTRlNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFiaGlzaGVrIGt1c2h3YWhhIiwic3ViIjoiNWEyMGZiM2ItNTM3MS00MTc5LWE1MmUtZDE2MDRlNGYzNjY2In0sImVtYWlsIjoiYWJoaXNoZWsua3VzaHdhaGExQHMuYW1pdHkuZWR1IiwibmFtZSI6ImFiaGlzaGVrIGt1c2h3YWhhIiwicm9sbE5vIjoiYTUwNTExMjQyMTAwMyIsImFjY2Vzc0NvZGUiOiJUcUZuakgiLCJjbGllbnRJRCI6IjVhMjBmYjNiLTUzNzEtNDE3OS1hNTJlLWQxNjA0ZTRmMzY2NiIsImNsaWVudFNlY3JldCI6InVYYVVNS1dwYldYa0puTXYifQ.KGWiJrFxjQBxxWh455uiDepcSAyMNo5i8OS7a7vDh_Q";

const validateLogData = (stack, level, pkg) => {
  const allowedStacks = ["backend", "frontend"];
  const allowedLevels = ["debug", "info", "warn", "error", "fatal"];
  const backendPackages = [
    "cache",
    "controller",
    "cron_job",
    "db",
    "domain",
    "handler",
    "repository",
    "route",
    "service",
  ];
  const frontendPackages = [
    "api",
    "component",
    "hook",
    "page",
    "state",
    "style",
  ];
  const commonPackages = ["auth", "config", "middleware", "utils"];

  if (!allowedStacks.includes(stack)) {
    console.error(
      `Invalid stack: ${stack}. Must be one of ${allowedStacks.join(", ")}`
    );
    return false;
  }

  if (!allowedLevels.includes(level)) {
    console.error(
      `Invalid level: ${level}. Must be one of ${allowedLevels.join(", ")}`
    );
    return false;
  }

  const allowedPackages = [
    ...commonPackages,
    ...(stack === "backend" ? backendPackages : frontendPackages),
  ];

  if (!allowedPackages.includes(pkg)) {
    console.error(
      `Invalid package: ${pkg} for stack: ${stack}. Must be one of ${allowedPackages.join(
        ", "
      )}`
    );
    return false;
  }

  return true;
};

const Log = async (stack, level, pkg, message) => {
  const lowerStack = stack.toLowerCase();
  const lowerLevel = level.toLowerCase();
  const lowerPkg = pkg.toLowerCase();

  if (!validateLogData(lowerStack, lowerLevel, lowerPkg)) {
    return;
  }

  const requestBody = {
    stack: lowerStack,
    level: lowerLevel,
    package: lowerPkg,
    message,
  };

  try {
    const response = await fetch(LOGGING_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Failed to send log. Status: ${response.status}, Response: ${errorText}`
      );
      return;
    }

    const data = await response.json();
    console.log("Log sent successfully:", data);
  } catch (error) {
    console.error("Error sending log to API:", error);
  }
};

module.exports = { Log };
