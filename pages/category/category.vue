<template>
	<view class="category">
		<mySearchLink></mySearchLink>
		<view class="content">
			<view class="list">
			<!-- 一级列表 -->
				<view class="cate1" :class="{active:activeIndex === index1}" @click="getIndex(index1)"  v-for="(cate1,index1) in categoryList" :key="cate1.cat_id">
					<text>{{cate1.cat_name}}</text>
				</view>
			</view>
			<view class="details">
				<!-- 二级列表 -->
				<!-- 三级列表 -->
			</view>
		</view>
	</view>
</template>

<script>
	import mySearchLink from '../../components/mySearchLink.vue'
	export default {
		name:'category',
		components: {
			mySearchLink
		},
		data() {
			return {
				// 当前点击的索引
				activeIndex: 0,
				// 分类列表
				categoryList: []
			}
		},
		onLoad() {
			this.getCategoryList()
		},
		methods: {
			// 改变索引
			getIndex(index){
				this.activeIndex = index
			},
			async getCategoryList() {
				this.categoryList = await this.$request({
					url: '/api/public/v1/categories'
				})

			}
		}
	}
</script>

<style lang="less" scoped>
.category{
	.content{
		display: flex;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 100rpx;
		.list{
			overflow: scroll;
			width: 198rpx;
			.cate1{
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				background-color: #f4f4f4;
				border-bottom: 1px solid #eee;
				color: #333;
				&.active{
					position: relative;
					background-color: #fff;
					color: #eb4450;
					&::before{
						content: '';
						position: absolute;
						left: 0;
						top: 20rpx;
						width: 8rpx;
						height: 60rpx;
						background-color: #eb4450;
						font-weight: 600;
					}
				}
				text{
					
				}
			}
		}
		.details{
			flex: 1;
		}
	}
}




</style>
