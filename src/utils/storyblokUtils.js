import { camelCase } from 'lodash';

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
  // TODO: Use lodash where suitable, across whole project
  return camelCase(text);
}
