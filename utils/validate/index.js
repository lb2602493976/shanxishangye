const idCard = str => {
	return (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/).test(str)
}

const phone = str => {
	return (/[0-9]{11}/).test(str)
}

export default{
	idCard,
	phone,
}