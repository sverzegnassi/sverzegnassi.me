export function withWebpSupport(url) {
  if (!url.endsWith("/m/")) {
    url = url + "/m/";
  }
  return url;
}

// Ref. https://www.storyblok.com/faq/image-dimensions-assets-js
export function imageDimensions(url) {
  return {
    width: url.split("/")[5].split("x")[0],
    height: url.split("/")[5].split("x")[1],
  };
}

export function generateHeadingId(heading) {
  if (heading.type !== "heading") {
    return "";
  }

  const text = heading.content.map((part) => part.text || "").join("");

  // https://byby.dev/js-slugify-string
  return String(text)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
}
