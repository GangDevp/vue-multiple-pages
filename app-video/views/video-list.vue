<template>
	<div class="video-list-warp">
    <h1>{{msg}}</h1>
    <ul class="video-list">
      <li v-for="(item, index) in list" :key="index">
        <span>视频名称: {{item.name}}</span>
        <span>视频时长: {{item.time}}</span>
      </li>
    </ul>
	</div>
</template>

<script>
import { mapState,mapActions } from "vuex";
export default {
  name: "video-list",
  data() {
    return {
      msg: "This view is 'videoList'."
    };
  },
  mounted() {
    this.initVideoList();
  },
  computed: {
    ...mapState('videoList',['list'])
  },
  methods: {
    ...mapActions('videoList', {
      initVideoList: 'getVideoList'
    })
  }
};
</script>

<style scoped lang="scss">
.video-list-warp {
  .video-list {
    span {
      margin-right: 15px;
      a {
        cursor: pointer;
        color: blue;
      }
    }
  }
}
</style>


