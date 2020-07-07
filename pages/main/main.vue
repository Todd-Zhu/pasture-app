<template>
	<view class="content">
		<view class="mtable">
			<view class="mtable__thead">
				<view class="mtable__thead__td" :style="{ width: item.width + '%' }" v-for="(item, idx) in title" :key="idx">{{ item.label }}</view>
			</view>
			<view class="mtable__tbody">
				<view v-for="(row, idx) in tableData" :key="idx" class="mtable__tr">
					<view v-for="(item, index) in title" :key="index" class="mtable__td" :style="{ width: item.width + '%' }">
						<text v-if="item.value !== 'action'">{{ row[item.value] }}</text>
						<uni-icons @tap="onEditEvent(row.id)" v-else type="compose" size="24" color="#007AFF"></uni-icons>
					</view>
				</view>
			</view>
		</view>

		<uni-pagination @change="onChangePage" title="" :total="pageData.total" :pageSize="pageData.size"></uni-pagination>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniPagination from '@/components/uni-pagination/uni-pagination.vue';
import service from '@/service.js';

export default {
	components: { uniIcons, uniPagination },
	computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
	onLoad() {
		if (!this.hasLogin) {
			uni.showModal({
				title: '未登录',
				content: '您未登录，需要登录后才能继续',
				/**
				 * 如果需要强制登录，不显示取消按钮
				 */
				showCancel: !this.forcedLogin,
				success: res => {
					if (res.confirm) {
						/**
						 * 如果需要强制登录，使用reLaunch方式
						 */
						if (this.forcedLogin) {
							uni.reLaunch({
								url: '../login/login'
							});
						} else {
							uni.navigateTo({
								url: '../login/login'
							});
						}
					}
				}
			});
		}
	},
	data() {
		const title = [
			{
				label: '农产品',
				value: 'productName',
				width: 20
			},
			{
				label: '农事名称',
				value: 'eventName',
				width: 35
			},
			{
				label: '日期',
				value: 'checkDate',
				width: 40
			},
			{
				label: '',
				value: 'action',
				width: 5
			}
		];
		const tableData = [
			// {
			// 	id: "1",
			// 	product: '香菇',
			// 	eventName: '拌料',
			// 	date: '2020/06/20',
			// 	action: ''
			// },
			// {
			// 	id: "2",
			// 	product: '香菇',
			// 	eventName: '注水',
			// 	date: '2020/06/21',
			// 	action: ''
			// }
		];
		return {
			title: title,
			tableData: tableData,
			pageData: {
				current: 1,
				total: 0,
				size: 10
			}
		};
	},
	mounted() {
		this.getEventList();
	},
	methods: {
		async getEventList() {
			const param = {
				page: this.pageData.current,
				size: this.pageData.size
			};
			const res = await service.getEventList(param);
			if (res.success) {
				const data = res.body;
				this.tableData = data.results;
				this.pageData.total = data.count;
			} else {
				uni.showToast({
					icon: 'none',
					title: res.errorMsg
				});
			}
		},
		onChangePage(type, current) {
			this.pageData.current = current;
			this.getEventList();
		},
		onEditEvent(id) {
			uni.navigateTo({
				url: `/pages/event/edit?id=${id}`
			});
		}
	}
};
</script>

<style>
.mtable {
	text-align: center;
	margin-bottom: 40rpx;
}
.mtable__thead {
	display: flex;
	border-bottom: 1rpx solid #e5e5e5;
	box-shadow: 5rpx 0 5rpx #eee;
}
.mtable__thead__td {
	box-sizing: border-box;
	position: relative;
	/* padding: 0 20rpx; */
	min-width: 100rpx;
	height: 88rpx;
	line-height: 88rpx;
	font-size: 30rpx;
	white-space: nowrap;
	color: #666;
	border: 1rpx solid #e5e5e5;
	border-bottom: none;
	border-right: none;
	background-color: #dddddd;
}
.mtable__tbody {
	overflow-x: auto;
	border-right: 1rpx solid #e5e5e5;
	border-bottom: 1rpx solid #e5e5e5;
}
.mtable__tr {
	display: flex;
}
.mtable__td {
	box-sizing: border-box;
	padding: 0 20rpx;
	line-height: 88rpx;
	font-size: 30rpx;
	color: #666;
	min-width: 100rpx;
	height: 88rpx;
	border: 1rpx solid #e5e5e5;
	border-bottom: none;
	border-right: none;
}
.mtable__edit {
	color: #007aff;
}
</style>
