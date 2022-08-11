import glb from '@/config/glbData.js'

export const getOpenId = jsCode => {
	return uni.request({ url:`${ glb.BASE_API }/manage/recruitStudent/getOpenid`,data:{ jsCode,appId:glb.APP_ID },notoken:true,method:'POST' }).then(res => res[1])
}

export const updateUserInfo = data => {
	data.status = '2'
	return uni.request({ url:`${ glb.BASE_API }/manage/recruitStudent/upUser`,data,method:'POST' }).then(res => res[1])
}

export const getUserInfo = data => {
	return uni.request({ url:`${ glb.BASE_API }/manage/recruitStudent/queryById`,data,method:'get' }).then(res => res[1]).then(res => {
		getApp().globalData.user = res.data.result.RecruitStudent
		getApp().globalData.school = res.data.result.name
		return res
	})
}
//删除用户信息（调试用）
export const delUser = id => {
	return uni.request({ url:`${ glb.BASE_API }/manage/recruitStudent/delete?id=${ id }`,method:'DELETE' }).then(res => res[1])
}

//获取微信用户信息
export const getUserProfile = id => {
	return new Promise(async (resolve,reject)=>{
		let app=getApp();
		uni.getUserProfile({ 
			desc: "获取你的昵称、头像、地区及性别",
			success:wxUserInfo => {
				console.log(wxUserInfo)
				updateUserInfo({ 
					id,
					gender:wxUserInfo.userInfo.gender,
					headPortrait:wxUserInfo.userInfo.avatarUrl,
					userName:wxUserInfo.userInfo.nickName,
					region:wxUserInfo.userInfo.country + wxUserInfo.userInfo.province + wxUserInfo.userInfo.city,
				}).then(res => {
					if(res.data){
						app.globalData.wxUserInfo = wxUserInfo.userInfo
						resolve(wxUserInfo)
					}else{
						reject('更新用户信息失败')
					}
				})
			},
			fail:err => {
				console.log(err,'err')
				reject(err)
			}
		})
	})
}
export const login = async () => {
	return new Promise(async (resolve,reject) => {
		let res = await uni.getProvider({ service:'oauth' }).then(res => res[1]).catch(()=> reject("未获取授权"))
		const provider = res.provider[0]
		console.log(provider,'provider')
		if (provider) {
			uni.login({ provider }).then(res => {
				if(res[1] && res[1].code) resolve({code:res[1].code,provider})
				else reject("code获取失败")
			}).catch(()=>{
				reject("登录授权失败")
			})
		}else{
			reject("请先安装相应软件或升级版本")
		}
	})
}


