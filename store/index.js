import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    shopCart: [
			{
				// 商品id
				goods_id:'',
				// 商品数量
				num:1,
				// 是否选中
				checked:false
			}
		]
  },
  mutations: {
		SAVEGOODSLIST(state,list){
			state.shopCart[0]= list
		}
  }
})

export default store