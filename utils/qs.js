const stringify = obj => {
	let arr = []
	for(let key in obj){
		arr.push(`${key}=${obj[key]}`)
	}
	return arr.join('&')
}

const parse = str => {
	let obj = {}
	str.split('&').forEach(item => {
		let key = item.split('=')[0],value = item.split('=')[1];
		obj[key] = value
	})
	return obj
}
export default{
	parse,
	stringify,
}