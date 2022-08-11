export default () => {
	uni.addInterceptor('request', {
	  invoke(args) {
		  console.log(args)
		  if(!args.notoken){
			  args.header = {
				  'Authorization':'Bearer '+getApp().globalData.token,
				  ...args.header,
			  }
		  }
	  },
	  success(args) {
		
	  }, 
	  fail(err) {
	    
	  }, 
	  complete(res) {
	    
	  }
	})
}