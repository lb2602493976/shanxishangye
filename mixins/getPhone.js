import WXBizDataCrypt from '@/utils/WXBizDataCrypt/index.js'
import glbData from '@/config/glbData.js'
import { updateUserInfo,getUserInfo } from '@/api/user.js'
import { getAccessToken } from '@/api/app.js'
export default{
	methods:{
		_getPhoneNumber(res,options={}){
			if(this.hasPhone) return options.success && options.success()
			if(res.detail.errMsg !== 'getPhoneNumber:ok') return options.fail && options.fail()
			let app = getApp()
			if(app.globalData.user && app.globalData.user.phone) return options.success && options.success()
			uni.showLoading()
			console.log('start')
			uni.login({
				provider: 'weixin',
				success(loginRes){
					console.log('login success')
					getAccessToken({
						code:loginRes.code,
						appid:glbData.APP_ID,
						wxSecret:glbData.SECRET_KEY,
					}).then(res2 => {
						console.log('session_key success')
						let session_key = res2.result
						if(res.detail.errMsg === 'getPhoneNumber:ok'){
							console.log('getPhoneNumber success')
							try{
								let pc = new WXBizDataCrypt(glbData.APP_ID,session_key)
								console.log(glbData.APP_ID,session_key)
								let data = pc.decryptData(res.detail.encryptedData,res.detail.iv)
								let phoneNumber = data.phoneNumber
								// app.globalData.user.phone = phoneNumber
								updateUserInfo({ id:app.globalData.user.id,phone:phoneNumber }).then(res=>{
									if(res.data){
										console.log('updateUserInfo success')
										uni.hideLoading()
										getUserInfo({id:app.globalData.user.id}).finally(()=>{
											console.log('getUserInfo complete')
											options.success && options.success()
										})
									}else{
										console.log('updateUserInfo fail')
										uni.hideLoading()
										options.fail && options.fail()
									}
								}).catch(()=>{
									console.log('updateUserInfo catch fail')
									uni.hideLoading()
									options.fail && options.fail()
								})
							}catch(e){
								console.log('parse fail',e)
								uni.hideLoading()
								options.fail && options.fail()
							}
						}else{
							console.log('getPhoneNumber fail')
							uni.hideLoading()
							options.fail && options.fail()
						}
					}).catch(()=>{
						console.log('session_key fail')
						console.log(e)
						uni.hideLoading()
						options.fail && options.fail()
					})
				},
				fail(){
					console.log('login fail')
					uni.hideLoading()
					options.fail && options.fail()
				},
			})
			
			// return new Promise((resolve,reject)=>{
				
			// })
		},
	},
}