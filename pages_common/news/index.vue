<template>
	<view style="padding:30rpx 40rpx;">
		<TabList type="2" :dataSource="tabs" :titleShow="false" :defaultActive="tabId" @change="tabChange" :noPadding="['img_list_mult','video_list'].includes(currentTab.type)">
			<image v-if="currentTab.bg" :src="currentTab.bg" class="bg" mode="aspectFit"></image>
			<template v-if="currentTab.type === 'news_list'">
				<view class="news-list" >
					<view v-for="item of list" @click="toNewsDetail(item)" :key="item.id" class="news-item">
						<NewsItem :dataSource="item"></NewsItem>
					</view>
					<End style="width:100%;"></End>
				</view>
			</template>
			<template v-else-if="currentTab.type === 'news_list2'">
				<view class="news-list" >
					<view v-for="item of list" @click="toNewsDetail(item)" :key="item.id" class="news-item">
						<NewsItem2 :dataSource="item"></NewsItem2>
					</view>
					<End style="width:100%;"></End>
				</view>
			</template>
			<template v-else-if="['content','about','history'].includes(currentTab.type)">
				<view class="content">
					<rich-text :nodes="content"></rich-text>
				</view>
			</template>
			<template v-else-if="['img_list_mult','img_list','honor'].includes(currentTab.type)">
				<view class="img-list">
					<template v-if="['honor'].includes(currentTab.type)">
						<view v-for="(item,index) of list" :key="item.id" class="img-item">
							<ImgItem @titleClick="imgTitleClick(index)" :dataSource="item"></ImgItem>
						</view>
					</template>
					<template v-else-if="['img_list'].includes(currentTab.type)">
						<view v-for="(item,index) of list" :key="item.id" class="img-item" style="width:calc(50% - 8rpx);">
							<ImgItem2  @titleClick="imgTitleClick(index)" :dataSource="item"></ImgItem2>
						</view>
					</template>
					<template v-if="currentTab.type === 'img_list_mult'">
						<view v-for="item of list" :key="item.id" class="img-item" style="width:calc(50% - 8rpx);" @click="toImgDetail(item)">
							<ImgItem2  :dataSource="item"></ImgItem2>
						</view>
					</template>
					<End style="width:100%;"></End>
				</view>
				
			</template>
			<template v-else-if="currentTab.type === 'leader'">
				<view class="leader-list">
					<view v-for="item of list" :key="item.id" class="leader-item">
						<LeaderItem :dataSource="item"></LeaderItem>
					</view>
				</view>
			</template>
			<template v-else-if="currentTab.type === 'video_list'">
				<view class="video-list">
					<view v-for="item of list" :key="item.id" class="video-item">
						<VideoItem2 :ref="`video${item.id}`" @play="handleVideoPlay" :dataSource="item"></VideoItem2>
					</view>
					<End></End>
				</view>
			</template>
			<!-- <End></End> -->
		</TabList>
	</view>
</template>

<script>
	import newsConfig from '@/config/news_config.js'
	import api from '@/api/searchSchool/school.js'
	export default{
		data(){
			return {
				newsConfig,
				//变更需要初始化的参数
				tabs:[],
				group:'',
				tabId:-1,
				currentTab:{},
				list:[],
				content:''
			}
		},
		onLoad({ group,tabId }){ 
			this.group = group
			this.tabId = tabId
			console.log(group,tabId)
			this.init()
		},
		methods:{
			init(){
				let obj = this.newsConfig[this.group]
				uni.setNavigationBarTitle({
					title:obj.title
				})
				this.tabs = obj.tabs
				this.currentTab = this.tabs.find(item => item.id == this.tabId)
				this.handleSearch()
			},
			tabChange(obj){
				this.currentTab = obj
				this.tabId = obj.id
				this.handleSearch()
			},
			handleVideoPlay(e){
				let id = e.target.id
				this.list.forEach( item => {
					if(item.id != id){
						item.vCtx.pause()
					}
				})
			},
			handleSearch(){
				uni.showLoading()
				if(['img_list_mult','img_list'].includes(this.currentTab.type)){
					this.handleSearchImgs(this.currentTab.type,this.currentTab.id).finally(()=>{
						uni.hideLoading()
					})
				}
				if(['news_list','news_list2'].includes(this.currentTab.type)){
					this.handleSearchNews(this.currentTab.id).finally(()=>{
						uni.hideLoading()
					})
				}
				if(this.currentTab.type === 'video_list'){
					this.handleSearchVideos().finally(()=>{
						uni.hideLoading()
					})
				}
				if(this.currentTab.type === 'leader'){
					this.handleSearchLeaders().finally(()=>{
						uni.hideLoading()
					})
				}
				if(this.currentTab.type === 'content'){
					this.handleSearchNewsDetail(this.currentTab.detailId).finally(()=>{
						uni.hideLoading()
					})
				}
				if(this.currentTab.type === 'honor'){
					this.handleSearchHonor().finally(()=>{
						uni.hideLoading()
					})
				}
				if(this.currentTab.type === 'history'){
					this.handleSearchHistory().finally(()=>{
						uni.hideLoading()
					})
				}
				if(this.currentTab.type === 'about'){
					this.handleSearchAbout().finally(()=>{
						uni.hideLoading()
					})
				}
				
			},
			handleSearchNews(id){
				const { tenantId } = this
				return api.getAllNews({ tenantId,type:id }).then(res=>{
					this['list'] = res.result
					// this.list = Array.from({ length:10 }).flatMap(()=>res.result)
				})
			},
			handleSearchVideos(){
				const { tenantId } = this
				return api.getSchoolVideoList({ tenantId }).then(res=>{
					this['list'] = res.result
					this.$nextTick(()=>{
						this['list'].forEach(item => {
							item.vCtx = uni.createVideoContext(item.id,this.$refs[`video${item.id}`][0])
						})
					})
				})
			},
			handleSearchLeaders(){
				const { tenantId } = this
				return api.getSchoolTeacherList({ tenantId }).then(res=>{
					this['list'] = res.result
				})
			},
			handleSearchImgs(type,id){
				const { tenantId } = this
				if(type === 'img_list'){
					return api.getScenary({ tenantId,type:id }).then(res => {
						this.list = res.result[0].twoList
					})
				}
				if(type === 'img_list_mult'){
					return api.getScenary({ tenantId,type:id }).then(res => {
						this.list = res.result[0].twoList
						// this.list = Array.from({ length:4 }).flatMap(()=>res.result[0].twoList)
					})
				}
			},
			handleSearchNewsDetail(id){
				return api.getNewsDetail({ id }).then(res=>{
					this.content = res.result.content
				})
			},
			handleSearchHonor(){
				const { tenantId } = this
				return api.getHonor({ tenantId }).then(res=>{
					this.list = res.result
				})
			},
			handleSearchHistory(){
				const { tenantId } = this
				return api.getHistory({ tenantId }).then(res=>{
					this.content = res.result[0].content
				})
			},
			handleSearchAbout(){
				const { tenantId } = this
				return api.getAbout({ tenantId }).then(res=>{
					this.content = res.result[0].siContent
				})
				
			},
			toNewsDetail(item){
				uni.navigateTo({
					url:`/pages_common/news/detail?group=${this.group}&tabId=${this.tabId}&id=${item.id}`
				})
			},
			toImgDetail(item){
				uni.setStorageSync('imgUrls',JSON.stringify(item.threeList.map(item => item.picture)))
				uni.navigateTo({
					url:`/pages_common/news/img_list?title=${ item.tagName }`
				})
			},
			imgTitleClick(index){
				let obj = this.list[index]
				this.$set(this.list[index],'_expand',!obj._expand)
			},
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.tab-container{
		position:fixed;
		top:0;
		left:0;
		width:750rpx;
		z-index:100,
	}
	.bg{
		width:750rpx;
		height:260rpx;
		margin-top:96rpx;
	}
	
	.news-list,.img-list,.content,.leader-list,.video-list{
		position:relative;
		z-index:10;
	}
	.news-list{
		max-height:calc(100vh - 280rpx);
		overflow-y: auto;
		// margin:0 40rpx 40rpx 40rpx;
		.news-item{
			@include divider(2rpx solid #E3E3E3,top);
		}
	}
	.content{
		
	}
	.img-list{
		width:100%;
		display:flex;
		flex-flow:row wrap;
		justify-content:space-between;
		align-items:start;
		max-height:calc(100vh - 280rpx);
		overflow-y: auto;
		// margin:150rpx 28rpx 40rpx 28rpx;
		.img-item{
			width:calc(50% - 2rpx);
			&:not(:first-child,:nth-child(2)){
				margin-top:38rpx;
			}
		}
	}
	.video-list{
		display:flex;
		flex-flow:row wrap;
		justify-content: center;
		align-items:center;
		max-height:calc(100vh - 280rpx);
		overflow-y: auto;
		.video-item{
			width:calc(100% - 24rpx);
			margin:0 12rpx;
		}
		.video-item:first-child{
			margin-top:30rpx;
		}
		.video-item:not(:first-child){
			margin-top:34rpx;
		}
	}
	.leader-list{
		margin:150rpx 40rpx 40rpx 40rpx;
		.leader-item{
			@include space(22rpx,top);
		}
	}
	
</style>
