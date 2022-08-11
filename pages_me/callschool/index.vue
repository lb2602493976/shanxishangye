<template>
	<BasePage>
	<view class="pages">
		<view style="margin: 65upx 0;">
			陕西省商业学校招生办公室联系方式
		</view>
		<view class="content">
			<!-- <view  style="margin:30upx 0 0upx 24upx; font-size: 38upx;font-weight: 700;line-height: 69.43upx;font-family: MicrosoftYaHei;">
				地址
			</view> -->
			<view class="text">
				<rich-text  :nodes="textList.schoolAddress"></rich-text>
			</view>
			<!-- <view style="display: flex;" class="content-item">
				<view class="text" style="width: 30%;">学校地址：</view>
				<view class="text-t" style="width: 70%;">{{textList.schoolAddress}}</view>
			</view>
			
			<view style="display: flex;" class="content-item">
				<view class="text" style="width: 30%;">学校网址：</view>
				<view class="text-t" style="width: 70%;">{{textList.schoolWebsite}}</view>
			</view>
			<view style="display: flex;" class="content-item">
				<view class="text" style="width: 30%;">招生网址：</view>
				<view class="text-t" style="width: 70%;">{{textList.admissionsWebsite}}</view>
			</view>
			<view style="display: flex;" class="content-item">
				<view class="text" style="width: 30%;">招生办电话：</view>
				<view class="text-t" style="width: 70%;">{{textList.admissionsTel}}</view>
			</view> -->
		</view>
		<!-- 南校区 -->
		<!-- <view class="content" style="margin: 30upx 0 100upx 0;">
			<view  style="margin:30upx 0 0upx 24upx; font-size: 38upx;font-weight: 700;line-height: 69.43upx;font-family: MicrosoftYaHei;">
				南校区（老校区）
			</view>
			<view style="display: flex;" class="content-item">
				<view class="text" style="width: 30%;">地址：</view>
				<view class="text-t" style="width: 70%;">西安市鄠邑区余下中心街南街102号</view>
			</view>
			<view style="display: flex;" class="content-item">
				<view class="text" style="width: 30%;">邮编：</view>
				<view class="text-t" style="width: 70%;">710302</view>
			</view>
		</view> -->
		
		<!-- <view class="erweibottom">
			<view  class="erweima">
				<image @click="wechatClick('https://xiaochengxu.kanxiaowang.com:8443/images/2da0aa2075f9488ca000f93ac8d9dcda1636772389495.png')" style="width: 220upx;height: 220upx;" :src="imageUrl"></image>
			</view>
			<view class="erweitext">
				<view  style="font-size: 38upx;font-weight: 700;line-height: 69.43upx;font-family: MicrosoftYaHei;">
					陕西省商业学校
				</view>
				<view style=" font-size: 28upx;line-height: 48.43upx;font-family: MicrosoftYaHei;color:#C9C9C9">
					请点击图片长按二维码在线咨询，随时与我们联系
				</view>
			</view>
		</view> -->
		
		<!-- <img-view :ishide='ishide' @cancel="ishide = false" @confirm="ishide = true" :childData='childData'></img-view> -->
		
	</view>
	</BasePage>
</template>

<script>
	import api from "@/api/searchSchool/school.js"
	import imgView from './imgView.vue'
	export default {
		components:{
			imgView,
		},
		data() {
			return {
				user:getApp().globalData.user,
				list: [],
				jiaofei:false,
				ishide:false,
				childData:'',
				textList: [],
				imageUrl:'https://xiaochengxu.kanxiaowang.com:8443/images/2da0aa2075f9488ca000f93ac8d9dcda1636772389495.png',
			}
		},
		onLoad() {
			this.handleSearch()
			// this.handCeshi()
		},
		methods:{
			previewImage(){
				console.log(this.childData,'childData')
				uni.previewImage({
					current:0,
					urls:[this.childData],
				})
			},
			wechatClick(item){
				console.log(item,'item')
				this.childData = item
				this.$nextTick(()=>{
					this.previewImage()
				})
			},
			handleSearch(){
				uni.showLoading()
				// console.log('userId:this.user.id',this.user.id)
				api.getPhoneConsult({tenantId:this.tenantId}).then(res=>{
					if(res.code==200){
						this.textList=res.result.records[0]
					}else{
						cosnoel.log('查询失败')
					}
				}).finally(() => {
					uni.hideLoading()
				})
			},
			jumpMoney(){
				// uni.reLaunch(OBJECT)
				uni.navigateTo({ url:`/pages_apply_consult/pay/index`})
			},
			handCeshi(){
				uni.showModal({
					title: "您未交费",
					content: " 招生人数有限，请及时缴纳预报名费并抢占上学名额。有任何疑问请点击小程序下方的“报名咨询”了解。",
					// cancelText:'取消',
					confirmText: "我知道了", // 确认按钮文字  
					showCancel:false,
					// confirmColor: '#f55850',
					success: function (res) {
						if (res.confirm) {
							// uni.switchTab({ url:`/pages/consultation/index`})
							console.log('用户点击确定');
						} else if (res.cancel) {
							// uni.reLaunch({ url:`/pages/info/index`})
							console.log('用户点击取消');
						}
					},
					
				})
			}
		}
	}
</script>

<style>
	.pages {
		padding: 0 5%;
	}

	.title {
		height: 100upx;
		background-color: red;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 36upx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 44upx;
		background: linear-gradient(0deg, #55B279,#7CD38A );
		border-radius: 20upx;
		margin: 20upx 0;
	}

	.content {
		background: #F2F2F2;
		border: 4upx solid #D1D1D1;
		border-radius: 20upx;
	}
	
	.text {
		font-size: 36upx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		line-height: 84upx !important;
		margin:0 20upx !important;
	}

	.content-item {
		margin: 20upx 0;
		padding: 20upx;
	}

	/*.text {
		width: 35%;
		font-size: 32upx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #000000;
		 opacity: 0.5; 
	}*/

	.text-t {
		width: 65%;
		font-size: 32upx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #000000;
	}
	
	.content-money{
		margin-top: 20upx;
		/* height: 112upx; */
		background: #FFFFFF;
		border: 4upx solid #D1D1D1;
		border-radius: 20upx;
	}
	
	.content-item-money{
		padding: 20upx;
	}
	
	.text-money{
		width: 30%;
		/* text-align: center; */
		/* line-height: 100%; */
		/* height: 100%; */
		display: flex;
		justify-content:center;
		align-items:center;
		font-size: 32upx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #000000;
		opacity: 0.5;
	}
	
	.text-tt{
		width: 40%;
		/* height: 100%; */
		display: flex;
		justify-content:center;
		align-items:center;
		/* line-height: 100%; */
		/* text-align: center; */
		font-size: 30upx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #C42323;
	}
	
	.text-ttt{
		width: 40%;
		/* height: 100%; */
		display: flex;
		justify-content:center;
		align-items:center;
		/* line-height: 100%; */
		/* text-align: center; */
		font-size: 30upx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		/* color: #C42323; */
	}
	
	.text-button{
		width: 30%;
		border-radius:20upx;
		color:#FFFFFF;
		background-image: linear-gradient(0deg,#3A709A,#3992D7);
	}
	.erweibottom{
		margin: 0 0upx 50upx 0upx;
		width: 100%;
		height: 222upx;
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
	}
	.erweima{
		width: 220upx;
		height: 220upx;
		
	}
	.erweitext{
		margin: 30upx 0 0 30upx;
		width: 400upx;
		height: 220upx;
	}
</style>
