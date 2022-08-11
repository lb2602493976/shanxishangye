<template>
	<view class="container">
		<Navbar1 type='2' :title="className"></Navbar1>
		<Home></Home>
		<view style="margin-top: 200rpx;"></view>
		<view class="content">
			<view class="top-player">
				<view class="top-player-left">
					<view class="text">参赛选手排行</view>
					<view style="color: #000000;opacity: 0.5;font-size: 24rpx;">点击选手头像查看详情</view>
				</view>
				<view class="top-player-right">
					<view class="left" :style="{'font-weight':typeVis==1?'bold':'none'}" @click="typeOnClick(1)">
						按人气
					</view>
					<view >
						|
					</view>
					<view class="right" :style="{'font-weight':typeVis==2?'bold':'none'}" @click="typeOnClick(2)">
						按编号
					</view>
				</view>
			</view>
			
			<view class="stu-list">
				<view class="stu-item" @click="fatherOnClick(item)" v-for="item of list">
					<image :src="item.picUrl" mode=""></image>
					<view class="bottom">
						<view class="title">
							{{item.stuName}}
						</view>
						<view class="text">
							编号：{{item.id}}号
						</view>
						<view class="text">
							人气：{{item.sentimentNum}}
						</view>
					</view>
					<view class="button" @click.stop="onClcik(item.id)">
						投票
					</view>
				</view>
				
				
				
			</view>
		</view>
		<view style="display: flex;justify-content: center;align-items: center;position: absolute;bottom: -1rpx;height: 116rpx;width: 100%;">
			<image style="width: 50%;height: 116rpx;" src="../static/p052.png" @click="uni.navigateTo({url:'/pages_apply_consult/artificial/index'})"></image>
			<image style="width: 50%;height: 116rpx;" src="../static/p053.png" @click="uni.navigateTo({url:'/pages_vote/prize'})"></image>
		</view>
		<Popupcenter ref="mychild" :show="isShow"></Popupcenter>
	</view>
</template>

<script>
	import api from "@/api/searchSchool/school.js"
	export default{
		data(){
			return{
				typeVis:'1',
				list:[],
				className:'',
				isShow:false
			}
		},
		onLoad(item) {
			this.className=item.className
			
			console.log(this.className,'classNameclassName')
			this.handleSearch(this.className)
		},
		methods:{
			fatherOnClick(item){
				console.log('-------选中了父元素------')
				uni.navigateTo({url:`/pages_vote/popularityDetail?id=${item.id}`})
			},
			handleSearch(className){
				api.getMoodsNumClass({tenantId:this.tenantId,className,state:this.typeVis}).then(res=>{
					this.list=res.result
					console.log(this.list,'this.list')
				})
			},
			
			onClcik(id){
				console.log('投票啦')
				// this.$refs.mychild.dialogToggle('success')
				api.getVoteNum({id,userId:getApp().globalData.user.id,activitiesDate:`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()-1}`}).then(res=>{
					if(res.code==200){
						uni.showModal({
							title: "投票成功",
							content: `${res.result}`,
							showCancel: false,
							success: (res) => {
							    console.log(res,'成功')
								this.handleSearch(this.className)
							},
						});
					}else{
						uni.showModal({
							title: "投票失败",
							content: `${res.message}`,
							showCancel: false
						});
					}
					
				})
			},
			typeOnClick(typeVis){
				if(typeVis==1){
					this.typeVis='1'
					this.handleSearch(this.className)
				}else if(typeVis==2){
					this.typeVis='2'
					this.handleSearch(this.className)
				}else{
					console.log("未知")
				}
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
			.top-player{
				@include flex(row,space-between,center);
				.top-player-left{
					.text{
						color: #3D3D3D;
						font-weight: bold;
						font-size: 36rpx;
						line-height: 50rpx;
					}
				}
				.top-player-right{
					@include flex(row,center,center);
					color: #3D3D3D;
					font-size: 28rpx;
					.left{
						// font-weight: bold;
						margin-right: 20rpx;
					}
					.right{
						margin-left: 20rpx;
						margin-right: 20rpx;
					}
				}
				
			}
			
			.stu-list{
				
				display: grid;
				grid-template-columns:100%;
				gap: 20rpx;
				margin-top: 40rpx;
				margin-bottom: 126rpx;
				background-color: #D5DDFF;
				// grid-template-rows
				// @include flex(column,center,center);
				// width: 700rpx;
				
				.stu-item{
					position: relative;
					@include radius(30rpx);
					// width: 324rpx;
					width: 670rpx;
					height: 194rpx;
					background-image: linear-gradient(45deg,#4D6DF3,#7358EC);
					@include flex(row,space-between,center)
					image{
						height: 152rpx;
						width: 152rpx;
						@include radius(30rpx);
						margin-left: 24rpx;
					}
					
					.bottom{
						
						// display: grid;
						// grid-template-columns:50% 50%;
						// grid-template-rows:50% 50% 100%;
						// @include flex(row,center,center);
						.title{
							color: #FFFFFF;
							font-size: 28rpx;
							line-height: 39.2rpx;
							// text-align: center;
							margin: 4rpx 0 14rpx 0;
						}
						.text{
							font-size: 28rpx;
							color: #00FFFF;
						}
					}
					.button{
						// margin-left: 24rpx;
						margin-right: 20rpx;
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
</style>