/* eslint-disable */
console.log("env", process.env.NODE_ENV);
// export const api = process.env.NODE_ENV == "production" ? "/api" : "http://localhost:3124/api";
export const api = process.env.NODE_ENV == "production" ? "/api" : "http://127.0.0.1:3124/api";
