import { assertEquals } from "@std/assert";
import { cleanUrl } from "./main.ts";

Deno.test("cleanUrl should resolve and clean the URL", async () => {
  const originalUrl = "https://www.reddit.com/r/OutOfTheLoop/s/dCAs6uA82e";
  const expectedCleanedUrl =
    "https://www.reddit.com/r/OutOfTheLoop/comments/1hxamr7/whats_going_on_with_google_search_and_why_is/";

  const cleanedUrl = await cleanUrl(originalUrl);

  assertEquals(cleanedUrl, expectedCleanedUrl);
});
