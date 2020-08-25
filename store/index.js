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
			console.log('goods', goods);
			// 判断有没有返回
			if (goods) {
				goods = cart.find(item => {
					return item.goodsId == id && item.num++
				})
				// goods.num++
				// goods.checked = true
				// 非首次
				console.log('非首次', goods);
								wx.setStorageSync('GOODSLIST',state.shopCart)
			} else {
				// 首次
				let newGoods = {
					goodsId: id,
					num: 1,
					checked: true
				}
				console.log('newGoods',newGoods);
				let _shopCart = [newGoods,...cart]
				console.log('_shopCart',_shopCart);
				state.shopCart=[...new Set(_shopCart)]
				wx.setStorageSync('GOODSLIST',state.shopCart)
				// wx.removeStorageSync('GOODSLIST')
			}
			console.log('state.shopCart', state.shopCart);
		},
		SAVEGOODSLIST(state, list) {
			state.shopCart = list
		}
	}
})

export default store
