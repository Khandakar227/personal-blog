import { writable } from "svelte/store";

/**
 * @type {import("svelte/store").Writable<{
 * user: import("firebase/auth").User,
 * status: "not-loaded" | "loading" | "loaded"
 * };>}
 */
export const currentUser = writable({ user: null, status: "not-loaded" });
