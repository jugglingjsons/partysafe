const path = require("path");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Allow importing JSON files from the public directory
    config.module.rules.push({
      test: /\.json$/,
      include: [path.resolve(__dirname, "public")],
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            outputPath: "static",
            name: "json/[name].[hash].[ext]",
          },
        },
      ],
    });

    return config;
  },
  i18n: {
    locales: ["en", "fr", "de"], // Add your desired locales here
    defaultLocale: "en", // Set your default locale here
  },
};
