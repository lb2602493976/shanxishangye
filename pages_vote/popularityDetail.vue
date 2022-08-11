<template>
	<view class="container">
		<Navbar1 type='2' :title="`${detail.className}${detail.stuName}`"></Navbar1>
		<Home></Home>
		<view style="margin-top: 60rpx;"></view>
		<view class="big-title">
			<view class="number">
				<view class="title">
					参赛编号
				</view>
				<view class="text">
					{{detail.id}}
				</view>
			</view>
			<view class="people">
				<view class="title">
					人气值
				</view>
				<view class="text">
					{{detail.sentimentNum}}
				</view>
			</view>
			<view class="view">
				<view class="title">
					浏览量
				</view>
				<view class="text">
					{{detail.browseNum}}
				</view>
			</view>
		</view>
		<!-- 遮罩 -->
		<view class="popup-content">
			<view class="stu-list">
				<view class="stu-item" @click="fatherOnClick">
					<image :src="detail.picUrl" mode=""></image>
					<view class="bottom">
						<view class="title">
							大家好，我是{{detail.stuName}}
						</view>
						
					</view>
					<view class="button" @click.stop="onClcik(detail.id)">
						投票
					</view>
				</view>
				<image class="big-img" :src="detail.picUrl" mode=""></image>
				<!-- <view class="stu-item"></view> -->
				<!-- <view class="stu-item"></view> -->
			</view>
		</view>
		<!-- 下方 -->
		<view class="stu-bottom">
			<image class="image-bot" src="https://zhaosheng.kanxiaowang.com:8443/images/aa01f1447b1a40a8a1ccf1d48b38c0831655702056398.jpg" mode=""></image>
			<view class="prize-detail">
				<!-- <view>xxxxxxxxxxxxsdasdasdasdasdasdasdasd</view> -->
				<!-- <rich-text :nodes="newDetail.content"></rich-text> -->
				<scroll-view style="height: 100%;" scroll-y="true">
					<rich-text :nodes="newDetail.content"></rich-text>
				</scroll-view>
			</view>
			
		</view>
		<!-- 最下方 -->
		<view style="display: flex;justify-content: center;align-items: center;position: absolute;bottom: -1rpx;height: 116rpx;width: 100%;">
			<image style="width: 50%;height: 116rpx;" src="../static/p052.png" @click="uni.navigateTo({url:'/pages_apply_consult/registration/index'})"></image>
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
				isShow:false,
				detail:{},
				newDetail:{}
			}
		},
		onLoad(item) {
			console.log(item,'item')
			this.addPeople(item.id)
			this.handleSearch(item.id)
			this.getNews()
		},
		methods:{
			fatherOnClick(event){
				// let el1 = event.currentTarget
				// let el2 = event.target
				// console.log(event,'eeee')
				// if (el1 === el2) {
					
				// }
				console.log('-------选中了父元素------')
				// console.log('父投票啦')
				// uni.navigateTo({url:'/pages_vote/popularityDetail'})
			},
			handleSearch(id){
				api.getIdSearchStu({tenantId:this.tenantId,id}).then(res=>{
					this.detail=res.result[0]
					uni.setNavigationBarTitle({
						title: `大家好，我是${this.detail.className}${this.detail.stuName},欢迎大家给我投票!!!`
					})
					console.log(res.result[0],'resssssss')
				})
			},
			onClcik(id){
				// console.log('投票啦')
				// this.$refs.mychild.toggle('center')
				// this.$refs.mychild.dialogToggle('success')
				console.log(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,'`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`')
				api.getVoteNum({id,userId:getApp().globalData.user.id,activitiesDate:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`}).then(res=>{ 
					if(res.code==200){
						uni.showModal({
							title: "投票成功",
							content: `${res.result}`,
							showCancel: false,
							success: (res) => {
							    console.log(res,'成功')
								this.handleSearch(id)
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
			addPeople(id){
				api.getBrowseNum({id}).then(res=>{
					console.log(res,'增加浏览量')
				})
			},
			getNews(){
				const { tenantId } = this
				return api.getAllNews({ tenantId,type:100}).then(res=>{
					this.newDetail=res.result[0]
					console.log(res.result[0],'res.resultres.resultres.result')
					// this.newsConfig[configIndex].list = res.result.slice(0,3)
				})
			},
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
		.big-title{
			width: 100%;
			height: 300rpx;
			padding-top: 120rpx;
			background-color: #5874EC;
			@include flex(row,space-around,start)
			margin-top:46rpx;
			.number{
				text-align: center;
				.title{
					color: #84D4F9;
					font-size: 28rpx;
					line-height: 39.2rpx;
				}
				.text{
					color: #FFFFFF;
					font-size: 32rpx;
					font-weight: bold;
					line-height: 44.8rpx;
				}
			}
			.people{
				text-align: center;
				.title{
					color: #84D4F9;
					font-size: 28rpx;
					line-height: 39.2rpx;
				}
				.text{
					color: #FFFFFF;
					font-size: 32rpx;
					font-weight: bold;
					line-height: 44.8rpx;
				}
			}
			.view{
				text-align: center;
				.title{
					color: #84D4F9;
					font-size: 28rpx;
					line-height: 39.2rpx;
				}
				.text{
					color: #FFFFFF;
					font-size: 32rpx;
					font-weight: bold;
					line-height: 44.8rpx;
				}
			}
		}
		.popup-content{
			position: relative;
			top: -177rpx;
			width: 670rpx;
			height: 1082rpx;
			@include radius(20rpx);
			background-color: #ffffff;
			margin-left: 40rpx;
			.stu-list{
				display: grid;
				grid-template-columns:100%;
				// gap: 20rpx;
				margin-top: 40rpx;
				margin-bottom: 126rpx;
				// background-color: #D5DDFF;
				// grid-template-rows
				// @include flex(column,center,center);
				// width: 700rpx;
				
				.stu-item{
					position: relative;
					@include radius(30rpx);
					// width: 324rpx;
					width: 670rpx;
					height: 194rpx;
					// background-image: linear-gradient(45deg,#4D6DF3,#7358EC);
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
							width: 268rpx;
							 word-break:break-all;
							color: #000000;
							opacity: 0.6;
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
				.big-img{
					width: 644rpx;
					height: 850rpx;
					margin: 30rpx 13rpx;
					@include radius(30rpx);
				}
			}
		}
		.stu-bottom{
			position: relative;
			overflow: hidden;
			// margin-bottom: -10rpx;
			.image-bot{
				position: absolute;
				width: 100%;
				height: 1600rpx;
				
			}
			.prize-detail{
				position: relative;
				z-index: 100;
				// width: 670rpx;
				// height: 1400rpx;
				width: 578rpx;
				height: 1262rpx;
				@include radius(30rpx);
				// border-top: 70rpx solid transparent;
				// border-left: 670rpx solid red;
				background-color: rgba(255, 255, 255, 0.8);
				margin: 100rpx 40rpx 168rpx 40rpx;
				padding: 72rpx 46rpx 66rpx 46rpx;
				
			}
		}
	}
</style>