<template>
	<view class="page">
		<view class="title">{{ detail.ciName }}</view>
		<view class="img">
			<image :src="detail.icon"></image>
		</view>
		<view class="desc">
			<view class="container" :class="{ expand }">
				<rich-text :nodes="detail.ciContent"></rich-text>
			</view>
			<view v-if="showExpand && expand===false" @click="expand = true" class="more">MORE</view>
		</view>
		<view class="major-list">
			<view class="title">
				<image src="../../static/p016.png"></image>
				<text>专业设置</text>
			</view>
			<view class="list">
				<view class="item" v-for="item of detail.majorList" :key="item.id" @click="toMajorDetail(item)">
					<image :src="item.cover"></image>
					<view class="right">
						<view class="title">
							{{ item.miName }}
						</view>
						<view class="detail">
							{{ item.professionalDsp }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import api from '@/api/searchSchool/school.js'
	export default{
		data(){
			return {
				showExpand:true,
				expand:false,
				detail:{
					majorList:[],
					
				},
			}
		},
		onLoad(){
			this.handleSearch()
		},
		methods:{
			handleSearch(){
				let info = uni.getStorageSync('faculty_detail')
				info = JSON.parse(info)
				this.detail  = info
			},
			toMajorDetail(item){
				uni.setStorageSync('majorDetail',JSON.stringify(item))
				uni.navigateTo({ url:'/pages_common/major/detail' })
			},
		},
		watch:{
			
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.page{
		>.title{
			text-align:center;
			margin-top:65rpx;
			font-size:36rpx;
			font-weight:bold;
		}
		.img{
			margin:36rpx 26rpx 0 26rpx;
			height:330rpx;
			image{
				width:100%;
				height:330rpx;
			};
		}
		.desc{
			margin:0 26rpx 0 26rpx;
			padding:50rpx 36rpx;
			background:#FFF;
			position:relative;
			.more{
				@include flex();
				color:#FFF;
				background:#C9C9C9;
				@include radius(20rpx);
				width:100rpx;
				height:44rpx;
				position:absolute;
				bottom:30rpx;
				right:20rpx;
				font-size:22rpx;
			}
			.container{
				height:220rpx;
				overflow:hidden;
				&.expand{
					height:auto;
				}
			}
			
		}
		.major-list{
			margin:34rpx 26rpx 40rpx 26rpx;
			padding:40rpx 30rpx;
			background:#FFF;
			.title{
				@include flex(row,start,center);
				image{
					width:32rpx;
					height:26rpx;
				}
				text{
					font-size:28rpx;
					margin-left:12rpx;
				}
			}
			.list{
				margin-top:10rpx;
				.item{
					@include flex(row,start,stretch);
					@include divider(2rpx solid #E3E3E3,'top');
					padding:30rpx 10rpx;
					height:160rpx;
					image{
						width:160rpx;
						height:160rpx;
					}
					.right{
						margin-left:28rpx;
						.title{
							font-size:30;
							font-weight:bold;
						}
						.detail{
							@include textEllipsis(3);
							margin-top:16rpx;
							font-size:24rpx;
						}
					}
				}
			}
		}
	}
</style>
