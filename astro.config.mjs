import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import playformCompress from '@playform/compress';
import starlightImageZoom from 'starlight-image-zoom';
import tailwind from '@astrojs/tailwind';
import { sidebar } from './list_sidebar';

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.VITE_SITE_URL,
  integrations: [
    starlight({
      title: import.meta.env.VITE_TITLE,
      customCss: ['./src/tailwind.css'],
      favicon: '/favicon.png',
      logo: {
        src: './src/assets/logo.png',
        replacesTitle: false
      },
      editLink: {
        baseUrl: import.meta.env.VITE_GITHUB_EDIT_LINK
      },
      social: {
        github: import.meta.env.VITE_GITHUB_URL,
        discord: import.meta.env.VITE_DISCORD_INVITE
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3
      },
      credits: false,
      plugins: [starlightImageZoom()],
      sidebar: sidebar
    }),
    tailwind({ applyBaseStyles: false }),
    playformCompress()
  ]
});
