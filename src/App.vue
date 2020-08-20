<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
import updateMixin from './mixins/update.mixin';

export default {
	mixins: [updateMixin]
};
</script>
<style>
    *{
        padding: 0;
        margin: 0;
    }
    html,body{
        height: 100%;
    }
</style>
<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
}
</style>
