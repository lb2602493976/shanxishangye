<template>
	<BasePage>
	<view class="pages">
		<!-- <view class="title" v-if="list.createTime">
			填写时间：{{list.createTime.slice(0,4)}}年{{list.createTime.slice(5,7)}}月{{list.createTime.slice(8,10)}}日
		</view>
		<view class="title" v-else>
			填写时间：年 月 日
		</view> -->
		<view style="margin: 25rpx 0;" v-if="list.createTime">
			预报名表填写时间：{{list.createTime.slice(0,4)}}年{{list.createTime.slice(5,7)}}月{{list.createTime.slice(8,10)}}日
		</view>
		<view style="margin: 25rpx 0;" v-else>
			预报名表填写时间：年 月 日
		</view>
		<view class="content">
			<view v-if="list.name" style="display: flex;" class="content-item">
				<view class="text">姓名</view>
				<view class="text-t">{{list.name}}</view>
			</view>
			
			<view v-if="list.gender" style="display: flex;" class="content-item">
				<view class="text">性别</view>
				<view class="text-t">{{list.gender == 1 ? '男' :'女'}}</view>
			</view>
			
			<view v-if="list.dateBirth" style="display: flex;" class="content-item">
				<view class="text">出生年月</view>
				<view class="text-t">{{list.dateBirth}}</view>
			</view>
			
			<view v-if="list.national" style="display: flex;" class="content-item">
				<view class="text">民族</view>
				<view class="text-t">{{list.national}}</view>
			</view>
			
			<view v-if="list.idCard" style="display: flex;" class="content-item">
				<view class="text">身份证号</view>
				<view class="text-t">{{list.idCard}}</view>
			</view>
			
			<view v-if="list.score" style="display: flex;" class="content-item">
				<view class="text">中考分数</view>
				<view class="text-t">{{list.score}}</view>
			</view>
			
			<view v-if="list.health" style="display: flex;" class="content-item">
				<view class="text">健康状况</view>
				<view class="text-t">{{ list.health }}</view>
			</view>
			
			<view v-if="list.fresh" style="display: flex;" class="content-item">
				<view class="text">是否应届</view>
				<view class="text-t">{{list.fresh == 1 ? '是' :'否'}}</view>
			</view>
			
			<view v-if="list.attendDay" style="display: flex;" class="content-item">
				<view class="text">是否走读</view>
				<view class="text-t">{{list.attendDay == 1 ? '是' :'否'}}</view>
			</view>
			
			<view v-if="list.registrationNum" style="display: flex;" class="content-item">
				<view class="text">准考证号</view>
				<view class="text-t">{{list.registrationNum}}</view>
			</view>
			
			<view v-if="list.middleSchool" style="display: flex;" class="content-item">
				<view class="text">毕业学校</view>
				<view class="text-t">{{list.middleSchool}}</view>
			</view>
			
			<view v-if="list.phone" style="display: flex;" class="content-item">
				<view class="text">联系方式</view>
				<view class="text-t">{{list.phone}}</view>
			</view>
			
			<view v-if="list.address" style="display: flex;" class="content-item">
				<view class="text">户口所在地</view>
				<view class="text-t">{{list.address}}</view>
			</view>
			
			<view v-if="list.typeName" style="display: flex;" class="content-item">
				<view class="text">报考类型</view>
				<view class="text-t">{{list.typeName}}</view>
			</view>
			
			<view v-if="list.majorName" style="display: flex;" class="content-item">
				<view class="text">所选专业</view>
				<view class="text-t">{{list.majorName}}</view>
			</view>
			
		</view>
		
		<!-- <view class="content-money" >
			<view style="display: flex;" class="content-item-money">
				<view class="text-money" >预报名费用</view>
				<view class="text-tt">￥500</view>
				<button class="text-button" @click="jumpMoney">缴费</button>
			</view>	
		</view>
		
		<view class="content-money">
			<view style="display: flex;" class="content-item-money">
				<view class="text-money" >预报名费用</view>
				<view class="text-ttt">￥500(已缴费)</view>
			</view>	
		</view> -->
		   <view class="cun" @click="exportExcel()">保存</view>
		  <!-- <a :href="list.attachmentUrl" class="btn">下载签订合同</a> -->
		
	</view>
	</BasePage>
</template>

<script>
	import api from "@/api/searchSchool/school.js"
	
	export default {
		data() {
			return {
				user:getApp().globalData.user,
				list: [],
				jiaofei:false
			}
		},
		onLoad() {
			this.handleSearch()
			// this.handCeshi()
		},
		methods:{
			exportExcel(){
				 // function loadfile(data){
					let url = this.list.attachmentUrl
					let fileName ='2022年新生报名登记表'+'-'+this.list.name;
					console.log(url,'url')
					console.log(fileName,'fileName')
					uni.showLoading({
					  title: '正在打开文件'
					})
				  const manage = uni.getFileSystemManager();
				  console.log(111)
				  uni.downloadFile({
					url: url,
					success (res) {
						console.log(222,res)
						  var savePath = wx.env.USER_DATA_PATH + "/" + fileName
						  console.log(333,savePath)
						  if (res.statusCode == 200) {
							manage.saveFile({
							  tempFilePath: res.tempFilePath,
							  filePath: savePath+'.docx',
							  success:function(res){
								console.log(444,res)
								uni.openDocument({
								   filePath: res.savedFilePath,
								   showMenu: true,
								   success: function (res) {
								   uni.hideLoading()
								   }
								 })
							  }
							})
						  }
					}
				  })
				// }
				
			},

			
			
			
			handleSearch(){
				uni.showLoading()
				// console.log('userId:this.user.id',this.user.id)
				api.getInterestedCandidates({tenantId:this.tenantId,userId:this.user.id}).then(res=>{
					console.log(res,'resss')
					if(res.code == 200){ 
						this.list=res.result
						console.log('所有信息',this.list)
					}else{
						uni.showModal({
							title: "查询失败",
							content: "当前暂无您的报名信息，请点击'确定'报名！",
							cancelText:'取消',
							success: function (res) {
								if (res.confirm) {
									uni.reLaunch({ url:`/pages_apply_consult/registration/index`})
									console.log('用户点击确定');
								} else if (res.cancel) {
									uni.switchTab({ url:`/pages/me/index`})
									console.log('用户点击取消');
								}
							},
							
						})
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
	.cun{
		width: 100%;
		border-radius: 30rpx;
		/* height: 30rpx; */
		padding: 20rpx 0;
		text-align: center;
		margin: 30rpx 0rpx;
		background-color: #26a69a;
		color: #fff;
	}
	.pages {
		padding: 0 5%;
		background-color: #FFFFFF;
		/* margin-top: -15rpx; */
		height: 100%;
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
		background: #FFFFFF;
		border: 4upx solid #D1D1D1;
		border-radius: 20upx;
	}

	.content-item {
		margin: 10upx 0;
		padding: 20upx;
	}

	.text {
		width: 40%;
		font-size: 32upx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #000000;
		opacity: 0.5;
	}

	.text-t {
		width: 60%;
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
</style>
