<template>
	<div class="login-container">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>卡片名称</span>
				<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
			</div>
			<div v-for="o in 4" :key="o" class="text item">
				{{ '列表内容 ' + o }}
			</div>
		</el-card>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less">
.login-container {
	width: 100%;
	height: 100%;
    background: linear-gradient(to bottom, #152f3e, #1f415a);
    position: relative;
    .box-card{
        width:300px;
        height: 200px;
        margin: -100px -150px;
        position: absolute;
        top: 50%;
        left: 50%;
    }
}
</style>
