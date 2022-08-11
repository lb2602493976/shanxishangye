<template>
	<BasePage>
		<view class="box">
			
			

			
			
			
			
			
			<view class="bao">
				<view class="tit">报名信息确认</view>

				<view class="wrap">
					<view class="le">姓名</view>
					<view class="re">{{name}}</view>
				</view>
				
				<view class="wrap">
					<view class="le">照片</view>
					<view class="re">
						<image :src="imgs" mode="" style="width: 200rpx;height: 300rpx;"></image>
					</view>
				</view>

				<view class="wrap">
					<view class="le">性别</view>
					<view class="re">{{gender == 1 ? '男' :'女'}}</view>
				</view>

				<view class="wrap">
					<view class="le">出生年月</view>
					<view class="re">{{dateBirth}}</view>
				</view>

				<view class="wrap">
					<view class="le">民族</view>
					<view class="re">{{national}}</view>
				</view>

				<view class="wrap">
					<view class="le">身份证号</view>
					<view class="re">{{idCard}}</view>
				</view>
				<view class="wrap">
					<view class="le">中考分数</view>
					<view class="re">{{score}}</view>
				</view>

				<view class="wrap">
					<view class="le">健康状况</view>
					<view class="re">{{health}}</view>
				</view>

				<view class="wrap">
					<view class="le">是否应届</view>
					<view class="re">{{fresh == 1? '是' :'否'}}</view>
				</view>

				<view class="wrap">
					<view class="le">是否走读</view>
					<view class="re">{{attendDay== 1? '是' :'否'}}</view>
				</view>
				<view class="wrap">
					<view class="le">准考证号</view>
					<view class="re">{{registrationNum}}</view>
				</view>

				<view class="wrap">
					<view class="le">毕业学校</view>
					<view class="re">{{middleSchool}}</view>
				</view>
				<view class="wrap">
					<view class="le">联系方式</view>
					<view class="re">{{phone}}</view>
				</view>

				<view class="wrap">
					<view class="le">户口所在地</view>
					<view class="re">{{address}}</view>
				</view>

				<view class="wrap">
					<view class="le">报考类型</view>
					<view class="re">{{majorr}}</view>
				</view>
				<view class="wrap">
					<view class="le">所选专业</view>
					<view class="re">{{zhuanye}}</view>
				</view>
			</view>


			<view class="foot">
				<view class="ls" @click="gai()">修改</view>
				<view class="rs" @click="submits()">确认</view>
			</view>

		</view>

	</BasePage>
</template>


<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import areaList from "@/components/w-picker/areadata/areadata.js";
	import api from '@/api/searchSchool/school.js'
	import {
		updateUserInfo
	} from '@/api/user.js'
	export default {
		components: {
			wPicker,
			// areaList,
		},
		data() {
			return {
				imgs:'',
				user: getApp().globalData.user,
				type: '',
				address: '',
				dateBirth: '',
				major: '',
				idCard: '',
				phone: '',
				gender: '',
				name: '',
				middleSchool: '',
				national: '',
				fresh: '',
				attendDay: '',
				registrationNum: '',
				score: '',
				health: '',


				majorr: '',
				zhuanye: '',

			}
		},
		onLoad(option) {
			this.type = option.type
			console.log(this.type,'this.type11')
			this.address = option.address
			this.dateBirth = option.dateBirth
			this.major = option.major
			this.idCard = option.idCard
			this.phone = option.phone
			this.gender = option.gender
			this.name = option.name
			this.middleSchool = option.middleSchool
			this.national = option.national
			this.fresh = option.fresh
			this.attendDay = option.attendDay
			this.registrationNum = option.registrationNum
			this.score = option.score
			this.health = option.health
			this.imgs = option.imgs
			console.log(option,'option3333')

			this.getMajor()
			console.log(this.user, 'SDDDDDDDDDDDDDD')
		},
		methods: {
			// 专业下拉接口
			getMajor() {
				let as = this.type
				api.getSchoolMajorList({
					tenantId: this.tenantId,
					regType: as
				}).then(res => {
					console.log(res.result, 'major')
					this.majorr = res.result[0].ciName

					for (let i in res.result) {
						if (res.result[i].id == this.major) {
							this.zhuanye = res.result[i].miName
						}
					}
					console.log(this.zhuanye)
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

			gai() {
				uni.navigateBack({
					delta: 1, //返回层数，2则上上页
				})
			},







			submits() {
				uni.showModal({
					title: '提示',
					content: '注意：报名信息一旦确定，更改需要咨询招生办老师，如需更改点击取消，进行修改！',
					cancelText: "取消", // 取消按钮的文字  
					confirmText: "确认提交", // 确认按钮的文字  
					showCancel: true, // 是否显示取消按钮，默认为 true
					confirmColor: '#39B54A',
					cancelColor: '#39B54A',
					success: (res) => {
						if (res.confirm) {
							console.log(res.confirm,'comfirm') //点击确定之后执行的代码

							api.addStudentList({

								type: this.type,
								address: this.address,
								dateBirth: this.dateBirth,
								major: this.major,
								idCard: this.idCard,
								phone: this.phone,
								gender: this.gender,
								name: this.name,
								middleSchool: this.middleSchool,
								national: this.national,
								fresh: this.fresh,
								attendDay: this.attendDay,
								registrationNum: this.registrationNum,
								score: this.score,
								health: this.health,
								tenantId: this.tenantId,
								userId: String(this.user.id),
								  picUrl: this.imgs
								// createTime: this.createTime
							}).then(res => {
								console.log(res,'res11')
								if (res.code == 200) {
									uni.showModal({
										title: "提交成功",
										content: '招生老师将会尽快联系您。请耐心等待',
										// content: '表单数据内容：' + JSON.stringify(formdata),
										showCancel: false,
									})
									uni.navigateTo({
										 url:'/pages_me/myinfo/index'
										//url:'/pages_apply_consult/pay/index'
									})
								} else {
									uni.showModal({
										title: "提交失败",
										content: `${res.message}`,
										showCancel: false
									});
								}
							})







						} else {
							console.log('cancel') //点击取消之后执行的代码
						}
					}
				})

			}
		}
	}
</script>

<style scoped lang="scss">
	.bao {
		border: 1rpx solid #C0C0C0;
		border-radius: 20rpx;
	}

	.box {
		padding: 0rpx 40rpx 40rpx 40rpx;
		box-sizing: border-box;

		.tit {
			text-align: center;
			font-size: 36rpx;
			font-weight: bold;
			box-sizing: border-box;
			padding: 30rpx 0 30rpx 0;
		}

		.wrap {
			padding: 10rpx 0;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			line-height: 60rpx;

			.le {
				box-sizing: border-box;
				padding-left: 50rpx;
				width: 270rpx;
			}
		}

	}

	.foot {
		padding: 50rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.ls {
			width: 40%;
			text-align: center;
			padding: 15rpx 0;
			background-image: linear-gradient(90deg, #10B2F8, #5DD3FF);
			border-radius: 30rpx;
			color: #fff;
		}

		.rs {
			width: 40%;
			text-align: center;
			padding: 15rpx 0;
			background-image: linear-gradient(90deg, #10B2F8, #5DD3FF);
			border-radius: 30rpx;
			color: #fff;
		}
	}
</style>
