<template>
	<view>
		<view class="pages1" @click="uni.navigateTo({url:'/pages_vote/uploadImg'})">
			<!-- <button style="pages" open-type="share"> -->
				<image class="img" src="@/static/p050.png"></image>
				<view class="share-event">
					上传照片
				</view>
				<!-- <button class="share-event" open-type="share">分享活动</button> -->
		</view>
		<view class="pages">
			<!-- <button style="pages" open-type="share"> -->
				<image class="img" src="@/static/p051.png"></image>
				<!-- <view class="share-event">
					分享活动
				</view> -->
				<button class="share-event" open-type="share">分享活动</button>
		</view>
		 <view class="cot" @click="homes()">
			 <image class="img" src="../static/backhome.png" mode=""></image>
			 <button class="share-event" >回到首页</button>
		 </view>
		
	</view>
	
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
		mounted() {
			let routes = getCurrentPages();
			//获取路由参数
			let curParam = routes[routes.length - 1].options;
			console.log(curParam,'333333333333333333333')
		},
		methods:{
			callBack(){
				uni.switchTab({url:'/pages/index/index'})
			},
			homes(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		},
	}
	
	
</script>

<style lang="scss">
	.cot{
		width: 144rpx;
		height: 144rpx;
		position: fixed;
		top: 55%;
		right: 20rpx;
		z-index: 1000; 
		// background-color: #3E1CD6;
		background-image: linear-gradient(0deg,#3E1CD6,#4C6CF7);
		border-radius:50%;
		// border: 6rpx solid #417BFF; 
		text-align: center;
		
		.img{
			width: 75rpx;
			height: 64rpx;
			margin-top: 10rpx;
			// padding: 10rpx;
		}
		// .share-event{
		// 	font-size: 24rpx;
		// 	line-height: 56rpx;
		// 	color:#ffffff;
		// }
		.share-event{
			width: 150rpx;
			height: 144rpx;
			background-color: transparent;
			border: 0;
			font-size: 24rpx;
			line-height: 56rpx;
			color:#ffffff;
			border-radius:50%;
			position:absolute;
			bottom:10rpx;
			left:0;
			padding-top: 80rpx;
		}
	}
	
	
	.pages1{
		width: 144rpx;
		height: 144rpx;
		position: fixed;
		top: 65%;
		right: 20rpx;
		z-index: 1000; 
		// background-color: #3E1CD6;
		background-image: linear-gradient(0deg,#921CD6,#EE4CF7);
		border-radius:50%;
		// border: 6rpx solid #417BFF; 
		text-align: center;
		
		.img{
			width: 65rpx;
			height: 65rpx;
			margin-top: 15rpx;
			// padding: 10rpx;
		}
		.share-event{
			font-size: 24rpx;
			line-height: 35rpx;
			color:#ffffff;
			// margin-bottom: 5rpx;
		}
		
		
	}
	.pages{
		width: 144rpx;
		height: 144rpx;
		position: fixed;
		top: 75%;
		right: 20rpx;
		z-index: 1000; 
		// background-color: #3E1CD6;
		background-image: linear-gradient(0deg,#3E1CD6,#4C6CF7);
		border-radius:50%;
		// border: 6rpx solid #417BFF; 
		text-align: center;
		
		.img{
			width: 75rpx;
			height: 64rpx;
			margin-top: 10rpx;
			// padding: 10rpx;
		}
		// .share-event{
		// 	font-size: 24rpx;
		// 	line-height: 56rpx;
		// 	color:#ffffff;
		// }
		.share-event{
			width: 150rpx;
			height: 144rpx;
			background-color: transparent;
			border: 0;
			font-size: 24rpx;
			line-height: 56rpx;
			color:#ffffff;
			border-radius:50%;
			position:absolute;
			bottom:10rpx;
			left:0;
			padding-top: 80rpx;
		}
		
	}
	
	
	
	
	
</style>