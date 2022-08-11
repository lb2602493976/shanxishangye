<template>
	<view class="container">
		<Navbar1 type='2'></Navbar1>
		<Home></Home>
		<view style="margin-top: 200rpx;"></view>
		<view class="content">
			<view class="text">班级人气排行</view>
			<view class="stu-list">
				<view class="stu-item"  @click="fatherOnClick(item)" v-for="item of list">
					<image :src="item.classPic" mode=""></image>
					<view class="title">
						<!-- 班级名称 -->
						{{item.className}}
					</view>
					<view class="bottom">
						<view class="text">
							人气：
						</view>
						<view class="text">
							{{item.sentimentNum}}
						</view>
					</view>
				</view>
				<!-- <view class="stu-item"></view>
				<view class="stu-item"></view>
				<view class="stu-item"></view>
				<view class="stu-item"></view>
				<view class="stu-item"></view>
				<view class="stu-item"></view>
				<view class="stu-item"></view>
				<view class="stu-item"></view>
				<view class="stu-item"></view>
				<view class="stu-item"></view>
				<view class="stu-item"></view>
				<view class="stu-item"></view>
				<view class="stu-item"></view>
				<view class="stu-item"></view> -->
			</view>
		</view>
		<view style="display: flex;justify-content: center;align-items: center;position: absolute;bottom: -1rpx;height: 116rpx;width: 100%;">
			<image style="width: 50%;height: 116rpx;" src="../static/p052.png" @click="uni.navigateTo({url:'/pages_apply_consult/artificial/index'})"></image>
			<image style="width: 50%;height: 116rpx;" src="../static/p053.png" @click="uni.navigateTo({url:'/pages_vote/prize'})"></image>
		</view>
	</view>
</template>

<script>
	import api from "@/api/searchSchool/school.js"
	export default{
		data(){
			return{
				list:[],
			}
		},
		onLoad() {
			this.handleSearch()
			uni.setNavigationBarTitle({
				title: '班级人气排行'
			})
		},
		methods:{
			fatherOnClick(item){
				
				console.log(item,'-------选中了父元素------')
				// console.log('父投票啦')
				uni.navigateTo({url:`/pages_vote/popularity?className=${item.className}`})
			},
			handleSearch(){
				api.getEachClassMoods({tenantId:this.tenantId}).then(res=>{
					this.list=res.result
					console.log(res.result,'classClass')
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.container{
		overflow: hidden;
		min-height: 100%;
		background-color: #D5DDFF;
	    position: relative;
		// padding: 20rpx 40rpx;
		.content{
			padding: 0rpx 40rpx;
			.text{
				color: #3D3D3D;
				font-weight: bold;
				font-size: 36rpx;
				line-height: 50rpx;
			}
			.stu-list{
				
				display: grid;
				grid-template-columns:49% 50%;
				gap: 20rpx;
				// padding-left: 40rpx;
				margin-top: 40rpx;
				margin-bottom: 126rpx;
				background-color: #D5DDFF;
				// grid-template-rows
				// @include flex(column,center,center);
				// width: 700rpx;
				
				.stu-item{
					position: relative;
					@include radius(30rpx);
					width: 324rpx;
					height: 312rpx;
					background-image: linear-gradient(0deg,#4C6CF7,#3E1CD6);
					
					image{
						height: 208rpx;
						width: 324rpx;
						@include radius(30rpx,'top');
					}
					.title{
						color: #FFFFFF;
						font-size: 32rpx;
						text-align: center;
						margin: 4rpx 0 4rpx 0;
					}
					.bottom{
						// display: grid;
						// grid-template-columns:50% 50%;
						// grid-template-rows:50% 50% 100%;
						@include flex(row,center,center);
						
							
						.text{
							font-size: 28rpx;
							color: #00FFFF;
						}
						
						
						.button{
							margin-left: 24rpx;
							width: 124rpx;
							height: 80rpx;
							text-align: center;
							line-height: 80rpx;
							color: #FFFFFF;
							@include radius(30rpx);
							background-image: linear-gradient(0deg,#F7634C,#FAB001);
						}
					}
					
				}
			}
		}
	}
</style>