<template>
	<BasePage>
		<view class="form">
			<view style="margin: 52upx 0 52upx 0upx;font-size: 30upx;color: #000000;">请联系您的专属招生老师</view>
			<view class="select">
				<!-- <ld-select class="ld-select" :multiple="false" :disabled="true" :list="provinceList" label-key="name" value-key="id" placeholder="请选择省"    v-model="province" @change="selectChangeProvince">
					</ld-select> -->
					<div class="ld-select">
						陕西省
					</div> 
					<template v-if="colorChange">
						<span style="position: absolute;" >
							请选择市
						</span>
						<span style="position: absolute;left: 630rpx;top:206upx;"><image style="width: 35rpx;height: 35rpx;" src="@/static/sanjiao.png"></image></span>
					</template>
					<template v-else>
						<span style="position: absolute;" >
							 
						</span>
					</template>
					
					<ld-select  class="ld-select" :multiple="false"  :list="cityList" label-key="name" value-key="id" placeholder=" " placeholder-style="color:#F76260"  v-model="city" @change="selectChangeCity ">
					</ld-select>
				
			</view>
			
			<scroll-view :scroll-y="true" class="main-container">
				<view  v-for="(item,index) in dataList" :key="index" class="main-container-view" style="">
					<view class="item" style="">
						<image :src='`${URLL}${item.photoUrl}`' mode="" style="width: 125upx;height: 175upx;margin-left: 38upx;"></image>
						<view style="padding-left: 40upx;width: 50%;height: 180upx;">
							<!-- <view class="position">{{item.dept}}</view> -->
							<view class="name" style="line-height: 88upx;">{{item.name}}</view>
							<view class="position1" style="width: 410upx;">{{item.area}}负责人</view>
						</view>
					</view>
					<view style="display: flex; background-color: #F2F2F2;width: 670.5upx;border-bottom-left-radius: 12.96upx;border-bottom-right-radius: 12.96upx;">
						<view @click="mkPhoneCall(item.phone)" style="display: flex;width: 100%;height: 111upx; align-items: center; justify-content: center;">
							<image src="../../static/phone.png" mode="" style="width: 66upx;height: 66upx;"></image>
							<view style="font-size: 30upx;font-weight: 500;color: #000000;opacity: 1;">
								拨打电话
							</view>
						</view>
						
						<!-- <view @click="wechatClick(item)" style="display: flex;width: 50%; height: 111upx; align-items: center;justify-content: center;">
							<image src='../../static/wechat.png' mode="" style="width: 66upx;height: 66upx;"></image>
							<view style="font-size: 30upx;font-weight: 500;color: #000000;opacity: 1;">
								添加微信 
							</view>
						</view> -->
					</view>
				</view>
			</scroll-view>		

			<img-view :ishide='ishide' @cancel="ishide = false" @confirm="ishide = true" :childData='childData'></img-view>
		</view>
	</BasePage>
</template>

<script>
	import api from '@/api/searchSchool/school.js'
	// import IdeaKefu from "@/components/idea-kefu/idea-kefu.vue"
	import imgView from './imgView.vue'
	import QQMapWX from '../../lib/qqmap-wx-jssdk.js'
	// var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
	// var qqmapsdk;
	export default {
		components:{
		    // IdeaKefu,
			imgView,
		},
		data() {
			return {
				colorChange:true,
				ishide:false,
				//siteid  通过 阅读 http://kefu.techidea8.com/html/wiki/ 获得
				 siteId:"169",
				active:1,
				childData:{ },
				tabs: [{
						id: 0,
						name: '人工咨询'
					},
					// {
					// 	id: 1,
					// 	name: '智能问答'
					// },
					{
						id: 2,
						name: '在线登记'
					},
				
				],
				URLL:getApp().globalData.URLL,
				dataList: [],
				provinceList:[],
				cityList:[],
				province:'61',
				city:'',
				textList: [],
				PD:'',
				school:[],
				areaCode2:'',
				areaCode:'',
				// longitude:0, //经度
				// latitude:0,  //纬度
			}
		},
		created() {
			
		},
		onLoad(option) {
			// if(option.id==61){
			// 	this.getTeacherList("61",this.areaCode2)
			// }
			// if(this.active!==undefined) this.active = option.id
			this.getTeacherList("61",this.areaCode2)
			this.getProvinceList()//省
			this.getCityList(61)
			
			// 呼出位置
			// this.getAdressInof()
			// qqmapsdk =new QQMapWX({
			// 	key:'CKLBZ-N2R3W-AXQRN-OV7ZK-KYFWF-FRBH7'
			// });
			// console.log(qqmapsdk,'mapsdk')
			
			// 学校接口
			// this.getSchool()
		},
		watch:{
			active:{
			　　immediate: true
			}
		},
		methods:{ 
			// 省市二级联动
			selectChangeProvince(val){
				this.province=val 
				this.city=""
				this.areaCode=this.province
				console.log(this.areaCode,'this.areaCode')
				this.getTeacherList(val,this.areaCode2)
				this.getCityList(val)
				
			},
			selectChangeCity(val){
				if(val){
					this.colorChange=false
				}
				console.log(this.colorChange,'val')
				this.city=val
				// this.areaCode=`${this.province},${this.city}`
				this.areaCode1=`${this.province},${this.city}`
				this.getTeacherList("",this.areaCode1)
			},
			mkPhoneCall(phoneNumber){
				uni.makePhoneCall({phoneNumber})
			},
			previewImage(){
				uni.previewImage({
					current:0,
					urls:[this.childData.wechatUrl],
				})
			},
			// 省下拉
			getProvinceList(){
				api.getProvinceList().then(res=>{
					if(res.result){
						this.provinceList=res.result
					}
					console.log(res,'省')
				})
			},
			// 市下拉
			getCityList(pid){
				api.getCityList({pid:pid}).then(res=>{
					if(res.result){
						this.cityList=res.result
					}
					
					console.log(res,'市')
				})
			},
			wechatClick(item){
			this.childData = { ...item }
				this.$nextTick(()=>{
					this.previewImage()
				})
			},
			// 呼出位置信息
			getAdressInof(){
				const tMap = new QQMapWX({
					key: 'CKLBZ-N2R3W-AXQRN-OV7ZK-KYFWF-FRBH7' //开发者密钥
				});
				var longitude
				var latitude
				uni.getLocation({
				    type: 'wgs84',
					// altitude:true,
					geocode:true,
					fail: () => {
						console.log("获取经纬度失败");
					},
				    success: function (res) {
						longitude=res.longitude 
						latitude=res.latitude
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
				        // console.log('本地的纬度：' + this.latitude);
				        // console.log('本地的纬度：' + this.latitude);
						// qqmapsdk.reverseGeocoder({
						// 	location:{
						// 		latitude: res.latitude,
						// 		longitude: res.longitude
						// 	},
						// 	success: function(resp) {
						// 		console.log(resp.result);
						// 		let address = resp.result.address;
						// 		let addressComponent = resp.result.address_component;
						// 		let nation = addressComponent.nation;
						// 		let province = addressComponent.province;
						// 		let city = addressComponent.city;
						// 		let district = addressComponent.district;
						// 	}
						// })
						
				    },
					complete: () => {
						// console.log('当前位置的纬度：' + res.latitude);
						// 使用腾讯sdk的reverseGeocoder方法 解析经纬度
						tMap.reverseGeocoder({
							location: {
								// latitude: this.latitude,
								// longitude: this.longitude
								latitude: latitude,
								longitude: longitude
							},
							success: function(res) {
								console.log("解析地址成功", res);
								console.log("当前地址：", res.result.address);
								//保存缓存
								uni.setStorage({
									key:'local',
									data:res.result.address,
									success() {
										
										console.log("success")
									}
								})
							},
							fail: function(res) {
								uni.showToast({
									title: '定位失败',
									duration: 2000,
									icon: "none"
								})
								console.log(res);
							},
							complete: function(res) { //无论成功失败都会执行
								// wx.switchTab({
								// 	url: '../appointment/appointment'
								// })
							}
						})
						},
					})
			},
			// 学校接口传子组件
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
			ichange(index) {
				console.log(69, index);
				this.active = index
			},
			getTeacherList(areaCode,areaCode2){
				api.getEnrollTeacher({tenantId:this.tenantId,areaCode:areaCode,areaCode2:areaCode2}).then(res=>{
					if(res.code==200){
						console.log(res.result,'result')
						this.dataList=res.result
						// console.log(res.result.records,'res.sult')
						// console.log(this.URLL+res.result.records[0].photoUrl,'URLL')
					}else{
						console.log('查询失败')
					}
				})
				// api.getPhoneConsult({tenantId:this.tenantId}).then(res=>{
				// 	if(res.code==200){
				// 		this.textList=res.result.records[0]
				// 	}else{
				// 		cosnoel.log('查询失败')
				// 	}
				// })
			},
			
		}
	}
</script>

<style lang="less">
	
	.form {
		min-height:100vh;
		// background-color: #F2F2F2;
		box-sizing:border-box;
		padding: 0 30upx;
		border:1px solid transparent;
		.main-container{
			// height:calc(~'100% - 137rpx');
			
		}
		
		.select{
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 30rpx;
			
			// color: #FFFFFF;
			
			// @include flex(row,start,stretch);
			// ld-select:first-child{
				// .input{
				div{
					width: 200rpx;
					color: #000000;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					height: 60rpx;
					padding: 15rpx 20rpx;
					border-radius: 0;	
					border-top-left-radius:30rpx;
					border-bottom-left-radius:30rpx;
					border-style: solid;
					border-width: 1rpx;
					border-color: rgba(0, 0, 0, 0.1);
					background:linear-gradient(180deg,#B0CAFC,#469CFA);
					// background-color: #3E65EF;

				}
				
			// }
			// ld-select:last-child{
				.ld-select1{
					width: 400rpx;
					color: #000000;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					height: 60rpx;
					padding: 15rpx 20rpx;
					border-radius: 0;
					border-top-right-radius:30rpx;
					border-bottom-right-radius:30rpx;
					// border-style: solid;
					// border-width: 1rpx;
					border-color: rgba(0, 0, 0, 0.1);
					background:linear-gradient(180deg,#B0CAFC,#469CFA);
					// background-color: #3E65EF;
				}
				ld-select{
				.input{
					width: 400rpx;
					color: #000000;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					height: 60rpx;
					padding: 15rpx 20rpx;
					border-radius: 0;
					border-top-right-radius:30rpx;
					border-bottom-right-radius:30rpx;
					// border-style: solid;
					// border-width: 1rpx;
					border-color: rgba(0, 0, 0, 0.1);
					background:linear-gradient(180deg,#B0CAFC,#469CFA);
					// background-color: #3E65EF;
					.phcolor{
						color: #000000;
					}
				}
				.phcolor{
					color: #000000;
				}
			}
			
			// .ld-select:first-child{
			// 	width: 233rpx;
			// 	color: #FFFFFF;
			// }
			// .ld-select:last-child{
			// 	width: 435rpx;
			// 	display: flex;
			// 	align-items: center;
			// 	font-size: 28rpx;
			// 	height: 60rpx;
			// 	padding: 10rpx 20rpx;
			// 	border-radius: 10rpx;
			// 	border-width: 1rpx;
			// 	border-color: rgba(0, 0, 0, 0.1);
			// }
		}
		
		// .tabs {
		// 	width: 697rpx;
		// 	height: 97rpx;
		// 	margin: 20rpx auto;
		// 	background-image: linear-gradient(0deg,
		// 			#007E7B 0%,
		// 			#A4D8C4 100%);
		// 	box-shadow: 0rpx 5rpx 6rpx 0rpx rgba(0, 0, 0, 0.39);
		// 	border-radius: 26rpx;
		// 	display: flex;
		// 	flex-direction: row;
		// 	flex-wrap: nowrap;
		// 	overflow: hidden;
		
		// 	view {
		// 		flex: 1;
		// 		border-right: 1rpx solid rgba(255, 255, 255, .21);
		// 		text-align: center;
		// 		line-height: 97rpx;
		// 		font-family:Source Han Sans CN;
		// 		font-size: 32rpx;
		// 		font-weight: normal;
		// 		font-stretch: normal;
		// 		line-height: 97rpx;
		// 		letter-spacing: 2rpx;
		// 		color: #ffffff;
		
		// 		&:last-child {
		// 			border: none
		// 		}
		// 	}
		
		// 	.active {
		// 		background-image: linear-gradient(0deg,
		// 				#A4D8C4 0%,
		// 				#007E7B 100%);
		// 	}
		// }
		.main-container-view{
			margin: 9upx 0 0 9upx;
			position: relative;
			z-index: 999;
			width: 670.5upx; 
			height: 340upx;
			border-radius: 12.96upx;
		// 	box-shadow: 0upx -9upx 0upx 0upx rgba(0, 0, 0, 0.19),   /*上边阴影  红色*/
		
		// 				-9upx 0upx 0upx 0upx rgba(0, 0, 0, 0.19),   /*左边阴影  绿色*/
		
		// 				9upx 0upx 0upx 0upx rgba(0, 0, 0, 0.19),    /*右边阴影  蓝色*/
		
		// 				0upx 9upx 0upx 0upx rgba(0, 0, 0, 0.19);    /*下边阴影  黄色*/
			box-shadow: 0upx -9upx 9upx 0upx  rgba(233, 233, 233, 1),   /*上边阴影  红色*/

			-9upx 0upx 9upx 0upx rgba(233, 233, 233, 1),   /*左边阴影  绿色*/

			9upx 0upx 9upx 0upx rgba(233, 233, 233, 1),    /*右边阴影  蓝色*/

			0upx 9upx 9upx 0upx rgba(233, 233, 233, 1);    /*下边阴影  黄色*/
			// box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, .05);
			margin-bottom: 20upx;
		}
		.item {
			display: flex;
			align-items: center;
			background-color: #FFFFFF;
			border-top-left-radius: 12.96upx;
			border-top-right-radius: 12.96upx;
			
			width: 670.5upx;
			height: 230upx;
			// margin-bottom: 20upx;

			.name {
				font-size: 44upx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #000000;
			}

			.position {
				font-size: 30upx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #000000;
				line-height: 28upx;
				opacity: 0.5;
			}
			.position1 {
				font-size: 30upx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #000000;
				line-height: 45upx;
				opacity: 0.5;
			}
		}

		.item-t {
			display: flex;
			flex-direction: column;
			// background-color: #FFFFFF;
			// border: 2upx solid #E3E3E3;
			border-radius: 20upx;
			padding: 14upx 28upx;
			margin-bottom: 20upx;
			margin-top:30upx;
			.text {
				font-size: 28upx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #000000;
				opacity: 0.5;
				margin: 14upx 0;
			}
		}
	}
</style>
