<template>
  <h2>{{ feedItems.length }} Notifications</h2>
  <div v-for="item in feedItems">
    <div v-for="block in item.blocks">
      <div v-if="block.name === 'body'" v-html="block.rendered"></div>
    </div>
    <button @click="markAsArchived(item)">Mark as Archived</button>
  </div>
</template>
<script setup>
import Knock from "@knocklabs/client";
const runtimeConfig = useRuntimeConfig();
const knockClient = new Knock(runtimeConfig.public.knockApiKey);

knockClient.authenticate(runtimeConfig.public.knockUserId);
const knockFeed = knockClient.feeds.initialize(
  runtimeConfig.public.knockFeedChannelId
);
knockFeed.listenForUpdates();
await knockFeed.fetch();
const state = knockFeed.getState();
const feedItems = ref(state.items);

knockFeed.on("items.received.page", (data) => {
  feedItems.value = knockFeed.getState().items;
});

knockFeed.on("items.received.realtime", (event) => {
  feedItems.value = knockFeed.getState().items;
});

function markAsArchived(item) {
  knockFeed.markAsArchived(item);
  feedItems.value = knockFeed.getState().items;
}
// Setup a real-time connection
</script>
