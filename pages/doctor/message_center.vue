<template>
	<view class="wrap">
		<view class="demo-warter" v-for="(item, index) in flowList" :key="index">
			<view style="display: flex;">
				<u-tag text="问" bg-color="orange" shape="circle" mode="dark" />
				<view style="margin-left: 10px;">{{item.content}}</view>
			</view>
			<u-steps :list="numList" :current="item.status" style="margin-top: 10px;"></u-steps>
			<view style="display: flex;">
				<u-tag :text="item.time + '  提问'" type="info" shape="circle" style="margin-top: 10px;" />
				<u-button v-show="item.feedback == 'NULL'" type="primary" shape="circle" :disabled="true"
					style="margin-top: 10px; margin-right: 10px; height: 30px;">暂无回答</u-button>
				<u-button v-show="item.feedback != 'NULL'" type="primary" shape="circle"
					style="margin-top: 10px; margin-right: 10px; height: 30px;" @click="getFeedback">查看回答</u-button>
				<u-popup v-model="show" mode="center" border-radius="14" width="400rpx" height="200px">
					<view style="margin-left: 20px; margin-top: 20px;">
						<u-tag text="管理员回答了问题" type="info"/>
						<view style="display: flex;">
							<u-tag text="答" shape="circle" mode="dark"  style="margin-top: 10px;"/>
							<view style="margin-top: 10px; margin-left: 5px;">{{item.feedback}}</view>
						</view>

					</view>
				</u-popup>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				loadStatus: 'loadmore',
				flowList: [{
					index: 0,
					status: 0,
					content: "想增加可视化功能",
					feedback: "NULL",
					time: "2018-10-01"
				}, {
					index: 1,
					status: 1,
					content: "想增加可视化功能",
					feedback: "我们将尽快处理",
					time: "2018-10-03"
				}],
				numList: [{
					name: '未处理'
				}, {
					name: '处理中'
				}, {
					name: '已处理'
				}, ],
			}
		},

		methods: {
			getFeedback() {
				this.show = true
			}
		}
	}
</script>

<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>

<style lang="scss" scoped>
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}
</style>