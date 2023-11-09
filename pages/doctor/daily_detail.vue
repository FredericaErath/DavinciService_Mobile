<template>
	<view class="page">
		<view class="wrap">
			<view>
				<lxCalendar :value="date" @change="change" style="margin-left: -5%;"></lxCalendar>
			</view>
			<view class="wrap_info1">
				<view class="title" style="font-size: 35rpx;">
					手术总量
				</view>
				<view class="title" style="margin-top: 3%;">
					{{surgery_count}}
				</view>
				<view class="text" style="margin-top: 3%;">
					您超过了{{sur_percent*100}}%的用户
				</view>
				<view class="charts-box1">
					<qiun-data-charts type="arcbar" :opts="opts_arcbar1" :chartData="chartData1" />
				</view>
			</view>
		</view>
		<view class="wrap" style="margin-top: 5%;">
			<view class="wrap_info">
				<view class="title" style="font-size: 33rpx; margin-top: 15%; margin-left: -75%;">
					您今天的手术总时长为
					{{total_hours}}
					小时
				</view>
				<view class="charts-line-box">
					<qiun-data-charts type="line" :opts="opts_line" :chartData="chartData_line" />
				</view>
			</view>
		</view>
		<view style="display: flex; margin-top: 5%;">
			<view class="wrap">
				<view class="wrap_info">
					<view class="title" style="font-size: 25rpx; margin-top: 15%; margin-left: -67%;">
						使用的器械数量超过{{ins_percent*100}}%用户
					</view>
					<view class="charts-box">
						<qiun-data-charts type="arcbar" :opts="opts_arcbar2" :chartData="chartData2" />
					</view>
				</view>
			</view>
			<view class="wrap" style="margin-left: 2%;">
				<view class="wrap_info">
					<view class="title" style="font-size: 25rpx; margin-top: 15%; margin-left: -67%;">
						使用的耗材数量超过{{con_percent*100}}%用户
					</view>
					<view class="charts-box">
						<qiun-data-charts type="arcbar" :opts="opts_arcbar3" :chartData="chartData3" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import lxCalendar from '@/components/lx-calendar/lx-calendar.vue'
	import {get_surgery_by_date} from '@/network/backend_api.js'
	export default {
		components: {
			lxCalendar,
		},
		data() {
			return {
				title: 'daily_detail',
				date: '',
				surgery_count: '0', 
				line_data: [{name: "", data:[0]}],
				line_category: [0],
				total_hours: 0,
				sur_percent: 0,
				ins_percent: 0,
				con_percent: 0,
				chartData1: {},
				chartData2: {},
				chartData3: {},
				chartData_scatter: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['scatter'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				chartData_line: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts_line: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 10, 0, 15],
					dataLabel: false,
					enableScroll: false,
					legend: {},
					xAxis: {
						disabled: true,
						axisLine: false,
						disableGrid: true
					},
					yAxis: {
						disabled: true,
						axisLine: false,
						disableGrid: true,
					},
					extra: {
						line: {
							type: "step",
							width: 2,
							activeType: "hollow"
						}
					}
				},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['arcbar'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts_arcbar1: {
					color: ["#FAC858", "#EE6666", "#FC8452"],
					padding: undefined,
					title: {
						name: "0%",
						fontSize: 35,
						color: "#2fc25b"
					},
					subtitle: {
						name: "超过用户",
						fontSize: 0,
						color: "#666666"
					},
					extra: {
						arcbar: {
							type: "default",
							width: 12,
							backgroundColor: "#E9E9E9",
							startAngle: 0.75,
							endAngle: 0.25,
							gap: 2,
							linearType: "custom"
						}
					}
				},
				opts_arcbar2: {
					color: ["#FAC858", "#EE6666", "#FC8452"],
					padding: undefined,
					title: {
						name: this.ins_name,
						fontSize: 35,
						color: "#2fc25b"
					},
					subtitle: {
						name: "超过用户",
						fontSize: 0,
						color: "#666666"
					},
					extra: {
						arcbar: {
							type: "default",
							width: 12,
							backgroundColor: "#E9E9E9",
							startAngle: 0.75,
							endAngle: 0.25,
							gap: 2,
							linearType: "custom"
						}
					}
				},
				opts_arcbar3: {
					color: ["#FAC858", "#EE6666", "#FC8452"],
					padding: undefined,
					title: {
						name: this.con_name,
						fontSize: 35,
						color: "#2fc25b"
					},
					subtitle: {
						name: "超过用户",
						fontSize: 0,
						color: "#666666"
					},
					extra: {
						arcbar: {
							type: "default",
							width: 12,
							backgroundColor: "#E9E9E9",
							startAngle: 0.75,
							endAngle: 0.25,
							gap: 2,
							linearType: "custom"
						}
					}
				}
			}
		},
		onReady() {
			this.getArcBar1Data();
			this.getArcBar2Data();
			this.getArcBar3Data();
			this.getLineData();
		},
		onLoad: function(data) {
			this.date = data.date
			this.surgery_count = data.surgery
			get_surgery_by_date({u_id: "woshiyisheng", date: new Date(data.date)}).then(res=>{
				this.line_data = res.data.series
				this.line_category = res.data.categories
				this.total_hours = res.data.len
				this.sur_percent = res.data.sur_percent
				this.ins_percent = res.data.ins_percent
				this.con_percent = res.data.con_percent
				this.opts_arcbar1.title.name = (res.data.sur_percent*100).toString() + "%"
				this.opts_arcbar2.title.name = (res.data.ins_percent*100).toString() + "%"
				this.opts_arcbar3.title.name = (res.data.con_percent*100).toString() + "%"
			})
		},

		methods: {
			change(e) {
				this.date = e.fulldate
				get_surgery_by_date({u_id: "woshiyisheng", date: new Date(e.fulldate)}).then(res=>{
					this.line_data = res.data.series
					this.line_category = res.data.categories
					this.total_hours = res.data.len
					this.sur_percent = res.data.sur_percent
					this.ins_percent = res.data.ins_percent
					this.con_percent = res.data.con_percent
					this.opts_arcbar1.title.name = (res.data.sur_percent*100).toString() + "%"
					this.opts_arcbar2.title.name = (res.data.ins_percent*100).toString() + "%"
					this.opts_arcbar3.title.name = (res.data.con_percent*100).toString() + "%"
				})
			},
			getLineData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: this.line_category,
						series: this.line_data
					};
					this.chartData_line = JSON.parse(JSON.stringify(res));
				}, 500);
			},
			getArcBar1Data() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						series: [{
							name: "超过用户",
							color: "#2fc25b",
							data: this.sur_percent
						}]
					};
					this.chartData1 = JSON.parse(JSON.stringify(res));
				}, 500);
			},
			
			getArcBar2Data() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						series: [{
							name: "超过用户",
							color: "#2fc25b",
							data: this.ins_percent
						}]
					};
					this.chartData2 = JSON.parse(JSON.stringify(res));
				}, 500);
			},
			
			
			getArcBar3Data() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						series: [{
							name: "超过用户",
							color: "#2fc25b",
							data: this.con_percent
						}]
					};
					this.chartData3 = JSON.parse(JSON.stringify(res));
				}, 500);
			},
			
			

		}
	}
</script>

<style lang="scss">
	.charts-box1 {
		width: 300rpx;
		height: 300rpx;
	}

	.charts-box {
		width: 300rpx;
		height: 300rpx;
		margin-left: -38%;
	}

	.charts-scatter-box {
		margin-left: 3%;
		width: 95%;
	}

	.charts-line-box {
		width: 110%;
		margin-left: -43%;
		margin-top: -38%;
	}

	.page {
		min-height: 100vh;
		background-color: #f3f4f7;

		.wrap {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			background-color: #fff;
			padding: 32rpx;
			width: 100%;
			border-radius: 10rpx;
			position: relative;


		}

		.wrap_info {
			margin-left: 36%;
			margin-top: -10%;

			.title {
				text-align: center;
				font-size: 55rpx;
				font-weight: bold;
			}

			.text {
				text-align: center;
				font-size: 25rpx;
			}
		}

		.wrap_info1 {
			margin-left: 30%;
			margin-top: -10%;

			.title {
				text-align: center;
				font-size: 55rpx;
				font-weight: bold;
			}

			.text {
				text-align: center;
				font-size: 25rpx;
			}
		}
	}
</style>