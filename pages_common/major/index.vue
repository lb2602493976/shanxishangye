<template>
	<view class="page">
		<Navbar title="院系设置"></Navbar>
		<view class="major-img">
			<image :src="detail.icon"></image>
			<view class="selector">
				<MajorSelector2 @rightClick="showAllSchool" :options="{ label:'ciName' }" :defaultActive="colleagueId" :dataSource="cList" @change="majorSelecorChange"></MajorSelector2>
			</view>
		</view>
		<view class="detail">
			<rich-text :nodes="detail.ciContent"></rich-text>
		</view>
		<view class="major-title">
			<image src="../../static/p007.png"></image>
			<text>{{ detail.ciName || '' }}专业设置</text>
		</view>
		<view class="major-list">
			<view class="major-item" v-for="item of detail.majorList" :key="item.id" @click="toDetail(item)">
				<ImgItem2 :dataSource="item"></ImgItem2>
			</view>
		</view>
		<view class="more" @click="showAllMajor">查看学校所有专业</view>
	</view>
</template>

<script>
	import api from '@/api/searchSchool/school.js'
	export default{
		data(){
			return {
				colleagueId:'',
				navigationTitle:'',
				textNodes:'啊实打实打算',
				cList:[],
				detail:{
					img:'https://zhaosheng.kanxiaowang.com:8443/images/481fd7d9268b41b89c9c28029d4f48c71640939414434.jpg',
					majorList:[],
				},
			}
		},
		onLoad({ colleagueId }){
			this.colleagueId = colleagueId
			// this.navigationTitle = '院系设置'
			// this.handleSearch(this.colleagueId)
		},
		onShow(){
			this.navigationTitle = '院系设置'
			this.handleSearch(this.colleagueId)
		},
		onPageScroll({ scrollTop:top }){
			uni.$emit('pageScroll',top)
		},
		methods:{
			majorSelecorChange(item,index){
				this.detail = item
			},
			handleSearch(colleagueId){
				uni.showLoading()
				let { tenantId } = this
				return api.getSchoolList({ tenantId }).then(res => {
					this.cList = res.result.map(item => ({ ...item,majorList:item.majorList.map(major => ({ ...major,coverPicture:major.cover,tagName:major.miName })) }))
					this.detail = this.cList.find(item => item.id === colleagueId)
					console.log(this.cList)
				}).finally(()=>{
					uni.hideLoading()
				})
			},
			showAllSchool(){
				uni.navigateTo({ url:`/pages_common/major/list?active=1` })
			},
			showAllMajor(){
				// uni.setStorageSync('majorList',JSON.stringify(this.detail.majorList))
				uni.navigateTo({ url:`/pages_common/major/list?active=1` })
			},
			toDetail(item){
				uni.setStorageSync('majorDetail',JSON.stringify(item))
				uni.navigateTo({ url:'/pages_common/major/detail' })
			},
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.page{
		width:750rpx;
		min-height:100vh;
		position:relative;
		
	}
	.navigation{
		width:100%;
		height:60rpx;
		position:fixed;
		top:var(--status-bar-height);
		z-index:10;
		.back{
			width: 40rpx;
			@include flex();
			color:#FFF;
			height:100%;
			font-size:40rpx;
			margin-left:20rpx;
			cursor:pointer;
		}
		.title{
			position:absolute;
			left:50%;
			top:0;
			height:100%;
			transform:translateX(-50%);
			font-size:28rpx;
			color:#FFF;
			line-height:60rpx;
		}
	}
	.detail,.major-title,.major-list,.more{
		margin:0 40rpx;
	}
	
	.detail{
		margin-top:80rpx;
	}
	.major-img{
		position:relative;
		width:750rpx;
		height:434rpx;
		.selector{
			width:calc(100% - 72rpx);
			position:absolute;
			z-index:10;
			left:36rpx;
			bottom:60rpx;
		}
		&>image{
			position:absolute;
			width:100%;
			height:100%;
			z-index:1;
		}
	}
	.major-title{
		@include flex(row,start,center);
		margin-top:128rpx;
		image{
			width:40rpx;
			height:40rpx;
		}
		text{
			font-weight:bold;
			font-size:28rpx;
			margin-left:20rpx;
		}
	}
	.major-list{
		display:flex;
		flex-flow:row wrap;
		justify-content: space-between;
		align-items:center;
		margin-top:32rpx;
		.major-item{
			width:calc(50% - 8rpx);
			&:not(:first-child,:nth-child(2)){
				margin-top:16rpx;
			}
		}
	}
	.more{
		@include flex();
		@include radius();
		padding:26rpx;
		margin-top:50rpx;
		margin-bottom:50rpx;
		border:2rpx solid #D1D1D1;
	}
</style>