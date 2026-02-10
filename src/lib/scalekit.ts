import { Scalekit } from "@scalekit-sdk/node";

export function getScalekit() {
  return new Scalekit(
    process.env.SCALEKIT_ENVIRONMENT_URL!,
    process.env.SCALEKIT_CLIENT_ID!,
    process.env.SCALEKIT_CLIENT_SECRET!
  );
}
