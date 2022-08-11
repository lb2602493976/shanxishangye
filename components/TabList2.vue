<template>
	<view class="_tab_list">
		<view class="_tab_list_tabs">
			<view 
				v-for="(item,index) in dataSource"
				:key="item.id" 
				:class="{ 
					active:dataSource.length>1 && currentTab.id === item.id,
					activeLeft:currentIndex>index,
					activeRight:currentIndex<index,
					radiusTop:dataSource.length===1,
				}" 
				:style="{
					width:index===0 || index===dataSource.length-1 ? dataSource.length===1 ? '100%' : `calc(100% / ${dataSource.length} + 30rpx)` : `calc(100% / ${dataSource.length} + 60rpx)`,
					left:index===0 ? 0 :`calc(${ index } * (100% / ${dataSource.length}) - 30rpx)`,
					zIndex:currentIndex===index? dataSource.length+10 : currentIndex>index ? index+1 : dataSource.length-index,
					
				}"
				class="_tab_list_tab"
				@click="tabClick(item,index)"
			>
				<text >{{ item.name }}</text>
			</view>
		</view>
		<view class="_tab_list_content">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			dataSource:{
				type:Array,
				default(){
					return []
				},
			},
			defaultActive:{
				type:Number,
				default:-1,
			},
		},
		data(){
			return {
				currentTab:{
					
				},
				currentIndex:0,
			}
		},
		mounted(){
			if(this.defaultActive!==-1){
				this.currentTab = this.dataSource.find(item => item.id == this.defaultActive )
				this.currentIndex = this.dataSource.findIndex(item => item.id == this.defaultActive )
			}else{
				this.currentTab = this.dataSource[0]
				this.currentIndex = 0
			}
			
		},
		methods:{
			tabClick(item,index){
				this.$emit('change',item)
				this.currentTab = item
				this.currentIndex = index
			}
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	._tab_list{
		._tab_list_tabs{
			position:relative;
			&::before{
				content:'';
				display:table;
				height:1px;
			}
			._tab_list_tab{
				// @include flex();
				@include textEllipsis(1);
				position:absolute;
				box-sizing:border-box;
				font-size:28rpx;
				padding:32rpx 30rpx;
				background:linear-gradient(90deg,$theme,$theme2);
				color:#FFF;
				flex-grow:1;
				text-align:center;
				&.radiusTop{
					@include radius(30rpx,'top');
				}
				&.activeLeft{
					border-top-left-radius:30rpx;
					text{
						position:relative;
						left:-30rpx;
						// transform:translateX(-30rpx);
					}
				}
				&.activeRight{
					border-top-right-radius:30rpx;
					text{
						position:relative;
						left:30rpx;
					}
				}
				&.active{
					@include radius(30rpx,top);
					background:#F2F2F2;
					color:#333;
					z-index:10;
				}
			}
			
		}
		._tab_list_content{
			@include radius(10rpx,bottom);
			background:#F2F2F2;
			padding:36rpx 24rpx 30rpx 24rpx;
			margin-top:92rpx;
			box-sizing:border-box;
		}
	}
</style>
