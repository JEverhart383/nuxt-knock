// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      knockApiKey: process.env.KNOCK_PUBLIC_API_KEY,
      knockFeedChannelId: process.env.KNOCK_FEED_CHANNEL_ID,
      knockUserId: process.env.KNOCK_USER_ID,
    },
  },
});
