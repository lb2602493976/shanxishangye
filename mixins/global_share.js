const getCurrentPath = ()=>{
	let pages = getCurrentPages()
	let currentPage = pages[pages.length-1]
	let path = currentPage?.$page?.fullPath 
	return path
}

export default{
	onShareAppMessage({ from,target,webViewUrl }){
		if(from == 'button') {
			if(this[target.id]) return this[target.id]({ from,target,webViewUrl })
		}
		return {
			title:'陕西省商业学校',
			// path:getCurrentPath(),
		}
	},
	onShareTimeline({ from,target,imageUrl }){
	 	
	} 
}