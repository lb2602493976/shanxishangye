<template>
	<view class="pages">
		<!-- <view style="margin: 65rpx 0;" v-if="list.createTime">
			预报名表填写时间：{{list.createTime.slice(0,4)}}年{{list.createTime.slice(5,7)}}月{{list.createTime.slice(8,10)}}日
		</view> -->
		<view style="margin: 65rpx 0;text-align: center;">
			足不出户便可全景看校
		</view>
		<map style="width: 100%; height: 370upx; border-radius: 20upx;" :latitude="Number(list.latitude)" :longitude="Number(list.longitude)" :markers="covers" @click="chooseLocation()">
		</map>
		<map style="width: 100%; height: 370upx; border-radius: 20upx;margin-top: 50upx;" :latitude="Number(list.latitude)" :longitude="Number(list.longitude)" :markers="covers" @click="chooseLocation()">
		</map>
		
		
	</view>
</template>

<script>
	// import api from "@/api/searchSchool/school.js"
	
	export default {
		data() {
			return {
				user:getApp().globalData.user,
				list: [],
				jiaofei:false,
				covers: [{
					latitude: 1,
					longitude: 2,
					iconPath: '@/static/location.png'
				}],
			}
		},
		onLoad() {
			// this.handleSearch()
			// this.handCeshi()
		},
		methods:{
			handleSearch(){
				uni.showLoading()
				// console.log('userId:this.user.id',this.user.id)
				
				// .finally(() => {
				// 	uni.hideLoading()
				// })
			},
			chooseLocation(success){
			    // 先判断定位权限是否开启
			    // uni.getLocation({
			    //     success(){
			    //         //定位权限开启，打开地图
			    //         uni.chooseLocation({
			    //             success // 成功回调
			    //         })
			    //     },
			    //     fail(e) {
			    //         // 定位权限未开启，引导设置
			    //         uni.showModal({
			    //             title: '温馨提示',
			    //             content: '您已拒绝定位,请开启',
			    //             confirmText: '去设置',
			    //             success(res){
			    //                 if (res.confirm) {
			    //                     //打开授权设置
			    //                     openSetting()
			    //                 }
			    //             }
			    //         })
			    //     }
			    // })
				// uni
				uni.openLocation({
				    latitude: this.covers.latitude,
				    longitude: this.covers.longitude,
				    name: '西安高新技师学院',
				    scale: 12,
				    success(res){
						if (res.confirm) {
							//打开授权设置
							openSetting()
						}
					}
				});
				// uni
				// uni.getLocation({
				//     type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				//     success: function (res) {
				//         uni.openLocation({
				//             latitude: this.covers.latitude,
				//             longitude: this.covers.longitude,
				//             success: function () {
				//                 console.log('success');
				//             }
				//         });
				//     }
				// });
			},
			
			//打开授权设置（必须用户点击小程序才能打开授权设置，所以前面加了showModel）
			 openSetting(){
			    // 打开小程序的设置
			    // #ifdef MP-WEIXIN
			    uni.openSetting()
			    // #endif
			    
			    // App跳转系统的设置界面
			    // #ifdef APP-PLUS
			    uni.getSystemInfo({
			        success(res) {
			            if(res.platform=='ios'){ //IOS
			                plus.runtime.openURL("app-settings://");
			            } else if (res.platform=='android'){ //安卓
			                let main = plus.android.runtimeMainActivity();
			                let Intent = plus.android.importClass("android.content.Intent");
			                let mIntent = new Intent('android.settings.ACTION_SETTINGS');
			                main.startActivity(mIntent);
			            }
			        }
			    })
			    // #endif
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
		background: #FFFFFF;
		border: 4upx solid #D1D1D1;
		border-radius: 20upx;
	}

	.content-item {
		margin: 20upx 0;
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
