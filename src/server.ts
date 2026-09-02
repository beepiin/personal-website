import type { ServerEntry } from "@tanstack/react-start/server-entry";

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const handler = await getServerEntry();
    return (handler.fetch as (...args: unknown[]) => unknown)(request, env, ctx);
  },
};
