import { env } from "./config";
import { connectDatabase } from "./database";
import { setup } from "./setup";

(async () => {
  await connectDatabase();

  const app = setup();
  app.listen(env.PORT, () => {
    console.log("Server is running at: ", env.PORT);
  });
})();
