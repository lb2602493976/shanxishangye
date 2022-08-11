<template>
	<view class="_bg_title" :class="{ 
		bg0:type==='0',
		bg1:type==='1',
		bgt:type === '2' 
	}">
		<text v-if="title" class="_bg_title_title">{{ title }}</text>
		<text v-if="subTitle" class="_bg_title_subTitle">{{ subTitle }}</text>
	</view>
</template>

<script>
	export default{
		props:{
			title:{
				type:String,
				default:'这是标题',
			},
			subTitle:{
				type:String,
				default:''
			},
			type:{
				type:String,
				default:'0',
			},
		},
		data(){
			return {
				
			}
		},
		methods:{
			
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	._bg_title{
		@include radius(50%);
		@include flex(column,center,center);
		&.bgt{
			background:transparent;
			._bg_title_title{
				color:#000;
			}
			._bg_title_subTitle{
				
				color:#666;
			}
		}
		&.bg0{
			margin: 0 auto;
			background-image: radial-gradient(farthest-corner at 50% 0%,rgba($theme,0.3) 0%, transparent 68%); 
			._bg_title_title{
				color:#000;
			}
			._bg_title_subTitle{
				color:#666;
				font-size:22rpx;
				opacity: 0.5;
			}
		}
		&.bg1{
			background-image: radial-gradient(farthest-corner at 50% 0%,rgba(#FFF,0.3) 0%, transparent 68%); 
			._bg_title_title{
				color:#FFF;
			}
			._bg_title_subTitle{
				color:#FFF;
			}
		}
		width:400rpx;
		// height:100rpx;
		._bg_title_title{
			font-size:36rpx;
			font-weight:bold;
			margin-top:28rpx;
			letter-spacing: 4rpx;
		}
		._bg_title_subTitle{
			font-size:22rpx;
			color:#666;
			margin-top:12rpx;
		}
	}
</style>
