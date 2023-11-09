<template>
	<view class="content">
		<u-form :model="form" ref="uForm">
			<u-form-item>手术名称：<u-input v-model="form.name" /></u-form-item>
			<u-form-item>患者姓名：<u-input v-model="form.intro" /></u-form-item>
			<u-form-item>主刀：<u-input v-model="form.chief_surgeon" type="select" @click="show1 = true" />
				<u-action-sheet :list="chiefSheet" v-model="show1" @click="actionChiefList"></u-action-sheet>
			</u-form-item>
			<u-form-item>一助：<u-input v-model="form.associate_surgeon" type="select" @click="show2 = true" />
				<u-action-sheet :list="associateSheet" v-model="show2" @click="actionAssociateList"></u-action-sheet>
			</u-form-item>
			<u-form-item>手术日期：<u-input v-model="form.date" type="select" @click="show3 = true" /><u-picker mode="time"
					v-model="show3" @confirm="confirmDate"></u-picker></u-form-item>
			<u-form-item>住院号：<u-input v-model="form.admission_number" /></u-form-item>
			<u-form-item>科室：<u-input v-model="form.department" type="select" @click="show4 = true" />
				<u-action-sheet :list="d_options" v-model="show4" @click="actionDepList"></u-action-sheet>
			</u-form-item>
			<u-form-item>器械护士：
				<view style="width: 80%;">
					<rudon-multiSelector :is_using_slot="false" :is_using_icon="true" :localdata="n_options"
						@change="whenChanged1">
						<view>
							{{JSON.stringify(n_options)}}
						</view>
					</rudon-multiSelector>
				</view>
			</u-form-item>
			<u-form-item>巡回护士：
				<view style="width: 80%;">
					<rudon-multiSelector :is_using_slot="false" :is_using_icon="true" :localdata="n_options2"
						@change="whenChanged2">
						<view>
							{{JSON.stringify(n_options2)}}
						</view>
					</rudon-multiSelector>
				</view>
			</u-form-item>
			<u-form-item>时间段：
				<view style="width: 80%;">
					<view class="example-body">
						<uni-datetime-picker v-model="form.time" type="datetimerange" rangeSeparator="至" />
					</view>
				</view>
			</u-form-item>
			<u-form-item>器械：
				<view>
					{{instrumentSelectList}}
				</view>
				<u-button style="margin-right: 5rpx; max-height: 60rpx; max-width: 170rpx;"
					@click="show6=true">+添加器械</u-button>
				<u-popup v-model="show6" mode="bottom">
					<view>
						扫码导入器械信息：
						<view style="display: flex; height: 70rpx;">
							<u-input v-model="instrument.i_id"></u-input>
							<u-icon name="scan" size="50" style="margin-right: 10rpx" @click="scanCodeHandler"></u-icon>
						</view>
						备注：<u-input v-model="instrument.description"></u-input>
						<u-button @click="onSubmitIns">确定</u-button>
						<u-button @click="onCancelIns">取消</u-button>
					</view>
				</u-popup>
			</u-form-item>
			<u-form-item>耗材：
				<view>
					{{consumableSelectList}}
				</view>
				<u-button style="margin-right: 5rpx; max-height: 60rpx; max-width: 170rpx;"
					@click="show7=true">+添加耗材</u-button>
				<u-popup v-model="show7" mode="bottom">
					<view>
						选择耗材类型：
						<view style="display: flex; height: 70rpx;">
							<u-input v-model="consumable.name" type="select" @click="show8 = true" />
							<u-action-sheet :list="c_options" v-model="show8" @click="actionConList"></u-action-sheet>
						</view>
						备注：<u-input v-model="consumable.description"></u-input>
						<u-button @click="onSubmitCon">确定</u-button>
						<u-button @click="show7=false">取消</u-button>
					</view>
				</u-popup>
			</u-form-item>
			<u-button style="margin-top: 5%;" @click="OnSubmitSur">提交</u-button>
		</u-form>
	</view>
</template>

<script>
	import {
		get_users_api,
		get_instrument,
		insert_surgery,
	} from '@/network/backend_api.js'
	export default {
		data() {
			return {
				form: {
					name: '',
					intro: '',
					chief_surgeon: '',
					associate_surgeon: '',
					date: '',
					admission_number: '',
					department: '',
					instrument_nurse: [],
					circulating_nurse: [],
					time: '',
					instruments: [],
					consumables: [],
				},
				instrument: {
					i_id: "",
					name: "",
					times: "",
					description: "默认"
				},
				consumable: {
					name: "",
					description: "默认"
				},
				d_options: [{
					"text": '肝脾外科'
				}, {
					"text": '胃肠外科'
				}, {
					"text": '泌尿外科'
				}, {
					"text": '胆胰外科'
				}, {
					"text": '胸外科'
				}, {
					"text": '妇科'
				}, {
					"text": '心脏外科'
				}],
				c_options: [{
					"text": '无菌壁套'
				}],
				n_options: [],
				n_options2: [],
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				show5: false,
				show6: false,
				show7: false,
				show8: false,
				chiefSheet: [],
				associateSheet: [],
				consumableSelectList: "",
				instrumentSelectList: "",
			};
		},
		created() {
			this.initialize()
		},
		methods: {
			initialize() {
				this.form = {
					name: '',
					intro: '',
					chief_surgeon: '',
					associate_surgeon: '',
					date: '',
					admission_number: '',
					department: '',
					instrument_nurse: [],
					circulating_nurse: [],
					time: '',
					instruments: [],
					consumables: [],
				}
				get_users_api({
					user_type: '医生'
				}).then(res => {
					res.data.forEach(a => {
						this.chiefSheet.push({
							"text": a.name
						})
					})
					this.associateSheet = this.chiefSheet
				})
				get_users_api({
					user_type: '护士'
				}).then(res => {
					res.data.forEach(a => {
						this.n_options.push({
							"text": a.name,
							"value": a.u_id,
							"is_selected": false
						})
						this.n_options2.push({
							"text": a.name,
							"value": a.u_id,
							"is_selected": false
						})
					})
				})
			},
			scanCodeHandler() {
				let that = this
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						that.scanQR(res)
					},
					fail: function(err) {
						console.log(`错误：${err}`);
					}
				});
			},
			scanQR(data) {
				this.instrument.i_id = data.result
			},
			actionChiefList(index) {
				this.form.chief_surgeon = this.chiefSheet[index].text;
			},
			actionAssociateList(index) {
				this.form.associate_surgeon = this.associateSheet[index].text;
			},
			actionDepList(index) {
				this.form.department = this.d_options[index].text;
			},
			actionConList(index) {
				this.consumable.name = this.c_options[index].text;
			},
			confirmDate(date) {
				this.form.date = date["year"] + '/' + date["month"] + '/' + date["day"]
			},
			closeDropdown() {
				this.$refs.uDropdown.close();
			},
			whenChanged1(e1) {
				this.form.instrument_nurse = e1
			},
			whenChanged2(e) {
				this.form.circulating_nurse = e
			},
			onSubmitIns() {
				get_instrument({
					i_id: this.instrument.i_id
				}).then(res => {
					this.instrument.i_id = res.data[0].i_id
					this.instrument.name = res.data[0].i_name
					this.instrument.times = res.data[0].times
					this.form.instruments.push({i_id: this.instrument.i_id, description: this.instrument.description, times: this.instrument.times})
					if (this.instrumentSelectList == "") {
						this.instrumentSelectList = res.data[0].i_id + "号" + this.instrument.name
					} else {
						this.instrumentSelectList = this.instrumentSelectList + ", " + res.data[0].i_id + "号" +
							this.instrument.name
					}
				})
				this.instrument = {
					i_id: "",
					times: "",
					name: "",
					description: "默认"
				}
				this.show6 = false
			},
			onCancelIns() {
				this.instrument = {
					i_id: "",
					name: "",
					times: "",
					description: "默认"
				}
				this.show6 = false
			},
			onSubmitCon() {
				this.form.consumables.push(this.consumable)
				if (this.consumableSelectList == "") {
					this.consumableSelectList = this.consumable.name
				} else {
					this.consumableSelectList = this.consumableSelectList + ", " + this.consumable.name
				}
				this.consumable = {
					name: "",
					description: "默认"
				}
				this.show7 = false
			},
			OnSubmitSur() {
				insert_surgery({
					begin_time: this.form.time[0],
					end_time: this.form.time[1],
					date: new Date(this.form.date),
					admission_number: this.form.admission_number,
					department: this.form.department,
					s_name: this.form.name,
					p_name: this.form.intro,
					chief_surgeon: this.form.chief_surgeon,
					associate_surgeon: this.form.associate_surgeon,
					instrument_nurse: this.form.instrument_nurse,
					circulating_nurse: this.form.circulating_nurse,
					instruments: this.form.instruments,
					consumables: this.form.consumables,
				}).then(res => {
					if (res.status == 200) {
						this.initialize()
						uni.showToast({
							title: '手术信息登记成功！',
							duration: 2000
						});
					} else {
						uni.showToast({
							title: '手术信息登记失败！请检查输入内容',
							duration: 2000
						});
					}
				})
			}

		}
	};
</script>
<style>
	.content {
		margin-top: 6%;
		margin-left: 3%;
		margin-right: 3%;
		margin-bottom: 3%;
	}
</style>