<template>
	<view class="shop-cart">
		<myList lable="收货人:苏" value="15811111111" icon></myList>
		<myList lable="收货地址" value="广东省xx省xx市xx路xx号"></myList>
		<image class="cart-border" src="../../static/images/cart_border@2x.png" mode=""></image>
		<view class="main">
			<!-- 店铺 -->
			<view class="shop">
				<text class="iconfont icon-icon-test6"></text>
				优购生活馆
			</view>
			<!-- 商品 -->
			<view class="goods" v-for="item in cartGoodsList" :key="item.goods_id">
				<view class="left">
					<radio @click="toogleChecked(item)" :checked="item.checked" color="#eb4450" />
					<image :src="item.goods_small_logo" mode=""></image>
				</view>
				<view class="right">
					<text class="goods_name">{{item.goods_name}}</text>
					<view class="buttom">
						<text class="goods_price">$<text>{{item.goods_price}}</text>.00</text>
						<!-- 按钮 -->
						<view class="goods-num">
							<button @click="subNum(item,index)" class="sub" size="mini">-</button>
							<input type="text" v-model="item.num" />
							<button @click="addNum(item)" class="add" size="mini">+</button>
						</view>
					</view>
				</view>
			</view>
			<!-- 底部 -->
			<view class="cart-buttom">
				<view class="choose" @click="toggleAll()">
					<radio :checked="isAll" color="#eb4450" />
					全选
				</view>
				<view class="sum">
					合计:{{totalPrice}}
				</view>
				<view class="pay">
					结算({{totalNum}})
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import myList from '../../components/myList.vue'

	export default {
		name: 'shop-cart',
		components: {
			myList
		},
		data() {
			return {
				cartGoodsList: [],
				isChecked: false
			}
		},
		onLoad(options) {
			this.idStr = ''
		},
		onShow() {
			this.getCartGoodsList()
		},
		computed: {
			// 全选
			isAll: {
				get() {
					// 只有每个都选中才返回true，否则是false
					return this.cartGoodsList.every(item => item.checked)
				},
				// 设置isAll选中后的状态从而影响上面的radio
				set(status) {
					this.cartGoodsList.forEach(item => item.checked = status)
				}
			},
			// 总数量
			totalNum() {
				return this.cartGoodsList.reduce((sum, item) => {
					return sum + (item.checked ? item.num : 0)
				}, 0)
			},
			// 总价格
			totalPrice() {
				return this.cartGoodsList.reduce((sum, item) => {
					return sum + (item.checked ? item.num * item.goods_price : 0)
				}, 0)
			}
		},
		methods: {
			toogleChecked(item) {
				item.checked = !item.checked
			},
			toggleAll() {
				this.isAll = !this.isAll
			},
			// 获取购物车要展示的
			async getCartGoodsList() {
				// 获取厂库的购物车
				let cart = this.$store.state.shopCart
				// 拿到仓库的id
				let idArr = cart.map(item => item.goodsId)
				this.idStr = idArr.join()
				// 根据id调用接口
				let _cartGoodsList = await this.$request({
					url: '/api/public/v1/goods/goodslist?goods_ids=' + this.idStr
				})
				// 一步到位处理对象
				this.cartGoodsList = _cartGoodsList.map(sItem => {
					// 早到cart中和_cartGoodsListid一样的并返回成一个新数组
					let targetGoods = cart.find(goods => {
						return goods.goodsId === sItem.goods_id
					})
					// 合并为一个数组赋值给this.cartGoodsList
					return { ...targetGoods,
						...sItem
					}
				})

				let goods = this.cartGoodsList.map(item => {
					return {
						goodsId: item.goods_id,
						num: item.num,
						checked: item.checked
					}
				})
				uni.setStorageSync('GOODSLIST', goods);
				this.$store.commit('SAVEGOODSLIST', goods)
			},
			// 减少
			subNum(item, index) {
				// 只有一件时，减数量提示是否删除
				if (item.num === 1) {
					uni.showModal({
						title: '提示',
						content: '是否删除',
						success:res=>{
							if (res.confirm) {
								// 删除指定项
								this.cartGoodsList.splice(index, 1);
							}
						}
					});
					return
				}
				item.num--
			},
			// 增加
			addNum(item) {
				item.num <= 99 && item.num++
			}
		}
	}
</script>

<style lang="less">
	.shop-cart {
		padding-bottom: 90rpx;

		.cart-border {
			width: 100vw;
			height: 12rpx;
		}

		.main {
			.shop {
				height: 90rpx;
				line-height: 90rpx;

				.iconfont {
					margin: 0 16rpx;
				}
			}

			.goods {
				height: 206rpx;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #eee;
				padding: 20rpx;

				.left {
					radio {}

					image {
						width: 162rpx;
						height: 162rpx;
						vertical-align: middle;
					}
				}

				.right {
					flex: 1;

					.goods_name {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						margin-bottom: 20rpx;
					}

					.buttom {
						display: flex;
						justify-content: space-between;

						.goods_price {
							color: #eb4450;

							text {
								font-size: 40rpx;
							}
						}

						.goods-num {
							display: flex;

							.sub,
							.add {
								text-align: center;
							}

							input {
								text-align: center;
								width: 70rpx;
							}

							.add {}
						}
					}
				}
			}

			.cart-buttom {
				display: flex;
				align-items: center;
				position: fixed;
				bottom: 0;
				left: 0;
				width: 100vw;
				height: 90rpx;

				.choose {
					flex: 1;
					height: 90rpx;
				}

				.sum {
					flex: 1;
					height: 90rpx;
				}

				.pay {
					flex: 1;
					height: 90rpx;
					text-align: center;
					line-height: 90rpx;
					background-color: #EB4450;
				}
			}
		}
	}
</style>
