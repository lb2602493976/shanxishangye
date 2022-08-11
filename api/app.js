
import glb from '@/config/glbData.js'
//获取百度access_token
export const getBaiduAccessToken = () => {
	let api_key = 'X85qaqUf1vXXhYGspHQZqR87'
	let secret_key = 'aCV80FeDlo8SdFiGDwByRClcQA1BBKaR'
	return uni.request({ 
		url:`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${ api_key }&client_secret=${ secret_key }` ,
		method:'POST',
		noToken:true,
	}).then(res => {
		uni.setStorageSync('baidu_at',res[1].data.access_token)
	})
}

//身份证识别
export const parseIdCard = data => {
	return uni.request({ 
		url:`https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=${ uni.getStorageSync('baidu_at') }`,
		header:{ 'Content-type':'application/x-www-form-urlencoded' },
		data,
		notoken:true,
	})
}

//上传文件
export const upload = file => {
	return uni.uploadFile({
		url:`${ glb.BASE_API }/upload/uploadPic`,
		name:'file',
		filePath:file.path,
		header:{"Content-Type": "multipart/form-data"},
	}).then(res => res[1].data)
}

//获取二维码
// export const getQrCode = data => {
// 	return uni.request({
// 		url:`${ glb.BASE_API }/QR/getCode`,
// 		data,
// 		method:'POST'
// 	}).then(res => res[1].data)
// }

//生成二维码
export const getQrCode = data => {
	return uni.request({
		url:`${ glb.BASE_API }/invitCode/getCode`,
		data,
		// method:'POST',
		notoken:true,
	}).then(res => res[1].data)
}

//获取access_token
export const getAccessToken = async data => {
	let res = await uni.getProvider({ service:'oauth' }).then(res => res[1]).catch(()=> reject("未获取授权"))
	const provider = res.provider[0]
	return await uni.request({
		url:`${ glb.BASE_API }/manage/recruitStudent/getToken`,
		data:{ ...data,type:provider },
		method:'get'
	}).then(res => res[1].data)
}

//解析字符串
export const parseBaiduPhone = data => {
	return uni.request({ url:`${ glb.BASE_API }/baidu/decodeMobile`,data }).then(res => res[1].data)
}

//解析抖音字符串
export const parseToutiaoPhone = data => {
	return uni.request({ url:`${ glb.BASE_API }/douyin/decodeMobile`,data }).then(res => res[1].data)
}


