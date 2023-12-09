import { RichTextSchema } from "@storyblok/astro";
import cloneDeep from "clone-deep";

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Taken from: https://github.com/storyblok/storyblok-js-client/blob/main/src/schema.ts#L4
const pick = function (attrs, allowed) {
	const h = {}

	for (const key in attrs) {
		const value = attrs[key]
		if (allowed.indexOf(key) > -1 && value !== null) {
			h[key] = value
		}
	}
	return h
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
    return {
      html: `
        <figure>
          <img
            ${node.attrs.src ? 'src="' + node.attrs.src + '"' : ""}
            ${node.attrs.alt ? 'alt="' + node.attrs.alt + '"' : ""}
            loading="lazy" 
            style="max-width: 100%; height: auto;"
          >
          ${node.attrs.title ? '<figcaption>' + node.attrs.title + '</figcaption>' : ""}
        </figure>
      `
    }
  }

  return mySchema;
}
