<template>
	<view class="page">
		<!-- <Navbar></Navbar> -->
		<!-- <view style="text-align: center;margin-top: 60upx;">欢迎访问</view> -->
		<Home1></Home1>
		<view class="tableBar" style="margin-top: 50rpx;">
			<image @click="showDrawer" src="../../static/daohang.png"></image>
		</view>
		<view style="position: absolute;top: 120px;left:13px;z-index: 100;color: #FFFFFF;width: 380rpx;border-radius: 30rpx;background-color: #5175F4;opacity: 0.7;padding:10rpx 30rpx;height: 110rpx;">
			<view class="row" >
				<view class="col" style="text-align: start;line-height: 35rpx;position: relative; font-size: 24rpx;">
					<image src="../../static/start.png" style="width: 30rpx;height: 30rpx;position: absolute;left: 10px;top: 2px;" mode=""></image>
					<text class="value" style="position: absolute;left: 40px;top: 0px;">陕西省教育厅直属</text>
				</view>
			</view>
			<view class="row" >
				<view class="col" style="text-align: start;line-height: 35rpx;position: relative;font-size: 24rpx;">
					<image src="../../static/start.png" style="width: 30rpx;height: 30rpx;position: absolute;left: 10px;top: 22px;" mode=""></image>
					<text class="value" style="position: absolute;left: 40px;top: 20px;">国家级重点中等职业学校</text>
				</view>
			</view>
			<view class="row" >
				<view class="col" style="text-align: start;line-height: 35rpx;position: relative;font-size: 24rpx;">
					<image src="../../static/start.png" style="width: 30rpx;height: 30rpx;position: absolute;left: 10px;top: 42px;" mode=""></image>
					<text class="value" style="position: absolute;left: 40px;top: 40px;">省级示范中等职业学校</text>
				</view>
			</view>
			<!-- <view class="row" style="margin-top: 20rpx;text-align: start;">
				<view class="col">
					<text class="label" style="opacity: 0;">学校称号：</text>
					<text class="value" >国家级重点中等职业学校</text>
				</view>
			</view>
			<view class="row" style="margin-top: 20rpx;text-align: start;">
				<view class="col">
					<text class="label" style="opacity: 0;">学校称号：</text>
					<text class="value" >省级示范中等职业学校</text>
				</view>
			</view> -->
		</view>
		<uni-drawer ref="showRight" mode="left" width="300" :mask-click="true">
			<scroll-view style="height: 100%;" scroll-y="true">
				<image @click="closeDrawer" src="../../static/shanchu.png" style="width: 42rpx;height: 42rpx;position: absolute;top:92rpx;right: 48rpx;"></image>
				<!-- <button  type="primary">关闭Drawer</button> -->
				<view style="color: #8BBAFF;font-size: 30rpx;margin: 177rpx 0 0 53rpx;">CONTENTS</view>
				<view style="border-bottom:6rpx solid #8BBAFF;width:400upx;margin:20rpx 0 0 40rpx;"></view>
				<view style="margin: 70rpx 0 0 60rpx;" v-for="(item,index) of tabberList" @click="tabberClick(item)">
					{{item.name}}
				</view>
				<!-- <view style="margin: 70rpx 0 0 60rpx;">专业介绍</view>
				<view style="margin: 70rpx 0 0 60rpx;">校园风采</view>
				<view style="margin: 70rpx 0 0 60rpx;">招生中心</view>
				<view style="margin: 70rpx 0 0 60rpx;">教育教学</view>
				<view style="margin: 70rpx 0 0 60rpx;">升学就业</view>
				<view style="margin: 70rpx 0 0 60rpx;">资助奖励</view>
				<view style="margin: 70rpx 0 0 60rpx;">报名咨询</view> -->
				<!-- <view v-for="item in 60" :key="item">可滚动内容 {{ item }}</view> -->
			</scroll-view>
		</uni-drawer>
		<view class="school-logo">
			<image src="../../static/p001.png"></image>
		</view>
		<!-- <Navbar :title="title" :back="false"></Navbar> -->
		
		<view class="swiper-container">
			<swiper class="swiper" :indicator-dots="true" indicator-active-color="#ffffff" :autoplay="true" :interval="2000" :duration="500" :circular="true">
				<swiper-item v-for="(item,index) in banners" :key="item.id">
					<view class="swiper-item">
						<image :src="item.picUrl" mode="aspectFill" @click="nav(item.picHref)"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="box summary">
			<view class="title">
				<view>学校介绍</view>
				<view style="opacity: 0.5;">ABOUT</view>
			</view>
			<!-- <view class="title">
				<Title title="学校介绍" subTitle="ABOUT" :type='0'></Title>
			</view> -->
			<view class="base-info" @click="nav('/pages_common/summary/index')">
				<view class="row">
					<view class="col" style="min-width: 60%;">
						<text class="label">办学性质：</text>
						<text class="value">公&nbsp;&nbsp;&nbsp;&nbsp;办</text>
					</view>
					<view class="col" >
						<!-- style="text-align: end;" -->
						<text class="label">成立时间：</text>
						<text class="value">1964年</text>
					</view>
				</view>

				<!-- <view class="row">
					<view class="col">
						<text class="label">学校称号：</text>
						<text class="value">陕西省教育厅直属</text>
					</view>
				</view>
				<view class="row">
					<view class="col">
						<text class="label" style="opacity: 0;">学校称号：</text>
						<text class="value">国家级重点中等职业学校</text>
					</view>
				</view>
				<view class="row">
					<view class="col">
						<text class="label" style="opacity: 0;">学校称号：</text>
						<text class="value">省级示范中等职业学校</text>
					</view>
				</view> -->
				
				<view class="row">
					
					<view class="col">
						<text class="label">招生代码：</text>
						<text class="value">001017</text>
					</view>
				</view>
				<view class="row">
					<view class="col" >
						<text class="label">学校类型：</text>
						<text class="value">全日制普通中专院校</text>
					</view>
				</view>
				
				<view class="detail-button">详情</view>
			</view>
		</view>
		<view class="box major">
			<view class="title">
				<view>办学模式</view>
				<view style="opacity: 0.5;">CLASSIFICATION</view>
			</view>
			<!-- 布局 -->
			<view class="list">
				<view class="item"  v-for="item of colleagueNavs" :key="item.ids">
					<image  :src="item.url" @click="toMjorsDetail(item)"></image>
				</view>
			</view>
		</view>
		<!-- 更多专业 -->
		<view style="position: relative;width: 663upx;height: 525upx;">
			<view style="position: absolute;top:120upx;left: 60upx;width: 590upx;">
				<view style="position: relative;display: flex;align-items: center;justify-content: space-between;z-index: 101;padding:20upx  20upx;border-bottom: 2px solid rgba(139, 186, 255, 0.25);width: 100%;margin-top: 10rpx;">
					<view style="width: 40%;white-space:nowrap;font-weight: bolder;"  @click="toMjorsDetail(majorsNavs[0])">{{majorsNavs[0].name}}</view>
					<view style="width: 60%;white-space:nowrap;font-weight: bolder;text-align: end;"  @click="toMjorsDetail(majorsNavs[1])">{{majorsNavs[1].name}}</view>
				</view>
				<view style="position: relative;display: flex;align-items: center;justify-content: space-between;z-index: 101;padding:20upx  20upx;border-bottom: 2px solid rgba(139, 186, 255, 0.25);width: 100%;">
					<view style="width: 40%;white-space:nowrap;font-weight: bolder;"  @click="toMjorsDetail(majorsNavs2[0])">{{majorsNavs2[0].name}}</view>
					<view style="width: 60%;white-space:nowrap;font-weight: bolder;text-align: end;"  @click="toMjorsDetail(majorsNavs2[1])">{{majorsNavs2[1].name}}</view>
				</view>
				<view style="position: relative;display: flex;align-items: center;justify-content: space-between;z-index: 101;padding:20upx  20upx;border-bottom: 2px solid rgba(139, 186, 255, 0.25);width: 100%;">
					<view style="width: 40%;white-space:nowrap;font-weight: bolder;"  @click="toMjorsDetail(majorsNavs1[0])">{{majorsNavs1[0].name}}</view>
					<view style="width: 60%;white-space:nowrap;font-weight: bolder;text-align: end;"  @click="toMjorsDetail(majorsNavs1[1])">{{majorsNavs1[1].name}}</view>
				</view>
				<view style="position: relative;display: flex;align-items: center;justify-content: space-between;z-index: 101;padding:20upx  20upx;border-bottom: 2px solid rgba(139, 186, 255, 0.25);width: 100%;">
					
					<view style="width: 40%;white-space:nowrap;font-weight: bolder;"  @click="toMjorsDetail(majorsNavs3[0])">{{majorsNavs3[0].name}}</view>
					<view style="width: 60%;white-space:nowrap;font-weight: bolder;text-align: end;"  @click="toMjorsDetail(majorsNavs3[1])">{{majorsNavs3[1].name}}</view>
				</view>
				<!-- <view style="position: relative;display: flex;align-items: center;justify-content: space-between;z-index: 101;padding:20upx  20upx;border-bottom: 2px solid rgba(139, 186, 255, 0.25);width: 100%;">
					
				</view> -->
				<!-- <view style="position: relative;display: flex;align-items: center;justify-content: space-between;z-index: 101;padding:20upx  20upx;border-bottom: 2px solid rgba(139, 186, 255, 0.25);width: 100%;">
					
				</view> -->
			</view>
			<view style="width: 670upx;height: 525upx;">
				<image style="position: absolute;top: 50upx;left:41upx; width: 670upx; height: 525upx;z-index: 100;" src="../../static/zhuanyebackground.png"></image>
				<view style="position: absolute;top: 50upx;left:41upx; width: 663upx; height: 80upx;z-index: 100;" @click="uni.navigateTo({url:'/pages_common/major/list?active=1'})">
				</view>
			</view>
		</view>
		<view style="position: relative;">
			<image style="position: absolute;top: 15px;left: 35px;width: 690rpx;height: 760rpx;z-index: 99;" src="https://zhaosheng.kanxiaowang.com:8443/images/c28accc910794e7f9f9a0c9d31d679c51655701911331.png"></image>
			<!-- <image style="position: absolute;top: 15px;left: 29px;width: 700rpx;height: 760rpx;z-index: 99;" src="../../static/zhaoshengbackground.png"></image> -->
		</view>
		<view class="second-box">
			<view class="box news">
				<view class="bg" style="padding-bottom:0;margin-top: -10rpx;">
					<view class="news-block" :class="{ bg2:item.specMode }" v-for="(item,index) of newsConfigP2" :key="item.id">
						
						<view class="title">
							<view style="color: #FFFFFF;">{{ item.title }}</view>
							<view style="color: #FFFFFF;opacity: 0.5;">{{ item.subTitle }}</view>
						</view>
						<view class="content">
							<TabList :dataSource="item.tabs" :showMore="item.showMore" :hideTabs="item.hideTabs" :type="item.specMode ? '1' :'2'" @change="item2 => tabChange(item2,index)" @more="nav(`/pages_common/news/index?group=${item.key}&tabId=${item.tabId}`)">
								<view v-if="item.type === 'news_list2'" class="news-list" @click="nav(`/pages_common/news/index?group=${item.key}&tabId=${item.tabId}`)">
									<view class="news-item" v-for="news of item.list" :key="news.id">
										<NewsItem2 :dataSource="news"></NewsItem2>
									</view>
								</view>
								<view v-if="item.type === 'img_list_mult'" class="img-list">
									<view class="img-item" v-for="(img,index) of item.list" :key="news.id" @click="nav(`/pages_common/news/index?group=${item.key}&tabId=${item.tabId}`)">
										<image :src="img.coverPicture" ></image>
									</view>
								</view>
								<view v-if="item.type === 'video_list'" class="video-list">
									<view class="video-item" v-for="v of item.list" :key="news.id" @click="nav(`/pages_common/news/index?group=${item.key}&tabId=${item.tabId}`)">
										<video :src="v.va_url" object-fit="cover" :controls="true" :show-center-play-btn="true" :poster="v.coverPhoto"></video>
									</view>
								</view>
							</TabList>
						</view>
						
					</view>
				</view>
			</view>
			<view class="recruit-buttons">
				<image v-for="item of navs" :key="item.id" :src="item.img" @click="nav(item.path)"></image>
			</view>
			<image class="bg3" src="../../static/bg2.jpg"></image>
		</view>
		<view class="box news">
			<view class="bg" style="padding-bottom:0;margin-top: -10rpx;">
				<view class="news-block" :class="{ bg2:item.specMode }" v-for="(item,index) of newsConfigP1" :key="item.id">
					
					<view class="title">
						<view>{{ item.title }}</view>
						<view style="opacity: 0.5;">{{ item.subTitle }}</view>
					</view>
					<view class="content">
						<TabList :dataSource="item.tabs" :showMore="item.showMore" :hideTabs="item.hideTabs" :type="item.specMode ? '1' :'2'" @change="item2 => tabChange(item2,index)">
							<view v-if="item.type === 'news_list2'" class="news-list" @click="nav(`/pages_common/news/index?group=${item.key}&tabId=${item.tabId}`)">
								<view class="news-item" v-for="news of item.list" :key="news.id">
									<NewsItem2 :dataSource="news"></NewsItem2>
								</view>
							</view>
							<view v-if="item.type === 'img_list_mult'" class="img-list">
								<view class="img-item" v-for="(img,index) of item.list" :key="news.id" @click="nav(`/pages_common/news/index?group=${item.key}&tabId=${item.tabId}`)">
									<image :src="img.coverPicture" ></image>
								</view>
							</view>
							<view v-if="item.type === 'video_list'" class="video-list">
								<view class="video-item" v-for="v of item.list" :key="news.id" @click="nav(`/pages_common/news/index?group=${item.key}&tabId=${item.tabId}`)">
									<video :src="v.va_url" object-fit="cover" :controls="true" :show-center-play-btn="true" :poster="v.coverPhoto"></video>
								</view>
							</view>
						</TabList>
					</view>
				</view>
			</view>
		</view>
		
		<view class="box news">
			<view class="bg" style="margin-top: -50rpx;">
				<view class="news-block" v-for="(item,index) of newsConfigP3" :key="item.id">
					<view class="title">
						<view>{{ item.title }}</view>
						<view style="opacity: 0.5;">{{ item.subTitle }}</view>
					</view>
					<view class="content">
						<TabList :dataSource="item.tabs" :showMore="item.showMore" :hideTabs="item.hideTabs" type="2" @change="item2 => tabChange(item2,index)">
							<view v-if="item.type === 'news_list2'" class="news-list" @click="nav(`/pages_common/news/index?group=${item.key}&tabId=${item.tabId}`)">
								<view class="news-item" v-for="news of item.list" :key="news.id">
									<NewsItem2 :dataSource="news"></NewsItem2>
								</view>
							</view>
							<view v-if="item.type === 'img_list_mult'" class="img-list">
								<view class="img-item" v-for="(img,index) of item.list" :key="news.id" @click="nav(`/pages_common/news/index?group=${item.key}&tabId=${item.tabId}`)">
									<image :src="img.coverPicture" ></image>
								</view>
							</view>
							<view v-if="item.type === 'video_list'" class="video-list">
								<view class="video-item" v-for="v of item.list" :key="news.id" @click="nav(`/pages_common/news/index?group=${item.key}&tabId=${item.tabId}`)">
									<video :src="v.va_url" object-fit="cover" :controls="true" :show-center-play-btn="true" :poster="v.coverPhoto"></video>
								</view>
							</view>
						</TabList>
					</view>
				</view>
			</view>
		</view>
		<view class="box news">
			<view class="bg">
				<view class="news-block" style="margin-top: 0rpx;" v-for="(item,index) of newsConfigP4" :key="item.id">
					<view class="title">
						<view>{{ item.title }}</view>
						<view style="opacity: 0.5;">{{ item.subTitle }}</view>
					</view>
					<view class="content">
						<!-- :dataSource="item.tabs"  添加显示 -->
						<TabList  :showMore="item.showMore" :hideTabs="item.hideTabs" type="2" @change="item2 => tabChange(item2,index)">
							<view v-if="item.type === 'news_list2'" class="news-list" @click="nav(`/pages_common/news/index?group=${item.key}&tabId=${item.tabId}`)">
								<view class="news-item" v-for="news of item.list" :key="news.id">
									<NewsItem2 :dataSource="news"></NewsItem2>
								</view>
							</view>
							<view v-if="item.type === 'img_list_mult'" class="img-list">
								<view class="img-item" v-for="(img,index) of item.list" :key="news.id" @click="nav(`/pages_common/news/index?group=${item.key}&tabId=${item.tabId}`)">
									<image :src="img.coverPicture" ></image>
								</view>
							</view>
							<view v-if="item.type === 'video_list'" class="video-list">
								<view class="video-item" v-for="v of item.list" :key="news.id" @click="nav(`/pages_common/news/index?group=${item.key}&tabId=${item.tabId}`)">
									<video :src="v.va_url" object-fit="cover" :controls="true" :show-center-play-btn="true" :poster="v.coverPhoto"></video>
								</view>
							</view>
						</TabList>
					</view>
				</view>
			</view>
		</view>
		<!-- 纵向滚动 -->
		<!-- <view class="notice" v-if="noticeList.length" style="background-color: #9bf;position: relative;z-index: 10;">
			<swiper class="swiper-nav" 
			:circular="true" 
			:vertical="false" 
			:autoplay="true" 
			:interval="1000" 
			:duration="1000" 
			style="background-color: pink;height: 100rpx;">
				<swiper-item style="display: table;" 
				@touchmove.stop='stopTouchMove' 
				v-for="(item,index) in noticeList" 
				:key="index">
				<view style="width: 100%;height: 100rpx;display: table-cell;vertical-align: middle;
				" 
				class="right">{{item.messageContent}}</view>					
				</swiper-item>
			</swiper>
		</view> -->
		<!-- 测试22 -->
		<view class="big-title">
			<view>合作学校</view>
			<view style="opacity: 0.5;">COOPERATIVE SCHOOL</view>
		</view>
		<view style="position: relative;z-index: 11;">
			<span @click="moreClick" style="position: absolute;right: 50rpx;top: 15rpx;border-radius: 20rpx;border: 2rpx solid #000;font-size: 26rpx;z-index: 10;padding: 2rpx 20rpx;">更多</span>
		</view>
		
		<view class="notice_bg">
			<!-- <view class="line"></view> -->
			<swiper autoplay="true" display-multiple-items="3" vertical="true" circular interval="2000" class="bar-swiper">
				<swiper-item v-for="(item, index) in bottomImgList" :key="index" class="swiper-item"  @tap="toProgram(item)">
					<!-- <view class="circle"></view> -->
					<image class="icon" :src="item.pic"></image>
					<!-- <view class="item_box">
						{{ item.schName }}
					</view> -->
				</swiper-item>
			</swiper>
		</view>
		
		<view class="bottom">
			<image class="bottom_bg" src="../../static/p005.jpg"></image>
			<!-- <view class="bottom-img">
				<view class="bottom-img-text" v-for="item of bottomImgList" @click="toProgram(item)">
					<image :src="item.pic" mode="" ></image>
					<view class="text">{{item.schName}}</view>
				</view>
			</view> -->
			<view class="info">
				<view class="text" style="font-size: 36upx;line-height: 48upx;">陕西省商业学校</view>
				<view class="text">联系电话：0916-2522797 13809160212</view>
				<!-- <view class="text" style="margin-left: 120rpx;"></view> -->
				<view class="text">地&emsp;&emsp;址：陕西省汉中市汉台区东一环路68号</view>
				<view class="text" style="">陕西省商业学校招生就业办公室 （宣）</view>
			</view>
		</view>
	</view>
</template>

<script>
	import newsConfig,{ tabMaps } from '@/config/news_config.js'
	import { login,getOpenId,getUserInfo,getUserProfile,getWxUserInfo,delUser } from '@/api/user.js'
	import api from '@/api/searchSchool/school.js'
	import addInterceptor from '@/config/interceptor.js'
	export default{
		data(){
			return {
				hasPhone:'',
				title:'',
				list:[],
				bottomImgList:[],
				// noticeImg:'',//左侧图片
				
				tabs:[
					{ id:1,name:'测试1' },
					{ id:2,name:'测试2' },
					{ id:3,name:'测试3' },
				],
				tabberList:[
					{id:1,name:'学校介绍',url:'/pages_common/summary/index'},
					{id:2,name:'专业介绍',url:'/pages_common/major/list?active=1'},
					{id:3,name:'校园风采',url:'/pages_common/news/index?group=tabs1&tabId=7'},
					{id:4,name:'招生中心',url:'/pages_common/news/index?group=tabs2&tabId=2'},
					{id:5,name:'教育教学',url:'/pages_common/news/index?group=tabs3_1&tabId=13'},
					{id:6,name:'升学就业',url:'/pages_common/news/index?group=tabs3&tabId=3'},
					{id:7,name:'资助奖励',url:'/pages_common/news/index?group=tabs4&tabId=8'},
					{id:8,name:'报名咨询',url:'/pages/consulting/index'},
					// {id:9,name:''},
					// {id:10,name:''},
				],
				banners:[],
				colleagueNavs:[
					{ ids:1,url:require('@/static/p018.png'),id:'1518043127399628801',name:'单招升学班'},
					// { ids:2,url:require('@/static/p019.png'),id:'1501377970766397442',name:'平面设计'},
					{ ids:2,url:require('@/static/p020.png'),id:'1518046702179762177',name:'普通中专'},
					{ ids:3,url:require('@/static/p019.png'),id:'1518045766921273346',name:'五年制大专（三二分段）'},
					// { ids:4,url:require('@/static/p021.png'),id:'1501379595555880961',name:'中餐烹饪'},
					// { ids:4,url:require('@/static/p021.png'),id:'1501370003769835522',name:'制冷和空调设备运行与维护'},
				],
				majorsNavs:[
					// { ids:1,id:'1501369424582590466',name:'数字媒体技术'},
					// { ids:2,id:'1501372172107563010',name:'高星级饭店运营与管理'},
					{ ids:1,id:'1501367509396275201',name:'学前教育'},
					{ ids:2,id:'1501368666466336770',name:'计算机应用'},
				],
				majorsNavs1:[
					
					// { ids:4,id:'1501370003769835522',name:'制冷和空调设备运行与维护'},
					// { ids:3,id:'1501371144217870337',name:'安全保卫服务'},
					// { ids:4,id:'1501379595555880961',name:'中餐烹饪'},
					{ ids:5,id:'1517319102738251777',name:'电子技术应用'},
					{ ids:6,id:'1501373365626126337',name:'旅游服务与管理'},
					
				],
				majorsNavs2:[
					// { ids:5,id:'1501368666466336770',name:'计算机应用'},
					{ ids:3,id:'1501371558615105538',name:'会计事务'},
					{ ids:4,id:'1501370003769835522',name:'制冷和空调设备运行与维护'},
					
				],
				majorsNavs3:[
					{ ids:7,id:'1501370653584965634',name:'电子商务' },
					{ ids:8,id:'1517076389430345729',name:'幼儿保育'},
					
				],
				
				navs:[
					{ id:1,img:require('@/static/p025.png'),path:`/pages_common/news/index?group=tabs5&tabId=${ newsConfig.tabs5.tabs[0].id }` },
					{ id:2,img:require('@/static/p026.png'),path:`/pages_me/callschool/index` },
					{ id:3,img:require('@/static/p027.png'),path:`/pages_me/recruit/admission` },
					
				],
				orgNewsConfig:newsConfig,
				newsConfig:[
					{ ...newsConfig.tabs1,key:'tabs1',tabId:newsConfig.tabs1.tabs[0].id,list:[],type:newsConfig.tabs1.tabs[0].type,specMode:false,id:1},
					{ ...newsConfig.tabs2,key:'tabs2',tabId:newsConfig.tabs2.tabs[0].id,list:[],type:newsConfig.tabs2.tabs[0].type,specMode:true ,id:2,showMore:true},
					{ ...newsConfig.tabs3,key:'tabs3',tabId:newsConfig.tabs3.tabs[0].id,list:[],type:newsConfig.tabs3.tabs[0].type,specMode:false,id:3},
					{ ...newsConfig.tabs3_1,key:'tabs3_1',tabId:newsConfig.tabs3_1.tabs[0].id,list:[],type:newsConfig.tabs3_1.tabs[0].type,specMode:false,id:4},
					{ ...newsConfig.tabs4,key:'tabs4',tabId:newsConfig.tabs4.tabs[0].id,list:[],type:newsConfig.tabs4.tabs[0].type,specMode:false,id:5},
				],
				currentTab1:{},
				videoObj:{},
				imgList:[],
			}
		},
		onPageScroll({ scrollTop:top }){
			uni.$emit('pageScroll',top)
			this.$nextTick(()=>{
				if(top>200) this.title = '陕西省商业学校'
				else this.title = ''
			})
			
		},
		onShow(){
			if(getApp().globalData.user){
				this.hasPhone = getApp().globalData.user.phone
			}
		},
		onLoad(){
			this.handleLogin().then(async ()=>{
				await addInterceptor()
				this.init()
				this.handleSearchVideos()
				this.getImage()
				this.handleSearchMajor()
				this.getShipSchool()
			})
		},
		computed:{
			newsConfigP1(){
				return this.newsConfig.slice(0,1)
			},
			newsConfigP2(){
				return this.newsConfig.slice(1,2)
			},
			newsConfigP3(){
				return this.newsConfig.slice(2,4)
			},
			newsConfigP4(){
				return this.newsConfig.slice(4)
			},
		},
		methods:{
			
			handleLogin(){
				return login().then(({ code,provider }) => {
					getOpenId(code).then(res => {
						// return delUser(res.data.result.RecruitStudent.id)
						if(res.data){
							const result = res.data.result
							getApp().globalData.user = result.RecruitStudent
							getApp().globalData.token = result.token
							getApp().globalData.openId = result.openid
							this.hasPhone = getApp().globalData.user.phone
							let user = getApp().globalData.user
							this.showPage = true
							if(user && !user.headPortrait){
								uni.showModal({
								    title: '需要您的授权',
								    content: '获得您的公开信息（昵称，头像等）',
								    success: (res) => {
								        if (res.confirm) {
								            getUserProfile(user.id).then(()=>{
												getUserInfo({ id:user.id }).then(res=>{
													getApp().globalData.user = res.data.result
													this.hasPhone = getApp().globalData.user.phone
													this.city = getApp().globalData.user.city
												})
											})
								        } else if (res.cancel) {
								            console.log('用户点击取消');
								        }
								    },
								});
							}
						}else{
							uni.showToast({
								title:'获取openId失败',
								icon:'none'
							})
						}
					}).catch((e)=>{
						uni.showToast({
							title:'获取openId失败',
							icon:'none'
						})
					})
				}).catch(e => {
					uni.showToast({
						title:e,
						icon:'none'
					})
				})
			},
			showDrawer() {  //导航
				console.log('点击')
				this.$refs.showRight.open();
			},
			closeDrawer() {
				this.$refs.showRight.close();
			},
			tabberClick(item){
				if(item.name=="报名咨询"){
					uni.switchTab({ url:item.url })
				}else{
					uni.navigateTo({ url:item.url })
				}
				
				console.log(item,'item')
			},
			handleSearchMajor(){  //查专业
				uni.showLoading()
				let { tenantId } = this
				return api.getSchoolMajorList({ tenantId }).then(res => {
					this.list = res.result
				}).finally(()=>{
					uni.hideLoading()
				})
			},
			toMjorsDetail(item){  //跳转专业详情
				this.list.filter(items=>{
					if(items.id===item.id){
						uni.setStorageSync('majorDetail',JSON.stringify(items))
						uni.navigateTo({ url:'/pages_common/major/detail' })
					}
				})
			},
			tabChange(item,configIndex){
				//configIndex传进来是错的，规避编译bug 勿动
				configIndex = this.newsConfig.findIndex(configItem => configItem.tabs.some(tab => tab.id == item.id)) 
				let configObj = this.newsConfig[configIndex]
				this.$set(configObj,'type',item.type)
				this.$set(configObj,'tabId',item.id)
				this.handleSearch(item,configIndex)
			},
			handleSearch(item,configIndex){
				if(item.type === 'news_list2'){
					return this.getNews(item,configIndex)
				}
				if(item.type === 'video_list'){
					return this.getVideos(item,configIndex)
				}
				if(item.type === 'img_list_mult'){
					return this.getImages(item,configIndex)
				}
			},
			handleSearchVideos(){
				const { tenantId } = this
				return api.getSchoolVideoList({ tenantId }).then(res=>{
					this['videoObj'] = res.result[0]
				})
			},
			init(){
				uni.showLoading()
				Promise.all([
					this.getBanners(),
					...this.newsConfig.map((item,index) => this.handleSearch(item,index))
				]).finally(()=>{
					uni.hideLoading()
				})
			},
			getBanners(){
				const { tenantId } = this
				return api.getLunBoPic({ tenantId }).then(res=>{
					this.banners = res.result
				})
			},
			getNews(tab,configIndex){
				const { tenantId } = this
				return api.getAllNews({ tenantId,type:tab.tabId || tab.id}).then(res=>{
					this.newsConfig[configIndex].list = res.result.slice(0,3)
				})
			},
			getVideos(tab,configIndex){
				const { tenantId } = this
				return api.getSchoolVideoList({ tenantId }).then(res=>{
					this.$set(this.newsConfig[configIndex],'list',res.result.slice(0,4))
				})
			},
			getImages(tab,configIndex){
				const { tenantId } = this
				return api.getScenary({ tenantId,type:tab.tabId || tab.id}).then(res => {
					this.newsConfig[configIndex].list = res.result[0].coverPicture.split(',').slice(0,6).map((item,index) => ({ id:index+1,coverPicture:item }))
				})
			},
			getImage(){
				const { tenantId } = this
				return api.getScenary({ tenantId,type:newsConfig.tabs1.tabs[0].id}).then(res => {
					this.imgList = res.result[0].coverPicture.split(',').slice(0,6).map((item,index) => ({ id:index+1,coverPicture:item }))
				})
			},
			nav(url,params){
				let switchList = [
					'/pages/index/index',
					'/pages/recruit/index',
					'/pages/consulting/index',
					'/pages/me/index',
				]
				if(switchList.some(item => url.startsWith(item))){
					uni.setStorageSync(url,JSON.stringify(params))
					console.log(params,'params')
					uni.switchTab({url})
				}else{
					uni.navigateTo({ url })
				}
			},
			previewImage(current,list){
				uni.previewImage({
					urls:list,
					current,
				})
			},
			getShipSchool(){
				api.friendShipSchool({tenantId:this.tenantId}).then(res=>{
					console.log(res.result,'res.resultres.resultres.result')
					this.bottomImgList=res.result
					console.log(this.bottomImgList,'res.resultres.resultres.this.bottomImgList')
				})
			},
			toProgram(item){
				if(item.appId && item.appKey){
					uni.navigateToMiniProgram({
					  appId:item.appId,
					  success:(res)=> {
					    // 打开成功
					  },
					  fail:(err)=>{
						  if(err.errMsg!=="navigateToMiniProgram:fail cancel"){
							  uni.showToast({ title:'配置小程序appId错误',icon:'none' })
							  console.log(err,'获取appid失败') 
						  }else{
							  console.log(err,'取消') 
						  }
					  }
					})
				}else{
					return uni.showToast({ title:'没有小程序或不属于此平台',icon:'none' })
				}
			},
			// 点击通告栏
			moreClick(){
				uni.navigateTo({
					url: '/pages_common/sch_logo/index',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.page{
		overflow:hidden;
		// overflow-x:hidden;
		// box-sizing:border-box;
		&::after{
			content:'';
			display:table;
			height:1px;
			width:100%;
			background:#F2F2F2;
		}
	}
	.second-box{
		overflow:hidden;
		position:relative;
		margin-top:80rpx;
		.bg3{
			width:100%;
			height:1200rpx;
			position:absolute;
			// top:0;
			background-image: url('@/static/tongzhi.jpg');
			background-size: 100% 1200rpx;
			// background-image: url('../../static/tongzhi.jpg');
			top: -52rpx;
			left:0;
			z-index:1;
		}
	}
	.recruit-buttons{
		padding:0rpx 40rpx 60rpx 40rpx;
		@include flex(row,between,center);
		// background:#F2F2F2;
		position:relative;
		z-index:100;
		image{
			width:211.6rpx;
			height:115rpx;
		}
	}
	.tableBar{
		position:relative;
		width:60upx;
		height: 52upx;
		// margin-top: 65upx;
		
		// z-index:1000;
		image{            
			position:absolute;
			width:60upx;
			height: 52upx;
			left:70rpx;
			transform:translateX(-50%);
			top:50rpx;
			// width:355rpx;
			// height:75rpx;
		}
	}
	.school-logo{
		
		position:relative;
		// height: 75upx;
		height: 58upx;
		// margin-left: ;
		width: 500upx;
		margin-left: 120upx;
		margin-top: 10rpx;
		// z-index:1000;
		image{            
			position:absolute;
			left:50%;
			transform:translateX(-50%);
			top:-24rpx;
			width:355rpx;
			height:75rpx;
		}
	}
	// 测试22 
	.big-title{
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
	.notice_bg{
		margin: 20rpx 40rpx 60rpx 40rpx;
		// background-color: #FFFFFF;
		background: rgba(217, 236, 255, 1);
		border-radius: 20rpx;
		padding:40rpx 40rpx 20rpx 40rpx;
		height: 700rpx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 10;
		.icon{
			
			// width: 160rpx;
			// height: 120rpx;
			// @include radius(20rpx);
			width: 600rpx;
			height: 200rpx;
			@include radius(20rpx);
		}
		.line{
			margin: 0 16rpx 0 20rpx;
			background-color: #F4F4F4;
			width: 2rpx;
			height: 68rpx;
		}
		.bar-swiper{
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(34, 34, 34, 0.5);
			height: 650rpx;
			display: flex;
			align-items: center;
			flex: 1;
			margin-left: 12rpx;
		}
		.swiper-item {
			display: flex;
			align-items: center;
			overflow: hidden;
			border-bottom: 2rpx solid #E3E3E3;
		}
		.circle{
			min-width: 10rpx;
			width: 10rpx;
			height: 10rpx;
			border-radius: 50%;
			background-color: rgba(34, 34, 34, 0.5);
			margin-right: 10rpx;
		}
		.item_box{
			width: calc( 100% - 160rpx);
			margin-left: 20rpx;
			word-break: break-all;  /* break-all(允许在单词内换行。) */
			text-overflow: ellipsis;  /* 超出部分省略号 */
			display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
			-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
			// -webkit-line-clamp: 1; /** 显示的行数 **/
		}
	}
	.bottom{
		width:100%;
		height:280rpx;
		// height: 650rpx;
		// height: 800rpx;
		position:relative;
		image.bottom_bg{
			width: 100%;
			height: 790rpx;
			// height: 1100rpx;
			position: absolute;
			top: -250px;
			left: 0;
		}
		.bottom-img{
			position: relative;
			z-index:10;
			width: 100%;
			// height: 300rpx;
			display: grid;
			// grid-template-columns: 30% 30% 30%;
			grid-template-columns: 23% 23% 23% 23%;
			grid-template-rows: 50% 50% ;
			// grid-template-rows: 30% 30% 30%;
			margin-bottom: 20rpx;
			gap:20rpx;
			.bottom-img-text{
				text-align: center;
				view{
					color: #FFFFFF;
					font-size: 22rpx;
				}
				image{
					@include radius(20rpx);
					width: 100rpx;
					height: 100rpx;
				}
			}
		}
		// @include flex(column,center,center);
		.info{
			position: relative;
			z-index:10;
			padding:0 44rpx;
			// margin-top: 200rpx;
			.text{
				font-size:24rpx;
				color:#FFF;
				@include space(38rpx,'top');
			}
		}
	}
	.swiper-container{
		
		position:relative;
		z-index:10;
		top:20rpx;
		.swiper{
			background:#FFF;
			overflow:hidden;
			// height:920rpx;
			height:440rpx;
			width:750rpx;
			.swiper-item{
				width:100%;
				height:100%;
				image{
					width:100%;
					height:100%;
				}
			}
		}
	}
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
			margin:0 30rpx;
			margin-top:70rpx;
			.title{
				width:calc(100% - 60rpx);
			}
			// 上2下2
			// .list{  
			// 	display:flex;
			// 	flex-flow:row wrap;
			// 	justify-content: space-between;
			// 	align-items:center;
			// 	width:calc(100% - 80rpx);
			// 	.item{
			// 		width:calc(50% - 8rpx);
			// 		height:160rpx;
			// 		&:not(:first-child):not(:nth-child(2)){
			// 			margin-top:16rpx;
			// 		}
			// 		image{
			// 			width:100%;
			// 			height:100%;
			// 		}
			// 	}
			// }
			// 上面三个图片下面一个长的
			// .list{
			// 	display: grid;
			// 	grid-template-rows:  240rpx 200rpx;
			// 	grid-template-columns: 30% 30% 30% ;
			// 	gap:10rpx;
			// 	.item{
			// 		width: calc(100%);
			// 		height:240rpx;
			// 		image{
			// 			width:100%;
			// 			height:100%;
			// 		}
			// 	}
			// 	.item:last-child{
			// 		width: calc( 300% + 20rpx);
			// 		height:200rpx;
			// 		image{
			// 			width:100%;
			// 			height:100%;
			// 		}
			// 	}
			// }
			//布局  左2右1
			.list{
				display: grid;
				grid-template-rows:  200rpx 200rpx;
				grid-template-columns: 60%  30% ;
				gap:10rpx;
				.item{
					width: calc(100%);
					height:200rpx;
					image{
						width:100%;
						height:100%;
					}
				}
				.item:nth-child(2){
					width: calc( 100% );
					height:410rpx;
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
				margin:-10rpx 40rpx -35rpx 40rpx;
				.row{
					@include space(16rpx,'top');
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
				padding-bottom:10rpx;
				.news-block{
					&:first-child{
						margin-top:60rpx;
					}
					position:relative;
					overflow:hidden;
					
					&.bg2{
						margin-top:0;
						padding-top:76rpx;
						background:#F2F2F2;
					}
					@include space(17rpx,'top');
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
						margin: 40rpx 40rpx 0rpx 40rpx;
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
</style>