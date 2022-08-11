<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
	<BasePage>
		<view class="form">
			<!-- <view class="title">意向考生登记表</view> -->
			<view style="display: flex;align-items: center;">
				<!-- <view class="rec"></view> -->
				<!-- <view class="text">预报名登记表</view> -->
			</view>
			<form ref="form" :rules="rules" @submit="formSubmit" @reset="formReset">

				<view class="uni-form-item uni-column">
					<view class="title">姓名 (<text class="aa">必填</text>)</view>
					<input class="uni-input" placeholder="请输入姓名" name="name" />
				</view>
				<view @click="fuck()" style="padding-bottom: 30rpx;position: relative;">
					<view style="padding: 20rpx 0;">个人照片上传</view>
					<view v-show="imgg==''" style="width: 200rpx;height: 300rpx;border: 1rpx solid #26a69a;">
						<view
							style="width: 30rpx;margin: auto;box-sizing: border-box;padding: 50rpx 0 0 0;color: #26a69a;">
							选择照片</view>

						<view
							style="width: 550rpx;height: 400rpx;position: absolute;line-height: 60rpx;color: #26a69a;right: -100rpx;top: 75rpx;font-size: 30rpx;">
							<view>照片尺寸：标准1寸证件照片；</view>
							<view>背景：(纯色、浅蓝、白色、红色)</view>
							<view>照片格式：jpg；</view>
							<view>照片大小不超过30K；</view>
						</view>
					</view>
					<view v-show="imgg" style="width: 200rpx;height:270rpx ">
						<image :src="imgg" mode="" style="width: 100%;height: 100%;"></image>
						<view
							style="width: 550rpx;height: 400rpx;position: absolute;line-height: 60rpx;color: #26a69a;right: -100rpx;top: 75rpx;font-size: 30rpx;">
							<view>照片尺寸：标准1寸证件照片；</view>
							<view>背景：(纯色、浅蓝、白色、红色)</view>
							<view>照片格式：jpg；</view>
							<view>照片大小不超过30K；</view>
						</view>
					</view>
				</view>





				<view class="uni-form-item uni-column">
					<view class="title">性别 (<text class="aa">必填</text>)</view>
					<radio-group name="gender">
						<label>
							<radio value="1" /><text>男</text>
						</label>
						<label style="margin-left:90upx;">
							<radio value="2" /><text>女</text>
						</label>
					</radio-group>
				</view>










				<view class="uni-form-item uni-column">
					<view class="title">出生年月 (<text class="aa">必填</text>)</view>
					<picker fields="month" mode="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view @click="cods()" class="uni-input view" style="position: relative;">{{ dateBirth }}
							<view :class="infos==true?'cc':'cs'">请选择出生年月</view>
						</view>

					</picker>
				</view>


				<view class="uni-form-item uni-column">
					<view class="title">民族 (<text class="aa">必填</text>)</view>
					<input class="uni-input" name="national" placeholder="请输入民族" />
				</view>


				<view class="uni-form-item uni-column">
					<view class="title">身份证号 (<text class="aa">必填</text>)</view>
					<input class="uni-input" placeholder="请输入身份证号" name="idCard" />
				</view>

				<view class="uni-form-item uni-column">
					<view class="title">中考分数 /预估 (<text class="aa">必填</text>)</view>
					<input class="uni-input" placeholder="请输入中考分数" name="score" />
				</view>


				<view class="uni-form-item uni-column">
					<view class="title">健康状况 (<text class="aa">必填</text>)</view>
					<input class="uni-input" placeholder="若有疾病请如实填写" name="health" />
				</view>


				<!-- 是否应届 -->
				<view class="uni-form-item uni-column">
					<view class="title">是否应届 (<text class="aa">必填</text>)</view>
					<radio-group name="fresh">
						<label>
							<radio value="1" /><text>是</text>
						</label>
						<label style="margin-left:90upx;">
							<radio value="2" /><text>否</text>
						</label>
					</radio-group>
				</view>


				<!-- 是否走读 -->
				<view class="uni-form-item uni-column">
					<view class="title">是否走读 (<text class="aa">必填</text>)</view>
					<radio-group name="attendDay">
						<label>
							<radio value="1" /><text>是</text>
						</label>
						<label style="margin-left:90upx;">
							<radio value="2" /><text>否</text>
						</label>
					</radio-group>
				</view>


				<!-- 准考证号 -->
				<view class="uni-form-item uni-column">
					<view class="title">准考证号 (<text class="aa">必填</text>)</view>
					<input class="uni-input" placeholder="准考证号(中考所在市)" name="registrationNum" />
				</view>



				<view class="uni-form-item uni-column">
					<view class="title">毕业学校 (<text class="aa">必填</text>)</view>
					<input class="uni-input" placeholder="请输入完整学校名称" name="middleSchool" />
				</view>


				<view class="uni-form-item uni-column">
					<view class="title">联系方式 (<text class="aa">必填</text>)</view>
					<input class="uni-input" placeholder="请输入手机号" name="phone" />
				</view>


				<view class="uni-form-item uni-column">
					<view class="title">户口所在地 (<text class="aa">必填</text>)</view>
					<picker :range="columns" mode="multiSelector" range-key="label" @columnchange="columnChange"
						@change="areaChange">
						<view @click="codss()" class="uni-input view"> {{ address }}
						<view :class="infoss==true?'cc':'cs'">请选择户口所在地</view></view>

					</picker>

				</view>


				<view class="uni-form-item uni-column">
					<view class="title">报考类别 (<text class="aa">必填</text>)</view>
					<view class="uni-input">
						<ld-select class="ld-select" :multiple="false" :list="typeList" label-key="itemText"
							value-key="itemValue" placeholder="请选择报考类别" clearable v-model="type" @change="selectChangeType">
						</ld-select>
					</view>
				</view>


				<view class="uni-form-item uni-column">
					<view class="title">意向报考专业 (<text class="aa">必填</text>)</view>
					<view class="uni-input" v-if="type">
						<ld-select   class="ld-select" :multiple="false" :list="majorr" label-key="miName" value-key="id"
							placeholder="请先选择报名类型" clearable v-model="major" @change="selectChangeMajor">
						</ld-select>
					</view>
					<view class="uni-input" @click="showTab" v-else>
						<view style="margin: 20rpx 0 0 10rpx;color: #808080;">
							请先选择报考类型
						</view>

					</view>
				</view>

				<view class="uni-btn-v">
					<button form-type="submit">提交</button>
				</view>
			</form>





		</view>
	</BasePage>
</template>
<script>
	function shijianc(time) {
		var date = new Date(time)
		var Y = date.getFullYear() + '-'
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())

		return Y + M + D

	}

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

				var _that=this
				uni.chooseImage({
					
					success: (chooseImageRes) => {
						// 获取的格式是数组，多选会同时返回，单选只返回一项
						const tempFilePaths = chooseImageRes.tempFilePaths;
					    const as = null
						// 若多选，需循环调用uni.uploadFile ，因微信小程序只支持单文件上传
						uni.uploadFile({
							url: `${ glbData.BASE_API }/upload/uploadFile`, //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								file: tempFilePaths // 上传附带参数
							},
							success: function(res){
								console.log(res)
							 let as = JSON.parse(res.data)
						        
					      	let ss = as.result 
						    
							_that.cocos=ss
							console.log(_that.cocos,'_that.cocos')
					            
							}
						});
						 this.imgg =   chooseImageRes.tempFilePaths[0]
						 console.log(chooseImageRes);
					}
				});
				
			

			},






			bindDateChange: function(e) {




				this.dateBirth = e.detail.value

				console.log(this.dateBirth)
			},
			columnChange(e) {
				let cIndex = e.detail.column
				let currentIndex = e.detail.value
				console.log(e)
				let colLen = this.columns.length
				for (let i = cIndex + 1; i < colLen; i++) {
					if (cIndex === i - 1) {
						console.log(this.columns[cIndex][currentIndex], i, '222')
						this.$set(this.columns, i, this.columns[cIndex][currentIndex].children)
					} else {
						this.$set(this.columns, i, this.columns[i - 1][0].children)
					}

				}
			},
			areaChange(e) {
				let iList = e.target.value
				let val = iList.reduce((res, item, index) => {
					let label = this.columns[index][item].label
					if (res.some(resItem => resItem === label)) return res
					return [...res, label]
				}, []).join('')
				this.address = val
				console.log(val, 'RESSSS')
			},
			//下拉选择框
			// selectChangeSort(val) {
			// 	console.log(val,'value')
			// 	this.schoolId=val
			// 	this.getMajor(val)
			// },
			//专业下拉选择框
			selectChangeMajor(val) {
				console.log(val, '专业选择')
				this.major = val
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


			// vant
			// selectChangeMajor(val) {
			// console.log(val.detail.value.id,'val')
			// this.majors=val.detail.value.id
			// },
			// showPicker(){
			// 	this.showPickerVisible=true
			// },
			// onCancel(){
			// 	this.showPickerVisible=false

			// 	console.log(this.showPickerVisible,"关闭")
			// },
			// onConfirm(event){
			// 	this.majors=event.detail.value.id
			// 	console.log(event.detail.value.id,'eventdetail')
			// 	this.showPickerVisible=false
			// 	console.log(this.showPickerVisible,"确认")
			// },
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
				api.getSchoolMajorList({
					tenantId: this.tenantId,
					regType: val
				}).then(res => {
					this.majorr = []
					if (res.code == 200) {
						this.visible = true
						console.log(res.result, 'major')
						this.majorr = res.result
					} else {
						this.visible = false
					}

				})
			},
			// 专业下拉接口
			getType() {
				api.getDict({
					tenantId: this.tenantId,
					dictCode: 'registration_type'
				}).then(res => {
					this.typeList = []
					if (res.code == 200) {
						this.visible = true
						console.log(res.result, 'typeList')
						this.typeList = res.result
					} else {
						this.visible = false
					}

				})
			},
			showTab() {
				uni.showModal({
					title: "获取失败",
					content: `请先选择报名类别!`,
					// 身份证号(15位、18位数字)，最后一位是校验位，可能为数字或字符X
					// content: '表单数据内容：' + JSON.stringify(formdata), 
					showCancel: false
				});
			},
			// Promise.all([]).then({}),
			formSubmit: function(e) {


				var formdata = e.detail.value
				console.log(formdata, 'formdata')
				console.log(this.user, 'userinfo')
				const nameReg = /^[\u4E00-\u9FA5A-Za-z0-9_]{2,8}$/
				const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
				const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
				// 民族
				const nationReg = /^[\u4e00-\u9fa5]{1,10}$/
				// 分数
				const scoreReg = /^[0-9]{1,3}$/
				// 学校
				const middleschoolReg = /^[u4e00-\u9fa5]{3,15}$/
				// 健康
				const healReg = /[\u4e00-\u9fa5]/
				// 准考证号
				const registrationNumReg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
				if (this.major == "" || this.type == "" || this.address == "" || this
					.dateBirth == "" || formdata.idCard == "" || formdata.phone == "" || formdata.gender == "" ||
					formdata.name == "" || formdata.middleSchool == "" || formdata.national == "" || formdata.fresh ==
					"" || formdata.attendDay == "" || formdata.registrationNum == "" || formdata.score == "" ||
					formdata.health == "") {

					uni.showModal({
						title: "提交失败",
						content: `所有选项都是必填项哦!`,
						// content: '表单数据内容：' + JSON.stringify(formdata), 
						showCancel: false
					});
				} else if (nameReg.test(e.detail.value.name) == false) {
					uni.showModal({
						title: "提交失败",
						content: `姓名只能为2-8位数字，字母，汉字，下划线!`,
						// content: '表单数据内容：' + JSON.stringify(formdata), 
						showCancel: false
					});
				} else if (nationReg.test(e.detail.value.national) == false) {
					uni.showModal({
						title: "提交失败",
						content: `民族只能为中文!`,
						// content: '表单数据内容：' + JSON.stringify(formdata), 
						showCancel: false
					});
				} else if (scoreReg.test(e.detail.value.score) == false) {
					uni.showModal({
						title: "提交失败",
						content: `中考分数只能为1-3位数字！`,
						// content: '表单数据内容：' + JSON.stringify(formdata), 
						showCancel: false
					});
				} else if (middleschoolReg.test(e.detail.value.middleSchool) == false) {
					uni.showModal({
						title: "提交失败",
						content: `毕业学校只能为中文！`,
						// content: '表单数据内容：' + JSON.stringify(formdata), 
						showCancel: false
					});
				} else if (registrationNumReg.test(e.detail.value.registrationNum) == false) {
					uni.showModal({
						title: "提交失败",
						content: `准考证号不能填写英文！`,
						// content: '表单数据内容：' + JSON.stringify(formdata), 
						showCancel: false
					});
				} else if (healReg.test(e.detail.value.health) == false) {
					uni.showModal({
						title: "提交失败",
						content: `健康状况只能为中文！`,
						// content: '表单数据内容：' + JSON.stringify(formdata), 
						showCancel: false
					});
				} else if (idCardReg.test(e.detail.value.idCard) == false) {
					uni.showModal({
						title: "提交失败",
						content: `身份证格式不正确!`,
						// 身份证号(15位、18位数字)，最后一位是校验位，可能为数字或字符X
						// content: '表单数据内容：' + JSON.stringify(formdata), 
						showCancel: false
					});
				} else if (phoneReg.test(e.detail.value.phone) == false) {
					uni.showModal({
						title: "提交失败",
						content: `手机号格式不正确!`,
						// 电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)
						// content: '表单数据内容：' + JSON.stringify(formdata), 
						showCancel: false
					});
				} else {
					let obj = {
						// ...formdata,
						address: this.address,
						dateBirth: this.dateBirth,
						type: this.type,
						major: this.major,
						tenantId: this.tenantId,
						userId: String(this.user.id),

					}
					uni.navigateTo({
						url: './affirm?type=' + this.type + '&address=' + this.address + '&dateBirth=' + this
							.dateBirth + '&major=' + this.major + '&idCard=' + formdata.idCard + '&phone=' +
							formdata.phone + '&gender=' + formdata.gender + '&name=' + formdata.name +
							'&middleSchool=' + formdata.middleSchool + '&national=' + formdata.national +
							'&fresh=' + formdata.fresh + '&attendDay=' + formdata.attendDay +
							'&registrationNum=' + formdata.registrationNum + '&score=' + formdata.score +
							'&health=' + formdata.health + '&imgs=' + this.cocos
					})


				}

				// uni.showModal({
				// 	title: "提交成功",
				// 	content: '招生老师将会尽快联系您。请耐心等待',
				// 	// content: '表单数据内容：' + JSON.stringify(formdata),
				// 	showCancel: false
				// });
			},
			formReset: function(e) {
				// var formdata = e.detail.value

				console.log(e, '清空数据')
				// name idCard gender phone qq wechat schoolId majors status
			}
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
