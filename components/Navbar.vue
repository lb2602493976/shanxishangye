<template>
	<view class="_navbar" :style="{ height:`${trStyle.height + trStyle.top + bottomEx}px`,background  }">
		<view class="_navbar_container" :style="{ height:`${trStyle.height}px`,top:`${trStyle.top}px` }">
			<view v-if="back" class="_navbar_back" @click="uni.navigateBack()">
				<i class="iconfont icon-arrow-left-bold" style="font-size:40rpx"></i>
			</view>
			<view :style="{ height:`${trStyle.height }px`,lineHeight:`${trStyle.height }px` }" class="_navbar_title">{{ title }}</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				trStyle:uni.getMenuButtonBoundingClientRect(),
				// background :'transparent',
				background :'#FFFFFF',
				bottomEx:10,
			}
		},
		mounted(){
			
			uni.$on('pageScroll',top => {
				let parentRoute = this.$parent.$scope.route
				let pages = getCurrentPages()
				let page = pages[pages.length - 1]
				let currentRoute = page.route
				if(parentRoute === currentRoute){
					this.$nextTick(()=>{
						// if(top === 0) this.background = 'transparent'
						if(top === 0) this.background = '#FFFFFF'
						else if(top > 400) this.background = '#10B2F8'
						else this.background = `rgba(16,178,248, ${ top/400 })`
					})
					console.log(1111)
				}
			})
		},
		beforeUnmount(){
			uni.$off('pageScroll')
		},
		props:{
			back:{
				type:Boolean,
				default:true,
			},
			title:{
				type:String,
				default:'陕西省商业学校'
			}
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	._navbar{
		width:750rpx;
		position:fixed;
		z-index:10000;
		// margin-top: -80rpx;
		transition:all 0.2s linear;
		._navbar_container{
			width:750rpx;
			position:absolute;
			left:0;
			bottom:0;
			._navbar_back{
				width: 40rpx;
				@include flex();
				color:#FFF;
				height:100%;
				font-size:40rpx;
				margin-left:20rpx;
				cursor:pointer;
			}
			._navbar_title{
				position:absolute;
				left:50%;
				top:0;
				height:100%;
				transform:translateX(-50%);
				font-size:30upx;
				font-family: MicrosoftYaHei;
				
				color:#000;
				// line-height:60rpx;
			}
		}
		
	}
</style>
