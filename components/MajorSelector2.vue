<template>
	<view class="_major_selector">
		<view class="_major_selector_left">
			{{ label || '' }}
		</view>
		<view class="_major_selector_right">
			<!-- <picker
				:range="dataSource"
				mode="selector"
				:range-key="options.label"
				@change="change"
				style="height:100%;"
			>
				<view class="_major_selector_right_outer">
					<text>其他院系</text>
					<image src="../static/p006.png"></image>
				</view>
			</picker> -->
			<view class="_major_selector_right_outer" @click="rightClick">
				<text>其他院系</text>
				<!-- <image src="../static/p006.png"></image> -->
			</view>
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
				type:String,
				default(){
					return null
				},
			},
			options:{
				type:Object,
				default(){
					return null
				},
			},
		},
		computed:{
			label(){
				return this.currentObj[this.options.label]
			},
		},
		data(){
			return {
				currentObj:{
					id:-1,
					label:'',
					value:null,
				},
			}
		},
		methods:{
			change(obj){
				this.currentObj = this.dataSource[obj.detail.value]
				this.$emit('change',this.currentObj,obj.detail.value)
			},
			rightClick(){
				this.$emit('rightClick',this)
			},
		},
		watch:{
			dataSource(){
				if(this.defaultActive){
					this.currentObj = this.dataSource.find(item => item.id == this.defaultActive)
				}else{
					this.currentObj = this.dataSource[0]
				}
			},
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	._major_selector{
		width:100%;
		@include radius(34rpx);
		@include flex(row,start,center);
		color:#FFF;
		background:linear-gradient(to top,$theme,$theme2);
		._major_selector_left{
			@include textEllipsis(1);
			font-size:40rpx;
			font-weight:bold;
			padding:0rpx 20rpx 0rpx 50rpx;
			box-sizing:border-box;
			flex-grow:1;
			line-height:1;
		}
		._major_selector_right{
			@include flex();
			@include textEllipsis(1);
			box-sizing:border-box;
			padding:0 26rpx;
			width:220rpx;
			border-left:2rpx solid #E3E3E3;
			._major_selector_right_outer{
				width:100%;
				height:92rpx;
				@include flex(row,between,center);
				text{
					font-size:28rpx;
				}
				image{
					width:24rpx;
					height:14rpx;
					margin-left:12rpx;
				}
			}
			
			
		}
	}
</style>
