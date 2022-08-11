<template>
	<BasePage>
	<!-- <TitledBox title="录取查询" container-style="padding:40rpx;background:transparent;"> -->
		<view class="main">
			<view>请填写以下信息</view>
			<view class="box">
				<input v-model="name" type="text" placeholder="在此输入姓名">
			</view>
			<view class="box">
				<input v-model="idCard" type="text" placeholder="在此输入身份证号">
			</view>
			<view class="box">
				<input v-model="phone" type="text" placeholder="在此输入手机号码"> 
			</view>
			<view class="box" v-show="picVisible">
				
				<pt-images-verification ref="mychild"  :left="codeObj.left" :bgImg="codeObj.bgImg" :maskImg="codeObj.maskImg" @refresh="refresh" @success="success"></pt-images-verification>
			</view>
			
			<button @click="handleSearch" class="primary btn" hover-class="primary-hover">查询</button>
			<!-- <view v-if="status === 1" class="notice"> -->
			<view v-if="status === 1" class="container" style="margin-top: 30rpx;">
				<view style="padding: 0 26upx;" >
					<view class="list">
						<view class="item">
							<view class="label">姓名</view>
							<view class="content">{{ info.name?info.name:'' }}</view>
						</view>
						<view class="item">
							<view class="label">性别</view>
							<view class="content">{{ info.gender?info.gender:'' }}</view>
						</view>
						<view class="item">
							<view class="label">身份证号</view>
							<view class="content">{{ info.idCard?info.idCard:'' }}</view>
						</view>
						<view class="item">
							<view class="label">毕业学校</view>
							<view class="content">{{ info.fromSchool?info.fromSchool:'' }}</view>
						</view>
						<view class="item">
							<view class="label">录取专业</view>
							<view class="content">{{ info.majorName?info.majorName:'' }}</view>
						</view>
						<view class="item">
							<view class="label">快递公司</view>
							<view class="content">{{ info.courierName?info.courierName:'' }}</view>
						</view>
						<view class="item">
							<view class="label1">快递单号</view>
							<view class="content1">{{ info.orderNum?info.orderNum:'' }}</view>
						</view>
						
					</view>
					<!-- <uni-table stripe border  style="">
						<uni-tr style="background-color: #D4D4D4;">
							<uni-th width="20%" align="center" >姓名</uni-th>
						</uni-tr>
						
						<uni-tr >
							<uni-td align="center">{{info.name || ''}}</uni-td>
						</uni-tr>
					</uni-table>
				</view>
				<view style="padding: 0 26upx;" >
					<uni-table stripe border  style="">
						<uni-tr style="background-color: #D4D4D4;">
							<uni-th width="20%" align="center" >学院</uni-th>
							<uni-th width="20%" align="center" >专业</uni-th>
						</uni-tr>
						
						<uni-tr >
							<uni-td align="center">{{info.deptName|| ''}}</uni-td>
							<uni-td align="center">{{info.majorName || ''}}</uni-td>
						</uni-tr>
					</uni-table>
					<uni-table stripe border  style="">
						<uni-tr style="background-color: #D4D4D4;">
							<uni-th width="50%" align="center" >快递单号(公司)</uni-th>
						</uni-tr>
						<uni-tr >>
							<uni-td align="center">{{info.orderNum || ''}}({{info.courierName  || ''}})</uni-td>
						</uni-tr>
					</uni-table> -->
				</view>
				<view style="text-align: start;padding: 0 26upx;margin: 50upx 0upx;line-height:50upx;color:#466A81;">{{contentSuccess}}</view>
				
			</view>
			<view v-else-if="status === 0" class="notice">
				<view class="title fail">
					<image :src="failIcon"></image>
					<text>未找到</text>
				</view>
				<view class="para">
					很抱歉，未查询到你的相关信息，你可能未被我校录取，或信息输入有误，请重试。
				</view>
			</view>
		</view>
	<!-- </TitledBox> -->
	</BasePage>
</template>

<script>
	import validate from '@/utils/validate/index.js'
	import api from '@/api/searchSchool/school.js'
	import ptImagesVerification from "@/components/pt-images-verification/pt-images-verification.vue" 
	export default{
		components:{
			ptImagesVerification,
		},
		data(){
			return {
				status:null,
				name:'',
				idCard:'',
				phone:'',
				contentSuccess:'',
				// info:{},
				info:{
					name:'',
					gender:'',
					idCard:'',
					fromSchool:'',
					majorName:'',
					courierName:'',
					orderNum:''
				},  //测试
				picVisible:false,
				imageImportant:false,
				// successIcon:require('@/static/icon-21.png'),
				failIcon:require('@/static/icon-22.png'),
				// 由于没有线上图片验证码库，这里就简单写两个
				codeArray: [{
					// bgImg: require('@/static/code_1.jpg'),
					bgImg: 'https://zhaosheng.kanxiaowang.com:8443/images/0985e9fd87d8440fbce49ea5af43b5991646892568654.jpg',
					// maskImg: require('@/static/code_1_cover.png'),
					maskImg: 'https://zhaosheng.kanxiaowang.com:8443/images/254d11b960aa4fd19e61a11078684d191646892617761.png',
					left: 140 // 凹陷区距离背景图左边的距离
				},
				{
					// bgImg: require('@/static/code_2.jpg'),
					bgImg: 'https://zhaosheng.kanxiaowang.com:8443/images/a71b7b92f9f3493f887bbb8868a7b3ce1646892757479.jpg',
					// maskImg: require('@/static/code_2_cover.png'),
					maskImg: 'https://zhaosheng.kanxiaowang.com:8443/images/e4aca8c112744e6284cf490fff22c6ee1646892806403.png',
					left: 230
				},
				],
				codeObj: {
					bgImg: '',
					maskImg: '',
					left: 0
				}
			}
		},
		watch:{
			phone:function(){
				if( this.name && this.idCard && this.phone){
					this.picVisible=true
				}else{
					this.picVisible=false
				}
				// console.log(this.idCard,'idCard')
			}
		},
		onLoad(){
			this.init()
		},
		methods:{
			handleSearch(){
				let { tenantId,name,idCard,imageImportant,phone } = this
				if(!name.trim()) return uni.showToast({ title:'姓名不能为空',icon:'none' })
				if(!validate.idCard(idCard)) return uni.showToast({ title:'身份证号不合法',icon:'none' })
				if(!validate.phone(phone)) return uni.showToast({title:'手机号格式不正确',icon:'none'})
				if(!imageImportant) return uni.showToast({title:'请先滑动验证码',icon:'none'})  //测试
				// let data = { tenantId,name:'林博',idCard:'61012420001126333X' }
				let data = { tenantId,name,idCard,phone }
				// uni.showLoading()
				api.findAdmissionNotice(data).then(res => {
					if(res.result){
						console.log(res.result,'result') 
						this.info = res.result
						// this.refresh()
						this.$refs.mychild.refresh()
						// this.imageImportant=false
						this.status = 1
					}else{
						this.$refs.mychild.refresh()
						this.status = 0
					}
				}).finally(()=>{
					// uni.hideLoading()
				})
				api.resultTips({tenantId:this.tenantId}).then(res=>{
					
					this.contentSuccess=res.result[0].content
					// console.log(res.result[0].content,'res')
				})
			},
			// 随机获取验证码，此处随机可能会随机到重复数据，按需修改
			init(){
				let index = this.random(0,this.codeArray.length - 1)
				console.log(index,'index')
				this.codeObj = this.codeArray[index]
			},
			// 刷新验证码
			refresh(){
				this.init()
				this.imageImportant=false
				// console.log(1111,'测试')
			},
			// 创建随机数
			random(mins,maxs){
				var randomNum = Math.round(Math.random() * (maxs - mins) + mins);
				return randomNum;
			},
			// 验证成功
			success(){
				uni.showToast({
					icon: 'none',
					title: '验证成功'
				})
				this.imageImportant=true
				// this.refresh()
			}
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.main{
		padding: 30upx;
		
		.btn{
			@include flex();
			box-shadow:$shadow;
			text-indent: 40rpx;
			letter-spacing:40rpx;
			text-align:center;
			margin-top:42rpx;
			background:linear-gradient(45deg,#2BB6EA,#469CFA);
			// background:linear-gradient(180deg,#B0CAFC,#5A8AE9);
			// background-color: #469CFA;
		}
		.box{
			@include radius();
			@include space(36rpx,top);
			padding:30rpx 36rpx;
			box-shadow:$shadow;
			background:#FFF;
			&:first-child{
				margin-top:22rpx;
			}
		}
		.notice{
			@include radius();
			@include flex(column,start,center);
			padding:40rpx;
			padding-bottom:80rpx;
			margin-top:62rpx;
			background:#DBDBDB;
			border:$border;
			.title{
				&.fail{
					text{
						color:$dark;
					}
				}
				@include flex(row,center,center);
				text{
					font-size:44rpx;
					color:$theme;
					margin-left:32rpx;
				}
				image{
					width:58rpx;
					height:46rpx;
				}
			}
			.para{
				text-indent: 56rpx;
				font-size:28rpx;
				color:$dark;
				margin-top:50rpx;
				line-height: 42rpx;
			}
		}
		.container{
			box-sizing:border-box;
			width:100%;
			height:100%;
			// padding:26rpx;
			background-color: #FFFFFF;
			.list{
				// @borderColor:#DBDBDB;
				background:#FFF;
				// border:2rpx solid @borderColor;
				// border-radius:24rpx;
				.item{
					// padding:26rpx 24rpx;
					box-sizing:border-box;
					display:flex;
					flex-flow:row nowrap;
					justify-content: flex-start;
					align-items: center;
					// border: 2px solid #000000;
					.label{
						display: flex;
						width:36%;
						display: flex;
						height: 100rpx;
						align-items: center;
						padding: 0 0 0 20rpx;
						// color:#AEAEAE;
						background-color: #EFF8FF;
						border: 5upx solid #C7D1DB;
						border-bottom-width: 0upx;
					}
					.content{
						display: flex;
						width:64%;
						height: 100rpx;
						align-items: center;
						padding: 0 0 0 20rpx;
						// color:#AEAEAE;
						// background-color: #EFF8FF;
						border: 5upx solid #C7D1DB;
						border-left-width: 0upx;
						border-bottom-width: 0upx;
					}
					.label1{
						display: flex;
						width:36%;
						display: flex;
						height: 100rpx;
						align-items: center;
						padding: 0 0 0 20rpx;
						// color:#AEAEAE;
						background-color: #EFF8FF;
						border: 5upx solid #C7D1DB;
					}
					.content1{
						display: flex;
						width:64%;
						height: 100rpx;
						align-items: center;
						padding: 0 0 0 20rpx;
						// color:#AEAEAE;
						// background-color: #EFF8FF;
						border: 5upx solid #C7D1DB;
						border-left-width: 0upx;
					}
					// &:not(:first-child){
					// 	border-top:2rpx solid @borderColor;
					// }
				}
			}
		}
	}
	.pt-images-verification{
		padding-top: 30rpx;
	}
	
</style>
