<template>
	<div>
		<h1>{{msg}}</h1>
		<router-view/>
	</div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome use vue-multiple-pages.This is homepage at 'app-index'."
    };
  }
};
</script>