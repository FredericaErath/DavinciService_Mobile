<template>
	<view class="page">
		<!-- 个人信息卡片 -->
		<view class="userinfo-wrap box-shadow">
			<!-- 个人信息 -->

			<view class="userinfo" @click="onclick_detail">
				<view class="user">
					<view class="info">
						<view class="nickname">
							欢迎回来! 用户1
						</view>
						<view class="mobile">
							点击查看本月数据详情
						</view>
					</view>
				</view>
				<u-icon name="arrow-right" size="24"></u-icon>
			</view>
			<!-- 数据信息 -->
			<view class="datainfo">
				<view class="data-item">
					<view style="display: flex;">
						<view class="logo">
							<u-icon name="order" color="#55aaff" size="90"></u-icon>
						</view>
						<view>
							<view class="data">{{surgery_count}}</view>
							<view class="item">
								手术量
							</view>
						</view>
					</view>
				</view>
				<view class="data-item">
					<view style="display: flex;">
						<view class="logo">
							<u-icon name="cut" color="#aaaaff" size="90"></u-icon>
						</view>
						<view>
							<view class="data">
								{{instrument_count}}
							</view>
							<view class="item">
								器械量
							</view>
						</view>
					</view>
				</view>
				<view class="data-item">
					<view style="display: flex;">
						<view class="logo">
							<u-icon name="trash" color="#55557f" size="90"></u-icon>
						</view>
						<view>
							<view class="data">
								{{consumable_count}}
							</view>
							<view class="item">
								耗材量
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!-- 菜单 -->
		<view class="menu-list-wrap box-shadow">
			手术时间序列
			<view style="margin-top: 5px; width: 100%;">
				<u-subsection font-size="32" :list="subsection_list" :current="current" :animation="true"
					button-color="#eeeeef" @change="onSubsectionChange"></u-subsection>
			</view>
			<view class="time">

				<view class="charts-box">
					<qiun-data-charts type="column" :opts="opts" :chartData="chartData" />
				</view>
			</view>
		</view>
		<!-- 做题记录 -->
		<view class="practice-data-wrap box-shadow">
			<view class="title-wrap">
				<view class="time-wrap">
					<view class="time-data">
						<view class="time">
							2.6
						</view>
						<view class="sub">
							小时
						</view>
					</view>
					<view class="time-title">
						本月手术共计
					</view>
				</view>
				<view class="date">
					2023年10月
				</view>
			</view>
			<view>
				<hot-calendar cellWidth="68rpx" cellMargin="8rpx" :cellData="hotCalendarArr" :showDay="true"
					:showEarly="true" @cellTap="hotCalendarClick"></hot-calendar>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		get_general_data,
		get_surgery_time_series,
		get_doctor_contribution,
		get_surgery_by_date
	} from '@/network/backend_api.js'
	export default {
		data() {
			return {
				surgery_count: 0,
				instrument_count: 0,
				consumable_count: 0,
				series_category: [],
				series_data: [],
				chartData: {},
				subsection_list: [{
						name: '按年'
					},
					{
						name: '按月'
					}
				],
				current: 0,
				opts: {
					color: ["#00557f"],
					padding: [15, 15, 0, 5],
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true,
						axisLine: false
					},
					yAxis: {
						disabled: true,
						disableGrid: true,
						data: [{
							min: 0
						}]
					},
					extra: {
						column: {
							type: "group",
							width: 30,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08,
							linearType: "custom",
							seriesGap: 5,
							linearOpacity: 0.5,
							barBorderCircle: true,
							customColor: [
								"#55aaff"
							]
						}
					},
				},
				hotCalendarArr: []
			};
		},
		onReady() {
			this.initialize()
			this.getServerData();
		},
		methods: {
			initialize() {
				get_general_data({
					u_id: "woshiyisheng"
				}).then(res => {
					this.surgery_count = res.data.surgery_count
					this.instrument_count = res.data.instrument_count
					this.consumable_count = res.data.consumables_count
				})
				get_surgery_time_series({
					u_id: "woshiyisheng",
					mode: "year"
				}).then(res => {
					this.series_category = res.data.category
					this.series_data = res.data.data
				})
				get_doctor_contribution({
					u_id: "woshiyisheng"
				}).then(res => {
					this.hotCalendarArr = res.data
				})
			},
			onSubsectionChange(index) {
				if (index == 1) {
					get_surgery_time_series({
						u_id: "woshiyisheng",
						mode: "month"
					}).then(res => {
						this.series_category = res.data.category
						this.series_data = res.data.data
						this.getServerData();
					})
				}
				if (index == 0) {
					get_surgery_time_series({
						u_id: "woshiyisheng",
						mode: "year"
					}).then(res => {
						this.series_category = res.data.category
						this.series_data = res.data.data
						this.getServerData();
					})
				}
			},
			onclick_detail() {
				uni.navigateTo({
					url: '/pages/doctor/dashboard_detail'
				})
			},
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: this.series_category,
						series: [{
							name: "手术量",
							data: this.series_data
						}]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
			hotCalendarClick(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/doctor/daily_detail?date=' + item + '&surgery=' + this.surgery_count.toString(),
					success: function(res) {
					// 成功跳转时的回调
					// 通过eventChannel向被打开的页面传送数据
					res.eventChannel.emit('date', {
						data: item
					});
				},
				})
				
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

				.logo {
					font-weight: bold;
					font-size: 55rpx;
					line-height: 55rpx;
					margin-right: 15rpx;
				}

				.data {
					font-weight: bold;
					font-size: 50rpx;
					line-height: 50rpx;
					margin-bottom: 2rpx;
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