<template>
	<view class="page">
		<view class="wrap">
			<u-swiper :list="list" height="500"></u-swiper>
		</view>

		<view class="grid">
			<view class="grid-item">1</view>
			<view class="grid-item" style="margin-left: 2%;">2</view>
		</view>
		<view class="grid">
			<view class="grid-item">1</view>
			<view class="grid-item" style="margin-left: 2%;">2</view>
		</view>
		<view class="message_card">
			<u-form class="card_content" style="margin-left: 2%;">
				<view class="card_title">
					<u-icon name="tags-fill"></u-icon>留言板
				</view>
				<u-input v-model="value" style="margin-top: 2%;" type="textarea" height="150"
					placeholder="如果有需求请留言给我们, 我们将按需更新" />
				<u-button style="margin-left: 70%; height: 50rpx; width: 30%;" @click="sendMessage">提交</u-button>
			</u-form>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import {
		send_message
	} from '@/network/backend_api.js'
	export default {
		data() {
			return {
				value: "",
				list: [{
						image: '/static/uView/swiper/swiper1.jpg',
						title: '蒹葭苍苍，白露为霜。所谓伊人，在水一方'
					},
					{
						image: '/static/uView/swiper/swiper2.jpg',
						title: '溯洄从之，道阻且长。溯游从之，宛在水中央'
					},
					{
						image: '/static/uView/swiper/swiper3.jpg',
						title: '蒹葭萋萋，白露未晞。所谓伊人，在水之湄'
					}
				]
			}
		},
		methods: {
			sendMessage() {
				send_message({
					u_id: "woshiyisheng",
					u_name: "医生1",
					message: this.value
				}).then(res => {
					if (res.data == "successful") {
						this.$refs.uToast.show({
							title: '发送成功, 管理员看到消息后会联系您',
							type: 'success'
						})
						this.value = ""
					}
					else{
						this.$refs.uToast.show({
							title: '发送失败，请检查网络',
							type: 'error'
						})
					}
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

	.wrap {
		height: 500rpx;
	}

	.grid {
		display: flex;
		margin-top: 5%;
		width: 95%;
		margin-left: 2.5%;

		.grid-item {
			flex-direction: column;
			align-items: flex-start;
			background-color: #fff;
			padding: 32rpx;
			width: 100%;
			height: 200rpx;
			border-radius: 10rpx;
			position: relative;
		}
	}

	.message_card {
		background-color: #d3dac4;
		width: 95%;
		display: flex;
		align-items: center;
		border-radius: 2%;
		height: 350rpx;
		margin-top: 15%;
		margin-left: 2.5%;

		.card_title {
			background-color: #d3dac4;
			font-size: 40rpx;
			font-weight: bold;
		}

		.card_content {
			background-color: #d3dac4;
			width: 95%;

		}
	}
</style>