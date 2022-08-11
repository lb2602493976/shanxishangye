<template>
	<!-- <BasePage> -->
	<view class="container">
		<!-- <image src="../../static/bg-001.jpg" mode="" class="bg"></image> -->
		<!-- <view style="margin: 0 0 30upx 40upx;">欢迎报读西安高新技师学院！</view> -->
		<view class="iconlist2">
			<view class="list" v-for="(item,index) in iconlist2" >
				<image class="bg" :src="item.icon" @click="ichang(item,index)"></image>
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
		<view class="news">
			<view class="schoolNewsTitle">
				<view class="cn">常见问题</view>
				<view class="en" style="opacity: 0.5;">QUESTIONS</view>
			</view>
			<!-- <view class="titleTitle">
				<TitleFFF :title="listTitle"></TitleFFF>
				<Title type="1" :title="listTitle"></Title>
			</view> -->
			<view class="schoolNews">
				<view class="schoolNew" v-for="(item,index) in lists" :key="index">
					<view style="display: flex;align-items: center;justify-content: inherit;" @click="openTip(item)">
						<view style="display: flex;align-items: center;">
							<!-- <view class="pic1">?</view> -->
							<image src="../../static/me1/p016.png" style="width: 65rpx;height:65rpx;"></image>
							<view class="title">{{item.aiTitle}}</view>
						</view>
						<!-- <image src="../../static/arrow-down.png" mode="" :class="item.flag == true?'active_180':''" style="width: 40upx;height: 40upx;"></image> -->
					</view>
					<!-- <p class="text" v-if="item.flag">{{item.aiContent}}</p> -->
				</view>
			</view>
		</view>
	</view>
	<!-- </BasePage> -->
</template>

<script>
	import api from '@/api/searchSchool/school.js'
	export default {
		data() {
			return {
				iconlist2: [
					// {
					// 	id: 0,
					// 	icon: '../../static/img/qa.png',
					// 	name: 'artificial',
					// 	title: '常见问题'
					// },
					{
						id: 0,
						icon: 'https://zhaosheng.kanxiaowang.com:8443/images/4c501942056447caad2b905e654ddb7f1655702336971.png',
						name: 'artificial',
						title: '咨询报名',
						getPhoneNumberButton:true
					},
					
					{
						id: 2,
						icon: 'https://zhaosheng.kanxiaowang.com:8443/images/c6f76ef3009b4f0aa815f38d06e92b721655702363987.png',
						name: 'registration',
						title: '在线报名',
						getPhoneNumberButton:true
					},
					// {
					// 	id: 3,
					// 	icon: '../../static/phoneMoney.png',
					// 	name: 'pay',
					// 	title: '在线缴费',
					// 	getPhoneNumberButton:true
					// },
				],
				listTitle: '常见问题',
				lists: [],
				hasPhone:'',
			}
		},
		onLoad(id) {
			console.log(this.tenantId,'tenantId')
			this.handleSearch()
		},
		onShow(){
			if(getApp().globalData.user){
				this.hasPhone = getApp().globalData.user.phone
			}
		},
		methods: {
			handleSearch() {
				uni.showLoading()
				api.getrecruitAiWords({
					tenantId:this.tenantId,type:'',
				}).then(res => {
					if(res.code===200){
						this.lists=res.result
						console.log(res.result,'res')
						
					}else{
						// this.$message.error(res.data.msg)
						uni.showModal({
							title: "数据获取失败",
							content: `${res.message}`,
							// content: '表单数据内容：' + JSON.stringify(formdata),
							showCancel: false
						});
						// uni.showToast({
						//     title:`${res[1].data.message}`,
						//     // title:'111',
						// 	icon:'none',
						//     duration: 2000
						// });
					}
					
				}).finally(() => {
					uni.hideLoading()
				})
			},
			
			handlePhone(item,index){
				this.hasPhone = getApp().globalData.user.phone
				this.ichang(item,index)
			},
			ichang(item,index) {
				console.log(item)
				if(item.name=="pages_vote"){
					uni.navigateTo({
						url: "/" + item.name + "/index"
					})
				}else{
					uni.navigateTo({
						url: "/pages_apply_consult/" + item.name + "/index"
					})
				}
				
			},
			openTip(item) {
				console.log(item,'item')
				// console.log(item,'item')
				uni.setStorageSync('cmContent', item);
				uni.navigateTo({
					url:`/pages/consulting/detail`
				})
				
				// item.flag = !item.flag;
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.container {
		// background-color: $theme;
		// border-radius: 30rpx;
		// padding-top: 70rpx;
		box-sizing: border-box;
		width: 100%;
		height: 100vh;
		position: relative;
		display: flex;
		flex-flow:column nowrap;
		justify-content: flex-start;
		align-items: stretch;
		overflow:hidden;
		>.bg{
			position: absolute;
			left: 0;
			// top: -20upx;
			top: 0;
			width: 100%;
			height: 100%;
			// width:700upx;
			// height: 230upx;
			z-index: -1;
		}
		
		.iconlist2 {
			width: 700rpx;
			display: flex;
			flex-direction: row;
			// flex-wrap: wrap;
			justify-content: flex-start;	
			margin: 0 auto;
			margin-top:28rpx;
			
			.list:first-child  {
				text-align: center;
				position:relative;  //!import
				// image:first-child{
				image{
					width:700upx;
					height: 230upx;
					// width: 368rpx;
					// height: 306rpx;
					// width: 30%;
					// box-shadow: 0rpx 4rpx 9rpx 0rpx 
					// rgba(0, 0, 0, 0.35);
					// border-radius: 13rpx;
					// margin: 106rpx 0rpx 15rpx 0rpx;
					z-index: 10;
					// background-color: #FFFFFF;
					position: absolute;
					top:-30rpx;
					// bottom:15rpx;
					// margin-bottom: 15rpx;
				}
			}
			.list:nth-child(2){
				text-align: center;
				position:relative;  //!import
				// image:first-child{
				image{
					width:700upx;
					height: 230upx;
					// width: 368rpx;
					// height: 306rpx;
					// width: 30%;
					// box-shadow: 0rpx 4rpx 9rpx 0rpx 
					// rgba(0, 0, 0, 0.35);
					// border-radius: 13rpx;
					// margin: 106rpx 0rpx 15rpx 0rpx;
					z-index: 10;
					// background-color: #FFFFFF;
					position: absolute;
					top:188rpx;
					// bottom:15rpx;
					// margin-bottom: 15rpx;
				}
			}
			// .list:last-child  {  //报名缴费 css
			// 	text-align: center;
			// 	position:relative;  //!import
			// 	image{
			// 		width:700upx;
			// 		height: 230upx;
			// 		position: absolute;
			// 		top:406rpx;
			// 		bottom:15rpx;
			// 		z-index: 20;
			// 	}
			// }
		}

		.news {
			
			position:relative;
			&:before{
				content:'';
				width:120%;
				position:absolute;
				height:100rpx;
				left:-10%;
				top:-28rpx;
				background:#FFF;
				z-index: 1000;
				@include radius(50%);
			}
			width: 100%;
			// margin: 500rpx auto 0rpx;  //在线报名
			margin: 444rpx auto 0rpx;
			// margin: 700rpx auto 0rpx;  //报名缴费 css
			background-color: #FFF;
			// border-radius: 20rpx;
			display: flex;
			flex-flow:column nowrap;
			justify-content: flex-start;
			align-items: stretch;
			overflow:visible;
			min-height:calc(100vh - 548rpx);
			box-sizing:border-box;
			padding:28rpx;
			.titleTitle{
				@include flex();
				margin:28rpx 0rpx 48rpx 0;
				color:#FFFFFF;
			}
			.schoolNewsTitle {
				font-family: MicrosoftYaHei;
				text-align: center;
				line-height:1;
				letter-spacing: 0rpx;
				z-index:10000;
				.cn{
					font-size: 36rpx;
					font-weight: bold;
					color: #000;
				}
				.en{
					font-size: 22rpx;
					color:#666;
					margin-top:14rpx;
				}
			}
			.schoolNews{
				flex-grow:1;
				overflow-y:auto;
				margin-top:36rpx;
				.schoolNew {
					// width: 694rpx;
					// height: 178rpx;
					background-color: #F2F2F2;
					border-radius: 13rpx;
					border: solid 1rpx #e3e3e3;
					margin: 0rpx 20rpx 20rpx 20rpx;
					padding: 25rpx 26rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.active_90 {
						transform: rotate(0deg);
					}
					.active_180 {
						transform: rotate(180deg);
					}
				
					.pic1 {
						background-color: #0f9be0;
						width: 40upx;
						height: 40upx;
						color: #FFFFFF;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 50%;
						font-weight: 600;
					}
				
					.title {
						width: 500upx;
						margin-left: 30upx;
						font-size: 32upx;
						font-family: Source Han Sans CN;
						font-weight: 500;
						color: #000000;
						line-height: 30px;
						// width: 100%;
						// font-family: MicrosoftYaHei;
						// font-size: 23rpx;
						// color: #000000;
						// text-overflow: -o-ellipsis-lastline;
						// overflow: hidden;
						// text-overflow: ellipsis;
						// display: -webkit-box;
						// -webkit-line-clamp: 2;
						// line-clamp: 2;
						// -webkit-box-orient: vertical;
						// line-height: 35rpx;
					}
				
					.text {
						font-size: 30upx;
						font-family: Source Han Sans CN;
						font-weight: 500;
						color: #000000;
						line-height: 52upx;
					}
				
					.time {
						font-family: MicrosoftYaHei;
						font-size: 23rpx;
						line-height: 31rpx;
						color: #000000;
						opacity: 0.4;
						margin-top: 14rpx;
					}
				}
			}

			
		}
	}
</style>
