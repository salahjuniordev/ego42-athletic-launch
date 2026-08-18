import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

import { LANG_COOKIE, normalizeLang, type Lang } from "./config";

function readClientCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1] ?? "") : undefined;
}

/**
 * The single source of truth for the initial language.
 *
 * - Server: reads the request cookie. Available during the SSR *render* pass
 *   because TanStack Start wraps the render in an AsyncLocalStorage scope, so
 *   `<html lang>` in the shell is correct from the very first byte (no flash).
 * - Client: reads `document.cookie`.
 *
 * `getCookie` is referenced only inside `.server()`, so the Vite plugin
 * tree-shakes it out of the client bundle. Never call this at module top level
 * — the server ALS only exists during a request/render.
 */
export const getLangCookie = createIsomorphicFn()
  .server((): Lang => normalizeLang(getCookie(LANG_COOKIE)))
  .client((): Lang => normalizeLang(readClientCookie(LANG_COOKIE)));

/** Persists the language client-side for a year, site-wide. */
export function writeLangCookie(lang: Lang): void {
  document.cookie = `${LANG_COOKIE}=${lang};path=/;max-age=31536000;samesite=lax`;
}
