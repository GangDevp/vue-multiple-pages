<template>
	<div class="book-list-warp">
    <h1>{{msg}}</h1>
    <ul class="book-list">
      <li v-for="(item, index) in list" :key="index">
        <span>{{item.name}}</span>
        <span>{{item.price}}</span>
        <span><a @click="toDetailView(item.id)">详情</a></span>
      </li>
    </ul>
	</div>
</template>

<script>
import { mapState,mapActions } from "vuex";
export default {
  name: "book-list",
  data() {
    return {
      msg: "This view is 'bookList'."
    };
  },
  mounted() {
    this.initBookList();
  },
  computed: {
    ...mapState('bookList',['list'])
  },
  methods: {
    ...mapActions('bookList', {
      initBookList: 'queryBookList'
    }),
    toDetailView(id) {
      this.$router.push({ path: "bookDetail", query: { id: id } });
    }
  }
};
</script>

<style scoped lang="scss">
.book-list-warp {
  .book-list {
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


