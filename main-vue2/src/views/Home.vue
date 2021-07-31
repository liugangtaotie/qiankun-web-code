<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <div class="system">
      <div v-for="(item, index) in modeuleList" :key="index">
        <div
          @click="$router.push(item.path)"
          class="module-system"
          :class="item.systemId == activeModule ? 'active-module' : ''"
          @mouseover="activeModule = item.systemId"
          @mouseleave="activeModule = ''"
        >
          <img
            :src="item.systemId == activeModule ? item.selected : item.normal"
          />
          <div class="module-title">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { registerMicroApps, start } from "qiankun";

@Component({
  components: {},
})
export default class Home extends Vue {
  activeModule = ""; // 系统模块

  modeuleList = [
    {
      developmentEntry: "//localhost:4000/",
      enabled: true,
      name: "webpack-app",
      normal: "images/module/dvs-farm-normal.png",
      path: "/webpack-app/about",
      productionEntry: "/child/webpack-app/",
      selected: "images/module/dvs-farm-selected.png",
      systemId: "webpack-app",
      title: "webpack-app",
    },
    {
      developmentEntry: "//localhost:5000/",
      enabled: true,
      name: "map-app",
      normal: "images/module/dvs-village-normal.png",
      path: "/map-app/about",
      productionEntry: "/child/map-app/",
      selected: "images/module/dvs-village-selected.png",
      systemId: "map-app",
      title: "map-app",
    },
  ];

  getActiveRule = (hash: any) => (location: any) =>
    location.hash.startsWith(hash);

  mounted() {
    const array = [
      {
        container: "#mainwrapper",
        entry: "//localhost:4000/",
        name: "webpack-app",
        activeRule: this.getActiveRule("#/webpack-app"),
      },
      {
        container: "#mainwrapper",
        entry: "//localhost:5000/",
        name: "map-app",
        activeRule: this.getActiveRule("#/map-app"),
      },
    ];

    console.log("start loading");
    // TODO  在主应用中注册微应用
    registerMicroApps([...array]);

    // TODO 启动微应用
    start({
      prefetch: "all",
      sandbox: {
        // strictStyleIsolation: true,
        experimentalStyleIsolation: true,
      },
    });
  }

  // 跳转sub-first
  gotoSubOne() {
    // this.$route.push('/webpack-app/about')
  }

  gotoSubReact() {}
}
</script>
