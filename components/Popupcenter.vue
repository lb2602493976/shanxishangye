<template>
	<view style="">
		<!-- <page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta> -->
		<!-- <uni-popup ref="popup" background-color="#fff">
			<view class="popup-content1">
				dasdsadasd
			</view> -->
			<!-- <view class="popup-content"  :class="{ 'popup-height': type === 'left' || type === 'right' }">
				{{detail.remark}}
			</view> -->
			<!-- <button class="button popup-success" @click="dialogToggle('success')">
				<text class="button-text success-text">成功</text>
			</button> --> 
		<!-- </uni-popup> -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" confirmText="关闭窗口" cancelText=" " title=" " content="投票成功,感谢您的支持" @confirm="dialogConfirm"
				@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>

	</view>
	
</template>

<script>
	import api from '@/api/searchSchool/school.js'
	export default{
		props:{

		},
		data(){
			return {
				types:'center',
				detail:{remark:'xxxxxx'},
				show:true,
				msgType: 'success',
				
			}
		},
		mounted(){
			
		},
		methods:{
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
				// this.$refs.popup.open()
			},
			toggle(type) {
				this.types = 'center'
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(this.types)
				// 测试xxx
				// this.handleSearch()
			},
			close(){
				this.$refs.popup.close()
			},
			// 消息框提示
			dialogConfirm() {
				console.log('点击确认')
				this.messageText = `点击确认了 ${this.msgType} 窗口`
				this.$refs.message.open()
			},
			dialogClose() {
				console.log('点击关闭')
			},
			handleSearch(){
				uni.showLoading()
				api.getSchPayCode({tenantId:this.tenantId}).then(res=>{
					if(res){
						this.detail=res.result[0]
					}else{
						console.log('错误没值')
					}
				}).finally(()=>{
					uni.hideLoading()
				})
				
			},
			
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.popup-content1{
		width: 686rpx;
		height: 468rpx;
		@include radius(30rpx);
		// position: relative;
		.popup-close{
			position: absolute;
			top: 0rpx;
			right: 0rpx;
			width: 100rpx;
			height: 100rpx;
		}
	}
	.scroll-Y {
		// margin-left: 20rpx;
		// width: 95%;
		width: 686rpx;
		height: 468rpx;
		// height: 100%;
	}
</style>