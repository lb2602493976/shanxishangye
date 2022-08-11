<template>
	<BasePage>
		<view class="pages">
		<!-- <view class="title" v-if="list.createTime">
			填写时间：{{list.createTime.slice(0,4)}}年{{list.createTime.slice(5,7)}}月{{list.createTime.slice(8,10)}}日
		</view>
		<view class="title" v-else>
			填写时间：年 月 日
		</view> -->


			<view class="content">

				<view v-if="list.stuName" style="display: flex;" class="content-item">
					<view class="text">姓名</view>
					<view class="text-t">{{list.stuName}}</view>
				</view>

				<view v-if="list.gender" style="display: flex;" class="content-item">
					<view class="text">班级</view>
					<view class="text-t">{{list.className}}</view>
				</view>

				<view v-if="list.picUrl" style="display: flex;"  class="content-item">
					<view class="text">个人照片</view>
					<view class="text-t">
						<image style="width: 250rpx;height: 300rpx;" :src="list.picUrl" mode=""></image>
					</view>
				</view>
				
				<!-- <view v-if="list.picUrl && list.auditStatus=='2'" style="display: flex;"  class="content-item"> -->
				

				<view v-if="list.className" style="display: flex;" class="content-item">
					<view class="text">所在班级</view>
					<view class="text-t"> {{list.className}}</view>
				</view>

				<view v-if="list.id" style="display: flex;" class="content-item">
					<view class="text">参赛编号</view>
					<view class="text-t"> {{list.id}}</view>
				</view>

				<view v-if="list.auditStatus" style="display: flex;" class="content-item">
					<view class="text">审核状态</view>
					<view class="text-t" >
						{{list.auditStatus=="0"?"待上传":list.auditStatus=="1"?"审核通过":list.auditStatus=="2"?"审核拒绝":list.auditStatus=="3"?"待审核":""}}
					</view>
					
				</view>
				
				<view v-if="list.auditStatus=='2'" style="display: flex;" class="content-item" >
				<!-- <view  style="display: flex;" class="content-item" > -->
					<view class="text">拒绝原因</view>
					<view class="text-t">
						<rich-text :nodes="list.auditOpinion"></rich-text>
						<!-- <rich-text :nodes="auditOpinion"></rich-text> -->
						<!-- {{}} -->
					</view>
				</view>
			</view>

			<view v-show="list.auditStatus=='2'" @click="fuck()" style="padding-bottom: 30rpx;position: relative;">
			<!-- <view  @click="fuck()" style="position: relative;"> -->
				<view style="padding: 20rpx 0;">重新上传照片</view>
				<view  style="width: 200rpx;height: 300rpx;border: 1rpx solid #26a69a;">
					<view style="width: 30rpx;margin: auto;box-sizing: border-box;padding: 50rpx 0 0 0;color: #26a69a;">
						选择照片</view>

					<view
						style="width: 550rpx;height: 400rpx;position: absolute;line-height: 60rpx;color: #26a69a;right: -100rpx;top: 75rpx;font-size: 30rpx;">
					
						<view>背景：生活照；</view>
						<view>照片格式：jpg；</view>
						<view>照片大小不超过300K；</view>
					</view>
				</view>
				<view v-show="imgg" style="width: 200rpx;height:270rpx ">
					<!-- height: 300rpx; -->
					<image :src="imgg" mode="" style="width: 210rpx;position: absolute;top: 90rpx;" ></image>
					<view
						style="width: 550rpx;height: 400rpx;position: absolute;line-height: 60rpx;color: #26a69a;right: -100rpx;top: 75rpx;font-size: 30rpx;">
					
						<view>背景：生活照；</view>
						<view>照片格式：jpg；</view>
						<view>照片大小不超过300K；</view>
					</view>
				</view>
			</view>
			<view class="uni-btn-v" v-show="cocos">
				<button @click="formSubmit()">提交</button>
			</view>



		</view>

	</BasePage>

</template>

<script>
	import api from "@/api/searchSchool/school.js"
	import glbData from '@/config/glbData';
	export default {
		data() {
			return {
				user: getApp().globalData.user,
				list: null,
				cocos: null,
				imgg: null,
				
			}
		},
		onLoad() {
			this.handleSearch()
		},
		methods: {

			fuck() {
				var _that = this
				uni.chooseImage({

					success: (chooseImageRes) => {
						// 获取的格式是数组，多选会同时返回，单选只返回一项
						const tempFilePaths = chooseImageRes.tempFilePaths;
						const tempFiles = chooseImageRes.tempFiles;
						let resSize = tempFiles[0].size;
						if (resSize > 300000) {
							uni.showToast({
								title: "上传图片大小不能超过300k",
								icon: 'error'
							});
							return
						}
						uni.showLoading({
							title: "上传中",

						});

						uni.uploadFile({
							url: `${ glbData.BASE_API }/upload/uploadFile`, //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								file: tempFilePaths // 上传附带参数
							},
							success: function(res) {
								console.log(res)
								let as = JSON.parse(res.data)

								let ss = as.result

								_that.cocos = ss
								console.log(_that.cocos, '_that.cocos')
								uni.hideLoading()
								uni.showToast({
									title: "上传成功",
									icon: 'success',
									duration: 2000,
								});
							}
						});
						this.imgg = chooseImageRes.tempFilePaths[0]
						console.log(chooseImageRes);
					}
				});



			},


			formSubmit(){
				console.log(this.cocos,'this.cocos')
				if (this.cocos == "") {
					uni.showModal({
						title: "提交失败",
						content: `重新上传的照片不能为空!`,
						// content: '表单数据内容：' + JSON.stringify(formdata), 
						showCancel: false
					});
				}else if(this.cocos == "null"){
					uni.showModal({
						title: "提交失败",
						content: `请重新选择照片!`,
						showCancel: false
					});
				} else {
					// ,tenantId:this.tenantId,userId: String(this.user.id)
					api.getNoUpload({id:this.list.id,picUrl:this.cocos}).then(res=>{
						if(res.code==200){
							uni.showModal({
								title: "提交成功",
								content: `${res.result}`,
								showCancel: false,
								success: (res) => {
								    // uni.navigateTo({
								    // 	url:`/pages_me/actives/index`
								    // })
									uni.switchTab({
										url:'/pages/me/index'
									})
								},
							});
						}else{
							uni.showModal({
								title: "提交失败",
								content: `${res.message}`,
								showCancel: false
							});
						}
						
					})
					
				}
			},
			handleSearch() {
				// api.getMapPath({tenantId:this.tenantId}).then(res=>{
				api.massags({
					tenantId: this.tenantId,
					userId: String(this.user.id)
				}).then(res => {
					this.list = res.result[0]
					console.log(this.list)
				})
			},

		}
	}
</script>

<style scoped lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.cun {
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
		background: linear-gradient(0deg, #55B279, #7CD38A);
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

	.content-money {
		margin-top: 20upx;
		/* height: 112upx; */
		background: #FFFFFF;
		border: 4upx solid #D1D1D1;
		border-radius: 20upx;
	}

	.content-item-money {
		padding: 20upx;
	}

	.text-money {
		width: 30%;
		/* text-align: center; */
		/* line-height: 100%; */
		/* height: 100%; */
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32upx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #000000;
		opacity: 0.5;
	}

	.text-tt {
		width: 40%;
		/* height: 100%; */
		display: flex;
		justify-content: center;
		align-items: center;
		/* line-height: 100%; */
		/* text-align: center; */
		font-size: 30upx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #C42323;
	}

	.text-ttt {
		width: 40%;
		/* height: 100%; */
		display: flex;
		justify-content: center;
		align-items: center;
		/* line-height: 100%; */
		/* text-align: center; */
		font-size: 30upx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		/* color: #C42323; */
	}

	.text-button {
		width: 30%;
		border-radius: 20upx;
		color: #FFFFFF;
		background-image: linear-gradient(0deg, #3A709A, #3992D7);
	}
	.uni-btn-v {
		margin-top: 60upx;
	
		button {
			// background:linear-gradient(180deg,#B0CAFC,#5A8AE9); 
			background-image: linear-gradient(90deg, $theme, $theme2);
			border-radius: 10px;
			color: #FFFFFF;
			letter-spacing: 20upx;
		}
	}
</style>
