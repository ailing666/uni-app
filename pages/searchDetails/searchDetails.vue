<template>
	<view class="searchDetails">
		<!-- 搜索框 -->
		<mySearchBar :keyword="keyword" @confirm="confirm"></mySearchBar>
		<!-- 过滤栏 -->
		<view class="filter-menu">
			<view class="fm-item" v-for="(item,index) in filterList" :key="index" :class="{active:currentIndex===index}">
				<text @click="setIndex(index)">{{item}}</text>
				<text class="arrow" :class="{active:isSort}">
					<text class="a-top"></text>
					<text class="a-buttom"></text>
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
				isSort: true,
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
				this.isSort = !this.isSort
				console.log(this.isSort);
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
				// 请求结束后主动关闭下拉动画
				uni.stopPullDownRefresh()
				// 使用展开运算符将后面的数据追加到初始数据后
				this.goodsList = [...this.goodsList, ...res.goods]
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
		onPullDownRefresh() {
			this.search()
		},
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

						&.active {
							.a-top {
								border-top-color: #666666;
							}

							.a-buttom {
								border-bottom-color: #cdcdcd;
							}
						}

						.a-top {
							top: 24rpx;
							border-top: 14rpx solid #cdcdcd;

						}

						.a-buttom {
							top: -6rpx;
							border-bottom: 14rpx solid #666666;
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
