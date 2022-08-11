import glbData from '@/config/glbData';

// 所有数据
const schoolDetail = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitModule/list`,data,}).then(res => res)
}

// 省下拉
const getProvinceList = data => {
	return uni.request({ url:`${ glbData.BASE_API }/chest/getProvinceList`,data,}).then(res => res[1].data)
}
// 市下拉
const getCityList = data => {
	return uni.request({ url:`${ glbData.BASE_API }/chest/getCityList`,data,}).then(res => res[1].data)
}
// 区下拉
const getCountyList = data => {
	return uni.request({ url:`${ glbData.BASE_API }/chest/getCountyList`,data,}).then(res => res[1].data)
}


// 五个下拉 同一传参tenantId
// 省份
const getProvinces = data => {
	return uni.request({ url:`${ glbData.BASE_API }/chest/getProvinces`,data,}).then(res => res)
}
// 年份
const getYear = data => {
	return uni.request({ url:`${ glbData.BASE_API }/chest/getYear`,data,}).then(res => res)
}
// 类别
const getCategory = data => {
	return uni.request({ url:`${ glbData.BASE_API }/chest/getCategory`,data,}).then(res => res)
}
// 科类
const getDiscipline = data => {
	return uni.request({ url:`${ glbData.BASE_API }/chest/getDiscipline`,data,}).then(res => res)
}
// 部门
const getDept = data => {
	return uni.request({ url:`${ glbData.BASE_API }/chest/getDept`,data,}).then(res => res)
}

// 查询  五个参数  year  provinces  category disciplineType dept
const getEnrollmentPlan = data => {
	return uni.request({ url:`${ glbData.BASE_API }/chest/getEnrollmentPlan`,data,}).then(res => res)
}

// 查询 常见问题
//这个可以有
const getrecruitAiWords = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitAiWords/list2`,data,}).then(res => res[1].data)
}

// 意向考生登记表
const addStudentList = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/stuRegister/add`,method:'POST',data,}).then(res => res[1].data)
}

//院系列表
const getSchoolList = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitCollegeInfo/findDeptList`,data,}).then(res => res[1].data)
}

//院系下专业 不传值所有专业
const getSchoolMajorList = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitMajorInfo/findMajorList`,data,}).then(res => res[1].data)
}
//添加专业浏览次数
const addMajorViewNum = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitMajorInfo/UpdateViews`,data,method:'GET'}).then(res => res[1].data)
}

// 小程序调数据字典接口
const getDict=data=>{
	return uni.request({ url:`${glbData.BASE_API }/sys/dict/getDict`,data,}).then(res=>res[1].data)
}

//人工咨询->招生老师
const getEnrollTeacher = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitTeacher/findTeacherList`,data,}).then(res => res[1].data)
}

// 所有新闻
const getAllNews = data => {
	data.state  = '1'
	return uni.request({ url:`${ glbData.BASE_API }/manage1/newsInformation/getList`,data,}).then(res => res[1].data)
}

//获取新闻详情
const getNewsDetail = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage1/newsInformation/queryById`,data }).then(res => res[1].data)
}

//历年录取分数
//省份
const getScoreProvinces = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitAdmissionScore/getProvinces`,data,}).then(res => res[1].data)
}
//年份
const getScoreYear = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitAdmissionScore/getYear`,data,}).then(res => res[1].data)
}
//科类别
const getScoreStream = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitAdmissionScore/getStream`,data,}).then(res => res[1].data)
}
//历史分数查询
const getScoreSearch = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitAdmissionScore/getList`,data,}).then(res => res[1].data)
}

//宣传图片->校园图片
//校园图片列表

const getSchoolImageList = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitPictureType/getPictureTypeList`,data,}).then(res => res[1].data)
}


// 视频
const getSchoolVideoList = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitVideoAbout/listApp`,data,}).then(res => res[1].data)
}

//名师
const getSchoolTeacherList = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitTeacherInfo/getTeacherMoudel1`,data,}).then(res => res[1].data)
}

//轮播图
const getLunBoPic = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitBanner/findBannerList`,data,}).then(res => res[1].data)
}


//地图路线
const getMapPath = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/routeMap/list`,data,}).then(res => res[1].data)
}

//招生电话咨询
const getPhoneConsult = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/admissionCounseling/list`,data,}).then(res => res[1].data)
}

// 录取查询

const findAdmissionNotice= data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/admissionNotice/findAdmissionNotice`,data,}).then(res => res[1].data)
}

//录取查询成功消息

const resultTips= data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/resultTips/getList`,data,}).then(res => res[1].data)
}

// 预报名登记表 我的报名

const getInterestedCandidates= data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/stuRegister/myRegistration`,data,}).then(res => res[1].data)
}

//首页 通告栏
const getAppletNotice= data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/appletNotice/list`,data,}).then(res => res[1].data)
}

// 模块点击
const addUserClick=data=>{
	return uni.request({ url:`${ glbData.BASE_API }/manage/userClick/add`,method:'POST',data }).then(res=>res[1].data)
}

// 意向招生老师登记表
const addAdmissionsTeacherList=data=>{
	return uni.request({ url:`${ glbData.BASE_API }/manage/teamPersonnel/add`,method:'POST',data }).then(res=>res[1].data)
}

//查询院系专业列表
const getMajorListOfDept = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitCollegeInfo/findDeptList`,data }).then(res=>res[1].data)
}

//查询就业明星
const getEStar = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/employmentStar/getList`,data }).then(res=>res[1].data)
}

//查询专业问答列表
const getQAList = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/majorQuestion/getList`,data }).then(res=>res[1].data)
}
//查询校园风采图片
const getScenary = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/coverPicture/getList`,data }).then(res=>res[1].data)
}

//智能问答
const getQuest = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitAiWords/aiQuestionAndAnswer`,data }).then(res=>res[1].data)
}

//智能问答添加
const addQuest=data=>{
	return uni.request({ url:`${ glbData.BASE_API }/manage/questionAnsweringRecord/add`,method:'POST',data}).then(res=>res[1].data)
}

//智能问答查询列表
const getQuestList=data=>{
	return uni.request({ url:`${ glbData.BASE_API }/manage/questionAnsweringRecord/getList`,data}).then(res=>res[1].data)
}

//查大类下的图片
const getClassifyImgList=id=>{
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitPicAbout/getRecruitPicAboutList/${id}`}).then(res=>res[1].data)
}
//新闻浏览量+1
const addNewsViewNum =  id => {
	return uni.request({ url:`${ glbData.BASE_API }/manage1/newsInformation/upnum`,data:{ id }}).then(res=>res[1].data)
}

//获取批次列表
const getBatchList = data => {
	return uni.request({ url:`${ glbData.BASE_API }/chest/getAdmissionBatch`,data }).then(res=>res[1].data)
}

//获取学院荣誉
const getHonor = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/schHonor/getList`,data }).then(res=>res[1].data)
}

//查询历史沿革
const getHistory = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/schHistoricalEvolution/getList`,data }).then(res=>res[1].data)
	
}

//查询学校介绍
const getAbout = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/recruitSchoolIno/getList`,data }).then(res=>res[1].data)
	
}

//查询学校概况tabs
const getSummaryTabs = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/moduleAssembly/getList`,data }).then(res=>res[1].data)
	
}

//查询学校概况内容
const getSummaryContent = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/moduleAssemblyDetails/getList`,data }).then(res=>res[1].data)
	
}

//小程序跳转另一个小程序
const friendShipSchool = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/friendshipSchool/getList`,data }).then(res=>res[1].data)
	
}


//投票 获取班级下拉
const getClassSelect = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/stuVotingInfor/getClassNameList`,data }).then(res=>res[1].data)
}

//投票 根据id查人 top10
const getIdSearchStu = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/stuVotingInfor/getList`,data }).then(res=>res[1].data)
}


//投票 根据班级查询学生列表
const getClassSelectStudent = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/stuVotingInfor/getStuList`,data }).then(res=>res[1].data)
}

//投票 获取活动首页数据
const getEventHome = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/stuVotingInfor/getActivitieshome`,data }).then(res=>res[1].data)
}

//投票 增加投票数
const getVoteNum = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/stuVotingInfor/addVote`,data }).then(res=>res[1].data)
}

//投票 增加浏览量
const getBrowseNum = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/stuVotingInfor/addViews`,data }).then(res=>res[1].data)
}


//投票 查询各个班级的总人气
const getEachClassMoods = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/stuVotingInfor/getClassNameSentiment`,data }).then(res=>res[1].data)
}

//投票 按人气/编号查询班级下学生列表
const getMoodsNumClass = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/stuVotingInfor/getStuList2`,data }).then(res=>res[1].data)
}

//投票 上传照片参赛
const getPicCome = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/stuVotingInfor/participating`,data }).then(res=>res[1].data)
}

// 投票 我的活动信息返回
const massags = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/stuVotingInfor/findMyActivity`,data }).then(res=>res[1].data)
}

// 投票 根据id查审核状态
const getIdSearchStatus = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/stuVotingInfor/queryById`,data }).then(res=>res[1].data)
}

//投票 审核拒绝重新上传接口

const getNoUpload = data => {
	return uni.request({ url:`${ glbData.BASE_API }/manage/stuVotingInfor/uploadPic`,data }).then(res=>res[1].data)
}






export default{
	getBatchList,
	getClassifyImgList,
	schoolDetail,
	getProvinces,
	getYear,
	getCategory,
	getDiscipline,
	getDept,
	getEnrollmentPlan,
	getrecruitAiWords,
	addStudentList,
	getSchoolList,
	getSchoolMajorList,
	getDict,
	getEnrollTeacher,
	getAllNews,
	getNewsDetail,
	getScoreProvinces,
	getScoreYear,
	getScoreStream,
	getScoreSearch,
	getSchoolImageList,
	getSchoolVideoList,
	getSchoolTeacherList,
	getLunBoPic,
	getPhoneConsult,
	getMapPath,
	findAdmissionNotice,
	resultTips,
	getInterestedCandidates,
	getAppletNotice,
	addUserClick,
	addAdmissionsTeacherList,
	getMajorListOfDept,
	getEStar,
	getQAList,
	getScenary,
	getQuest,
	addQuest,
	getQuestList,
	addNewsViewNum,
	getProvinceList,
	getCityList,
	getCountyList,
	getHonor,
	getHistory,
	getAbout,
	addMajorViewNum,
	getSummaryTabs,
	getSummaryContent,
	friendShipSchool,
	getClassSelect,
	getIdSearchStu,
	getClassSelectStudent,
	getEventHome,
	getVoteNum,
	getBrowseNum,
	getEachClassMoods,
	getMoodsNumClass,
	getPicCome,
	massags,
	getIdSearchStatus,
	getNoUpload
}