/* eslint-disable @typescript-eslint/no-unused-vars */
import Next from "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_GENERATIVE_AI_API_KEY: string;
    }
  }
}
