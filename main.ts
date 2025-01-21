async function getFullUrl(shortenedUrl: string): Promise<string> {
  try {
    // Send a HEAD request to follow redirects and get the final URL

    const response = await fetch(shortenedUrl, {
      method: "HEAD", // Specify the HTTP method as HEAD
      redirect: "follow", // Follow redirects
    });

    // Return the resolved final URL
    return response.url;
  } catch (error) {
    console.error(
      `Error resolving shortened URL: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    throw new Error("Failed to resolve shortened URL");
  }
}

function removeTrackingParameters(url: string): string {
  // Parse the URL using the URL class
  const parsedUrl = new URL(url);

  // Create a new URLSearchParams object from the parsed query
  const params = new URLSearchParams(parsedUrl.search);

  // Remove any query parameters starting with 'utm'
  params.forEach((_value: string, key: string) => {
    if (key.startsWith("utm")) {
      params.delete(key);
    }
  });

  // Rebuild the URL with the cleaned parameters
  parsedUrl.search = params.toString();

  return parsedUrl.toString();
}

export async function cleanUrl(url: string): Promise<string> {
  if (!url) {
    throw new Error("url is required");
  }

  // Step 1: Resolve the shortened URL to its full URL
  const fullUrl = await getFullUrl(url);
  console.log(`Resolved Full URL: ${fullUrl}`);

  // Step 2: Remove tracking parameters
  return removeTrackingParameters(fullUrl);
}
