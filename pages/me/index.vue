<template>
	
	<view class="container">
		<view class="top">
			<view class="bg"></view>
			<image @click="getInfo" :src="user.headPortrait || defaultAvatar" mode=""class="head"></image>
			<view @click="getInfo" class="nickname">
				<text v-if="user.userName">{{user.userName}}</text>
				<text v-else>'未登录'</text>
				<!-- 测试
				<!-- <text> 张三 </text> -->
			</view>
		</view>
		<!-- <BasePage> -->
		<view class="content">
			<view class="list" v-for="item in lists" @click="viewDetail(item)" style="position:relative">
				<view class="listleft" style="position:relative">
					<image :src="item.icon" mode="widthFix"></image>
					 <button id="handleShare" style="border-radius:0;position:absolute;top:0;left:0;width:726rpx;height:100%;" open-type="share" v-if="item.name=='share1'"></button>
					 <block>{{item.title}}</block>
				</view>
				<view class="right" >
					<image  src="../../static/me/p021.png" mode="" ></image>
				</view>
				<!-- <button
					@click.stop="()=>{}"
					v-if="item.getPhoneNumberButton && !hasPhone"
					style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0" 
					ref="getPhoneNumber" 
					open-type="getPhoneNumber" 
					@getphonenumber="res=>_getPhoneNumber(res,{ success:() => handlePhone(item,index),fail:()=>{
						uni.showToast({ title:'获取手机号失败',icon:'none' })
					} })"
				></button> -->
			</view>
		</view>
		<!-- </BasePage> -->
		<!-- 分享朋友圈 -->
		<view class="sharecontent" v-if="shareflag">
			<view id="sharetop" class="sharetop">
				<view style="position:relative;">
					<image class="canvas-draw" style="width:668rpx;height:812rpx ;" :src="picinfo.bg" data-type="image" :data-url="picinfo.bg"></image>
					<rich-text style="position:absolute;top:120rpx;left:40rpx;" :nodes="richNodes"></rich-text>
				</view>
				<view style="box-sizing:border-box;min-height:150rpx;">
					<view style="font-size:31rpx;width:calc(100% - 150rpx)" data-type="text" :data-text="`我刚报名了${picinfo.school},快来看看吧`" class="canvas-draw">
						我刚报名了{{picinfo.school}},快来看看吧 
					</view>
					<image style="width:150rpx;height:150rpx;" data-type="image" :data-url="picinfo.codeimg" class="canvas-draw" :src="picinfo.codeimg"></image>
				</view>
				<view style="font-size:25rpx;" data-type="text" data-text="长按图片识别二维码，了解本校" class="canvas-draw">长按图片识别二维码，了解本校</view>
			</view>
			<view class="sharebottom">
				<view @click="changeImage" class="">
					<image src="../../static/share_haibao_0.png" mode="aspectFit"></image>
					<view>更换图片</view>
				</view>
				<view @click="handleSaveToAlbum">
					<image src="../../static/share_haibao_3.png" mode="aspectFit"></image>
					<view>保存到相册</view>
				</view>
			</view>
			<view style="position:absolute;right:0;top:50upx;">
				<image src="../../static/pic868.png" mode="" style="width: 100upx;height: 100upx;" @click="close"></image>
			</view>
		</view>
		
		<canvas style="width: 668rpx; height: 1032rpx;position:fixed;top:-2000rpx;z-index:-1;" canvas-id="canvas"></canvas>
	</view>
	
</template>

<script>
	import Wxml2Canvas from '@/utils/wxml2canvas/index.js';
	import api from '@/api/info/index.js'
	import { getQrCode } from '@/api/app.js'
	import { getUserInfo,getWxUserInfo } from '@/api/user'
	import { pathToBase64, base64ToPath } from 'image-tools'
	import { upload } from '@/api/app.js'
	import moment from 'moment' 
	export default{
		data() { 
			let school = getApp().globalData.school
			return {
				user:getApp().globalData.user,
				richNodes:[],
				defaultAvatar:'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
				picinfo:{
					logo:'../../static/img/logo.png',
					// school:school.name,
					school:"西安高新技师学院",
					bg:'',
					codeimg:''
				},
				hasPhone:'',
				imageList:[],
				imgIndex:0,
				shareflag:false,
				bg:'../../static/img/bg001.jpg',
				info:{
					avator:'../../static/cover.png',
					name:'张小三'
				},
				lists:[
					{
						icon:'../../static/me/p016.png',
						title:'我的信息',
						name:'profile',
						getPhoneNumberButton:true
					},
					{
						icon:'../../static/me/p017.png',
						title:'我的报名',
						name:'myinfo'
					},
					{
						icon:'../../static/me/p018.png',
						title:'联系学校',
						name:'callschool'
					},
					// {
					// 	icon:'../../static/me/p019.png',
					// 	title:'网上看校',
					// 	name:'internetschool'
					// },
					{
						icon:'../../static/me/p020.png',
						title:'乘车路线',
						name:'address'
					},
					{
						icon:'../../static/me/p054.png',
						title:'我的活动',
						name:'actives'
					}
					// {
					// 	icon:'../../static/share.png',
					// 	title:'分享给好友',
					// 	name:'share1'
					// },
					// {
					// 	icon:'../../static/pengyouquan.png',
					// 	title:'分享到朋友圈',
					// 	name:'share2'
					// },
					
				]
			}
		},
		onLoad(){
			this.hasPhone = getApp().globalData.user.phone
			console.log(getApp().globalData.school,'school')
			console.log(getApp().globalData.user,'user')
			let _this = this
			// getQrCode({ tenantId:this.tenantId,param:`shareId=${ this.user.id }`,page:'pages/home/index' }).then(res => {
			// 	console.log(res,'SSSSSSSSSSSSS')
			// 	let time = moment().format('YYYY_MM_DD_HH:mm:ss')
			// 	let fileName = this.user.userName + '_' + time + '.png'
			// 	const fsm = uni.getFileSystemManager();
			// 	const buffer = wx.base64ToArrayBuffer(res.result)
			// 	const filePath = `${ wx.env.USER_DATA_PATH }/${ fileName }`
			// 	console.log('debug1') 
			// 	fsm.writeFile({
			// 		 filePath, 
			// 		 encoding:'binary',
			// 		 data:buffer,
			// 		 success:()=>{
			// 			 console.log('debug2')
			// 			 upload({ path:filePath }).then(pathRes => {
			// 				 console.log('debug3')
			// 				 let obj = JSON.parse(pathRes)
			// 				 _this.$set(_this.picinfo,'codeimg',obj.url)
			// 				 console.log(obj,'pathRes')
			// 			 })
			// 		 },
			// 		 fail:(e)=>{
			// 			 console.log(e)
			// 			uni.showToast({
			// 				title:'生成文件失败',
			// 				icon:'none',
			// 			}) 
			// 		 },
			// 	})
			// })
			api.getPosterData({ type:'1',tenantId:this.tenantId }).then(res=>{
				this.imageList = res.result.map(item => item.content)
				this.picinfo.bg = this.imageList[this.imgIndex++]
			})
		},
		onShow(){
			this.user = getApp().globalData.user
		},
		methods: {
			getInfo(){
				let user = getApp().globalData.user
				if(user.userName && user.headPortrait) return 
				uni.showModal({
				    title: '需要您的授权',
				    content: '获得您的公开信息（昵称，头像等）',
				    success: (res) => {
				        if (res.confirm) {
				            getWxUserInfo(user.id).then(()=>{
								this.user = getApp().globalData.user
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			changeImage(){
				let len = this.imageList.length - 1
				if(len >= 0){
					if(this.imgIndex > len){
						this.imgIndex = 0
					}
					this.picinfo.bg = this.imageList[this.imgIndex++]
				}
			},
			handleSaveToAlbum(){
				uni.showLoading()
				const canvasId = 'canvas'
				let self = this;
				const query = uni.createSelectorQuery().in(this);
				query.select(`#sharetop`).boundingClientRect(data => {
					let sInfo = uni.getSystemInfoSync()
					let containerWidth = data.width,containerHeight = data.height;
					this.drawImage1 = new Wxml2Canvas({
					  width: containerWidth, // 宽， 以iphone6为基准，传具体数值，其他机型自动适配
					  height: containerHeight, // 高
					  element: canvasId,
					  background: '#fff',
					  progress(percent) {},
					  finish(url) {
						uni.hideLoading()
						uni.getSetting({
							success:res => {
								// 判断是否授权
								if (res.authSetting['scope.writePhotosAlbum']) {
									console.log(res.authSetting['scope.writePhotosAlbum'],'auth')
									uni.saveImageToPhotosAlbum({
									  filePath: url,
									  success(res) {
									    uni.showToast({
									      title: '名片已经保存到相册中',
									    })
									  },
									  fail:function (err) {
									    uni.showToast({
									      title: '保存失败',
										  icon:'none'
									    })
									  }
									})
								}else{
									console.log(res.authSetting,'authfalse')
									uni.authorize({
										scope:'scope.writePhotosAlbum',
										success(){
											uni.saveImageToPhotosAlbum({
											  filePath: url,
											  success(res) {
											    uni.showToast({
											      title: '名片已经保存到相册中',
											    })
											  },
											  fail:function (err) {
											    uni.showToast({
											      title: '保存失败',
											      icon:'none'
											    })
											  }
											})
										},
									})
								}
							}
						})
					    
					  },
					  error(res) {
						console.log(res)
					  }
					});
					let drawData = {
					  list: [{
					    type: 'wxml',
					    class: '.sharetop .canvas-draw', // draw_canvas指定待绘制的元素
					    limit: '.sharetop', // 限定绘制元素的范围，取指定元素与它的相对位置
					    x: 0,
					    y: 0
					  }]
					}
					this.drawImage1.draw(drawData);
				}).exec();
				
			},
			close() {
				this.shareflag = false;
			},
			handlePhone(item,index){
				this.hasPhone = getApp().globalData.user.phone
				this.viewDetail(item,index)
				console.log(item,'item')
				console.log(index,'index')
			},
			viewDetail(item) {
				console.log(item,'1111');
				if (item.name == "consultation" || item.name == "enrollInfo") {
					uni.switchTab({
						url: "/pages/" + item.name + "/index"
					})
				} else if(item.name == 'share1'){
					uni.share({
					    provider: "weixin",
					    scene: "WXSceneSession",
					    type: 0,
					    href: "http://uniapp.dcloud.io/",
					    title: "甘肃建筑职业学院分享",
					    summary: "欢迎报考甘肃建筑职业学院！",
					    imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
					});
				}else if(item.name == 'share2'){
					this.shareflag = true
				}else {
					console.log('aaa')
					uni.navigateTo({
						url: "/pages_me/" + item.name + "/index"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.container {
		min-height: 100vh;
		// height: 1000rpx;
		position: relative;
		// background-color: #FFFFFF;
		.sharecontent{
			height: auto;
			min-height: 100vh;
			position: absolute;
			z-index: 100;
			width: 100%;
			left: 0;
			top: 0;
			background-color: rgba(0,0,0,.7);
			display: flex;
			padding: 101rpx 41rpx;
			box-sizing: border-box;
			flex-direction: column;
			align-items: center;
			.sharetop{
				border-radius:14rpx;
				margin-bottom: 31rpx;
				width: 668rpx;
				margin: 0 auto;
				overflow: hidden;
				>view{
					&:first-child{
						height: 813rpx;
						width: 668rpx;
						position: relative;
						>image{
							position: absolute;
							width: 100%;
							height: 100%;
							left: 0;
							top: 0;
						}
						.logo{
							position: absolute;
							font-family:Source Han Sans CN;
								font-size: 25rpx;
								line-height: 21rpx;
								letter-spacing: 1rpx;
								color: #ffffff;
							padding: 49rpx 43rpx;
							image{
								width: 37rpx;
								height: 37rpx;
								margin-right: 17rpx;
								vertical-align: middle;
							}
						}
					}
					&:nth-child(2){
						height: 143rpx;
						background: #fff;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						padding: 10rpx 20rpx;
						view{
								font-family:Source Han Sans CN;
								font-size: 31rpx;
								line-height: 45rpx;
								color: #000000;
						}
						image{
							width: 180rpx;
								height: 150rpx;
						}
					}
					&:last-child{
						text-align: center;
							font-family:Source Han Sans CN;
							font-size: 25rpx;
							font-weight: normal;
							font-stretch: normal;
							line-height: 21rpx;
							letter-spacing: 0rpx;
							color: #ccc;
							background-color: #fff;
							padding-bottom: 38rpx;
					}
				}
			}
			.sharebottom{
				margin-top: 20rpx;
					width: 673rpx;
					height: 168rpx;
					background-image: linear-gradient(180deg, 
						#ffffff 0%, 
						#e9e9e9 100%), 
					linear-gradient(
						#ffffff, 
						#ffffff);
					background-blend-mode: normal, 
						normal;
					border-radius: 14rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items:center;
					>view{
						height: 100%;
						width: 50%;
						border-right: 1px solid #efefef;
						&:last-child{
							border-right: none;
						}
						display: flex;
						// flex-direction: column;
						box-sizing: border-box;
						// justify-content: space-between;
						align-items: center;
						view{
							font-family:Source Han Sans CN;
							font-size: 28rpx;
							font-weight: normal;
							font-stretch: normal;
							line-height: 56rpx;
							letter-spacing: 0rpx;
							color: #000000;
							margin: 10rpx 0 0 30rpx;
							// margin-top: 10rpx;
							// padding-bottom: 35rpx; 
						}
						image{
							width: 58rpx;
							height: 58rpx;
							padding-top: 15rpx;
							margin-left: 50rpx;
								
						}
						// 一套css
						// view{
						// 		font-family:Source Han Sans CN;
						// 		font-size: 28rpx;
						// 		font-weight: normal;
						// 		font-stretch: normal;
						// 		line-height: 45rpx;
						// 		letter-spacing: 0rpx;
						// 		color: #000000;
						// 		margin-top: 10rpx;
						// 		padding-bottom: 35rpx;
						// }
						// image{
						// 	width: 58rpx;
						// 		height: 58rpx;
						// 		padding-top: 35rpx;
								
						// }
					}
			}
		}
		.top{
			position: relative;
			width: 100%;
			height: 314rpx;
			text-align: center;
			.bg{
				width: 100%;	
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: -1;
				// background-image:linear-gradient(180deg, $theme, $theme2);
				background:#5175F4;
			}
			.head{
				margin-top: 78rpx;
				border-radius: 50%;
				width: 141rpx;
				height: 141rpx;
			}
			.nickname{
					font-family: MicrosoftYaHei;
					font-size: 31rpx;
					font-weight: normal;
					font-stretch: normal;
					line-height: 38rpx;
					letter-spacing: 2rpx;
					color: #ffffff;
					text-align: center;
					margin-top: 15rpx;
			}
		}
		.content{
			// min-height: calc(100vh - 314rpx);
			// height: 1000rpx;
			height: 100%;
			background-color: #ffffff;
			border-radius: 13rpx 13rpx 0 0;
			padding: 40rpx 27rpx;
			// box-sizing: border-box;
			margin-top: -13rpx;
			.list{
				width: 694rpx;
					height: 91rpx;
					background-color: #ffffff;
					border-radius: 13rpx;
					border: solid 1rpx #e3e3e3;
					padding: 24rpx 18rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 30rpx;
					background-image:linear-gradient(to top,#E9E9E9,#FFFFFF);
					.listleft{
							image{
								width: 62rpx;
								height: auto;
								margin-right: 15rpx;
								vertical-align: middle;
							}
						
							font-family: MicrosoftYaHei;
							font-size: 30rpx;
							line-height: 77rpx;
							color: #282828;
					}
					.right{
						width: 30rpx;
						height: 30rpx;
						// background: #6C6C6C;
						color: #fff;
						border-radius: 50%;
						text-align: center;
						line-height: 30rpx;
						>image{
							width: 30rpx;
							height: 30rpx;
							color: #fff;
							opacity: 1;	
						}
					}
			}
		}
		button{
			background: unset;
			border: none;
			outline: none;
			display: inline-block;
			font-size: 30rpx;
			line-height: 77rpx;
			height: 53rpx;
			color: #282828;
			padding: 0;
			&::after {
			    content: " ";
			    width: 200%;
			    height: 200%;
			    position: absolute;
			    top: 0;
			    left: 0;
			    border: none;
			    -webkit-transform: scale(.5);
			    transform: scale(.5);
			    -webkit-transform-origin: 0 0;
			    transform-origin: 0 0;
			    box-sizing: border-box;
			    border-radius: 10px;
			}
		}
	}
</style>
 -->