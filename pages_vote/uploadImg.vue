<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
	<BasePage>
		<view class="form">
			<view style="display: flex;align-items: center;">
			</view>
			<form ref="form" :rules="rules" @submit="formSubmit" @reset="formReset">
				
				<view class="uni-form-item uni-column">
					<view class="title">班级 (<text class="aa">必填</text>)</view>
					<view class="uni-input">
						<ld-select class="ld-select" :multiple="false" :list="typeList" label-key="className"
							value-key="classNameCopy" placeholder="请选择班级" clearable v-model="type" @change="selectChangeType">
						</ld-select>
					</view>
				</view>
				
				<view class="uni-form-item uni-column">
					<view class="title">姓名 (<text class="aa">必填</text>)</view>
					<view class="uni-input" v-if="type">
						<ld-select   class="ld-select" :multiple="false" :list="majorr" label-key="stuName" value-key="id"
							placeholder="请选择姓名" clearable v-model="major" @change="selectChangeMajor">
						</ld-select>
					</view>
					<view class="uni-input" @click="showTab" v-else>
						<view style="margin: 20rpx 0 0 10rpx;color: #808080;">
							请先选择班级
						</view>
					</view>
				</view>
				
				<view @click="fuck()" style="padding-bottom: 30rpx;position: relative;">
					<view style="padding: 20rpx 0;">个人照片上传</view>
					<view v-show="imgg==''" style="width: 200rpx;height: 300rpx;border: 1rpx solid #26a69a;">
						<view
							style="width: 30rpx;margin: auto;box-sizing: border-box;padding: 50rpx 0 0 0;color: #26a69a;">
							选择照片</view>

						<view
							style="width: 550rpx;height: 400rpx;position: absolute;line-height: 60rpx;color: #26a69a;right: -100rpx;top: 75rpx;font-size: 30rpx;">
							<!-- <view>照片尺寸：1寸照片；</view> -->
							<view>背景：生活照；</view>
							<view>照片格式：jpg；</view>
							<view>照片大小不超过300K；</view>
						</view>
					</view>
					<view v-show="imgg" style="width: 200rpx;height:270rpx ">
						<image :src="imgg" mode="" style="width: 100%;height: 100%;"></image>
						<view
							style="width: 550rpx;height: 400rpx;position: absolute;line-height: 60rpx;color: #26a69a;right: -100rpx;top: 75rpx;font-size: 30rpx;">
							<!-- <view>照片尺寸：1寸照片；</view> -->
							<view>背景：生活照；</view>
							<view>照片格式：jpg；</view>
							<view>照片大小不超过300K；</view>
						</view>
					</view>
				</view>

				
				
				<view class="uni-btn-v">
					<button form-type="submit">提交</button>
				</view>
				<!-- <view style="color: red;font-size: 38rpx;margin-top: 20rpx;">未找到姓名的同学，消息正在审核或者审核拒绝，请在我的->我的活动页面重新按规定上传参赛照片。</view> -->
			</form>
			
		</view>
	</BasePage>
</template>
<script>
	

	import wPicker from "@/components/w-picker/w-picker.vue";
	import areaList from "@/components/w-picker/areadata/areadata.js";
	import glbData from '@/config/glbData';
	import api from '@/api/searchSchool/school.js'
	import {
		updateUserInfo
	} from '@/api/user.js'
	export default {
		components: {
			wPicker,
			// areaList,
		},
		props: {
			PD: {
				type: String,
				default: '2'
			},
			school: {
				type: Array,
				default: []
			}
		},

		data() {
			return {
				infos: true,
				infoss: true,
				imgg: '',
				dateBirth: '',
				user: getApp().globalData.user,
				createTime: null,
				areaList,
				address: '',
				columns: [areaList, areaList[0].children, areaList[0].children[0].children],
				// school:[],
				majorr: [],
				typeList: [],
				schoolId: [],
				regType: '',
				visible: false,
				major: '',
				type: '',
				score: '',
				cocos:'',
				btnVisible:false,
				showPickerVisible: false, //是否开启
				// majors:[],
				rules: {
					// 对name字段进行必填验证
					name: {
						rules: [{
								required: true,
								errorMessage: '请输入姓名',
							},
							{
								minLength: 3,
								maxLength: 5,
								errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
					// 对email字段进行必填验证
					email: {
						rules: [{
							format: 'email',
							errorMessage: '请输入正确的邮箱地址',
						}]
					}
				}
			}
		},
		onLoad() {
			this.getMajor("")
			this.getType()

			console.log('222222', this.user, 'dddddddddddddddddddddddddddddd')

		},
		watch: {},

		methods: {
			cods() {
				this.infos = false
			},
			codss() {
				this.infoss = false
			},
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
			


			//专业下拉选择框
			selectChangeMajor(val) {
				console.log(val, '专业选择')
				this.major = val
				// api.getIdSearchStatus({id:val}).then(res=>{
				// 	if(res.code==200){
				// 		// 0:待上传 1:审核通过 2：审核拒绝 3：待审核
				// 		if(res.result.auditStatus==1){
				// 			this.btnVisible==true
				// 		}else{
				// 			this.btnVisible==false
				// 		}
				// 	}
				// 	console.log(res,'resssss')
				// })
			},
			//类别下拉选择
			selectChangeType(val) {
				console.log(val, 'valllll')
				if (val != "") {
					console.log(val, 'val')
					this.type = val
					this.getMajor(val)
				} else {
					console.log(val, 'val')
					this.type = val
					this.majorr = []
					this.major = ""
				}

			},
			getSchool() {
				api.getSchoolList({
					tenantId: this.tenantId
				}).then(res => {
					console.log(res.result, 'result1111')
					this.school = []
					return res.result.map((item, index) => {
						this.school.push({
							value: item.id,
							label: item.ciName
						})
						console.log(this.school, 'school')
					})
				})
			},
			// 专业下拉接口
			getMajor(val) {
				api.getClassSelectStudent({
					tenantId: this.tenantId,
					className: val
				}).then(res => {
					this.majorr = []
					if (res.code == 200) {
						this.visible = true
						console.log(res.result, 'major')
						this.majorr = res.result
						this.major=""
					} else {
						this.visible = false
					}

				})
			},
			getType() {
				api.getClassSelect({tenantId: this.tenantId}).then(res=>{
					this.typeList = []
					// this.typeList = res.result
					if (res.code == 200) {
							this.visible = true
							console.log(res.result, 'typeList')
							this.typeList = res.result
							
						} else {
							this.visible = false
						}
					// console.log(this.typeList,'resssss')
				})
				// api.getDict({
				// 	tenantId: this.tenantId,
				// 	dictCode: 'registration_type'
				// }).then(res => {
				// 	this.typeList = []
				// 	if (res.code == 200) {
				// 		this.visible = true
				// 		console.log(res.result, 'typeList')
				// 		this.typeList = res.result
				// 	} else {
				// 		this.visible = false
				// 	}

				// })
				
			},
			showTab() {
				uni.showModal({
					title: "获取失败",
					content: `请先选择班级!`,
					showCancel: false
				});
			},
			formSubmit: function(e) {
				// this.major="111"
				// this.type="1"
				// this.cocos="ddd"
				if (this.major == "" || this.type == "" || this.cocos == "") {
					uni.showModal({
						title: "提交失败",
						content: `所有选项都是必填项哦!`,
						// content: '表单数据内容：' + JSON.stringify(formdata), 
						showCancel: false
					});
				}else if(this.cocos == "null"){
					uni.showModal({
						title: "提交失败",
						content: `请重新选择照片!`,
						showCancel: false
					});
					// else if(this.btnVisible){
				// 		uni.showModal({
				// 			title: "提交失败",
				// 			content: `该同学审核已经通过，请勿重复上传!`,
				// 			showCancel: false
				// 		});
				// 	}
				} else {
					api.getPicCome({id:this.major,picUrl:this.cocos,tenantId:this.tenantId,userId: String(this.user.id)}).then(res=>{
						console.log(res,'getPicCome')
						if(res.code==200){
							uni.showModal({
								title: "提交成功",
								content: `${res.result}`,
								showCancel: false,
								success: (res) => {
								    uni.navigateTo({
								    	url:`/pages_vote/index`
								    })
								},
							});
							
							// uni.navigate
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
			
		}
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
  .cc{
	  color: #909399;position: absolute;
  }
  .cs{
	  display: none;
  }
	.aa {
		color: red;
	}

	.form {
		padding: 20upx 30upx;
		background-color: #FFFFFF;

		.title {
			font-size: 44upx;
			font-family: Source Han Sans CN;
			font-weight: 600;
			color: #212121;
		}

		.uni-form-item {
			margin-bottom: 20upx;

			.title {
				font-size: 32upx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #212121;
				line-height: 30px;
				padding: 10rpx 0;
			}

			.uni-input {
				background: #FFFFFF;
				border: 4upx solid #D1D1D1;
				border-radius: 20upx;
				height: 80upx;
				text-indent: 1em;

				&.view {
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
				}
			}

			.ld-select {
				
				// width: 100%;
				background: #FFFFFF;
				// border: 4upx solid #D1D1D1;
				// border-radius: 20upx;
				// border: 0rpx;
				height: 80upx;
				// border-radius: 20upx;
				// border: 4upx solid #D1D1D1;
				// margin-bottom: 20upx;
				// background-color: #FFFFFF;
			}

			.uni-select {
				width: 100%;
				background: #FFFFFF;
				border: 4upx solid #D1D1D1;
				border-radius: 20upx;
				height: 80upx;
				// text-indent: 1em;
			}

			.uni-label-pointer:first-child {
				border-bottom: 4upx solid #D1D1D1;
			}

			.uni-textarea {
				padding: 10upx;
				background: #FFFFFF;
				border: 4upx solid #D1D1D1;
				border-radius: 20upx;
				display: flex;
				flex-direction: column;

				uni-textarea {
					width: 100%;
				}
			}

			.select-modal::before {
				height: 1000upx !important;
			}

			uni-radio-group {
				background: #FFFFFF;
				border: 4upx solid #D1D1D1;
				border-radius: 20upx;
				display: flex;
				flex-direction: column;

				label {
					height: 80upx;
					line-height: 80upx;

					uni-radio {
						margin: 0 20upx;
					}
				}
			}


		}

		.uni-btn-v {
			margin-top: 60upx;

			button {
				// background:linear-gradient(180deg,#B0CAFC,#5A8AE9); 
				background: linear-gradient(90deg, $theme, $theme2);
				border-radius: 10px;
				color: #FFFFFF;
				letter-spacing: 20upx;
			}
		}

		.rec {
			width: 16upx;
			height: 48upx;
			background-color: #4DBE61;
			margin: 0 15upx 0 0;
		}

		.text {
			margin: 20upx 0;
			font-size: 40upx;
			font-family: Source Han Sans CN;
			font-weight: 600;
			color: #0862B0;
		}
	}
</style>
