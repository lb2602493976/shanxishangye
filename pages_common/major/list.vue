<template>
	<view class="page">
		<!-- <view style="position: relative;">
			<image style="position: absolute;top: -28px;left: 0rpx;width: 100%;height: 260rpx;z-index: -1;" src="../../static/bg-04.jpg"></image>
		</view> -->
		<!-- <view style="font-weight: bold;font-size: 36rpx;color: #FFFFFF;text-align: center;margin: 62rpx 0 20rpx 0;">陕西省商业学校</view>
		<view style="font-size: 28rpx;color: #FFFFFF;text-align: center;margin: 0px 0 50rpx 0;">开设专业总览</view> -->
		<!-- <view class="tabs">
			<view class="tab" v-for="item of tabs" :key="item.id" @click="tabChange(item)">
				<image :src="active == item.id ? item.enabled :item.disabled"></image>
			</view>
		</view> -->
		<view class="box news">
			<view class="bg" style="padding-bottom:0">
				<view class="news-block"  v-for="(item,index) of newsConfigP1" :key="item.id">
					
					<view class="content">
						<TabList :dataSource="item.tabs"  :activeData="active" defaultActive="99" :type="item.specMode ? '1' :'2'" @change="item2 => tabChange(item2,index)">
						<!-- <TabList :dataSource="item" :type="item.specMode ? '1' :'2'" @change="item2 => tabChange(item2,index)"> -->
							<view class="list school" >
								<view class="item" v-for="item of list" :key="item.id" @click="toDetail(item)">
									<view class="cover-pic">
										<image :src="item.cover"></image>
									</view>
									<view class="name">
										<text>{{ item.miName }}</text>
										<image src="../../static/arrow.png"></image>
									</view>
								</view>
							</view>
							<!-- <view class="list school" v-else-if="active == 2"> -->
								<!-- <view class="item" v-for="item of list" :key="item.id" @click="toDetail(item)">
									<view class="cover-pic">
										<image :src="item.cover"></image>
									</view>
									<view class="name">
										<text>{{ item.miName }}</text>
										<image src="../../static/arrow.png"></image>
									</view>
								</view> -->
							<!-- </view> -->
						</TabList>
					</view>
					
				</view>
			</view>
		</view>
		
			<!-- <view style="text-align: center;margin-top: 20rpx;"  v-for="(item,index) of newsConfigP1" :key="item.id">
				<TabList :dataSource="item.tabs" :type="item.specMode ? '1' :'2'" @change="item2 => tabChange(item2,index)">
					<view class="list school" v-if="active == 1">
						<view class="item" v-for="item of list" :key="item.id" @click="toDetail(item)">
							<view class="cover-pic">
								<image :src="item.cover"></image>
							</view>
							<view class="name">
								<text>{{ item.miName }}</text>
								<image src="../../static/arrow.png"></image>
							</view>
						</view>
					</view>
					<view class="list school" v-else-if="active == 2">
						<view class="item" v-for="item of list" :key="item.id" @click="toDetail(item)">
							<view class="cover-pic">
								<image :src="item.cover"></image>
							</view>
							<view class="name">
								<text>{{ item.miName }}</text>
								<image src="../../static/arrow.png"></image>
							</view>
						</view>
					</view>
				</TabList>
				
			</view> -->
			<!-- <view class="item" v-for="item of list" :key="item.id" @click="toDetail(item)">
				{{ item.miName }}
			</view> -->
		
	</view>
</template>

<script>
	import api from '@/api/searchSchool/school.js'
	export default{
		data(){
			return {
				list:[],
				active:'1',
				tabs:[
					// { id:1,enabled:require('@/static/p008.png'),disabled:require('@/static/p008-2.png') },
					// { id:2,enabled:require('@/static/p009.png'),disabled:require('@/static/p009-2.png') },
				],
				newsConfigP1:[{
					title:'院系专业',
					subTitle:'OUR FACULTIES',
					tabs:[
						{ id:1,name:'升学班',type:'major_list_mult' },
						{ id:2,name:'三年制',type:'major_list_mult' },
						{ id:3,name:'3+2分段制',type:'major_list_mult' },
					]
				}],
			}
		},
		onLoad({ active }){
			this.active = active
			console.log(this.active,'this.active')
			// 1,2,3   3年 3+2 升学班
			if(active == 1) this.handleSearchMajor(3)
			if(active == 2) this.handleSearchMajor(1)
			if(active == 3) this.handleSearchMajor(2)
		},
		
		methods:{
			tabChange(item,configIndex){
				console.log(item.id,'itemid')
				if(item.id==1)this.active=3 
				if(item.id==2)this.active=1  
				if(item.id==3)this.active=2  
				this.handleSearchMajor(this.active)
				// if(configIndex==0) this.active=1 
				// if(configIndex==1) this.active=2 
				// console.log(this.active,'this.active')
				// this.handleSearchMajor(this.active)
			},
			handleSearch(){
				
			},
			handleSearchMajor(regType){
				uni.showLoading()
				let { tenantId } = this
				return api.getSchoolMajorList({ tenantId,regType }).then(res => {
					this.list = res.result
				}).finally(()=>{
					uni.hideLoading()
				})
			},
			handleSearchSchool(){
				uni.showLoading()
				let { tenantId } = this
				return api.getSchoolList({ tenantId }).then(res => {
					this.list = res.result
				}).finally(()=>{
					uni.hideLoading()
				})
			},
			toDetail(item){
				uni.setStorageSync('majorDetail',JSON.stringify(item))
				console.log(JSON.stringify(item),'JSON.stringify(item)')
				uni.navigateTo({ url:'/pages_common/major/detail' })
			},
			toSchoolDetail(item){
				uni.navigateTo({ url:`/pages_common/major/index?colleagueId=${ item.id }` })
			},
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.page{
		min-height:100vh;
		// background: #86C3FF;
		// position: relative;
		// z-index: -2;
		.box{
			// &:before,&:after{
			// 	content:'';
			// 	display:table;
			// 	height:1px;
			// }
			background:#FFF;
			width:100%;
			&>.title{
				text-align:center;
				line-height:1;
				margin-bottom:36rpx;
				view:first-child{
					font-size:36rpx;
					color:#000;
					font-weight:bold;
				}
				view:last-child{
					font-size:22rpx;
					color:#666;
					margin-top:12rpx;
				}
			}
			&.major{
				margin:0 40rpx;
				margin-top:70rpx;
				.title{
					width:calc(100% - 80rpx);
				}
				.list{
					display:flex;
					flex-flow:row wrap;
					justify-content: space-between;
					align-items:center;
					width:calc(100% - 80rpx);
					.item{
						width:calc(50% - 8rpx);
						height:160rpx;
						&:not(:first-child):not(:nth-child(2)){
							margin-top:16rpx;
						}
						image{
							width:100%;
							height:100%;
						}
					}
				}
			}
			&.summary{
				margin-top:60rpx;
				.base-info{
					@include radius();
					background:#F2F2F2;
					position:relative;
					padding:28rpx;
					margin:26rpx 40rpx 0 40rpx;
					.row{
						@include space(36rpx,'top');
						@include flex(row,start,center);
						.col{
							min-width:50%;
							font-size:28rpx;
							.label{
								color:#8A8A8A;
							}
							.value{
								color:#000;
								font-weight:bold;
							}
						}
					}
				}
				.detail-button{
					@include radius(32rpx);
					position:absolute;
					right:28rpx;
					bottom:28rpx;
					color:#FFF;
					background:#5175F4;
					// #6B68F8
					font-size:28rpx;
					padding:12rpx 22rpx;
				}
			}
			&.news{
				// &:after{
				// 	content:'';
				// 	display:table;
				// 	height:1px;
				// 	width:100%;
				// 	background:#FFF;
				// }
				.bg{
					&:before{
						content:'';
						display:table;
						height:1px;
					}
					// &:after{
					// 	content:'';
					// 	display:table;
					// 	height:1px;
					// 	width:100%;
					// 	background:#FFF;
					// }
					&.noBottom{
						padding-bottom:0;
					}
					padding-bottom:50rpx;
					.news-block{
						&:first-child{
							
							// margin-top:76rpx;
						}
						position:relative;
						overflow:hidden;
						
						&.bg2{
							margin-top:0;
							padding-top:76rpx;
							background:#F2F2F2;
						}
						@include space(76rpx,'top');
						.title{
							text-align:center;
							line-height:1;
							margin-bottom:36rpx;
							view:first-child{
								font-size:36rpx;
								color:#000;
								font-weight:bold;
							}
							view:last-child{
								font-size:22rpx;
								color:#666;
								margin-top:12rpx;
							}
							position:relative;
							z-index:100;
						}
						.content{
							margin:40rpx;
							margin-bottom:0;
							padding-bottom:40rpx;
							position:relative;
							z-index:100;
							.news-list{
								// background:#F2F2F2;
								.news-item{
									@include divider(2rpx solid #E3E3E3,'top');
								}
							}
							.img-list{
								display:flex;
								flex-flow:row wrap;
								justify-content: space-between;
								align-items:center;
								.img-item{
									width:calc(50% - 4rpx);
									height:208rpx;
									&:not(:first-child):not(:nth-child(2)){
										margin-top:8rpx;
									}
									image{
										@include radius(20rpx);
										width:100%;
										height:100%;
									}
								}
							}
							.video-list{
								display:flex;
								flex-flow:row wrap;
								justify-content: space-between;
								align-items:center;
								background:#F2F2F2;
								.video-item{
									width:calc(50% - 4rpx);
									height:208rpx;
									&:not(:first-child):not(:nth-child(2)){
										margin-top:8rpx;
									}
									video{
										@include radius(20rpx);
										width:100%;
										height:100%;
									}
									image{
										@include radius(20rpx);
										width:100%;
										
										height:100%;
									}
								}
							}
						}
					}
				}
				
			}
		}
		.tabs{
			@include flex(row,center,center);
			margin-top:54rpx;
			.tab{
				@include space(14rpx,'left');
				&>image{
					width:324rpx;
					height:73rpx;
				}
			}
		}
		.list{
			display:flex;
			flex-flow:row wrap;
			justify-content: space-between;
			align-items:stretch;
			// padding:0rpx 40rpx 40rpx 40rpx;
			box-sizing:border-box;
			// background:#86C3FF;
			&.school{
				.item{
					width:calc(50% - 10rpx);
					@include radius(14rpx,'top');
					&:not(:first-child):not(:nth-child(2)){
						margin-top:20rpx;
					}
					
					.cover-pic{
						width:100%;
						height:200rpx;
						image{
							@include radius(14rpx,'top');
							width:100%;
							height:100%;
						}
					}
					.name{
						@include radius(14rpx,'bottom');
						@include flex(row,between,center);
						padding:26rpx 24rpx;
						background:linear-gradient(0deg,#DDD,#F9F9F9);
						text{
							white-space:nowrap;
							text-overflow:ellipsis;
							overflow:hidden;
							font-size:34rpx;
						}
						image{
							width:24rpx;
							height:12rpx;
							vertical-align: bottom;
							transform-origin:center;
							transform:rotate(270deg);
						}
					}
					
				}
			}
			&.major{
				padding:0 52rpx;
				.item{
					width:calc(50% - 24rpx);
					white-space:nowrap;
					text-overflow:ellipsis;
					overflow:hidden;
					&:not(:first-child):not(:nth-child(2)){
						margin-top:50rpx;
					}
				}
			}
			
		}
	}
	
</style>
