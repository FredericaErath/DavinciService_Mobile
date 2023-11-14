<template>
	<view class="page">
		<!-- 个人信息卡片 -->
		<view class="userinfo-wrap box-shadow">
			<!-- 个人信息 -->
			<view class="userinfo">
				<view class="user">
					<u-avatar src="" size="120" show-level></u-avatar>
					<view class="info">
						<view class="nickname">
							未登录
						</view>
						<view class="mobile">
							登录后可享受更多服务
						</view>
					</view>
				</view>
				<u-icon name="arrow-right" size="24"></u-icon>
			</view>
		</view>
		
		<!-- 菜单 -->
		<view class="menu-list-wrap box-shadow">
			<view class="menu-item"   @click="messageCenter">
				<view class="menu-title-wrap">
					<u-icon class="u-m-r-10" name="/static/icon/suggest.png" size="36"></u-icon>
					<text class="title">意见中心</text>
				</view>
				<u-icon name="arrow-right" size="24"></u-icon>
			</view>
			<view class="menu-item" style="margin-top: 10px;">
				<view class="menu-title-wrap">
					<u-icon class="u-m-r-10" name="/static/icon/setting.png" size="36"></u-icon>
					<text class="title">设置</text>
				</view>
				<u-icon name="arrow-right" size="24"></u-icon>
			</view>
		</view>
		<!-- 做题记录 -->

	</view>
</template>
<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		methods: {
			messageCenter(){
				uni.navigateTo({
					url: '/pages/doctor/message_center'
				},)
			}
		}
	}
</script>
<style lang="scss">
	.page {
		min-height: 100vh;
		background-color: #f3f4f7;
	}
	.userinfo-wrap {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		background-color: #fff;
		padding: 32rpx;
		width: 100%;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		position: relative;

		.userinfo {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20rpx;

			.user {
				display: flex;
				align-items: center;

				.info {
					margin-left: 20rpx;

					.nickname {
						font-size: 32rpx;
						font-weight: bold;
						color: #303133;
						margin-bottom: 5rpx;
					}

					.mobile {
						font-size: 28rpx;
						color: #909399;
					}
				}
			}
		}

		.datainfo {
			width: 100%;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			padding: 0 20rpx;

			.data-item {
				display: flex;
				flex-direction: column;
				align-items: center;

				.data {
					font-weight: bold;
					font-size: 68rpx;
					line-height: 68rpx;
					margin-bottom: 10rpx;
				}

				.item {
					font-size: 24rpx;
					color: #606266;
				}
			}
		}
	}
	

	// 菜单列表
	.menu-list-wrap {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		background-color: #fff;
		padding: 32rpx;
		width: 100%;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		position: relative;

		.menu-item {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 0;

			.menu-title-wrap {
				display: flex;
				align-items: center;

				.title {
					font-size: 32rpx;
				}
			}
		}
	}

	.practice-data-wrap {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		background-color: #fff;
		padding: 32rpx;
		width: 100%;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		position: relative;

		.title-wrap {
			width: 100%;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;

			.time-wrap {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				margin-bottom: 20rpx;

				.time-title {
					font-size: 28rpx;
					color: #606266;
				}

				.time-data {
					display: flex;
					align-items: flex-end;

					.time {
						font-size: 44rpx;
						font-weight: bold;
					}

					.sub {
						font-size: 28rpx;
						color: #606266;
					}
				}
			}

			.date {
				color: #606266;
				font-size: 28rpx;
				padding: 5rpx 15rpx;
				background-color: #f3f4f6;
				border-radius: 20rpx;
			}
		}
	}
</style>