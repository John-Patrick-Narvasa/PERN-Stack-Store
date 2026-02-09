import {neon} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;

// creates SQL connection useing env vars
export const sql = neon(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`);


