<template>
	<view class="container">
		<!-- <view class="tabs">
			<view v-for="(item,index) in tabs" :class="{'active':active==index}" @click="ichange(index)">
				{{item.name}}
			</view>
		</view>
				 --><!-- <long-tabs 
			:list="list"
			v-model="active"
			activeTextColor="#036cd8"
			activeColor ="#036cd8"
			@change="ichange"
		>
		</long-tabs> -->
		<view style="background:#FFF;padding:70rpx 0 54rpx 0;margin:0 30rpx;">
			<scroll-view :scroll-y="true"  class="main-container" v-if="active == 1">
				<ld-select :list="provinceList" label-key="label" value-key="value" placeholder="请选择省份" clearable
					v-model="province" @change="selectChangeprovince"></ld-select>
				<ld-select :list="yearsList" label-key="label" value-key="value" placeholder="请选择年份" clearable v-model="year"
					@change="selectChangeyear"></ld-select>
				<!-- <ld-select class="ld-select" :list="classsList" label-key="label" value-key="value" placeholder="请选择科类"
					clearable v-model="classs" @change="selectChangeClasss"></ld-select> -->
				
			
				<button type="primary" class="search" @click="searchScore">查询</button>
			</scroll-view>
			<!-- 1 -->
			<scroll-view :scroll-y="true" class="schoolNews" v-if="active == 0">
				<view class="tips">请选择以下信息</view>
				<view class="uni-list">
					<!-- 标记 -->
					<ld-select class="ld-select" :list="yearsList" label-key="label" value-key="value" placeholder="请选择年份"
						clearable v-model="years" @change="selectChangeYears"></ld-select>
					<ld-select class="ld-select" :list="provinceList" label-key="label" value-key="value" placeholder="请选择省份"
						clearable v-model="province" @change="selectChangeProvince"></ld-select>
					<ld-select class="ld-select" :list="batchList" label-key="label" value-key="value" placeholder="请选择批次"
						clearable v-model="batch" @change="selectChangeBatch"></ld-select>
						<!-- <ld-select class="ld-select" :list="sortList" label-key="label" value-key="value" placeholder="请选择招生类别"
							clearable v-model="sort" @change="selectChangeSort"></ld-select> -->
					<!-- <ld-select class="ld-select" :list="classsList" label-key="label" value-key="value" placeholder="请选择科类"
						clearable v-model="classs" @change="selectChangeClasss"></ld-select> -->
					<!-- <ld-select class="ld-select" :list="departmentList" label-key="label" value-key="value" placeholder="请选择院系"
						clearable v-model="department" @change="selectChangeDepartment"></ld-select> -->
					
					<view class="uni-btn-v">
						<button form-type="submit" @click="searchPeople">查询</button>
					</view>
					<view style="margin-top: 40upx;" v-for="(item,index) in dataArray" v-if="dataArray.length>0">
					<view style="padding:20upx 20upx;border: 2upx solid #D2D2D2;border-radius: 20upx;" :style="{ background:item.flag ? '#FFF' : '#F2F2F2' }">
						<view style="display: flex;justify-content: space-between;" @click="changeItem(item)">
							<view style="font-weight:bold;color:#2C2C2C;font-size:28rpx;width:40%;">{{item.majorName}}</view>
							<view style="font-weight:bold;color:#2C2C2C;font-size:28rpx;width:25%;">{{item.disciplineType}}</view>
							<view style="font-weight:bold;color:#2C2C2C;font-size:28rpx;width:35%;">计划人数：{{item.enrolment}}人</view>
							<!-- <image src="../../static/img/arrow-down.png" mode="" style="width: 40upx;height: 40upx;" :class="item.flag ?'classA':'classB'"> -->
							</image>
						</view>
						<view :class="{ top20:item.flag }" style="width:100%;">
							<uni-table stripe emptyText="暂无更多数据" v-if="item.flag" >
								<!-- 表头行 -->
								<uni-tr style="background-color: #D4D4D4;">
									<uni-th width="162rpx" align="center" style="color: #030303;"><text style="font-size:20rpx;">报考代码</text></uni-th>
									<uni-th width="162rpx" align="center" style="color: #030303;"><text style="font-size:20rpx;">录取批次</text></uni-th>
									<uni-th width="162rpx" align="center" style="color: #030303;"><text style="font-size:20rpx;">学制</text></uni-th>
									<uni-th width="162rpx" align="center" style="color: #030303;"><text style="font-size:20rpx;">学费</text></uni-th>
								</uni-tr>
								<!-- 表格数据行 -->
								<!-- <uni-tr v-for="(item,index) in dataList" :key="index"> -->
								<uni-tr>
									<uni-td align="r"><text style="font-size:26rpx;font-weight:bold;color:#2C2C2C;">{{item.majorCode}}</text></uni-td>
									<uni-td align="center"><text style="font-size:26rpx;font-weight:bold;color:#2C2C2C;">{{item.admissionBatch}}</text></uni-td>
									<uni-td align="center"><text style="font-size:26rpx;font-weight:bold;color:#2C2C2C;">{{item.educational}}</text></uni-td>
									<uni-td align="center"><text style="font-size:26rpx;font-weight:bold;color:#2C2C2C;">{{item.tuitionFees}}元/年</text></uni-td>
								</uni-tr>
							</uni-table>
						</view>
						
				</view>	</view>
				</view>
			</scroll-view>
		</view>
		<view style="padding: 0 26upx;margin-top:42rpx" v-if="active == 1">
			<uni-table stripe emptyText="暂无更多数据" style="width: 386rpx!important;">
				<uni-tr style="background-color: #D4D4D4;">
					<uni-th align="center" >批次</uni-th>
					<uni-th align="center" >科类</uni-th>
					<uni-th align="center" >最低分</uni-th>
					<!-- <uni-th align="center" >专业</uni-th> -->
					<uni-th align="center" >录取人数</uni-th>
				</uni-tr>
				
				<uni-tr v-for="(item,index) in dataList" :key="index">
					<uni-td align="center">{{item.batch || ''}}</uni-td>
					<uni-td align="center">{{item.asSubject || ''}}</uni-td>
					<uni-td align="center">{{item.asMajorScore || ''}}</uni-td>
					<!-- <uni-td align="center">{{item.asMajor || ''}}</uni-td> -->
					<uni-td align="center">{{item.enrollment || ''}}</uni-td>
				</uni-tr>
			</uni-table>
		</view>
	</view>
</template>

<script>
	import ldSelect from '@/components/ld-select/ld-select.vue'
	import api from '@/api/searchSchool/school.js'
	export default {
		data() {
			return {
				tabs: [
					{
						id: 1,
						name: '招生计划'
					},
					{
						id: 0,
						name: '历年录取分数'
					},
					
				],
				dataArray:[],
				dataList: [],
				list: [],
				active: 0,
				provinceList:[],
				yearsList:[],
				classsList:[],
				recordSearch:[],
				sortList:[],
				departmentList:[],
				batchList:[],
				province: '',
				years:'',
				year: '',
				classs:'',
				openTab:'',
				sort:'',
				department:'',
				batch:'',

			}
		},
		components: {
			ldSelect
		},
		onLoad() {
			
			this.handleSelect()
		},
		onShow(){
			this.init()
		},
		watch: {
			active(val) {

			}
		},
		methods: {
			handleSelect(){
				let { tenantId } = this
				api.getBatchList({ tenantId }).then(res => {
					this.batchList = res.result.map(item => ({
						value:item,
						label:item,
					}))
				})
				api.getProvinces({tenantId}).then(res => {
					this.provinceList=[]
					return res[1].data.result.map((item,index)=>{
					    this.provinceList.push({value:item,label:item})
					    // this.provinceList.push({value:'0',label:'蛋白质'})
						// console.log(this.provinceList,'provinceList')
					})
					// this.provinceList=res[1].data.result.map((item,index)=>{
					//     let b=[]
					//     b.push({value:item,label:item})
					//     console.log(b)
					// })
					
				})
				api.getYear({tenantId}).then(res => {
					this.yearsList=[]
					return res[1].data.result.map((item,index)=>{
					    this.yearsList.push({value:item,label:item})
					    // this.provinceList.push({value:'0',label:'蛋白质'})
						// console.log(this.yearsList,'yearsList')
					})
				})
				// api.getCategory({tenantId}).then(res => {
				// 	this.classsList=[]
				// 	return res[1].data.result.map((item,index)=>{
				// 	    this.classsList.push({value:item,label:item})
				// 	    // this.provinceList.push({value:'0',label:'蛋白质'})
				// 		// console.log(this.classsList,'classsList')
				// 	})
				// 	// this.classsList=res[1].data.result
				// 	// console.log(res,'classsList')
				// })
				api.getDiscipline({tenantId}).then(res => {
					this.sortList=[]
					return res[1].data.result.map((item,index)=>{
					    this.sortList.push({value:item,label:item})
					    // this.provinceList.push({value:'0',label:'蛋白质'})
						// console.log(this.sortList,'sortList')
					})
					// this.sortList=res[1].data.result
					// console.log(res,'classsList')
				})
				api.getDept({ tenantId }).then(res => {
					this.departmentList=[]
					return res[1].data.result.map((item,index)=>{
					    this.departmentList.push({value:item,label:item})
					    // this.provinceList.push({value:'0',label:'蛋白质'})
						// console.log(this.departmentList,'departmentList')
					})
					// this.departmentList=res[1].data.result
					
					// console.log(res,'departmentList')
				})
				// // 省
				// api.getScoreProvinces({ tenantId }).then(res => {
				// 	this.provinceList=[]
				// 	return res.result.map((item,index)=>{
				// 	    this.provinceList.push({value:item,label:item})
				// 		// console.log(this.provinceList,'year')
				// 	})
				// })
				// // 年
				// api.getScoreYear({ tenantId }).then(res => {
				// 	this.yearsList=[]
				// 	return res.result.map((item,index)=>{
				// 	    this.yearsList.push({value:item,label:item})
				// 	})
				// })
				// //科类
				// api.getScoreStream({ tenantId }).then(res => {
				// 	this.classsList=[]
				// 	return res.result.map((item,index)=>{
				// 	    this.classsList.push({value:item,label:item})
				// 	})
				// })
			},
			formSubmit(e){
				let formData=e.target.value
				console.log(formData,'e.target')
				if(formData.idCard==""){
					this.openTab=0
				}else{
					let { tenantId } = this
					api.findAdmissionNotice({ tenantId,idCard:formData.idCard}).then(res=>{
						if(res.result){
							this.recordSearch=res.result
							console.log(this.recordSearch)
							this.openTab=1
						}else{
							this.openTab=2
						}
						console.log(res.result,'result')
					})
				}
				
			},
			searchScore(){
				if(!this.province) return uni.showToast({ title:'请选择省份',icon:'none' })
				if(!this.year) return uni.showToast({ title:'请选择年份',icon:'none' })
				
				let { tenantId } = this
				api.getScoreSearch({ tenantId,asYear:this.year,asArea:this.province,asSubject:this.classs}).then(res=>{
					this.dataList=res.result
					console.log(res.result,'resss')
				})
			},
			searchPeople(){
				if(!this.province) return uni.showToast({ title:'请选择省份',icon:'none' })
				if(!this.years) return uni.showToast({ title:'请选择年份',icon:'none' })
				
				let { tenantId } = this
				let data = { tenantId }
				if(this.years) data.year = this.years
				if(this.province) data.provinces = this.province
				if(this.classs) data.category = this.classs
				if(this.sort) data.disciplineType = this.sort
				if(this.department) data.dept = this.department
				if(this.batch) data.admissionBatch = this.batch
				// year  provinces   category disciplineType dept
				api.getEnrollmentPlan(data).then(res=>{
					this.dataArray = res[1].data.result.map(item => ({ ...item,flag:false }))
					// this.dataList = res[1].data.result
					// console.log(res[1].data.result,'res')
				})
				// this.province 
				// this.years
				// this.sort 
				// this.classs
				// this.department 
			},
			init() {
				let params = uni.getStorageSync('/pages/recruit/index')
				this.list = [{
						label: '历年分数'
					},
					{
						label: '录取查询'
					},
				]
				if(params){
					params = JSON.parse(params)
					this.active = Number(params.active)
					uni.removeStorageSync('/pages/recruit/index')
				}else{
					this.active = 0
				}
									
				console.log(Number(params.active),'params')
			},
			ichange(value) {
				this.active = value
			},
			selectChangeprovince(val) {
				this.province = val
			},
			selectChangeyear(val) {
				this.year = val
			},
			changeItem(item) {
				// console.log(item,'zhankai')
				item.flag = !item.flag;
			},
			selectChangeProvince(val) {
				// console.log(val)
				this.province = val
			},
			selectChangeYears(val) {
				this.years = val
			},
			selectChangeSort(val) {
				this.sort = val
			},
			selectChangeClasss(val) {
				this.classs = val
			},
			selectChangeDepartment(val) {
				this.department = val
			},
			selectChangeBatch(val){
				this.batch = val
			},
		}
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.top20{
		margin-top:20rpx;
	}
	.container {
		width: 100%;
		height: 100vh;
		// background-color: #F2F2F2;
		padding-top: 40rpx;
		box-sizing: border-box;
		
		.tabs {
			width: 697rpx;
			height: 70rpx;
			margin: 0 auto;
			background:linear-gradient(90deg,#3C98EF,$theme);
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			overflow: hidden;

			view {
				flex: 1;
				border-right: 1rpx solid rgba(255, 255, 255, .21);
				text-align: center;
				
				font-family:Source Han Sans CN;
				font-size: 28rpx;
				font-weight: normal;
				font-stretch: normal;
				line-height: 70rpx;
				letter-spacing: 2rpx;
				color: #ffffff;

				&:last-child {
					border: none
				}
			}

			.active {
				background: #FFF;
				color:#000;
			}
		}
		.main-container{
			// margin-top:48rpx;
			height:calc('100% - 146rpx');
			padding-top:0 !important;
			padding-bottom:0 !important;
		}
		.content {
			padding: 0 4%;
			border-top:1px solid transparent;
			uni-view.uni-form-item.uni-column {
				height: 80upx;
				border: 2upx solid #D1D1D1;
				margin: 20upx 0;
				display: flex;
				align-items: center;
				border-radius: 20upx;
				padding-left: 20upx;
			}

			.uni-btn-v {
				button {
					width:696rpx;
					background:linear-gradient(90deg,#6386FF,#454DE8);
					color: #fff;
					margin:0;
					@include radius(20rpx);
				}

				border-radius: 20px;
			}

			.tip {
				width:696rpx;
				margin-top: 40upx;
				background-color: #EDEDED;
				border-radius: 20upx;
				padding: 20upx;
				box-sizing:border-box;
				.tip-title {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 40upx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #030303;
					margin-bottom: 20upx;
				}

				.tip-text {
					font-size: 28upx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #000000;
					line-height: 50upx;
					opacity: 0.6;
					text-indent: 2em;
				}
			}
		}
	}

	view.long-tabs {
		border-bottom: none !important;
		background: unset !important;
		justify-content: flex-start !important;
		line-height: 80rpx !important;
		padding-bottom: 20rpx !important;
	}

	.long-tabs .tabs-item {
		margin-right: 115rpx;
		background: unset !important;
	}

	.long-tabs .tabs-item .item-label view {
		font-family: MicrosoftYaHei;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 38rpx;
		letter-spacing: 1rpx;
		color: #000000;
	}

	.long-tabs .active .item-label {
		padding: 16rpx 0rpx !important;
		border-bottom: 10rpx solid #036cd8 !important;
	}

	.long-tabs .tabs-item .item-label {
		padding: 16rpx 0rpx !important;
	}

	.long-tabs .active .item-label view {
		font-family: MicrosoftYaHei;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 38rpx;
		letter-spacing: 1rpx;
		color: #036cd8;
	}

	.main {
		padding: 10rpx 27rpx !important;
	}

	.input {
		background: #fff !important;
	}

	button.search {
		height: 100rpx;
		background:linear-gradient(90deg,#3C98EF,$theme);
		background-blend-mode: normal,
			normal;
		border-radius: 13rpx;
		margin: 34rpx 26rpx 0 26rpx;
		font-family: MicrosoftYaHei;
		font-size: 31rpx;
		line-height: 100rpx;
		letter-spacing: -40rpx;
		color: #ffffff;
	}
	.uni-table-tr {
		
		color: #000;
	}
	.uni-table{
		min-width: unset!important;
		width: 386rpx;
	}
	.uni-table-tr:nth-child(1){
		background: #D4D4D4 !important;
	}
	.uni-table-tr:nth-child(odd){
		background: #F2F1F2;
	}
	.uni-table-th{
		color: #000 !important;
	}
	.uni-input{
		width: 631rpx;
		height: 60rpx;
		background-color: #ffffff;
		border-radius: 13rpx;
		border: solid 3rpx #d1d1d1;
		margin-bottom: 15rpx;
		padding: 10rpx 20rpx;
	}
	.uni-input:first-child{
		margin-top: 20rpx;
	}
	.select-dialog{
		min-height:35vh;
	}
	.schoolNews {
		width: 694rpx;
		height:calc('100% - 144rpx');
		margin: 0 auto;
		.tips{
			font-size:28rpx;
			margin:0 40rpx 50rpx 40rpx;
		}
		.schoolNew {
	
			height: 178rpx;
			background-color: #ffffff;
			border-radius: 13rpx;
			border: solid 1rpx #e3e3e3;
			margin-bottom: 10rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 23rpx;
			box-sizing: border-box;
	
			image {
				width: 122rpx;
				height: 122rpx;
				margin-right: 45rpx;
			}
	
			.newsInfo {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
	
				.title {
					width: 476rpx;
					font-family: MicrosoftYaHei;
					font-size: 32rpx;
					line-height: 35rpx;
					color: #000000;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				
				.time {
					font-size: 24upx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #A3A3A3;
				}
			}
		}
	
		.uni-list {
	
			//按钮
			.uni-btn-v {
				margin:48rpx 26rpx 0 26rpx;
				button {
					// background:linear-gradient(270deg,$theme,$theme2);
					background:linear-gradient(360deg,#6386FF,#454DE8);
					height:100rpx;
					@include radius(20rpx);
					line-height:100rpx;
					color: #FFFFFF;
					letter-spacing: 40rpx;
				}
			}
	
	
	
			.ld-select {
				// border-radius: 20upx;
				// border: 4upx solid #D1D1D1;
				@include radius(20rpx);
				margin-bottom: 20upx;
				// background-color: #FFFFFF;
			}
	
	
			.uni-list-cell {
				border-radius: 20upx;
				border: 4upx solid #D1D1D1;
				margin-bottom: 20upx;
				background-color: #FFFFFF;
				display: flex;
	
				.uni-list-cell-left {
					display: flex;
					align-items: center;
					width: 20%;
					padding: 42upx 0 42upx 42upx;
	
					font-size: 28upx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #000000;
				}
	
				.uni-list-cell-db {
					display: flex;
					align-items: center;
				}
			}
		}
		
		.classA {
				transform:rotate(180deg);	
		}
		.classB {
			transform:rotate(0deg);	
		}
	}
</style>
