import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./configs/db.js";
// import { Arcjet } from '@arcjet/node';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // log the requesting url


// apply arcjet
// app.use(async (req, res, next) => {
//     try {
//         const decision = await aj.decide(req, {requested:1});
//         if (decision.isDenied()) {
//             if (decision.reason.isRateLimit()) {
//                 res.status(429).json({success: false, message: "Rate limit exceeded"});
//             } else if (decision.reason.isBot()) {
//                 res.status(403).json({success: false, message: "Bot detected"});
//             } else {
//                 res.status(403).json({success: false, message: "Access denied"});
//             }
//             return
//         }
//         // check for spoofed bots
//         if (decision.results.some((result) => result.isBot() && result.reason.isSpoofed())) {
//             res.status(403).json({success: false, message: "Spoofed bot detected"});
//             return
//         }

//         next()
//     }
//     catch (error) {
//         console.log("Error applying arcjet", error);
//         next(error)
//     }
    
// })

app.use("/api/products", productRoutes);

async function initDB() {
    try {
        await sql `
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `
        console.log("Database initialized successfully");
    }
    catch (err) {
        console.log("Error connecting to database", err);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}`)
    }); 
});