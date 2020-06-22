<template>
	<view class="content">
		<scroll-view>
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
					<view class="title">产品批次</view>
					<!-- <input class="uni-input" name="pici" v-model="formData.productId" placeholder="请选择产品批次" /> -->
					<picker @change="onChangeProduct" :value="productIndex" :range="productOption">
						<view class="uni-input">{{ productOption[productIndex] || "请选择产品批次" }}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">农事名称</view>
					<!-- <input class="uni-input" name="name" v-model="formData.eventId" placeholder="请输入农事名称" /> -->
					<picker @change="onChangeEvent" :value="eventIndex" :range="eventOption">
						<view class="uni-input">{{ eventOption[eventIndex] || "请选择农事名称" }}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">农事说明</view>
					<textarea class="uni-textarea" placeholder="选择农事名称后带入" disabled :value="eventDesc" auto-height />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">实施日期</view>
					<picker mode="date" :value="formData.checkDate" :start="startDate" :end="endDate" @change="onDateChange">
						<view class="uni-input">{{ formData.checkDate }}</view>
						<!-- <input class="uni-input" name="date" v-model="formData.checkDate" placeholder="请选择实施日期" /> -->
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">操作人员</view>
					<!-- <input class="uni-input" name="user" v-model="formData.checkUserId" placeholder="请选择操作人员" /> -->
					<picker @change="onChangeUser" :value="userIndex" :range="userOption">
						<view class="uni-input">{{ userOption[userIndex] || "请选择操作人员" }}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">图片记录</view>
					<input class="uni-input" v-model="formData.img" placeholder="请选择图片" />
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">提交</button>
					<!-- <button type="default" form-type="reset">重置</button> -->
				</view>
			</form>
		</scroll-view>
	</view>
</template>

<script>
import service from "@/service.js";
	
export default {
	onLoad(option) {
		//option为object类型，会序列化上个页面传递的参数
		console.log(option.id); //打印出上个页面传递的参数。
		if (option.id) {
			this.formData.id = option.id;
		} else {
			this.formData.id = '';
		}
	},
	data() {
		const now = this.getDate();
		return {
			formData: {
				id: '',
				productId: '',
				eventId: '',
				checkDate: now,
				checkUserId: ''
			},
			productIndex: null,
			productOption: [
				"批次一",
				"批次二",
			],
			eventIndex: null,
			eventOption: [
				"注水",
				"培养"
			],
			userIndex: null,
			userOption: [
				"小黑",
				"小白"
			],
			eventDesc: ''
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	mounted(){
		this.getProductPiciOption();
		this.getEventOption();
		this.getUserOption();
		
		this.getEventInfo();
	},
	methods: {
		async getEventInfo(){
			const id = this.formData.id;
			const res = await service.getEventInfo(id);
			if(res.success){
				this.formData = res.data;
			}else{
				uni.showToast({
					icon: 'none',
					title: res.errorMsg,
				});
			}
		},
		async getProductPiciOption(){
			const res = await service.getProductArchive();
			if(res.success){
				this.productOption = res.data;
			}else{
				uni.showToast({
					icon: 'none',
					title: res.errorMsg,
				});
			}
		},
		async getEventOption(){
			const res = await service.getEventNames();
			if(res.success){
				this.eventOption = res.data;
			}else{
				uni.showToast({
					icon: 'none',
					title: res.errorMsg,
				});
			}
		},
		async getUserOption(){
			const res = await service.getUsers();
			if(res.success){
				this.userOption = res.data;
			}else{
				uni.showToast({
					icon: 'none',
					title: res.errorMsg,
				});
			}
		},
		onChangeProduct(e){
			this.productIndex = e.target.value;
			this.formData.productId = e.target.value;
		},
		onChangeEvent(e){
			this.eventIndex = e.target.value;
			this.formData.eventId= e.target.value;
		},
		onChangeUser(e){
			this.userIndex = e.target.value;
			this.formData.checkUserId= e.target.value;
		},
		onDateChange(e) {
			this.formData.checkDate = e.target.value;
		},
		formSubmit: function(e) {
			console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
			var formdata = this.formData;
			uni.showModal({
				content: '表单数据内容：' + JSON.stringify(formdata),
				showCancel: false
			});
			
			uni.navigateBack({
			    delta: 1
			});
		},
		// formReset: function(e) {
		// 	console.log('清空数据');
		// },
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
		
			if (type === 'start') {
				year = year - 1;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		}
	}
};
</script>

<style>
.uni-form-item {
	display: flex;
	width: 100%;
	padding: 10rpx 0;
}
.uni-column {
	flex-direction: column;
}
.uni-form-item .title {
	padding: 20rpx 0;
}
.uni-input {
	height: 50rpx;
	padding: 14rpx 24rpx;
	line-height: 50rpx;
	font-size: 28rpx;
	background: #fff;
	flex: 1;
	display: block;
	min-height: 1.4em;
	overflow: hidden;
}
.uni-textarea {
	width: auto;
	height: auto;
	max-height: 100rpx;
	padding: 14rpx 24rpx;
	line-height: 50rpx;
	font-size: 28rpx;
	background: #fff;
	flex: 1;
	display: block;
	min-height: 1.4em;
	overflow: hidden;
}
.uni-btn-v{
	margin-top: 30rpx;
}
</style>
