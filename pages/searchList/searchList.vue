<template>
	<view class="searchList">
		<view class="header-stikcy">
			<!-- 搜索框 -->
			<mySearchBar :keyword="keyword" @confirm="confirm"></mySearchBar>
			<!-- 过滤栏 -->
			<view class="filter-menu" v-if="!type">
				<view class="fm-item" v-for="(item,index) in filterList" :key="index" :class="{active:currentIndex===index}">
					<text @click="setIndex(index)">{{item}}</text>
					<text class="arrow">
						<!-- top下降,buttom上升 -->
						<text class="a-top" :class="{active:isSort==='dec'}"></text>
						<text class="a-buttom" :class="{active:isSort==='rise'}"></text>
					</text>
				</view>
			</view>
		</view>
		<!-- 列表项 -->
		<view v-if="!type">
			<view class="details-list" v-for="item in goodsList" :key="item.goods_id" @click="toGoodsDetails(item.goods_id)">
				<view class="list-left">
					<image :src="item.goods_small_logo||'https://upload.cc/i1/2020/08/22/H8aYoQ.png'"></image>
				</view>
				<view class="list-right">
					<text class="goods_name">{{item.goods_name}}</text>
					<text class="goods_price">{{item.goods_price}}.00</text>
				</view>
			</view>
		</view>
		<view class="nothing" v-if="!goodsList.length && !type">
			没有您想要的结果哦
		</view>
		<view v-if="type==='link'" class="search-history">
			<view class="tools">
				<text>历史搜索</text>
				<text @click="clearHistory" class="iconfont icon-icon-test7"></text>
			</view>
			<view class="key-item">
				<view v-for="(item,index) in keyWordsList" :key="index" @click="search(item)">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mySearchBar from '../../components/mySearchBar.vue'
	// 将页面中不需要改变的量定义为为常量
	const PAGE_SIZE = 5
	export default {
		name: 'search-list',
		components: {
			mySearchBar
		},
		data() {
			return {
				// 点击的索引
				currentIndex: 0,
				// 搜索关键词
				keyword: '',
				// 排序
				isSort: undefined,
				// 过滤栏
				filterList: ['综合', '销量', '价格'],
				// 返回商品列表
				goodsList: [],
				// 是否是最后一页
				isLastPage: false,
				// 从哪里来
				type: '',
				// 历史记录数组,如果本地储存中没有就是空数组
				keyWordsList: uni.getStorageSync('KEYWORDSLIST') || [],
			}
		},
		methods: {
			// 将子组件传来的输入框val赋值给keyword后调用接口
			confirm(val) {
				this.type = ''
				this.keyword = val
				// 将关键词添加到开头
				this.keyWordsList.unshift(this.keyword)
				// set去重
				this.keyWordsList = [...new Set(this.keyWordsList)]
				// 数组长度大于最大长度就从尾部删除一个
				this.keyWordsList.length > 6 && this.keyWordsList.pop()
				// 将去重后关键词数组存到本地
				uni.setStorageSync('KEYWORDSLIST', this.keyWordsList);
				this.search()
			},
			// 清除搜索历史
			clearHistory() {
				uni.showModal({
					title: '提示',
					content: '你确认要清空历史搜索吗',
					cancelText: '再想想',
					success: res => {
						if (res.confirm) {
							// 清空数组
							this.keyWordsList = []
							// 清空本地储存
							uni.removeStorageSync('KEYWORDSLIST')
						}
					}
				});
			},
			// 设置索引
			setIndex(index) {
				this.currentIndex = index
				if (index === 2) {
					if (this.isSort === undefined) {
						// 这里说明是从别的索引点进来的,就根据之前的old值取反
						this.isSort = this.old === 'rise' ? 'dec' : 'rise'
						this.old = this.isSort
					} else {
						// 这里说明是之前就在价格,直接取反
						this.isSort = this.isSort === 'rise' ? 'dec' : 'rise'
						this.old = this.isSort
					}
				} else {
					// 这里说明点的不是价格就重置为undefined
					this.isSort = undefined
				}
				this.search()
			},
			// 搜索事件
			search(item) {
				this.type = ''
				// 如果有item说明是点击搜索历史进来的,就讲关键词替换为item
				item && (this.keyword = item)
				// 页码置1,列表清空,调接口
				this.pageNum = 1
				this.goodsList = []
				this.getGoodsList()
			},
			async getGoodsList() {
				// 请求前如果是再请求中就不再请求
				if (this.isRequesting) return;
				// 请求开始开启请求状态
				this.isRequesting = true
				let res = await this.$request({
					url: '/api/public/v1/goods/search',
					data: {
						query: this.keyword,
						pagenum: this.pageNum,
						pagesize: PAGE_SIZE
					},
				})
				// 请求结束后关闭请求状
				this.isRequesting = false
				// 请求完成手动关闭下拉动画
				uni.stopPullDownRefresh()
				// 定义排序函数,根据价格升序
				function sortData(a, b) {
					return b.goods_price - a.goods_price
				}
				/*
				TODO: 目前只能针对获取的五条数据排序后拼接,无法做到全页面排序
							思路:一次性获取所有数据,下拉请求是按照页码返回他排序好的几条
				*/
				if (this.isSort === 'rise') {
					// 升序
					res.goods.sort(sortData);
				} else if (this.isSort === 'dec') {
					// 降序
					res.goods.sort(sortData).reverse()
				}
				this.isLastPage = false
				this.goodsList = [...this.goodsList, ...res.goods]
				// 判断最后一页
				res.total <= this.goodsList.length && (this.isLastPage = true);
			},
			// 携带商品id跳转商品详情页
			toGoodsDetails(id) {
				uni.navigateTo({
					url: '../goodsDetails/goodsDetails?goodsId=' + id
				});
			}
		},
		onLoad(options) {
			// 将结构中不使用的变量通过this直接添加在Vue实力的属性,避免vue中监听该属性浪费性能
			this.pageNum= 1
			this.old= 'rise'
			// 是否在请求中
			this.isRequesting= false
			// 获取关键词
			this.keyword = options.cat_name
			// 获取从哪里来的
			this.type = options.type
			this.getGoodsList()
		},
		// 下拉
		onPullDownRefresh() {
			this.search()
			this.isLastPage = false
		},
		// 上拉
		onReachBottom() {
			console.log('上拉');
			// 如果已经是最后一页,阻止发请求
			if (!this.isLastPage) {
				this.pageNum++;
				this.getGoodsList();
			} else {
				uni.showToast({
					title: '没有更多了'
				})
			}
		},
	}
</script>
<style lang="less">
	.searchList {
		.header-stikcy {
			// 粘性定位
			position: sticky;
			width: 100%;
			top: 0;
			background-color: #fff;

			.filter-menu {
				display: flex;
				justify-content: space-around;
				height: 102rpx;
				line-height: 102rpx;

				.fm-item {
					&.active {
						color: #ff3350;
					}

					&:nth-child(3) {
						.arrow {
							position: relative;

							text {
								position: absolute;
								width: 0;
								height: 0;
								right: -26rpx;
								border: 10rpx solid transparent;
							}

							.a-top {
								top: 24rpx;
								border-top: 14rpx solid #cdcdcd;

								&.active {
									border-top-color: #666666;
								}
							}

							.a-buttom {
								top: -6rpx;
								border-bottom: 14rpx solid #cdcdcd;

								&.active {
									border-bottom-color: #666666;
								}
							}
						}
					}
				}
			}
		}


		.details-list {
			display: flex;
			padding: 30rpx;
			box-sizing: border-box;
			border-top: 1px solid #eee;

			.list-left {
				>image {
					width: 200rpx;
					height: 200rpx;
				}
			}

			.list-right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding-left: 30rpx;
				justify-content: space-around;

				.goods_name {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.goods_price {
					color: #ff3350;
					font-size: 40rpx;

					&::before {
						content: '$';
						font-size: 30rpx;
						margin: 5rpx;
					}
				}
			}
		}

		.nothing {
			text-align: center;
			color: red;
		}

		.search-history {
			.tools {
				display: flex;
				justify-content: space-between;
				padding: 20rpx;

				text {}

				.iconfont {
					color: #cdcdcd;
				}
			}

			.key-item {
				display: flex;
				flex-wrap: wrap;

				view {
					background-color: #dedede;
					height: 64rpx;
					line-height: 64rpx;
					padding: 0 30rpx;
					margin: 0 30rpx 16rpx 0;
				}
			}
		}
	}
</style>
