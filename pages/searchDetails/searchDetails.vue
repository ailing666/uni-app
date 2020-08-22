<template>
	<view class="searchDetails">
		<!-- 搜索框 -->
		<mySearchBar :keyword="keyword" @confirm="confirm"></mySearchBar>
		<!-- 过滤栏 -->
		<view class="filter-menu">
			<view class="fm-item" v-for="(item,index) in filterList" :key="index" :class="{active:currentIndex===index}">
				<text @click="setIndex(index)">{{item}}</text>
				<text class="arrow">
					<text class="a-top" :class="{active:isSort==='dec'}"></text>
					<text class="a-buttom" :class="{active:isSort==='rise'}"></text>
				</text>
			</view>
		</view>
		<!-- 列表项 -->
		<view class="details-list" v-for="item in goodsList" :key="item.goods_id">
			<view class="list-left">
				<image :src="item.goods_small_logo||'https://upload.cc/i1/2020/08/22/H8aYoQ.png'"></image>
			</view>
			<view class="list-right">
				<text class="goods_name">{{item.goods_name}}</text>
				<text class="goods_price">{{item.goods_price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import mySearchBar from '../../components/mySearchBar.vue'
	export default {
		components: {
			mySearchBar
		},
		data() {
			return {
				// 点击的索引
				currentIndex: 0,
				// 搜索关键词
				keyword: '',
				pageNum: 1,
				pageSize: 5,
				// 排序
				isSort: undefined,
				old: 'rise',
				// 过滤栏
				filterList: ['综合', '销量', '价格'],
				// 返回商品列表
				goodsList: [],
				// 返回的详情列表
				detailsList: []
			}
		},
		methods: {
			confirm(val) {
				this.keyword = val
				this.search
			},
			setIndex(index) {
				this.currentIndex = index
				if (index === 2) {
					if (this.isSort === undefined) {
						this.isSort = this.old === 'rise' ? 'dec' : 'rise'
						this.old = this.isSort
					} else {
						// 取反
						this.isSort = this.isSort === 'rise' ? 'dec' : 'rise'
						this.old = this.isSort
					}
				} else {
					// 点的不是价格就重置为undefined
					this.isSort = undefined
				}
				this.search()
				console.log('isSort', this.isSort);
			},
			search() {
				this.pageNum = 1
				this.goodsList = []
				this.getGoodsList()
			},
			async getGoodsList() {
				let res = await this.$request({
					url: '/api/public/v1/goods/search',
					data: {
						query: this.keyword,
						pagenum: this.pageNum,
						pagesize: this.pageSize
					},
				})
				console.log('请求的初始',...res.goods);
				// 请求完成手动关闭下拉动画
				uni.stopPullDownRefresh()
// 定义排序函数
				function sortData(a, b) {
					return b.goods_price - a.goods_price
				}
				// 用于储存排序后的数组
				let list = []
				if (this.isSort === 'rise') {
					console.log('升序');
					// 升序
					list = this.goodsList.sort(sortData);
				} else if (this.isSort === 'dec') {
					console.log('降序');
					// 降序
					list = this.goodsList.sort(sortData).reverse()
				} else {
					console.log('buguan');
					// 不管
					list = this.goodsList
				}
				console.log('排序后',...list);
				this.goodsList = [...this.goodsList, ...res.goods]
				console.log('this.goodsList',this.goodsList);
			},
			async getDetailsList() {
				this.detailsList = await this.$request({
					url: '/api/public/v1/goods/detail?goods_id=57396'
				})
			}
		},
		onLoad(options) {
			// 获取关键词
			this.keyword = options.cat_name,
				this.getDetailsList()
			this.getGoodsList()
		},
		// 下拉
		onPullDownRefresh() {
			this.search()
		},
		// 上拉
		onReachBottom() {
			this.pageNum++;
			this.getGoodsList();
		},
	}
</script>
<style lang="less">
	.searchDetails {
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
	}
</style>
