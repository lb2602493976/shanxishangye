<template>
	<view>
		
		<!-- 弹窗 -->
		<view v-show="ishide" @touchmove.stop.prevent="stopSlide">
			<!-- 遮罩层 -->
			
			<view class="mask" @click="cancel"></view>
			<!-- 内容区 -->
			
			<view class="tip" >
				<view class="main">
					<view @click="previewImage" style="width:400rpx;height:400rpx;margin-bottom:48rpx;">
						<image :src="childData.wechatUrl" style="width:100%;height:100%;"></image>
					</view>
					<view style="text-align:center;font-size:32rpx;font-family: Source Han Sans CN;font-weight: 500;">点击预览大图，长按二维码识别，加我好友。</view>
				</view>
				<view style="margin-top:28rpx;"></view>
				<image class="close-icon" @click="$emit('cancel')" :src="closeImg" mode="aspectFit"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		props: {
			ishide: {
				type: Boolean,
				default: false,
				required: true
			},
			childData:{
				type: Object,
				default: false,
				required: true
			}
				
			
		},
		data() {
			return {
				scrollTop: 0,
				dataList:[],
				open3:[],
				// titleBg:require('@/static/pop_title_bg.png'),
				// closeImg:require('@/static/pic868.png'),
			}
		},
		onLoad: function(option) {
			console.log(option,'option')		
		},
		watch:{
			ishide(val){
				if(val) {
						// this.dataList=this.childData
						// console.log(this.childData,'childData')
				}
				
			},
		},
		methods: {
			// 关闭弹窗
			cancel() {
				let that = this;
				that.$emit('cancel');
			},
			// 确认事件
			confirm() {
				let that = this;
				that.$emit('confirm');
			},
			// 禁止页面滚动(规避警告)
			stopSlide() {
				return;
			},
			previewImage(){
				uni.previewImage({
					current:0,
					urls:[this.childData.wechatUrl],
				})
			},
		}
	}
</script>

<style scoped lang="less">
	/* 弹窗 */
	.mask {
		z-index: 99;
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		top: 0;
	}
	.close-icon{
		width:76rpx !important;
		height:76rpx !important;
		background:transparent !important;
		margin:0 auto;
	}
	.main{
		@radius:38rpx;
		background: #FFFFFF;
		border-radius: @radius;
		display: flex;
		flex-flow:column nowrap;
		justify-content: space-between;
		align-items: center;
		padding:64rpx 0;
		
	}
	.tip {
		@radius:38rpx;
		z-index: 999;
		width: 560rpx;
		/* padding: 5rpx; */
		display: flex;
		font-size: 30rpx;
		background: transparent;
		/* padding: 0 35rpx 160upx 35rpx; */
		flex-direction: column;
		justify-content: center;
		border-radius: @radius;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		padding:0;
		margin:0;
		overflow:hidden;
		.title{
			width:100%;
			height:102rpx;
			position:absolute;
			border-top-left-radius:@radius;
			border-top-right-radius:@radius;
			top:0;
			left:0;
			margin:0;
			padding:0;
			overflow:hidden;
			image{
				width:100%;
				margin:0;
				padding:0;
			}
			.textText{
				text-align:center;
				width:100%;
				height:102rpx;
				font-size: 46rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #1E1E1E;
				line-height: 102rpx;
				position:absolute;
				left: 0;
				top: 0;
				z-index:1000;
			}
		}
	}
	.content {
		height: calc(~'82vh - 200rpx');
		margin-top:102rpx;
		display:flex;
		flex-flow:row wrap;
		justify-content:flex-start ;
		align-content:center;
		box-sizing:border-box;
		gap:26rpx;
		margin:102rpx 36rpx 0 36rpx;
		overflow-y:auto;
		>image{
			width:282rpx;
			height:205rpx;
			border-radius:14rpx;
		}
		
		/* padding: 0 35rpx 160upx 35rpx; */
	}
	// .label {
	// 	text-align: center;
	// 	font-size: 62upx;
	// 	font-family: Microsoft YaHei;
	// 	font-weight: 400;
	// 	color: #1E1E1E;
	// 	margin: 44upx 0;
	// }
	.label_1 {
		margin: 60upx 0;
		font-size: 38upx !important; 
	}

	.tip>image {
		width: 115rpx;
		height: 115rpx;
		border-radius: 50%;
		background: #4CD964;
	}

	.txt1 {
		font-size: 36rpx;
		margin: 70rpx 0 40rpx 0;
	}

	.tip>text {
		display: block;
	}

	.txt4 {
		margin: 40rpx 0;
		font-size: 24rpx;
		background: #F5F5F5;
		border-radius: 16rpx;
		padding: 16rpx 20rpx;
	}

	.tipbtn {
		width: 210rpx;
		height: 60rpx;
		font-size: 26rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 30rpx;
		background: linear-gradient(-90deg, #FEEF43, #E9D81B);
	}
	.text {
		text-indent: 2em;
		font-size: 34upx !important; 
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #1E1E1E;
		line-height: 46upx;
	}
</style>
