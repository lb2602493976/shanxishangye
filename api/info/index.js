import glbData from '@/config/glbData.js'

// 所有数据
const getPosterData = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/generatePoster/list2`,data,}).then(res => res[1].data)
}

export default{
	getPosterData,
}