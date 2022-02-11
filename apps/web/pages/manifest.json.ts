import { theme } from "~/styles/theme";
import type { GetServerSideProps } from "next";

const manifest = {
  name: "TV Show Notifier",
  short_name: "TV Show Notifier",
  icons: [
    {
      src: "/icons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any maskable",
    },
    {
      src: "/icons/icon-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
  theme_color: "#FFFFFF",
  background_color: "#FFFFFF",
  start_url: "/?mode=standalone",
  display: "standalone",
  orientation: "portrait",
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  const color =
    query.colorMode === "dark"
      ? theme.colors.backgroundDark
      : theme.colors.backgroundLight;

  manifest.background_color = color;
  manifest.theme_color = color;

  res.write(JSON.stringify(manifest));

  res.end();

  return {
    props: {},
  };
};

const ManifestHandler = () => null;

export default ManifestHandler;
