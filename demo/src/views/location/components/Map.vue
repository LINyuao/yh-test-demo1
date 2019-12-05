<template>
  <div class="amap-page-container">
    <el-amap
      ref="map"
      vid="amapDemo"
      :amap-manager="amapManager"
      :center="center"
      :zoom="zoom"
      :plugin="plugin"
      :events="events"
      class="amap-demo"
    >
      <el-amap-marker></el-amap-marker>
      <div class="toolbar fc6">
        position: [{{ lng }}, {{ lat }}] address: {{ address }}
      </div>
    </el-amap>
  </div>
</template>

<script>
import Vue from "vue";
import VueAMap from "vue-amap";
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: "c47602875e8a03c714ba1cf1ff0919fe",
  plugin: [
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.Geocoder"
  ],
  v: "1.4.4",
  uiVersion: "1.0.11"
});
let amapManager = new VueAMap.AMapManager();
export default {
  data() {
    let self = this;
    return {
      amapManager,
      zoom: 15,
      center: [119.217331, 26.03158],
      address: "",
      lng: 0,
      lat: 0,
      events: {
        click(e) {
          console.log(e);
          //   self.marker.position = [];
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
          //   self.marker.position.push(self.lng);
          //   self.marker.position.push(self.lat);
          //   console.log(self.lng, self.lat);
          // console.log(self.marker.position);
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress;
                self.$nextTick();
              }
            }
          });
        }
      },
      plugin: [
        "ToolBar",
        {
          pName: "MapType",
          defaultType: 0,
          events: {
            init(o) {
              console.log(o);
            }
          }
        }
      ]
    };
  },
  created() {},
  components: {},
  computed: {},
  watch: {},
  methods: {
    getMap() {
      // amap vue component
      console.log(amapManager._componentMap);
      // gaode map instance
      console.log(amapManager._map);
    }
  }
};
</script>
<style lang="scss" scoped>
.amap-demo {
  height: 500px;
}
</style>
