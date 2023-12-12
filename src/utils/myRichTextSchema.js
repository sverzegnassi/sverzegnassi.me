import { RichTextSchema } from "@storyblok/astro";
import cloneDeep from "clone-deep";
import { generateHeadingId } from "./storyblokUtils";
import { imageDimensions } from "./storyblokUtils";

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function myRichTextSchema() {
  // Customize default Storyblok Rich text schema
  let mySchema = cloneDeep(RichTextSchema);

  // Bold is strong
  mySchema.marks.bold = function () {
    return {
      tag: "strong",
    };
  };

  // Italic is em
  mySchema.marks.italic = function () {
    return {
      tag: "em",
    };
  };

  // Fix link attributes
  mySchema.marks.link = function (node) {
    if (!node.attrs) {
      return {
        tag: "",
      };
    }

    const attrs = { ...node.attrs };
    const { linktype = "url" } = node.attrs;
    delete attrs.linktype;

    if (attrs.href) {
      attrs.href = escapeHtml(node.attrs.href || "");
    }

    if (linktype === "email") {
      attrs.href = `mailto:${attrs.href}`;
    }

    if (attrs.anchor) {
      attrs.href = `${attrs.href}#${attrs.anchor}`;
      delete attrs.anchor;
    }

    if (linktype === "url") {
      attrs["ref"] = "noopener nofollow";
      attrs["target"] = "_blank";
      attrs["class"] = "link--ext";
    }

    if (attrs.custom) {
      for (const key in attrs.custom) {
        attrs[key] = attrs.custom[key];
      }
      delete attrs.custom;
    }

    // Default Storyblok schema seems to forget about these
    if (attrs.linktype) {
      delete attrs.linktype;
    }

    if (attrs.story) {
      delete attrs.story;
    }

    if (attrs.uuid) {
      delete attrs.uuid;
    }

    return {
      tag: [
        {
          tag: "a",
          attrs: attrs,
        },
      ],
    };
  };

  // Customize image node
  mySchema.nodes.image = function (node) {
    const imgSize = imageDimensions(node.attrs.src)

    return {
      html: `
        <figure>
          <img
            ${node.attrs.src ? 'src="' + node.attrs.src + '/m/"' : ""}
            ${node.attrs.alt ? 'alt="' + node.attrs.alt + '"' : ""}
            loading="lazy" 
            width="${imgSize.width}"
            height="${imgSize.height}"
            class="rich-text--img"
          >
          ${node.attrs.title ? '<figcaption>' + node.attrs.title + '</figcaption>' : ""}
        </figure>
      `
    }
  }

  // Add `id` attribute to headings. Quite hackish...
  mySchema.nodes.heading = function (node) {
    return {
      tag: `h${node.attrs.level} id="${generateHeadingId(node)}"`,
    }
  }

  return mySchema;
}
