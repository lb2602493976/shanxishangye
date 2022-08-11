<template>
	<view class="_tabs">
		<view 
			v-for="item of dataSource" 
			:key="item.id" 
			class="_tab-item" 
			:class="{ active:currentTab.id === item.id }"
			@click="tabChange(item)"
		>
			{{ item.name }}
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			dataSource:{
				type:Array,
				default(){
					return []
				},
			},
			defaultActive:{
				type:Number,
				default:-1,
			},
		},
		data(){
			return {
				currentTab:{},
			}
		},
		mounted(){
			this.currentTab = this.dataSource.find(item => item.id == this.defaultActive )
		},
		methods:{
			tabChange(item){
				this.currentTab = item
				this.$emit('change',item)
			},
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	._tabs{
		@include flex(row,start,stretch);
		box-shadow:$shadow;
		._tab-item{
			@include flex();
			@include divider(1px solid #E3E3E3,left);
			padding:32rpx 0rpx;
			font-size:28rpx;
			color:#000;
			background:linear-gradient(to top,#EBEBEB,#EFEFEF,#EBEBEB);
			flex-grow:1;
			&.active{
				color:#FFF;
				cont-weight:bold;
				background:linear-gradient(to top,#2DB6EB,#09C9DC);
			}
		}
	}
</style>
