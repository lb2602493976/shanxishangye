<template>
	<view>
		<view class="title">招生公告</view>
		<view class="desc">校企合作 定向委培 | 入学签就业协议 | 专业对口就业安置</view>
		<view class="news-list">
			<view class="news-item" v-for="item of news" :key="item.id" @click="toDetail(item.id)">
				<image :src="item.icon" mode="aspectFill"></image>
				<view class="info">
					<view class="title">{{ item.title }}</view>
					<view class="date">发布时间:{{ item.pressTime }}</view>
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
				type:'7',
				news:[],
			}
		},
		computed:{
			title(){
				return '招生公告'
			},
		},
		onLoad({ active }){
			this.handleSearch()
		},
		methods:{
			toDetail(id){
				uni.navigateTo({ url:`/pages_home/recruit/notice_detail?id=${ id }` })
			},
			handleSearch(){
				const { tenantId,type } = this
				uni.showLoading()
				api.getAllNews({ tenantId,type }).then(res => {
					this.news = res.result
				}).finally(()=>{
					uni.hideLoading()
				})
			},
		}
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.title{
		margin-top:44rpx;
		font-size:40rpx;
		color:$dark;
		font-weight:bold;
		text-align:center;
	}
	.desc{
		margin-top:30rpx;
		font-size:24rpx;
		color:$light;
		text-align:center;
	}
	.news-list{
		margin-top:58rpx;
		.news-item{
			@include space(20rpx,top);
			@include radius();
			@include flex(row,between,stretch);
			box-shadow:$shadow;
			padding:36rpx;
			margin-left:40rpx;
			margin-right:40rpx;
			background:#FFF;
			image{
				@include radius();
				width:160rpx;
				height:120rpx;
				margin-right:40rpx;
			}
			.info{
				@include flex(column,between,start);
				width:calc(100% - 200rpx);
				.title{
					@include textEllipsis();
					font-size:28rpx;
					color:$dark;
					margin-top:0;
				}
				.date{
					font-size:24rpx;
					color:$light;
				}
			}
		}
	}
	
	
</style>
