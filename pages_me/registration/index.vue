<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
	<view class="form">
		<!-- <view class="title">意向考生登记表</view> -->
		<view style="display: flex;align-items: center;">
			<!-- <view class="rec"></view> -->
			<!-- <view class="text">预报名登记表</view> -->
		</view>
		<form ref="form" :rules="rules" @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item uni-column">
				<view class="title" >报名类别 (必选)</view>
				<view class="uni-input" >
					<ld-select class="ld-select" :multiple="false"  :list="typeList" label-key="itemText" value-key="itemValue" placeholder="请选择" clearable   v-model="type" @change="selectChangeType">
						</ld-select>
				</view>
			</view>
			
			<view class="uni-form-item uni-column">
				<view class="title">姓名 (必填)</view>
				<input class="uni-input" name="name" /> 
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">身份证号 (必填)</view>
				<input class="uni-input" name="idCard" />
			</view>
			<!-- <view class="uni-form-item uni-column">
				<view class="title">性别 (必填)</view>
				<radio-group name="gender">
					<label>
						<radio value="1" /><text>男</text>
					</label>
					<label style="margin-left:90upx;">
						<radio value="2" /><text>女</text>
					</label>
				</radio-group>
			</view> -->
			<view class="uni-form-item uni-column">
				<view class="title">联系电话 (必填)</view>
				<input class="uni-input" name="phone" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">常用QQ</view>
				<input class="uni-input" name="qq" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">常用微信</view>
				<input class="uni-input" name="wechat" />
			</view>
			<!-- <view class="uni-form-item uni-column">
				<view class="title">所选专业 (必填)</view>
				<view class="uni-input">
					<ld-select class="ld-select" :multiple="false"  :list="major" label-key="miName" value-key="id" placeholder="请选择专业" clearable   v-model="majors" @change="selectChangeMajor">
						</ld-select>
				</view>
			</view> -->
			<view class="uni-form-item uni-column">
				<view class="title" >所选专业 (必填)</view>
				<view class="uni-input" >
					<ld-select class="ld-select" :multiple="false"  :list="major" label-key="miName" value-key="id" placeholder="请选择专业" clearable   v-model="majors" @change="selectChangeMajor">
						</ld-select>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">成绩</view>
				<input class="uni-input" name="score" />
			</view> 
			<!-- <view class="uni-form-item uni-column">
				<view class="title">是否接受专业调剂?</view>
				<radio-group name="status">
					<label style="border-bottom: 2upx solid #D1D1D1;">
						<radio value="1" /><text>接受</text>
					</label>
					<label>
						<radio value="2" /><text>不接受</text>
					</label>
				</radio-group> 
			</view> -->
			<view class="uni-btn-v">
				<button form-type="submit">提交</button>
			</view>
		</form>
		
	</view>
</template>
<script>
	import api from '@/api/searchSchool/school.js'
	import {updateUserInfo} from '@/api/user.js'
	export default {
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
				user:getApp().globalData.user,
				// school:[],
				major:[],
				typeList:[],
				schoolId:[],
				visible:false,
				majors:'',
				type:'',
				score:'',
				showPickerVisible:false,  //是否开启
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
			this.getMajor()
			this.getType()
		},
		watch:{
		},
		
		methods: {
			//下拉选择框
			// selectChangeSort(val) {
			// 	console.log(val,'value')
			// 	this.schoolId=val
			// 	this.getMajor(val)
			// },
			//专业下拉选择框
			selectChangeMajor(val) {
				console.log(val,'val')
				this.majors=val
			},
			//类别下拉选择
			selectChangeType(val) {
				console.log(val,'val')
				this.type=val
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
			getSchool(){
				api.getSchoolList({tenantId:this.tenantId}).then(res=>{
					console.log(res.result,'result1111')
					this.school=[]
					return res.result.map((item,index)=>{
					    this.school.push({value:item.id,label:item.ciName})
						console.log(this.school,'school')
					})
				})
			},
			// 专业下拉接口
			getMajor(){
				api.getSchoolMajorList({tenantId:this.tenantId}).then(res=>{
					this.major=[]
					if(res.code==200){
						this.visible=true
						console.log(res.result,'major')
						this.major=res.result
					}else{
						this.visible=false
					}
					
				})
			},
			// 专业下拉接口
			getType(){
				api.getDict({tenantId:this.tenantId,dictCode:'registration_type'}).then(res=>{
					this.typeList=[]
					if(res.code==200){
						this.visible=true
						console.log(res.result,'typeList')
						this.typeList=res.result
					}else{
						this.visible=false
					}
					
				})
			},
			// Promise.all([]).then({}),
			formSubmit: function(e) {
				// console.log(this.PD,'active')
				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				// this.$refs.form.submit().then(res=>{
				// this.$refs.form.then(res=>{
					var formdata = e.detail.value
					console.log(formdata,'formdata')
					console.log(this.user,'userinfo')
					const nameReg=/^[\u4E00-\u9FA5A-Za-z0-9_]{2,8}$/
					const phoneReg=/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
					const idCardReg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
					if( formdata.idCard=="" || this.majors=="" || this.type=="" ||formdata.phone==""   || formdata.name=="" || formdata.score=="" ){
						// console.log('heiheihei')
						uni.showModal({
							title: "提交失败",
							content: `除常用QQ外，所有选项都是必填项哦!`,
							// content: '表单数据内容：' + JSON.stringify(formdata), 
							showCancel: false
						});
					}else if(nameReg.test(e.detail.value.name)==false){
						uni.showModal({
							title: "提交失败",
							content: `姓名只能为2-8位数字，字母，汉字，下划线!`,
							// content: '表单数据内容：' + JSON.stringify(formdata), 
							showCancel: false
						});
					}else if(idCardReg.test(e.detail.value.idCard)==false){
						uni.showModal({
							title: "提交失败",
							content: `身份证格式不正确!`,
							// 身份证号(15位、18位数字)，最后一位是校验位，可能为数字或字符X
							// content: '表单数据内容：' + JSON.stringify(formdata), 
							showCancel: false
						});
					}else if(phoneReg.test(e.detail.value.phone)==false){
						uni.showModal({
							title: "提交失败",
							content: `手机号格式不正确!`,
							// 电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)
							// content: '表单数据内容：' + JSON.stringify(formdata), 
							showCancel: false
						});
					}else{
						// updateUserInfo().then(res=>{
						// 	console.log(res,'info接口信息')
						// })
						api.addStudentList({...formdata,type:this.type,majors:this.majors,tenantId:this.tenantId,userId:this.user.id}).then(res=>{
						// api.addStudentList({...formdata,majors:this.majors.join(','),tenantId:this.tenantId}).then(res=>{
								if(res.code===200){
									// e.detail.value.gender="",
									// e.detail.value.idCard="",
									// e.detail.value.majors=""
									// e.detail.value.name=""
									// e.detail.value.phone=""
									// e.detail.value.qq=""
									// e.detail.value.status=""
									// e.detail.value.wechat="" 
									// console.log(e.detail.value,'value')
									uni.showModal({
										title: "提交成功",
										content: '招生老师将会尽快联系您。请耐心等待',
										// content: '表单数据内容：' + JSON.stringify(formdata),
										showCancel: false,
										success: function (res) {
											if (res.confirm) {
												uni.switchTab({ url:`/pages/home/index`})
												console.log('用户点击确定');
											} else if (res.cancel) {
												console.log('用户点击取消');
											}
										}
									})
									
									// console.log('111111111111'),
								}else{
									uni.showModal({
										title: "提交失败",
										content: `${res.message}`,
										// content: '表单数据内容：' + JSON.stringify(formdata),
										showCancel: false
									});
								}
							
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
				
				console.log(e,'清空数据')
				// name idCard gender phone qq wechat schoolId majors status
			}
		}
	}
</script>

<style lang="less">
	.form {
		padding: 20upx 30upx;

		.title {
			font-size: 44upx;
			font-family: Source Han Sans CN;
			font-weight: 600;
			color: #000000;
		}

		.uni-form-item {
			margin-bottom: 20upx;

			.title {
				font-size: 32upx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #000000;
				line-height: 30px;
				padding: 10rpx 0;
			}

			.uni-input {
				background: #FFFFFF;
				border: 4upx solid #D1D1D1;
				border-radius: 20upx;
				height: 80upx;
				text-indent: 1em;
			}
			
			.ld-select {
				// width: 100%;
				background: #FFFFFF;
				// border: 4upx solid #D1D1D1;
				// border-radius: 20upx;
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
			.select-modal::before{
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
			button {
				background:linear-gradient(45deg,#2BB6EA,#04DABE);
				border-radius: 10px;
				color: #FFFFFF;
				letter-spacing: 20upx;
			}
		}
		.rec{
			width: 16upx;
			height: 48upx;
			background-color: #4DBE61;
			margin:0 15upx 0 0;
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
