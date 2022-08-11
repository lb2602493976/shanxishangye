<template>
	<view class="container">
		<rich-text :nodes="detail.prizeSet"></rich-text>
		<Home></Home>

	</view>
</template>

<script>
	import api from "@/api/searchSchool/school.js"
	export default{
		data(){
			return{
				detail:{gg:'<p>dasdasdasdsa</p>'}
			}
		},
		created() {
			this.handleSearch()
		},
		methods:{
			handleSearch(){
				uni.showLoading()
				api.getEventHome({tenantId:this.tenantId}).then(res=>{
					this.detail=res.result.activity
					
					console.log(this.detail,'ressssss')
				}).finally(()=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.container{
		overflow: hidden;
		min-height: 90vh;
		// background-color: #D5DDFF;
	    padding: 40rpx;
	
	}
</style>