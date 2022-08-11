<template>
	<BasePage>
	<view class="container">
		<!-- <view class="tabs">
			<view v-for="(item,index) in tabs" :class="{'active':active==index}" @click="ichange(index)">
				{{item.name}}
			</view>
		</view> -->
		<view  style="padding: 0 5%;margin-top: 50upx;">
			<view style="display: flex;align-items: center;">
				<!-- <view class="rec"></view>
				<view class="text">乘车路线</view> -->
			</view>
			
			<view class="way" >
				<view class="way-top">
					<!-- <image src="../../static/bus.png" mode="" style="width: 69upx;height: 51upx;">
					</image> -->
					<view class="way-title">乘车路线：</view>
				</view>
				<view class="way-text" v-if="dataList.driveWay">
					<rich-text  :nodes="dataList.driveWay"></rich-text>
				</view> 
				<view class="way-text" v-else>
					暂无路线
				</view>
			</view>
			<view style="display: flex;align-items: center;">
				<!-- <view class="rec"></view> -->
				<!-- <view class="text">校址地图</view> -->
			</view>
			<view class="way" >
				<view class="page-section page-section-gap" style="border-radius: 20upx;">
					<view style="
					font-size: 38upx;
					font-family: Source Han Sans CN;
					font-weight: 600;
					color: #000000;">校址地图：</view>
					<map style="width: 100%; height: 370upx; border-radius: 20upx;" :latitude="Number(dataList.latitude)" :longitude="Number(dataList.longitude)" :markers="covers" @click="chooseLocation()">
					</map>
				</view>
			</view>
		</view>
		
	</view>
	</BasePage>
</template>

<script>
	import api from "@/api/searchSchool/school.js"
	
	export default {
		data() {
			return {
				active: 0,
				tabs: [{
						id: 0,
						name: '乘车路线'
					},
					{
						id: 1,
						name: '校址地图'
					}
				],
				wayList:[
					{
						title:'乘坐地铁',
						text:'乘坐地铁1号线，天安门东站（B出口）或天安门西站（B出口）下车，步行500米（550码）至天安门塔，向北步行至午门。'
					},
					{
						title:'乘坐地铁',
						text:'乘坐公交1、2、52、59、82、120路、观光公交1、2路至天安门东站下车；或乘坐公交1、5、52路、观光公交1、2路至天安门西站下车。'
					}
				],
				 id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 34.226015,
				longitude: 108.886036,
				covers: [{
					latitude: 1,
					longitude: 2,
					// iconPath: require('@/static/location.png')
				}],
				dataList:[],
			}
		},
		onLoad() {
			this.handleSearch()
		},
		methods: {
			handleSearch(){
				// api.getMapPath({tenantId:this.tenantId}).then(res=>{
				api.getMapPath({tenantId:this.tenantId}).then(res=>{
					this.dataList = res.result.records[0]
					this.$set(this.covers,'latitude',Number(this.dataList.latitude))
					this.$set(this.covers,'longitude',Number(this.dataList.longitude))
					console.log(res.result.records[0],'res')
				})
			},
			
			ichange(value) {
				this.active = value
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
				    name: '陕西省商业学校',
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
			
		}
	}
</script>

<style lang="less">
	.container {
		width: 100%;
		min-height: 100vh;
		// background-color: #F2F2F2;
		padding-top: 20rpx;
		box-sizing: border-box;

		.tabs {
			width: 697rpx;
			height: 97rpx;
			margin: 0 auto;
			background-image: linear-gradient(0deg, #714ee1 0%, #54a5c7 100%);
			box-shadow: 0rpx 5rpx 6rpx 0rpx rgba(0, 0, 0, 0.39);
			border-radius: 26rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			overflow: hidden;

			view {
				flex: 1;
				border-right: 1rpx solid rgba(255, 255, 255, .21);
				text-align: center;
				line-height: 97rpx;
				font-family:Source Han Sans CN;
				font-size: 32rpx;
				font-weight: normal;
				font-stretch: normal;
				line-height: 97rpx;
				letter-spacing: 2rpx;
				color: #ffffff;

				&:last-child {
					border: none
				}
			}

			.active {
				background-image: linear-gradient(0deg,
						#4998d4 0%,
						#4728a9 100%);
			}
		}

	}

	view.long-tabs {
		border-bottom: none !important;
		background: unset !important;
		justify-content: flex-start !important;
		line-height: 80rpx !important;
		padding-bottom: 20rpx !important;
	}

	.long-tabs .tabs-item {
		margin-right: 115rpx;
		background: unset !important;
	}

	.long-tabs .tabs-item .item-label view {
		font-family: MicrosoftYaHei;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 38rpx;
		letter-spacing: 1rpx;
		color: #000000;
	}

	.long-tabs .active .item-label {
		padding: 16rpx 0rpx !important;
		border-bottom: 10rpx solid #036cd8 !important;
	}

	.long-tabs .tabs-item .item-label {
		padding: 16rpx 0rpx !important;
	}

	.long-tabs .active .item-label view {
		font-family: MicrosoftYaHei;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 38rpx;
		letter-spacing: 1rpx;
		color: #036cd8;
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
		color: #62A76D;
	}

	.way {
		background: #F2F2F2;
		border: 4upx solid #D1D1D1;
		border-radius: 20upx;
		padding: 30upx;
		margin-bottom: 40upx;

		.way-top {
			display: flex;
			align-items: center;
			.way-title {
				// padding-left: 40upx;
				font-size: 38upx;
				font-family: Source Han Sans CN;
				font-weight: 600;
				color: #000000;
			}
		}
		.way-text {
			font-size: 30upx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #000000;
			line-height: 50rpx;
		}
	}
</style>
