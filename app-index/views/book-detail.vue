<template>
	<div class="book-detail">
    <h1>{{msg}}</h1>
    <span>书名: {{detail.name}}</span>
    <span>作者: {{detail.author}}</span>
    <span>价格: {{detail.price}}</span>
    <span>出版时间: {{detail.date}}</span>
    <span>出版社: {{detail.publisher}}</span>
    <button @click="toVideoPage">跳转到app-video</button>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
  name: "book-detail",
  data() {
    return {
      msg: "This view is 'bookDetail'."
    };
  },
  mounted() {
    this.queryDetail(this.$route.query.id);
  },
  computed: {
    ...mapState('bookDetail', ['detail'])
  },
  methods: {
    ...mapActions('bookDetail', {
      queryDetail: 'getBookDetail'
    }),
    toVideoPage() {
      this.$router.push('videoList');
    }
  }
};
</script>

<style scoped lang="scss">
.book-detail {
  span {
    display: block;
    margin-bottom: 15px;
  }
}
</style>