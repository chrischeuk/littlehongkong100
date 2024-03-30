import postcssPresetEnv from "postcss-preset-env";
export default {
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
    postcssPresetEnv({ stage: 1 }),
  ],
};
