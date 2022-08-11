<template>
	<view class="container2">
		<image class="img-top"
			src="https://zhaosheng.kanxiaowang.com:8443/images/ba2a549d29004b1dac076f57335b2aa91655701980166.jpg">
		</image>
		<Navbar2></Navbar2>
		<Home></Home>
		<view style="margin-top: 200rpx;"></view>
		<view class="title-big">
			<view class="title-top">
				<!-- 《筑梦陕商，迎接未来》 -->
				{{dataSource.activity.activityTitle}}
			</view>
			<view class="title-bottom">
				{{dataSource.activity.activityContent}}
			</view>
		</view>
		<view class="img-center">
			<view class="one">
				<view class="title">参赛人数</view>
				<view class="num">{{dataSource.totalNum}}</view>
				<image class="img" :src="imgList[0]" mode=""></image>
			</view>
			<view class="two">
				<view class="title">总人气数</view>
				<view class="num">{{dataSource.alwaysSentiment}}</view>
				<image class="img" :src="imgList[1]" mode=""></image>
			</view>
			<view class="three">
				<view class="title">浏览总量</view>
				<view class="num">{{dataSource.alwaysBrowse}}</view>
				<image class="img" :src="imgList[2]" mode=""></image>
			</view>
		</view>
		<view class="time-out">
			<view class="text">
				活动结束剩余时间
			</view>
			<view class="time">
				<view class="back">
					{{day}}
				</view>
				<view class="minute">
					天
				</view>
				<view class="back">
					{{hour}}
				</view>
				<view class="minute">
					时
				</view>
				<view class="back">
					{{minute}}
				</view>
				<view class="minute">
					分
				</view>
				<view class="back">
					{{second}}
				</view>
				<view class="minute">
					秒
				</view>

			</view>
		</view>
		<view class="input-search">
			<uni-search-bar style="height: 50rpx;" :radius="50" placeholder="请输入选手编号快速投票" @confirm="search"
				:focus="false" v-model="searchValue" @blur="blur" @focus="focus" @input="input" @change="change"
				cancelButton="none" @clear="clear">
				<template v-slot:searchIcon>
					<uni-icons color="#999999" size="18" type="" />
				</template>
			</uni-search-bar>
		</view>
		<view class="stu-content">
			<view class="people-top">
				<view class="left" @click="topPeople()">
					人气排行榜TOP10
				</view>
				<view class="center">
					|
				</view>
				<view class="right" @click="uni.navigateTo({url:'/pages_vote/player'})">
					按班级查看
				</view>
			</view>
			<view class="stu-list">
				<view class="stu-item" @click="fatherOnClick(item)" v-for="(item,index) of stuList">
					<view class="cos"></view>
					<view class="number">
						{{item.id}}
					</view>
					<!-- <image  src="../static/p048.jpg" mode=""></image> -->
					<image :src="item.picUrl" mode=""></image>
					<view class="title">
						<!-- xxxx班xxx同学 -->
						{{item.className}}{{item.stuName}}
					</view>
					<view class="bottom">
						<view class="ggg">
							<view class="text">
								人气：
							</view>
							<view class="text">
								{{item.sentimentNum}}
							</view>
						</view>
						<view class="button" @click.stop="onClcik(item.id)">
							投票
						</view>
					</view>
				</view>

			</view>
		</view>
		<!-- 视频 -->
		<view class="video-center">
			<video class="" :src="videoList[0].va_url" controls></video>
		</view>
		
		<view class="stu-bottom">
			<image class="image-bot"
				src="https://zhaosheng.kanxiaowang.com:8443/images/aa01f1447b1a40a8a1ccf1d48b38c0831655702056398.jpg"
				mode=""></image>
			
			<view class="prize-detail">
				<!-- <view>xxxxxxxxxxxxsdasdasdasdasdasdasdasd</view> -->
				<scroll-view style="height: 100%;" scroll-y="true">
					
					<!-- <rich-text :nodes="newDetail.content" @click="richClick"></rich-text> -->
					<rich-text :nodes="newDetail.content"></rich-text>
				</scroll-view>
			</view>
		</view>

		<view style="display: flex;justify-content: center;align-items: center;position: relative;bottom: -1rpx;">
			<image style="width: 50%;height: 116rpx;" src="../static/p052.png"
				@click="uni.navigateTo({url:'/pages_apply_consult/registration/index'})"></image>
			<image style="width: 50%;height: 116rpx;" src="../static/p053.png"
				@click="uni.navigateTo({url:'/pages_vote/prize'})"></image>
		</view>
		<Popupcenter ref="mychild" :show="isShow"></Popupcenter>


	</view>
</template>


<script>
	import newsConfig, {
		tabMaps
	} from '@/config/news_config.js'
	import {
		login,
		getOpenId,
		getUserInfo,
		getUserProfile,
		getWxUserInfo,
		delUser
	} from '@/api/user.js'
	import api from '@/api/searchSchool/school.js'
	import addInterceptor from '@/config/interceptor.js'
	export default {
		data() {
			return {
				day: 0,
				hour: 0,
				minute: 0,
				second: 0,
				searchValue: '',
				dataSource: {},
				isShow: false,
				stuList: [],
				newDetail: {},
				imgList: [],
				contentTime: '',
				videoList:[],
			}
		},
		onLoad() {
this.handleLogin().then(async ()=>{
				await addInterceptor()
				this.handleSearch('')
				this.handleIdSearchStu('')
				this.getNews()
				this.getVid()
				this.countTime()
			})
			// this.timeOut()
			// this.countdown()
			
			// this.cods()
		},
		created() {
			// this.countdown()
			// setInterval(() => {
			//       setTimeout(() => {
			//         ///调取接口
			//         this.countdown()
			//       }, 0);
			// }, 1000); 
			// this.handSearch(){
			// 	setInterval(() => {
			// 		// 当前时间
			// 		let olddate = new Date()
			// 		// 目标时间减去当前时间
			// 		let down = newdate - olddate
			// 		// 当剩余时间为负数时，清楚计时器
			// 		if(down < 0){
			// 			clearInterval(setINT)
			// 		}
			// 		this.timeOut(newdate,olddate)
			// 	},1000)
			// }

		},
		computed() {

		},
		methods: {
			handleLogin(){
				return login().then(({ code,provider }) => {
					getOpenId(code).then(res => {
						// return delUser(res.data.result.RecruitStudent.id)
						if(res.data){
							const result = res.data.result
							getApp().globalData.user = result.RecruitStudent
							getApp().globalData.token = result.token
							getApp().globalData.openId = result.openid
							this.hasPhone = getApp().globalData.user.phone
							let user = getApp().globalData.user
							this.showPage = true
							if(user && !user.headPortrait){
								uni.showModal({
								    title: '需要您的授权',
								    content: '获得您的公开信息（昵称，头像等）',
								    success: (res) => {
								        if (res.confirm) {
								            getUserProfile(user.id).then(()=>{
												getUserInfo({ id:user.id }).then(res=>{
													getApp().globalData.user = res.data.result
													this.hasPhone = getApp().globalData.user.phone
													this.city = getApp().globalData.user.city
												})
											})
								        } else if (res.cancel) {
								            console.log('用户点击取消');
								        }
								    },
								});
							}
						}else{
							uni.showToast({
								title:'获取openId失败',
								icon:'none'
							})
						}
					}).catch((e)=>{
						uni.showToast({
							title:'获取openId失败',
							icon:'none'
						})
					})
				}).catch(e => {
					uni.showToast({
						title:e,
						icon:'none'
					})
				})
			},

			countTime() {
				var date = new Date();
				var now = date.getTime();
				let as = this.contentTime
				var endDate = new Date(as.replace(/-/g, '/')); //设置截止时间
				var end = endDate.getTime();
				var leftTime = end - now; //时间差                              
				var d, h, m, s, ms;
				if (leftTime >= 0) {
					d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
					h = parseInt((leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					m = Math.floor(leftTime / 1000 / 60 % 60);
					s = Math.floor(leftTime / 1000 % 60);
					// ms = Math.floor(leftTime % 1000);
					if (ms < 100) {
						ms = "0" + ms;
					}
					if (s < 10) {
						s = "0" + s;
					}
					if (m < 10) {
						m = "0" + m;
					}
					if (h < 10) {
						h = "0" + h;
					}
				} else {
					console.log('已结束。。。')
				}
				// console.log(d,h,m,s,'000000000000000000000000000')

				this.day = d,
					this.hour = h,
					this.minute = m,
					this.second = s,

					//将倒计时赋值到div中
					// document.getElementById("_d").innerHTML = d + "天";
					// document.getElementById("_h").innerHTML = h + "时";
					// document.getElementById("_m").innerHTML = m + "分";
					// document.getElementById("_s").innerHTML = s + "秒";
					// document.getElementById("_ms").innerHTML = ms + "毫秒";
					//递归每秒调用countTime方法，显示动态时间效果
					setTimeout(this.countTime, 1000);
			},

			// getClassSelect,
			// getClassSelectStudent,
			// getEventHome,
			// getVoteNum,
			// getBrowseNum,
			// getEachClassMoods,
			// getMoodsNumClass,
			// getPicCome,
			handleSearch(id) {
				// 传参：tenantId，id   选手编号（非必传）
				// 返回参数：list 投票首页列表
				// totalNum   总参赛人数
				// alwaysSentiment  总人气
				// alwaysBrowse   总参浏览量
				// activity   当前活动实体
				uni.showLoading()
				api.getEventHome({
					tenantId: this.tenantId,
					id
				}).then(res => {
					this.dataSource = res.result
					this.imgList = res.result.activity.activityPic.split(',')

					uni.setNavigationBarTitle({
						title: res.result.activity.activityTitle
					})
					// console.log(res.result.activity.activityTitle,'pic')
					this.contentTime = res.result.activity.endDate
				}).finally(() => {
					uni.hideLoading()
				})
			},
			handleIdSearchStu(id) {
				api.getIdSearchStu({
					tenantId: this.tenantId,
					id
				}).then(res => {
					this.stuList = res.result
					console.log(this.stuList, '选手编号')
				})
			},
			topPeople() {
				this.handleIdSearchStu("")
			},
			getNews() {
				const {
					tenantId
				} = this
				return api.getAllNews({
					tenantId,
					type: 100
				}).then(res => {
					this.newDetail = res.result[0]
					console.log(res.result[0], 'res.resultres.resultres.result')

					// this.newsConfig[configIndex].list = res.result.slice(0,3)
				})

			},
			getVid(){
				// ,sort:100
				api.getSchoolVideoList({tenantId:this.tenantId}).then(res=>{
					let a=res.result
					this.videoList=a.filter(item=>{
						console.log(item.sort==100,'item.sort==100')
						return item.sort==100
					})
					console.log(this.videoList,'resVideo')
				})
			},
			
			search(e) {
				console.log(e, 'search')
				this.handleIdSearchStu(e.value)
			},
			blur(e) {
				console.log(e, 'blur')
				this.handleIdSearchStu(e.value)
			},
			focus(e) {
				console.log(e, 'focus')
			},
			input(e) {
				if (e) {

				} else {
					this.handleIdSearchStu('')
				}
				console.log(e, 'input')
			},
			cancel(e) {
				console.log(e, 'cancel')
			},
			change(e) {
				console.log(e, 'change')
			},
			clear(e) {
				console.log(e, 'clear')
			},
			richClick(){
				// 富文本
				const richContent = this.newDetail.content;
				// 判断含有图片
				if (richContent.indexOf("src") >= 0) {
				  const imgs = [];
				  richContent.replace(/]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
					imgs.push(capture);
				  })
				  console.log(richContent,'richContent')
				  console.log(imgs,'imgs')
				  uni.previewImage({
					current: imgs[0], // 当前显示图片的http链接
					urls: imgs
				  })
				}
			},
			// countdown(){
			// 	let newdate = new Date('2021/04/21')
			// 	// let setINT = setInterval(() => {
			// 		let olddate = new Date()
			// 		let down = newdate - olddate
			// 		// if(down < 0){
			// 		// 	clearInterval(setINT)
			// 		// }
			// 		// this.timeOut(newdate,olddate)
			// 		// console.log(this.dataSource.activity.endDate,'this.dataSource.activity.endDate')
			// 		// console.log(this.dataSource.activity.startDate,'this.dataSource.activity.startDate')
			// 		// this.timeOut(this.dataSource.activity.endDate,this.dataSource.activity.startDate)
			// 	// },1000)
			// },
			// timeOut(d2,d1){
			// 	d1=new Date()
			// 	d2=new Date(`${d2} 23:59:59`)
			// 	// console.log(new Date(),'newData')
			// 	// console.log(d2,'this.dataSource.activity.endDate')
			// 	// console.log(d1,'this.dataSource.activity.startDate')
			// 	// var d=d2-d1;
			// 	// d=Math.floor( d/1000 );
			// 	// this.day=Math.floor( d/(246060) );
			// 	// var hour=d%(246060);
			// 	// this.hour=Math.floor( hour/(6060) );
			// 	// var minute=d%(6060);
			// 	// this.minute=Math.floor( minute/60 );
			// 	// this.second=d%60;
			// 	// console.log(this.day,this.hour,this.minute,this.second);

			// },

			fatherOnClick(item) {
				console.log(item, '-------选中了父元素------')
				uni.navigateTo({
					url: `/pages_vote/popularityDetail?id=${item.id}`
				})
			},

			onClcik(id) {
				api.getVoteNum({
					id,
					userId: getApp().globalData.user.id,
					activitiesDate: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()-1}`
				}).then(res => {
					if (res.code == 200) {
						uni.showModal({
							title: "投票成功",
							content: `${res.result}`,
							showCancel: false,
							success: (res) => {
								console.log(res, '成功')
								this.topPeople()
								// this.handleIdSearchStu(id)

							},
						});
					} else {
						uni.showModal({
							title: "投票失败",
							content: `${res.message}`,
							showCancel: false
						});
					}

				})
			}

		}
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';

	.container2 {
		position: relative;
		overflow: hidden;
		min-height: 100%;

		.img-top {
			width: 100%;
			height: 1350rpx;
			position: absolute;
			top: 0rpx;

		}

		.title-big {
			// overflow: hidden;
			position: relative;
			z-index: 100;
			width: 670rpx;
			height: 180rpx;
			text-align: center;
			// background-color: aqua;
			margin: 46rpx 40rpx 0rpx 40rpx;

			.title-top {
				font-size: 44rpx;
				color: #FFFFFF;
				line-height: 61rpx;
				font-weight: bold;
			}

			.title-bottom {
				// width: 502rpx;
				font-size: 28rpx;
				margin-top: 10rpx;
				text-align: center;
				color: #FFFFFF;
			}
		}

		.img-center {
			width: 100%;
			// padding: 0 30rpx;
			height: 480rpx;
			position: relative;
			z-index: 100;

			@include flex(row, center, center) .one,
			.two,
			.three {
				width: 225rpx;
				height: 480rpx;
				transform: skewY(-5deg);
				@include radius(20rpx);
				text-align: center;
				background-image: linear-gradient(0deg, #4C6CF7, #3E1CD6);

				.title {
					color: #84D4F9;
					font-size: 28rpx;
					margin-top: 26rpx;
					transform: skewY(5deg);
				}

				.num {
					color: #FFFFFF;
					font-weight: bold;
					font-size: 32rpx;
					margin-bottom: 4rpx;
					transform: skewY(5deg);
				}

				.img {
					width: 225rpx;
					height: 360rpx;
					// transform: skewY(-5deg);
					margin-top: 15rpx;
					@include radius(20rpx);
				}
			}

			.one {
				// background-color: aliceblue;

			}

			.two {
				margin-left: 8rpx;
				// background-color: aquamarine;
			}

			.three {
				margin-left: 8rpx;
				// background-color: bisque;
			}
		}

		.time-out {
			position: relative;
			z-index: 100;
			margin: 44rpx auto 22rpx;
			text-align: center;

			.text {
				color: #3D3D3D;
				font-size: 28rpx;
				font-weight: bold;

			}

			.time {
				text-align: center;
				margin: 20rpx 0 20rpx 0;
				padding: 0 40rpx;
				@include flex(row, center, center);

				.back {
					width: 94rpx;
					height: 80rpx;
					@include radius(20rpx);
					background-color: #FFFFFF;
					opacity: 0.6;
					text-align: center;
					line-height: 80rpx;
				}

				.minute {
					width: 94rpx;
					height: 80rpx;
					text-align: center;
					line-height: 80rpx;

				}
			}
		}

		.input-search {
			width: 500rpx;
			text-align: center;
			margin: 0 auto;

			.uni-searchbar__box {
				height: 80rpx;
				font-size: 30rpx;
			}
		}

		.stu-content {
			position: relative;
			z-index: 100;

			.people-top {
				@include flex(row, center, center);

				.left {
					font-size: 36rpx;
					color: #3D3D3D;
					font-weight: bold;
				}

				.center {
					margin: 0 74rpx;
				}

				.right {
					font-size: 36rpx;
					color: #3D3D3D;
				}
			}

			.stu-list {

				display: grid;
				grid-template-columns: 46% 50%;
				gap: 20rpx;
				padding-left: 40rpx;
				margin-top: 40rpx;
				background-color: #D5DDFF;
				// grid-template-rows
				// @include flex(column,center,center);

				// width: 700rpx;
				.stu-item:nth-child(2) {
					.cos {
						position: absolute;
						-webkit-transform: rotate(45deg);
						top: -40rpx;
						right: -50rpx;
						z-index: 1000;
						width: 130rpx;
						height: 100rpx;
						background-image: url(../static/2222.png);
						background-size: 100% 100%;
					}
				}

				.stu-item:nth-child(3) {
					.cos {
						position: absolute;
						-webkit-transform: rotate(45deg);
						top: -40rpx;
						right: -50rpx;
						z-index: 1000;
						width: 130rpx;
						height: 100rpx;
						background-image: url(../static/3333.png);
						background-size: 100% 100%;
					}
				}

				.stu-item:nth-child(1) {
					.cos {
						position: absolute;
						-webkit-transform: rotate(45deg);
						top: -40rpx;
						right: -50rpx;
						z-index: 1000;
						width: 130rpx;
						height: 100rpx;
						background-image: url(../static/1111.png);
						background-size: 100% 100%;

					}
				}

				.stu-item {
					position: relative;
					@include radius(30rpx);
					width: 320rpx;
					height: 580rpx;
					background-image: linear-gradient(0deg, #4C6CF7, #3E1CD6);

					.number {
						width: 136rpx;
						height: 70rpx;
						position: absolute;
						top: 0;
						left: 0;
						z-index: 100;
						background-image: linear-gradient(45deg, #5874EC, #4D6DF3);
						border-top-left-radius: 30rpx;
						// border-top-right-radius: 2em;
						border-bottom-right-radius: 50rpx;
						color: #FFFFFF;
						font-size: 36rpx;
						line-height: 70rpx;
						text-align: center;
						// border-bottom-left-radius: 2em;

					}

					image {
						height: 400rpx;
						width: 320rpx;
						@include radius(30rpx, 'top');
					}

					.title {
						color: #FFFFFF;
						font-size: 28rpx;
						text-align: center;
						margin: 16rpx 0 35rpx 0;
					}

					.bottom {
						display: grid;
						grid-template-columns: 50% 50%;
						grid-template-rows: 50% 50% 100%;

						.ggg {
							margin-left: 24rpx;

							.text {
								font-size: 28rpx;
								color: #00FFFF;
							}
						}

						.button {
							margin-left: 24rpx;
							width: 124rpx;
							height: 80rpx;
							text-align: center;
							line-height: 80rpx;
							color: #FFFFFF;
							@include radius(30rpx);
							background-image: linear-gradient(0deg, #F7634C, #FAB001);
						}
					}

				}
			}


		}
		
		.video-center{
			width: 100%;
			
			background-color: #D5DDFF;
			text-align: center;
			padding-top: 40rpx;
			video{
				width: 89%;
				height: 385rpx;
				border-radius: 30rpx;
			}
		}
		.stu-bottom {
			position: relative;
			overflow: hidden;
			margin-bottom: -10rpx;

			.image-bot {
				position: absolute;
				width: 100%;
				height: 1600rpx;

			}

			.prize-detail {
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
				margin: 100rpx 40rpx 68rpx 40rpx;
				padding: 72rpx 46rpx 66rpx 46rpx;

			}
		}

	}
</style>
