<template>
  <div class="game">
    <navigator-room-creator-window
      v-if="windowStore.getWindow('roomCreator').visible"
    />
    <navigator-window v-show="windowStore.getWindow('navigator').visible" />
    <tool-bar />
    <landing-view v-if="landingViewStore.visible" />
    <room-view v-if="roomStore.visible" />
    <renderer-view v-show="roomStore.visible" />
    <info-bar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RoomView from "@/components/room-view/RoomView.vue";
import ToolBar from "@/components/tool-bar/ToolBar.vue";
import LandingView from "@/components/landing-view/LandingView.vue";
import InfoBar from "@/components/info-bar/InfoBar.vue";
import NavigatorWindow from "@/components/navigator/NavigatorWindow.vue";
import RendererView from "@/components/renderer-view/RendererView.vue";
import { mapStores } from "pinia";
import { useLandingViewStore } from "@/stores/LandingView";
import { useNavigatorStore } from "@/stores/Navigator";
import { useRoomStore } from "@/stores/Room";
import NavigatorRoomCreatorWindow from "@/components/navigator/room-creator/NavigatorRoomCreatorWindow.vue";
import { useWindowStore } from "@/stores/WindowView";

export default defineComponent({
  name: "GameView",
  components: {
    NavigatorRoomCreatorWindow,
    RendererView,
    NavigatorWindow,
    InfoBar,
    ToolBar,
    LandingView,
    RoomView,
  },
  computed: {
    ...mapStores(
      useLandingViewStore,
      useNavigatorStore,
      useRoomStore,
      useWindowStore
    ),
  },
});
</script>

<style lang="scss" scoped>
.game {
  width: 100%;
  height: 100%;
  position: fixed;
}
</style>
