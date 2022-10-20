<template>
	<view>
		<!-- <Navbar title="新闻详情"></Navbar> -->
		<view class="page">
			<BasePage>
				 <web-view :src="index" v-if="index.length"></web-view>
			</BasePage>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:null,
			}
		},
		onLoad(data) {
			this.index = data.ids
		}
	}
</script>
<style>
</style>
