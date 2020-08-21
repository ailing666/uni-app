const BASE_URL = 'https://www.uinav.com'
function request({url}){
return new Promise((resolve,reject)=>{
	uni.request({
		url: BASE_URL + url,
		success:res=>{
			let {message,meta} = res.data
			meta.status === 200 && resolve(message)
		},
		fail:(err)=>{
			reject(err)
		}
	})
})
}
export default request