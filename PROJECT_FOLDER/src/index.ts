import { createApp } from "./createApp";
import { config } from "dotenv";

config();

const app = createApp();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
