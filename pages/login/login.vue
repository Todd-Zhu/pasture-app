<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				account: '',
				password: '',
				positionTop: 0,
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login','setToken']),
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			async bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (!this.account) {
					uni.showToast({
						icon: 'none',
						title: '请输入用户名'
					});
					return;
				}
				if (!this.password) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
					return;
				}
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				
				const res = await service.login(this.account, this.password);
				if(res.success){
					let data = res.body;
					const token = data.token;
					uni.setStorage({
						key : "token",
						data: token
					})
					
					this.toMain(this.account, token);
				}else{
					uni.setStorage({
						key : "token",
						data: ""
					})
					uni.showToast({
						icon: 'none',
						title: "登录失败" + (res.errorMsg || ""),
					});
				}
				// const validUser = service.getUsers().some(function(user) {
				// 	return data.account === user.account && data.password === user.password;
				// });
				// if (validUser) {
				// 	this.toMain(this.account);
				// } else {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '用户账号或密码不正确',
				// 	});
				// }
			},
			toMain(userName, token) {
				this.login(userName);
				this.setToken(token);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				// if (this.forcedLogin) {
					uni.reLaunch({
						url: '../main/main',
					});
				// } else {
				// 	uni.navigateBack();
				// }

			}
		},
		onReady() {
			this.initPosition();
		}
	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
