<template>
	<view class="_major_selector">
		<view class="_major_selector_left">{{ dataSource.ciName }}</view>
		<view class="_major_selector_right">
			<view class="_major_selector_right_major">{{ currentMajor.miName }}</view>
			<view class="_major_selector_right_icon" @click="openDrawer">
				<image src="../static/icon-01.png" mode="aspectFit"></image>
			</view>
		</view>
		 <uni-drawer ref="showRight" mode="right">
			<scroll-view class="_drawer_container" scroll-y="true">
				<view class="_drawer_container_title">该院所有专业</view>
				<view class="_drawer_container_list">
					<view  v-for="item of dataSource.majorList" :key="item.id" @click="majorClick(item)" class="_drawer_container_item" hover-class="_drawer_container_item_hover">
						{{ item.miName }}
					</view>
				</view>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
	export default{
		props:{
			dataSource:{
				type:Object,
				default(){
					return {}
				},
			},
		},
		data(){
			return {
				currentMajor:{
					id:0,
					miName:'请选择'
				},
			}
		},
		mounted(){
			console.log(this.dataSource)
			this.currentMajor = this.dataSource
		},
		methods:{
			openDrawer(){
				this.$refs['showRight'].open()
			},
			majorClick(item){
				this.currentMajor = item
				this.$emit('change',item)
			}
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	._major_selector{
		@include flex(row,start,stretch);
		border-bottom:2rpx solid #E3E3E3;
		position:relative;
		&:before{
			content:'';
			width:0px;
			height:0px;
			border-top:26rpx solid $theme2; 
			border-left:26rpx solid transparent; 
			transform:rotate(45deg) translateY(-80%);
			position:absolute;
			left:234rpx;
			top:50%;
		}
		
		._major_selector_left{
			@include flex();
			@include textEllipsis(1);
			color:#FFF;
			padding:32rpx 60rpx;
			font-size:24rpx;
			background:$theme2;
			width:146rpx;
		}
		._major_selector_right{
			@include flex(row,between,center);
			width:calc(100% - 264rpx);
			box-sizing:border-box;
			padding:32rpx 16rpx;
			background:#FFF;
			._major_selector_right_major{
				color:#000;
				font-size:24rpx;
				background:#FFF;
				margin-left:16rpx;
			}
			._major_selector_right_icon{
				width:36rpx;
				height:36rpx;
				image{
					width:100%;
					height:100%;
					
				}
			}
		}
		._drawer_container{
			width:444rpx;
			box-sizing:border-box;
			&:before{
				content:'';
				display:table;
				width:100%;
				height:1px;
			}
			._drawer_container_title{
				@include radius(10rpx);
				@include textEllipsis(1);
				margin:0 30rpx;
				width:calc(100% - 60rpx);
				color:#FFF;
				line-height:64rpx;
				background:linear-gradient(45deg,#2BB6EA,#04DABE);
				font-size:28rpx;
				text-align:center;
				margin-top:180rpx;
			}
			._drawer_container_list{
				margin:0 30rpx;
				margin-top:62rpx;
				padding:0 24rpx;
				height:auto;
				._drawer_container_item{
					@include space(50rpx,top);
					font-size:28rpx;
				}
				._drawer_container_item_hover{
					color:$theme2;
				}
			}
		}
	}
</style>
