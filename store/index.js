import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const store = new Vuex.Store({
	plugins: [createLogger()],
	state: {
		// 先从本地获取,获取不到就位空
		shopCart: wx.getStorageSync('GOODSLIST') || []
	},
	mutations: {
		// 添加到购物车逻辑
		ADDVART(state, id) {
			let cart = state.shopCart
			// 返回vuex中与传入id一样的商品
			let goods = cart.find(item => {
				return item.goodsId == id
			})
			// 判断有没有返回
			if (goods) {
				goods = cart.find(item => {
					return item.goodsId == id && item.num++
				})
			} else {
				// 首次
				let newGoods = {
					goodsId: id,
					num: 1,
					checked: true
				}
				let _shopCart = [newGoods, ...cart]
				state.shopCart = [...new Set(_shopCart)]
				wx.setStorageSync('GOODSLIST', state.shopCart)
			}
		},
		SAVEGOODSLIST(state, list) {
			state.shopCart = list
		}
	}
})

export default store
