<template>
	<view class="_leader-item">
		<view class="_leader-item-left">
			<image :src="dataSource.tiPhoto" mode="aspectFit"></image>
		</view>
		<view class="_leader-item-right">  
			<view class="_leader-item-title">{{ dataSource.tiName }}&nbsp;{{ dataSource.tiType }}</view>
			<!-- <view :class="{_leader-item-desc,textEllipsis:allShow}"  @click="allShow?false:true">{{ dataSource.tiContent }}</view> -->
			<view  :class="allShowVibilte?'textEllipsis':'_leader-item-desc'"  @click="allShow">{{ dataSource.tiContent }}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			dataSource:{
				type:Object,
				default(){
					return {
						id:1,
						title:'院长 党委副书记 刘敏涵',
						desc:'2021-11-10 17:31:002021-11-10 17:31:002021-11-10 17:31:002021-11-10 17:31:002021-11-10 17:31:002021-11-10 17:31:002021-11-10 17:31:002021-11-10 17:31:00',
						img:'',
					}
				},
			},
		},
		data(){
			return {
				allShowVibilte:false
			}
		},
		onLoad(){
			
		},
		methods:{
			allShow(){
				if(this.allShowVibilte){
					this.allShowVibilte=false
				}else{
					this.allShowVibilte=true
				}
				console.log(this.allShowVibilte,'allshow')
			}
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	._leader-item{
		@include flex(row,start,start);
		@include radius(10rpx);
		background:rgba(217, 236, 255, 1);
		
		box-shadow:$shadow;
		padding:24rpx;
		._leader-item-left{
			width:120rpx;
			height:145rpx;
			margin-top:12rpx;
			image{
				width:120rpx;
				height:145rpx;
			}
		}
		._leader-item-right{
			@include flex(column,between,start);
			width:calc(100% - 120rpx - 40rpx);
			margin-left:40rpx;
			._leader-item-title{
				font-size:28rpx;
				font-weight:bold;
				color:#000;
			}
			._leader-item-desc{
				
				margin-top:22rpx;
				font-size:24rpx;
				color:#666;
				width: 400rpx;
				overflow: hidden;
				white-space: normal;
				word-break: break-all;
				@include textEllipsis(3)
			}
			.textEllipsis{
				margin-top:22rpx;
				font-size:24rpx;
				color:#666;
				width: 400rpx;
				overflow: hidden;
				white-space: normal;
				word-break: break-all;
			}
		}
	}
</style>
