//type可配置：about,history,honor,content,img_list,img_list_mult,leader,news_list,news_list2,video_list
//id为对应数据字典值或后台相关记录id
//例:{ id:1,name:'学院简介',type:'content',detailId:'186' },
const newsConfig = {
	tabs1:{
		title:'校园风采',
		subTitle:'STUDENT LIFE',
		tabs:[
			{ id:7,name:'校园美景',type:'img_list_mult' },
			{ id:6,name:'校园文化',type:'news_list2' },
			{ id:15,name:'宣传视频',type:'video_list' },
		]
	},
	tabs2:{
		title:'招生中心',
		subTitle:'ENROLLMENT GUIDE',
		tabs:[
			// { id:1,name:'招生资讯',type:'news_list2' },
			{ id:2,name:'通知公告',type:'news_list2', },
		]
	},
	tabs3:{
		title:'升学就业',
		subTitle:'CAREERS & EMPLOYABILITY',
		tabs:[
			{ id:3,name:'升学学校',type:'news_list2' },
			{ id:4,name:'校企合作',type:'news_list2', },
			{ id:5,name:'招聘推荐',type:'news_list2', },
		]
	},
	tabs3_1:{
		title:'教育教学',
		subTitle:'COURSES',
		tabs:[
			{ id:13,name:'教学动态',type:'news_list2' },
			{ id:14,name:'实训实践',type:'news_list2', },
			// { id:5,name:'校友风采',type:'news_list2', },
		]
	},
	tabs4:{
		// title:'资助奖励',
		title:'资助政策',
		subTitle:'FUND INFORMATION',
		tabs:[
			{ id:8,name:'资助政策',type:'news_list2' },
			// { id:9,name:'奖励政策',type:'news_list2', },
		]
	},
	tabs5:{
		title:'招生政策',
		subTitle:'RECRUIT POLICY',
		tabs:[
			{ id:10,name:'3年制招生',type:'news_list2' },
			{ id:11,name:'3+3年制招生',type:'news_list2', },
			{ id:12,name:'3+2年制招生',type:'news_list2', },
		]
	},
}

export const tabMaps = Object.values(newsConfig).flatMap(item => item.tabs)

export default newsConfig