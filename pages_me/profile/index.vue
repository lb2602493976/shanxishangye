<template>
	<BasePage>
	<view class="container">
		<view class="list">
			<view v-for="(item,index) in list" :key="item.id" class="item">
				<view class="label">{{ item.label }}</view>
				<view class="content">{{ item.content }}</view>
			</view>
		</view>
	</view>
	</BasePage>
</template>

<script>
	export default{
		data(){
			let user = getApp().globalData.user
			console.log(getApp().globalData.user,'getApp().globalData.user')
			let gender = [ '未知','男性','女性' ][user.gender]
			// let gender = [ '女','男' ][1]
			let phone = user.phone? user.phone.replace(/./g,(str,index,strs)=>index >= 3 && index <= 6 ? '*' : str) :''
			return {
				list:[
					{ id:1,label:'昵称',content:user.userName },
					// { id:2,label:'性别',content:gender },
					// { id:3,label:'地区',content:user.region?user.region:'' },
					{ id:4,label:'联系电话',content:phone },
				],
			}
		},
		
		
	}
</script>

<style lang="less">
	.container{
		box-sizing:border-box;
		width:100%;
		height:100%;
		padding:36rpx;
		background-color: #FFFFFF;
		.list{
			@borderColor:#DBDBDB;
			background:#F2F2F2;
			border:2rpx solid @borderColor;
			border-radius:24rpx;
			.item{
				padding:36rpx 24rpx;
				box-sizing:border-box;
				display:flex;
				flex-flow:row nowrap;
				justify-content: flex-start;
				align-items: center;
				.label{
					width:36%;
					color:#AEAEAE;
				}
				.content{
					width:64%;
					color:#000000;
					font-weight:500;
				}
				&:not(:first-child){
					border-top:2rpx solid @borderColor;
				}
			}
		}
	}
</style>
