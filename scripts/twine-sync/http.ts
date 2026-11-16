const USER_AGENT = "Mozilla/5.0 (compatible; portfolio-sync/1.0)";
const TIMEOUT_MS = 30_000;

async function get(url: string): Promise<Response> {
  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "*/*" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok)
    throw new Error(`GET ${url} failed with ${response.status}`);
  return response;
}

export async function fetchText(url: string): Promise<string> {
  return (await get(url)).text();
}

export async function fetchJson(url: string): Promise<unknown> {
  return (await get(url)).json();
}

export async function fetchBytes(url: string): Promise<Uint8Array> {
  return new Uint8Array(await (await get(url)).arrayBuffer());
}
