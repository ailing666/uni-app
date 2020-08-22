<template>
	<view class="searchDetails">
		<!-- 搜索框 -->
		<mySearchBar :keyword="keyword"></mySearchBar>
		<!-- 过滤栏 -->
		<view class="">
			
		</view>
		<!-- 列表项 -->
		<view class="details-list"  v-for="item in goodsList.goods" :key="item.goods_id">
				<view class="list-left">
					<image :src="item.goods_big_logo||'https://upload.cc/i1/2020/08/22/H8aYoQ.png'"></image>
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
				// 搜索关键词
				keyword: '',
				// 过滤栏
				filterList:['综合','销量','价格'],
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
		display: flex;
		padding: 30rpx ;
		box-sizing: border-box;
		border-top: 1px solid #eee;
		.list-left{
			>image{
				width: 200rpx;
				height: 200rpx;
			}
		}
		.list-right{
			flex: 1;
			display: flex;
			flex-direction: column;
			padding-left: 30rpx;
			justify-content: space-around;
			.goods_name{
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.goods_price{
				color: #ff3350;
				font-size: 40rpx;
				&::before{
					content: '$';
					font-size: 30rpx;
					margin: 5rpx;
				}
			}
		}
	}
}


</style>
