<script>
	import globalData from '@/config/glbData.js'

	export default{
		globalData,
		onLaunch: function () {
			if(uni.canIUse('getUpdateManager')) {
			
			   const updateManager = uni.getUpdateManager()
			
			   updateManager.onCheckForUpdate(function (res) {
			
			    console.log('onCheckForUpdate====', res)
			
			    // 请求完新版本信息的回调
			
			    if (res.hasUpdate) {
			
			     console.log('res.hasUpdate====')
			
			     updateManager.onUpdateReady(function () {
			
			      uni.showModal({
			
			       title: '更新提示',
			
			       content: '新版本已经准备好，是否重启应用？',
			
			       success: function (res) {
			
			        console.log('success====', res)
			
			        // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
			
			        if (res.confirm) {
			
			         // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
			
			         updateManager.applyUpdate()
			
			        }
			
			       }
			
			      })
			
			     })
			
			     updateManager.onUpdateFailed(function () {
			
			      // 新的版本下载失败
			
			      uni.showModal({
			
			       title: '已经有新版本了哟~',
			
			       content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
			
			      })
			
			     })
			
			    }
			
			   })
			
			}else{
			
			  uni.showModal({
			
			title: '提示',
			
			content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
			
			   })
			
			}
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import './styles/variable.scss';
	@import './styles/mixins.scss';
	@import './styles/reset.scss';
	@import './styles/vant_rewrite.scss';
	@import './styles/iconfont.scss';
	
	page{
	  font-family:$family;
	  height:100vh;
	  background:#FFF;
	  .page{
		  // &:before,&:after{
			 //  content:'';
			 //  display:table;
			 //  height:1px;
			 //  width:100%;
		  // }
		  //  // &:before{
			 //  //  background:$theme;
		  //  // }
		   &:after{
			    content:'';
			    display:table;
			    height:1px;
			    width:100%;
				background:transparent;
		   }
	  }
	 
	  button.primary{
		  background-image:linear-gradient(180deg,#6771E6,#47509A);
		  border-radius:20rpx;
		  color:#FFF;
	  }
	  button.primary-hover{
		  background-image:linear-gradient(0deg,#6771E6,#47509A);
	  }
	  button.primary2{
		  background-image:linear-gradient(180deg,#0DCCFF,#5C72FF);
		  border-radius:20rpx;
		  color:#FFF;
	  }
	  button.primary2-hover{
		background-image:linear-gradient(0deg,#0DCCFF,#5C72FF);
	  }
	  button.info{
		  background-image:linear-gradient(180deg,#5E5E5E,#2B2B2B);
		  border-radius:20rpx;
		  color:#FFF;
	  }
	  button.info-hover{
		  background-image:linear-gradient(0deg,#5E5E5E,#2B2B2B);
	  }
	}

</style>
