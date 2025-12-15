// import dotenv from "dotenv";
// import app from "./app.js";
// import connectDB from "./config/db.js";
// import seedEvents from "./utils/seed.js";

// dotenv.config();

// const port = process.env.PORT || 5000;

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     // Seed events - will add more if count is low
//     await seedEvents(process.env.FORCE_SEED === "true");
//     app.listen(port, () => {
//       console.log(`API ready on http://localhost:${port}`);
//     });
//   } catch (err) {
//     console.error("Failed to start server", err);
//     process.exit(1);
//   }
// };

// start();

import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import seedEvents from "./utils/seed.js";

dotenv.config();

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    if (process.env.FORCE_SEED === "true") {
      await seedEvents(true);
    }

    app.listen(port, () => {
      console.log(`API running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
};

start();
