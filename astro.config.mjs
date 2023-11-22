import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import alpinejs from "@astrojs/alpinejs";
const env = loadEnv("", process.cwd(), 'STORYBLOK');
const glob = import.meta.glob('./src/storyblok/*.astro');
let storyblokComponents = {};
for (const path in glob) {
  const name = path.split("/").at(-1).split(".")[0];
  storyblokComponents[name.charAt(0).toLowerCase() + name.substring(1)] = name;
}


// https://astro.build/config
export default defineConfig({
  prefetch: true,
  image: {
    domains: ["storyblok.com"],
    remotePatterns: [{
      protocol: "https"
    }]
  },
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true
    }
  },
  site: "https://example.com",
  integrations: [sitemap(), storyblok({
    accessToken: env.STORYBLOK_TOKEN,
    componentsDir: "src/storyblok",
    components: storyblokComponents,
    enableFallbackComponent: true,
    apiOptions: {
      region: 'eu'
    }
  }), alpinejs()]
});