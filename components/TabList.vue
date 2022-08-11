<template>
	<view class="_tab_list">
		<!--  active:currentTab.id === item.id && type === '1',
					active2:currentTab.id === item.id && type === '2'
					class="_tab_list_tab"
					active:currentTab.id === item.id,-->
		<view class="_tab_list_tabs2" v-if="dataSource.length === 1 && titleShow==false">
			<view class="_tab_list_tab2">{{ dataSource[0].name }}</view>
			<view @click.stop="$emit('more')" v-show="showMore" class="_tab_list_more">更多</view>
			<image src="../static/p028.png"></image>
		</view>
		<view  v-if="dataSource.length === 1 && titleShow">
			
		</view>
		<!-- 两个的 -->
		<view class="_tab_list_tabs" v-else-if="!hideTabs &&  dataSource.length==2">   <!--  active2:currentTab.id === item.id && type == '2', _tab_list_tab2:type == '2',-->
			
				<view
					v-for="(item,index) in dataSource"
					:key="item.id" 
					:class="{ 
						_tab_list_tab:index === 0 || (currentTab.id === item.id && type==1),
						_tab_list_tab2:index === 1 || (currentTab.id === item.id && type==1),
						active:(index === 0 && cIndex === 0) || (currentTab.id === item.id && type==1),
						active2:(index === 1 &&  cIndex === 1) || (currentTab.id === item.id && type==1),
						
					}" 
					@click="tabClick(item,index)"
				>
					<view style="position: relative;left: 120rpx;">
						{{ item.name }}
					</view>
				</view>
			
		</view>
		<!-- 测试  -->
		<view style="margin:0 0 40rpx 0rpx;width: 665rpx;height: 90rpx;" v-else-if="!hideTabs &&  dataSource.length==3">
			<view class="_tab_list_tabs3">
				<view 
					v-for="(item,index) in dataSource"
					:key="item.id" 
					:class="{ 
						_tab_list_tab_left:index === 0 || (currentTab.id === item.id && type==1),
						_tab_list_tab_center:index === 1 || (currentTab.id === item.id && type==1),
						_tab_list_tab_right:index === 2 || (currentTab.id === item.id && type==1),
						active_left:(index === 0 && cIndex === 0 ) || (currentTab.id === item.id && type==1),
						active_center:(index === 1 &&  cIndex === 1) || (currentTab.id === item.id && type==1),
						active_right:(index === 2 &&  cIndex === 2) || (currentTab.id === item.id && type==1),
					}" 
					
					@click="tabClick(item,index)"
				>
					<view class="textLeft">
						{{ item.name }}
					</view>
				</view>
			</view>
		</view>
		
		
		
		<view class="_tab_list_content" :class="{ noPadding,_bg:type === '1',_bg2:type === '2' && classBg==false,_bg3:type ==='2' && classBg }">
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
			activeData:{
				type:Number,
				default:1,
			},
			noPadding:{
				type:Boolean,
				default:false,
			},
			classBg:{
				type:Boolean,
				default:false,
			},
			titleShow:{
				type:Boolean,
				default:false,
			},
			defaultActive:{
				type:Number,
				default:-1,
			},
			type:{
				type:String,
				default:'1'
			},
			hideTabs:{
				type:Boolean,
				default:false,
			},
			showMore:{
				type:Boolean,
				default:false,
			}
		},
		data(){
			return {
				currentTab:{
					
				},
				tips:'1',
				cIndex:0,
				
			}
		},
		
		// computed:{
		// 	type(){
		// 		console.log(this.type,'comtype')
		// 	}
		// },
		mounted(){
			console.log(this.defaultActive,'allthis.defaultActive')
			if(this.defaultActive!==-1 && this.defaultActive!==99){
				this.currentTab = this.dataSource.find(item => item.id == this.defaultActive )
				this.currentIndex = this.dataSource.findIndex(item => item.id == this.defaultActive )
				// console.log(this.currentIndex,'this.currentIndex')
				// console.log(this.currentTab,'this.currentTab')
				this.cIndex = this.currentIndex
				// console.log(this.currentTab,'this.dataSource1')
				// console.log(this.currentIndex,'this.currentIndex')
				// console.log(this.cIndex,'this.cIndex')
			}else if(this.defaultActive==-1){
				this.currentTab = this.dataSource[0]
				this.currentIndex = 0
				this.cIndex = this.currentIndex
			}else if(this.defaultActive==99){
				if(this.activeData==1){
					this.currentTab = this.dataSource[0]
					this.currentIndex = 0
					this.cIndex = this.currentIndex
				}else if(this.activeData==2){
					this.currentTab = this.dataSource[1]
					this.currentIndex = 1
					this.cIndex = this.currentIndex
				}else if(this.activeData==3){
					this.currentTab = this.dataSource[2]
					this.currentIndex = 2
					this.cIndex = this.currentIndex
				}
				// this.currentTab = this.dataSource[0]
				// this.currentIndex = 0
				// this.cIndex = this.currentIndex
			}else{
				console.log("报错了")
			}
		},
		methods:{
			tabClick(item,index){
				this.$emit('change',item)
				console.log(index,'index')
				
				this.cIndex = index			
				console.log(this.cIndex,'cIndex')
				// if(this.tips=='1'){
				// 	this.tips="2"
				// }else{
				// 	this.tips="1"
				// }
				this.currentTab = item
			}
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	._tab_list{
		._tab_list_tabs3{  //测试
			@include flex(row,center,center);
			// display: flex;
			// width: 820rpx;   //修改
			width: 665rpx;
			// margin:0 0 40rpx 0rpx;
			position: relative;
			._tab_list_tab_left{
				// width: 765rpx; //修改
				width: 248rpx;
				@include textEllipsis(1);
				font-size:30rpx;
				padding:24rpx 20rpx;
				flex-grow:1;
				color:#ffffff;
				font-weight:bold;
				// text-align: center;
				// background-image: url('@/static/p032.png');
				background-image: url('@/static/p028-2.png');
				background-repeat:no-repeat;
				// background-size: 672rpx 93rpx; 
				background-size: 290rpx  93rpx;
				position: absolute;
				top:1rpx;
				left: 0rpx;
				// left: 30rpx;
				// text-align: center !important;
				margin-bottom: 15rpx;
				@include radius(20rpx,left);
				&.active_left{
					width: 248rpx;
					// background-image: url('@/static/p032.png');
					background-image: url('@/static/p028-1.png');
					background-repeat:no-repeat;
					position: absolute;  
					top:1rpx;
					left: 0rpx;
					// background-size: 672rpx 93rpx;
					background-size: 290rpx  93rpx;
					color:#000000;
					font-weight:bold;
					@include radius(20rpx,left);
				}
				.textLeft{
					position: relative;
					left: 43rpx;
				}
				
			}
			._tab_list_tab_center{
				// width: 836rpx;
				width: 248rpx;
				@include textEllipsis(1);
				font-size:30rpx;
				padding:24rpx 20rpx;
				flex-grow:1;
				text-align:center;
				color:#ffffff;
				font-weight:bold;
				background-image: url('@/static/p029-2.png');
				background-repeat:no-repeat;
				background-size: 290rpx 93rpx;
				position: absolute;
				z-index: 10;
				top:1rpx;
				// right: 74rpx;
				margin-bottom: 15rpx;
				
				&.active_center{
					// width: 836rpx;
					width: 248rpx;
					background-image: url('@/static/p029-1.png');
					background-repeat:no-repeat;
					position: relative;    
					background-size: 290rpx 93rpx;
					position: absolute;
					top:1rpx;
					color:#000000;
					// right: 74rpx;
					font-weight:bold;
					
				}
				.textLeft{
					position: relative;
					left: -2rpx;
				}
			}
			._tab_list_tab_right{
				// width: 715rpx;
				width: 248rpx;
				@include textEllipsis(1);
				font-size:30rpx;
				padding:24rpx 30rpx;
				flex-grow:1;
				text-align:center;
				color:#ffffff;
				font-weight:bold;
				background-image: url('@/static/p030-2.png');
				background-repeat:no-repeat;
				// background-size: 672rpx 93rpx;
				// background-size: 246rpx 93rpx;
				// background-size: 290rpx 93rpx;  //修改
				position: absolute;
				top:1rpx;
				// right: 144rpx;  //修改
				right: -7rpx;  
				// left:28rpx;
				margin-bottom: 15rpx;
				@include radius(20rpx,right);
				&.active_right{
					// width: 715rpx;
					width: 248rpx;
					// background-image: url('@/static/p034.png');
					background-image: url('@/static/p030-1.png');
					background-repeat:no-repeat;
					position: absolute;  
				    top:1rpx;
					right: -7rpx;
					// left:28rpx;
					// background-size: 672rpx 93rpx;
					// background-size: 223rpx 93rpx;
					// background-size: 290rpx 93rpx; //修改
					color:#000000;
					font-weight:bold;
					// position: relative;
					
					// right: 144rpx; //修改
					border: none;
					outline:none;
					@include radius(20rpx,right);
				}
				.textLeft{
					position: relative;
					left: 30rpx;
				}
			}
		}
		
		._tab_list_tabs2{
			@include flex(row,between,center);
			position:relative;
			height:100rpx;
			color:#FFF;
			box-sizing:border-box;
			padding:0 30rpx;
			
			._tab_list_tab2{
				font-size:30rpx;
				z-index:10;
			}
			._tab_list_more{
				@include radius(20rpx);
				border:2rpx solid #FFF;
				font-size:26rpx;
				z-index:10;
				padding:2rpx 20rpx;
			}
			image{
				width:100%;
				height:100rpx;
				position:absolute;
				top:0;
				left:0;
			}
		}
		// 两个的
		._tab_list_tabs{  
			@include flex(row,center,center);
			width: 820rpx;
			margin-bottom: 30rpx;
			._tab_list_tab2{
				@include textEllipsis(1);
				font-size:30rpx;
				padding:24rpx 10rpx;
				flex-grow:1;
				text-align:start;
				color:#ffffff;
				font-weight:bold;
				background-image: url('@/static/p027-2.png');
				background-repeat:no-repeat;
				background-size: 386rpx 93rpx;
				position: relative;
				margin-bottom: 15rpx;
				left: -110rpx;
				@include radius(20rpx,right);
				&.active2{  
					background-image: url('@/static/p027-1.png');
					background-repeat:no-repeat;
					position: relative;    
					// left: -110rpx;
					background-size: 386rpx 93rpx;
					color:#000000;
					font-weight:bold;
					@include radius(20rpx,right);
				}
			}
			._tab_list_tab{
				@include textEllipsis(1);
				font-size:30rpx;
				padding:24rpx 10rpx;
				flex-grow:1;
				text-align:start;
				color:#ffffff;
				font-weight:bold;
				background-image: url('@/static/p026-2.png');
				background-repeat:no-repeat;
				background-size: 386rpx 93rpx;
				background-repeat:no-repeat;
				// background-attachment:fixed;
				// background-position:center;
				position: relative;
				// left: 53rpx;
				margin-bottom: 15rpx;
				@include radius(20rpx,left);
				&.active{
					background-image: url('@/static/p026-1.png');
					background-repeat:no-repeat;
					position: relative;    
					// left: 53rpx;
					background-size: 386rpx 93rpx;
					color:#000000;
					font-weight:bold;
					@include radius(20rpx,left);
				}
			}
			
		}
		
		._tab_list_content{
			// @include radius(10rpx,bottom);
			&._bg{
				background:#FFF;
				@include radius(20rpx,bottom);
				padding:36rpx 24rpx 30rpx 24rpx;
			}
			&._bg2{
				// background:#F2F2F2;
				// background:#D9ECFF;
				background:rgba(217, 236, 255, 0.7);
				@include radius(20rpx);
				padding:36rpx 24rpx 30rpx 24rpx;
			}
			&._bg3{
				// background:#F2F2F2;
				// background:#D9ECFF;
				background-color: #FFFFFF;
				// background:rgba(217, 236, 255, 0.7);
				@include radius(20rpx);
			}
			
			&.noPadding{
				padding:36rpx 0rpx 30rpx 0rpx;
			}
		}
	}
</style>
