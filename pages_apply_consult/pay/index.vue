<template>
	<view>
		<view>
			<image style="width: 100%;height: 230rpx;margin: 0 0 0rpx 0;" src="../../static/phoneMoney.png"></image>
		</view>
		<view class="container">
			<view class="title" >
				金额
			</view>
			<view style="font-weight: 400;font-size: 80rpx;">
				500元
			</view>
			<view class="title" style="font-weight: 100;">
				请填写以下信息
			</view>
			<view class="uni-list">
				<view class="uni-input" >
					<ld-select class="ld-select" :multiple="false"  :list="major" label-key="miName" value-key="id" placeholder="请选择专业(必选)" clearable   v-model="majors" @change="selectChangeMajor">
						</ld-select>
					
				</view>
				<view style="margin-top:30rpx;">
					<input class="uni-input" style="padding-left: 20rpx;" v-model="name" placeholder="学生姓名(必填)"/> 
				</view>
				<view style="margin-top:30rpx;">
					<input class="uni-input" style="padding-left: 20rpx;" v-model="phone" placeholder="联系电话"/> 
				</view>
				<view style="margin-top:30rpx;">
					<input class="uni-input" style="padding-left: 20rpx;" v-model="people" placeholder="推荐人"/> 
				</view>
				<view class="uni-btn-v">
					<button @click="nextStep">下一步</button>
				</view>
			</view>
			<!-- 学费 -->
			<view class="center">
				<view  class="bigbang">
					<view class="text">待缴：</view>
					<view class="text-big">5000.00元</view>
				</view>
				<view style="border-bottom: 2px solid #D1D1D1;margin: 20upx 0;"></view>
				<view  class="bigbang">
					<view class="text">学杂费：</view>
					<view class="text">500.00元</view>
				</view>
				<view  class="bigbang">
					<view class="text">书本费：</view>
					<view class="text">40.00元</view>
				</view>
				<view  class="bigbang">
					<view class="text">材料费：</view>
					<view class="text">10.00元</view>
				</view>
				<view  class="bigbang">
					<view class="text">材料费：</view>
					<view class="text">4000.00元</view>
				</view>
			</view>
			<!-- 报名费 -->
			<view class="center">
				<view  class="bigbang">
					<view class="text">待缴：</view>
					<view class="text-big">500.00元</view>
				</view>
				<view style="border-bottom: 2px solid #D1D1D1;margin: 20upx 0;"></view>
				<view  class="bigbang">
					<view class="text">报名费：</view>
					<view class="text">500.00元</view>
				</view>
			</view>
			<!-- 无需缴费 -->
			<view class="center">
				<view  class="bigbang">
					<view class="text">待缴：</view>
					<view class="text-big">0元</view>
				</view>
				<view style="border-bottom: 2px solid #D1D1D1;margin: 20upx 0;"></view>
				<view  class="bigbang">
					<view class="text">您本次无需缴纳任何费用，感谢您的支持及配合，祝您生活学习愉快！</view>
					<!-- <view class="text">500.00元</view> -->
				</view>
			</view>
			
			
			<button class="button-blur"  @click="nowPay" v-if="bbq" >立即缴费</button>
			<button class="button-black" @click="nowNoPay" :disabled="bbq" v-else>立即缴费</button>
			<button class="button-black" @click="laterSpeack">稍后再说</button>
			<view class="bottom">
				<van-checkbox style="margin-right: 20upx;" :value="checked" shape="square" @change="onChange"></van-checkbox>
				<view style="font-size: 24upx;">本人已阅读并自愿接受 <text style="color: blue;" @click="agreement(1)"> 《报名须知》 </text >及<text style="color: blue;" @click="agreement(2)">《支付隐私条款》</text>的相关约定。</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api/searchSchool/school.js'
	export default{
		data(){
			return{
			 checked: false,
			 bbq:false,
			 major:[],
			 majors:'',
			 name:'',
			 phone:'',
			 people:'',
			}
		},
		onLoad() {
			console.log(this.bbq,'bbqqq')
			this.getMajor("")
		}, 
		methods:{
			
			onChange(event){
				console.log(event.detail,'event')
				this.checked=event.detail
				this.bbq=event.detail
				console.log(this.bbq,'this.bbq')
				// if(this.checked){
				// 	this.bbq=t
				// 	console.log(this.bbq,'bbqqq')
				// }else{
				// 	this.bbq=true
				// 	console.log(this.bbq,'bbqfalse')
				// }
			},
			//专业下拉选择框
			selectChangeMajor(val) {
				console.log(val,'val')
				this.majors=val
			},
			// 专业下拉接口
			getMajor(val){
				api.getSchoolMajorList({tenantId:this.tenantId,regType:val}).then(res=>{
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
			agreement(index){
				uni.navigateTo({
					url:"/pages_apply_consult/pay/inform/index"+"?index="+index
				})
			},
			nowNoPay(){
				console.log('请先阅读并接受《报名须知》及《支付隐私条款》的相关约定。')
				uni.showModal({
					content:'请先阅读并接受《报名须知》及《支付隐私条款》的相关约定。',
					showCancel:false,
					confirmText:'我知道了',
					
				})
			},
			nowPay(){
				uni.navigateTo({
					url:"/pages_apply_consult/pay/detail"
				})
				console.log('跳转')
			},
			nextStep(){  //提交
				const nameReg=/^[\u4E00-\u9FA5A-Za-z0-9_]{2,8}$/
				const phoneReg=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
				if(!this.majors || !this.name){
					uni.showModal({
						title: "提交失败",
						content: `专业和姓名不能为空！`,
						// content: '表单数据内容：' + JSON.stringify(formdata), 
						showCancel: false
					});
				}else if(nameReg.test(this.name)==false){
					uni.showModal({
						title: "提交失败",
						content: `姓名只能为2-8位数字，字母，汉字，下划线!`,
						// content: '表单数据内容：' + JSON.stringify(formdata), 
						showCancel: false
					});
				}else if(phoneReg.test(this.phone)==false){
					uni.showModal({
						title: "提交失败",
						content: `手机号格式不正确!`,
						showCancel: false
					});
				}else{
					// uni.navigateTo({ 
					// 	url:`/pages_apply_consult/pay/inform/index?name=${this.name}&phone=${this.phone}&major=${this.phone}&phone=${this.phone}`
					// })
					// api.addStudentList({majors:this.majors,name:this.name,phone:this.phone,people:this.people}).then(res=>{
					// 		if(res.code===200){
								// uni.showModal({
								// 	title: "提交成功",
								// 	content: '招生老师将会尽快联系您。请耐心等待',
								// 	showCancel: false,
								// 	success: function (res) {
								// 		if (res.confirm) {
								// 			uni.switchTab({ url:`/pages/home/index`})
								// 			console.log('用户点击确定');
								// 		} else if (res.cancel) {
								// 			console.log('用户点击取消');
								// 		}
								// 	}
								// })
								
							// }else{
							// 	uni.showModal({
							// 		title: "提交失败",
							// 		content: `${res.message}`,
							// 		// content: '表单数据内容：' + JSON.stringify(formdata),
							// 		showCancel: false
							// 	});
							// }
						
					// })
				}
			},
			laterSpeack(){
				uni.switchTab({
					url:"/pages/apply_consult/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.container{
		width: 100%;
		box-sizing: border-box;
		min-height: 100vh;
		padding: 20upx 50upx;
		background-color: #F2F2F2;
	}
	.title{
		margin: 40upx 0 20upx 0;
		font-weight: bold;
	}
	.center{
		/* width: 100%; */
		padding: 30upx;
		border: 1px solid #F2F2F2;
		border-radius: 30upx;
		background-color: #FFFFFF;
		margin:40upx 0upx;
		/* margin-bottom:; */
	}
	.bigbang{
		display: flex;
		align-items: center;
		margin:20upx 20upx;
	}
	.text{
		
		font-size: 30upx;
		color: #000000;
	}
	.text-big{
		
		font-size: 60upx;
		color: #000000;
	}
	.button-blur{
		width: 650upx;
		height: 100upx;
		line-height: 100upx;
		border-radius: 20upx;
		color: #FFFFFF;
		background-image: linear-gradient(#3992D7,#3A709A);
		margin-bottom: 30upx;
	}
	.button-black{
		width: 650upx;
		height: 100upx;
		line-height: 100upx;
		border-radius: 20upx;
		color: #FFFFFF;
		background-image: linear-gradient(#2B2B2B,#5E5E5E);
		margin-bottom: 30upx;
	}
	.bottom{
		display: flex;
		align-items: center;
	}
	.uni-list {
		.uni-btn-v {
			margin:48rpx 6rpx 0 6rpx;
			button {
				// background:linear-gradient(270deg,$theme,$theme2);
				background:linear-gradient(360deg,#6386FF,#454DE8);
				height:100rpx;
				@include radius(20rpx);
				line-height:100rpx;
				color: #FFFFFF;
				font-weight: bold;
				// letter-spacing: 40rpx;
			}
		}
		
		.uni-input {
			background: #FFFFFF;
			border: 4upx solid #D1D1D1;
			border-radius: 20upx;
			
			height: 80upx;
			text-indent: 1em;
			&.view{
				display:flex;
				flex-flow:row nowrap;
				align-items:center;
			}
		}
		
		.ld-select {
			background: #FFFFFF;
			// border: 4upx solid #D1D1D1;
			border-radius: 20upx;
			height: 80upx;
			text-indent: 1em;
			
			// border-radius: 20upx;
			// border: 4upx solid #D1D1D1;
			// @include radius(20rpx);
			// margin-bottom: 20upx;
			// background-color: #FFFFFF;
		}
		
		
		.uni-list-cell {
				border-radius: 20upx;
				border: 4upx solid #D1D1D1;
				margin-bottom: 20upx;
				background-color: #FFFFFF;
				display: flex;
			
				.uni-list-cell-left {
					display: flex;
					align-items: center;
					width: 20%;
					padding: 42upx 0 42upx 42upx;
			
					font-size: 28upx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #000000;
				}
			
				.uni-list-cell-db {
					display: flex;
					align-items: center;
				}
			}
		}
	
</style>
