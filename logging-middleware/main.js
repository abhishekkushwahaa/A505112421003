const { Log } = require("./log.js");

const processUserRequest = async (request) => {
  try {
    await Log(
      "backend",
      "info",
      "handler",
      `Processing request for user ID: ${request.userId}`
    );

    if (request.dataMismatch) {
      await Log(
        "backend",
        "error",
        "handler",
        "Data type mismatch: expected bool."
      );
      throw new Error("Data type mismatch");
    }

    await Log("backend", "info", "service", "Request processed successfully.");
  } catch (err) {
    await Log("backend", "fatal", "handler", `Critical error: ${err.message}`);
  }
};

const run = async () => {
  console.log("Simulating a successful request...");
  await processUserRequest({ userId: 123, dataMismatch: false });

  console.log("\nSimulating a request with a data type error...");
  await processUserRequest({ userId: 456, dataMismatch: true });

  console.log("\nScript finished.");
};

run();
