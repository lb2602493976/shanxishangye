<template>
	<BasePage>
	<!-- <view class="container" style="'background-color':'#ffffff'"> -->
	<view class="container">
		<!-- <view class="tabs">
			<view v-for="(item,index) in tabs" :class="{'active':active==index}" @click="ichange(index)">
				{{item.name}}
			</view>
		</view> -->
		<scroll-view :scroll-y="true" class="CampusBulletin" >
			<view class="schoolNew">
				<view class="title">{{detailData.aiTitle}}</view>
				<view class="timeorNumber">
					<span>发表时间：{{detailData.createTime.slice(0,10)}}</span>
				</view>
				<view class="text">
					<rich-text  :nodes="detailData.aiContent"></rich-text>
				</view>

			</view> 
		</scroll-view>
	</view>
	</BasePage>
</template>

<script>
	export default {
		props:{
		},
		
		data() {
			return {
				detailData:[],
				cmContent:'',
				active:'',
				tabs: [{
						id: 0,
						name: '高考统招'
					},
					{
						id: 1,
						name: '单独招生'
					},
					{
						id: 2,
						name: '招生计划'
					},
				],
			}
		},
		onLoad(options) {
			console.log(options)
			// this.active = Number(options.active)
			this.detailData=uni.getStorageSync('cmContent');
			console.log(this.detailData,'cmcontent')
		},
		methods: {
			ichange(index) {
				if(index !== this.active){
					let data = ({ '0':2,'1':3,'2':4 })[index]
					this.active = index 
					uni.redirectTo({
						url:`/pages_news/enrollInfo/index?active=${data}`
					})
				}
			},
		}
	}
</script>

<style lang="less">
	.container {
		padding-top: 26rpx;
		box-sizing: border-box;
		width: 100%;
		height: 100vh;
		// background-color: #F2F2F2;

		.tabs {
			width: 697rpx;
			height: 97rpx;
			margin: 0 auto;
			background-image: linear-gradient(0deg,
					#714ee1 0%,
					#54a5c7 100%);
			box-shadow: 0rpx 5rpx 6rpx 0rpx rgba(0, 0, 0, 0.39);
			border-radius: 26rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			overflow: hidden;

			view {
				flex: 1;
				border-right: 1rpx solid rgba(255, 255, 255, .21);
				text-align: center;
				line-height: 97rpx;
				font-family:Source Han Sans CN;
				font-size: 32rpx;
				font-weight: normal;
				font-stretch: normal;
				line-height: 97rpx;
				letter-spacing: 2rpx;
				color: #ffffff;

				&:last-child {
					border: none
				}
			}

			.active {
				background-image: linear-gradient(0deg,
						#4998d4 0%,
						#4728a9 100%);
			}
		}

		.CampusBulletin {
			height:calc(~'100% - 97rpx');
			width: 694rpx;
			margin: 0 auto;
			margin-top: 49rpx;
			.schoolNew {
				.img-div {
					display: flex;
					justify-content: center;
				}
				.title {
					margin-bottom: 40upx;
				}
				.text {
						// text-indent: 2em;
						font-size: 36upx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						// color: #1E1E1E;
						line-height: 64upx !important;
						// background-color: #F2F2F2 !important;
						// padding: 20upx;
						margin:0 30upx !important;
				}
				.label_1 {
					margin: 60upx 0;
					font-size: 38upx !important; 
				}
				.timeorNumber {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 24upx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #000000;
					line-height: 30upx;
					opacity: 0.4;
					margin-bottom: 74upx;
				}
			}
		}

		.schoolNews {
			width: 694rpx;
			margin: 0 auto;
			margin-top: 49rpx;

			.schoolNew {

				height: 178rpx;
				// background-color: #ffffff;
				background-color: #F2F2F2;
				border-radius: 13rpx;
				border: solid 1rpx #e3e3e3;
				margin-bottom: 10rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 23rpx;
				box-sizing: border-box;
				
				image {
					width: 122rpx;
					height: 122rpx;
					margin-right: 45rpx;
				}

				.newsInfo {
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.title {
						width: 476rpx;
						font-family: MicrosoftYaHei;
						font-size: 23rpx;
						line-height: 31rpx;
						color: #000000;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.time {
						font-family: MicrosoftYaHei;
						font-size: 23rpx;
						line-height: 31rpx;
						color: #000000;
						opacity: 0.4;
					}
				}
			}
		}
	}
</style>
