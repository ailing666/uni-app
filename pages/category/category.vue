<template>
	<view class="category">
		<mySearchLink></mySearchLink>
		<view class="content">
			<view class="content-list">
				<!-- 一级列表 -->
				<view class="cate1" :class="{active:activeIndex === index1}" @click="setIndex(index1)" v-for="(cate1,index1) in categoryList"
				 :key="cate1.cat_id">
					<text>{{cate1.cat_name}}</text>
				</view>
			</view>
			<!-- 可以单独滚动的容器 垂直方向 顶部滚动绑定scrollTop -->
			<scroll-view class="details" scroll-y :scroll-top="scrollTop">
				<image class="details-img" src="../../static/images/titleImage.png"> </image>
				<view class="details-list">
					<!-- 二级列表  根据activeIndex渲染对应的二级列表 -->
					<view class="cate2" v-show="cate2.children" v-for="(cate2,index2) in categoryList[activeIndex].children" :key="cate2.cat_id">
						<view class="cate2-title">/<text>{{cate2.cat_name}}</text>/</view>
						<!-- 三级列表 -->
						<view class="cate3">
							<view v-for="(cate3,index3) in cate2.children" :key="cate3.cat_id" @click="toSearchList(cate3.cat_name)">
								<image :src="cate3.cat_icon"></image>
								<text>{{cate3.cat_name}}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import mySearchLink from '../../components/mySearchLink.vue'
	export default {
		name: 'category',
		components: {
			mySearchLink
		},
		data() {
			return {
				// 当前点击的索引
				activeIndex: 0,
				// 分类列表
				categoryList: [],
				scrollTop: 0,
			}
		},
		onLoad() {
			this.getCategoryList()
		},
		methods: {
			// 设置索引
			setIndex(index) {
				this.activeIndex = index;
				// 先将scrollTop改变(值小防止页面抖动),再异步修改为0
				this.scrollTop = 0.01
				this.$nextTick(()=> {
					this.scrollTop = 0
				})
			},
			// 跳转到搜索详情页
			toSearchList(val) {
				uni.navigateTo({
					url: '/pages/searchList/searchList?cat_name=' + val
				})
			},
			// 接口获取分类列表
			async getCategoryList() {
				this.categoryList = await this.$request({
					url: '/api/public/v1/categories'
				})
			}
		}
	}
</script>

<style lang="less">
	.category {
		.content {
			display: flex;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 100rpx;

			.content-list {
				overflow: scroll;
				width: 198rpx;

				.cate1 {
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
					background-color: #f4f4f4;
					border-bottom: 1px solid #eee;
					color: #333;

					&.active {
						position: relative;
						background-color: #fff;
						color: #eb4450;

						&::before {
							content: '';
							position: absolute;
							left: 0;
							top: 20rpx;
							width: 8rpx;
							height: 60rpx;
							background-color: #eb4450;
							font-weight: 700;
						}
					}
				}
			}

			.details {
				flex: 1;
				overflow: scroll;

				.details-img {
					width: 520rpx;
					height: 180rpx;
					margin: 20rpx 16rpx;
				}

				.details-list {
					.cate2 {
						text-align: center;

						.cate2-title {
							height: 110rpx;
							line-height: 110rpx;
							color: #e0e0e0;

							text {
								color: #333;
								margin: 0 30rpx;
							}
						}
					}

					.cate3 {
						display: flex;
						flex-wrap: wrap;

						view {
							display: flex;
							flex-direction: column;
							align-items: center;
							width: 33.33%;
							color: #333;

							>image {
								width: 120rpx;
								height: 120rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
