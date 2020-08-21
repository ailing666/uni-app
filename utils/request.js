const BASE_URL = 'https://www.uinav.com'
export function request({
	url
}) {
	return new Promise((resolve, reject) => {
		uni.showLoading({
				title: '拼命加载中。。。',
				mask: true
			}),

			uni.request({
				url: BASE_URL + url,
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
