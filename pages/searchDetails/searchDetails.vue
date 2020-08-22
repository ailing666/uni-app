<template>
	<view class="searchDetails">
		<!-- 搜索框 -->
		<mySearchBar :keyword="keyword"></mySearchBar>
		<!-- 过滤栏 -->
		<!-- 列表项 -->
		<view class="details-list"  v-for="item in goodsList.goods" :key="item.goods_id">
			<view class="list-left" v-show="item.goods_big_logo">
				<image :src="item.goods_big_logo" mode=""></image>
			</view>
			<view class="list-right">
				<text>{{item.goods_name}}</text>
				<text>￥{{goods_price}}</text>
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
				// 搜索关键词
				keyword: '',
				// 返回商品列表
				goodsList: [],
				// 返回的详情列表
				detailsList: []
			}
		},

		methods: {
			async getGoodsList() {
				this.goodsList = await this.$request({
					url: '/api/public/v1/goods/search?query' + this.keyword,
				})
			},
			async getDetailsList() {
				this.detailsList = await this.$request({
					url: '/api/public/v1/goods/detail?goods_id=57396'
				})
			}
		},
		onLoad(options) {
			this.keyword = options.cat_name,
			this.getGoodsList()
			this.getDetailsList()
		}
	}
</script>

<style lang="less">
.searchDetails{
	.details-list{
		.list-left{
			>image{
				width: 200rpx;
				height: 200rpx;
			}
		}
		.list-right{
			
		}
	}
}


</style>
