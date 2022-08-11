<template>
	<view class="container">
		<!-- 正式 -->
		<!-- <scroll-view :scroll-y="true" class="CampusBulletin" >
			<view class="schoolNew">
				<view class="title">{{dataList.title}}</view>
				<view class="timeorNumber">
					<span>发表时间：{{dataList.pressTime}}</span>
				</view>
				<view class="text">
					<rich-text  v-html="dataList.content"></rich-text>
				</view>
			</view> 
		</scroll-view>  -->
		<!-- he tui -->
		<view>
			<text style="color: red; font-size: 50upx;">协议页面</text>
		</view>
	</view>
</template>

<script>
	import api from '@/api/searchSchool/school.js'
	export default {
		data() {
			return {
				dataList:[]
			}
		},
		onLoad(option) {
			// 报名咨询
			if(option.index==1){
				// api.getAllNews(tenantId:this.tenantId,type:'1').then(res=>{
				api.getAllNews({tenantId:this.tenantId,type:'1'}).then(res=>{
					this.dataList=res.result[0]
					console.log(res.result,'res')
				})
			}else{
				// 隐私
				api.getAllNews({tenantId:this.tenantId,type:'2'}).then(res=>{
					this.dataList=res.result[0]
					console.log(res.result,'res')
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.container {
		padding-top: 26rpx;
		box-sizing: border-box;
		width: 100%;
		height: 100vh;
		background-color: #F2F2F2;
		.CampusBulletin {
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
						text-indent: 2em;
						font-size: 24upx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #1E1E1E;
						line-height: 46upx;
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
	}
</style>
