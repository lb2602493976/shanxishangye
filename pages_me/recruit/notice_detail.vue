<template>
	<view>
		<view class="title">招生公告</view>
		<view class="desc">校企合作 定向委培 | 入学签就业协议 | 专业对口就业安置</view>
		<view class="content">
			<rich-text v-html="content"></rich-text>
		</view>
	</view>
	
</template> 

<script>
	import api from '@/api/searchSchool/school.js'
	export default{
		data(){
			return {
				active:1,
				content:'',
				titleBoxList:[
					{ id:1,name:'党建宣传' },
					{ id:2,name:'校园新闻' },
					{ id:3,name:'行业资讯' },
				],
			}
		},
		onLoad({ id }){
			this.id = id
			this.handleSearch()
		},
		computed:{
			title(){
				return '招生公告'
			},
		},
		methods:{
			handleSearch(){
				uni.showLoading()
				api.getNewsDetail({ id:this.id }).then(res => {
					this.content = res.result.content
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
	.content{
		@include radius();
		box-shadow:$shadow;
		width:calc(100% - 80rpx);
		box-sizing:border-box;
		padding:36rpx;
		background:#FFF;
		margin:40rpx;
	}
</style>
