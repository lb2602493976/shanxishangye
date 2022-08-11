<template>
	<view class="page">
		这是合作学校页面详情
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		onLoad(data) {
			console.log(data.id,'data')
			// this.handlerSearch(id)
		},
		methods:{
			handlerSearch(){
				
			}
		},
		
	}
</script>

<style lang="scss" >
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.page{
		
	}
	
</style>