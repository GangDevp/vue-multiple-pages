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
      msg: "hello vue-multiple-pages,this is homepage."
    };
  }
};
</script>