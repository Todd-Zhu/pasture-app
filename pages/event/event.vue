<template>
	<view class="content">
		<view>
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">产品批次</view>
					<input class="uni-input" name="pici" v-model="formData.productId" placeholder="请选择产品批次" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">农事名称</view>
					<input class="uni-input" name="name" v-model="formData.eventId" placeholder="请输入农事名称" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">农事说明</view>
					<textarea disabled="true" :value="eventDesc" auto-height />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">实施日期</view>
					<input class="uni-input" name="date" v-model="formData.checkDate" placeholder="请选择实施日期" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">操作人员</view>
					<input class="uni-input" name="user" v-model="formData.checkUserId" placeholder="请选择操作人员" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">图片记录</view>
					<input class="uni-input" name="img" v-model="formData.img" placeholder="请选择图片" />
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">提交</button>
					<button type="default" form-type="reset">重置</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
export default {
	onLoad(option) { //option为object类型，会序列化上个页面传递的参数
		console.log(option.id); //打印出上个页面传递的参数。
		if(option.id){
			this.formData.id = option.id;
		}else{
			this.formData.id = "";
		}
	},
	data() {
		return {
			formData:{
				id: "",
				productId: "",
				eventId: "",
				checkDate: "",
				checkUserId: ""
			},
			eventDesc: "",
			eventOption: [],
		};
	},
	methods: {
		formSubmit: function(e) {
			console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
			var formdata = e.detail.value;
			uni.showModal({
				content: '表单数据内容：' + JSON.stringify(formdata),
				showCancel: false
			});
		},
		formReset: function(e) {
			console.log('清空数据');
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
</style>
