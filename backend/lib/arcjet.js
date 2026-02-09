import arcjet, { tokenBucket, shield, detectBot} from "@arcjet/node";

import dotenv from "dotenv";
dotenv.config();

// init arcjet

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        // shield is for protecting against SQL injection, XSS, and CSRF attacks
        shield({mode: "LIVE"}),
        // bot detection
        detectBot({
            mode: "LIVE",
            allow:[
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),
        // rate limiting
        tokenBucket({
            mode: "LIVE",
            refillRate: 5, // tokens per interval
            interval: 10, // seconds
            capacity: 10 // tokens
        })
    ]
})