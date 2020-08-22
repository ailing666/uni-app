const BASE_URL = 'https://api-ugo-dev.itheima.net'
/**
 * url:请求地址
 * data:请求对象 object
 * */
export function request({
	url,
	data
}) {
	return new Promise((resolve, reject) => {
		uni.showLoading({
				title: '拼命加载中..',
				mask: true
			}),
			uni.request({
				url: BASE_URL + url,
				data,
				success: res => {
					let {
						message,
						meta
					} = res.data
					meta.status === 200 && resolve(message)
				},
				fail(err) {
					reject(new Error(err.errMsg))
				},
				complete: () => {
					uni.hideLoading()
				}
			})
	})
}
