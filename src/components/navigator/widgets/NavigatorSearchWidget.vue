<template>
  <div class="navigator-search-widget">
    <div class="navigator-search-widget__selector">
      <selection-list
        type="1"
        v-model="navigatorStore.searchCategory"
        :items="[
          {
            label: __locale('navigator.filter.anything'),
            value: 'all',
          },
          {
            label: __locale('navigator.filter.room.name'),
            value: 'roomname',
          },
          {
            label: __locale('navigator.filter.owner'),
            value: 'owner',
          },
          {
            label: __locale('navigator.filter.tag'),
            value: 'tag',
          },
          {
            label: __locale('navigator.filter.group'),
            value: 'group',
          },
        ]"
        @change="updateCategory"
      />
    </div>
    <div class="navigator-search-widget__input">
      <text-field
        type="1"
        :placeholder="__locale('navigator.filter.input.placeholder')"
        v-model="query"
        @change="updateQuery"
        clear-button
        focus-button
        :focused="navigatorStore.searching"
        @click="focus"
      />
    </div>
    <div
      class="navigator-search-widget__refresh-button"
      v-if="query.length > 0"
      @click="search"
    ></div>
  </div>
</template>

<script lang="ts">
import { NewNavigatorSearchMessageComposer } from "@/sockets/messages/outgoing/navigator/updated/NewNavigatorSearchMessageComposer";
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { useNavigatorStore } from "@/stores/Navigator";
import { useSocketStore } from "@/stores/Socket";

export default defineComponent({
  name: "NavigatorSearchWidget",
  data: () => ({
    selected: "all",
    query: "",
  }),
  methods: {
    updateCategory(category: string): void {
      this.navigatorStore.searchCategory = category;
      this.search();
    },
    updateQuery(): void {
      this.navigatorStore.searchQuery = this.query;
      this.search();
    },
    search(): void {
      this.navigatorStore.searching = true;
      this.navigatorStore.selectedTab = "hotel_view";
      this.socketStore.socket?.send(
        new NewNavigatorSearchMessageComposer(
          this.navigatorStore.selectedTab,
          (this.navigatorStore.searchCategory !== "all"
            ? this.navigatorStore.searchCategory
            : "") +
            (this.navigatorStore.searchCategory !== "all" ? ":" : "") +
            this.navigatorStore.searchQuery
        )
      );
    },
    focus(): void {
      this.navigatorStore.searching = true;
    },
  },
  computed: {
    ...mapStores(useNavigatorStore, useSocketStore),
    searchQuery(): string {
      return this.navigatorStore.searchQuery;
    },
  },
  watch: {
    searchQuery: {
      immediate: true,
      handler(newVal) {
        this.query = newVal;
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.navigator-search-widget {
  width: 396px;
  height: 24px;
  position: absolute;
  right: 15px;
  margin-top: 9px;
  display: flex;
  gap: 13px;

  &__selector {
    width: 116px;
  }

  &__input {
    width: 235px;
  }

  &__refresh-button {
    width: 25px;
    height: 23px;
    background-image: url(@images/navigator/buttons/refresh.png);
    margin-left: -6px;
    cursor: pointer;

    &:hover {
      background-position: 0 -23px;
    }
    &:active {
      background-position: 0 -46px;
    }
  }
}
</style>
