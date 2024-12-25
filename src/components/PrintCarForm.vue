<template>
	<div class="container">
		<el-button class="print-hide" style="position: absolute; right: 20px; top: 20px" type="primary" @click="print">打印</el-button>
		<div style="text-align: center; font-size: 30px;">平远县殡仪馆派车单</div>
		<div style="display: flex; justify-content: space-between; margin-top: 20px; padding: 20px 5px;">
			<div>业务编号：{{carform.number}}</div>
			<div>制单人：{{formMaker.name}}</div>
			<div>制表日期：{{formItem.create_time}}</div>
		</div>
		<table border="1" style="border-collapse: collapse;text-align: center;">
			<tr>
				<td class="title">逝者姓名:</td>
				<td class="title">{{formItem.name}}</td>
				<td class="title">性别:</td>
				<td class="title">{{formItem.info.sex==1?'男':'女'}}</td>
				<td class="title">年龄:</td>
				<td class="title">{{formItem.info.age}}岁</td>
			</tr>
			<tr>
				<td class="title">死亡原因:</td>
				<td colspan="3" class="title">{{carform.death_reason}}</td>
				<td class="title">民族:</td>
				<td class="title">{{carform.nation==1?'汉':'其他'}}</td>
			</tr>
			<tr>
				<td class="title">遗体类型:</td>
				<td colspan="2" class="title">{{carform.body_type}}</td>
				<td class="title">存放方式:</td>
				<td colspan="4" class="title">
					<div class="flex-box">
						<div class="flex-box" v-for="(item, index) in list" :key="index+1">
							<input type="radio" :value="item.value" :checked="index+1==Number(carform.store_method)" :disabled="true"/>
							<div>{{item.value}}</div>
						</div>
					</div>
				</td>
			</tr>
			<tr>
				<td class="title">联系人:</td>
				<td colspan="2" class="title">{{carform.contacts}}</td>
				<td class="title">联系电话:</td>
				<td colspan="3" class="title">{{carform.phone}}</td>
			</tr>
			<tr>
				<td class="title">接运地址;</td>
				<td colspan="6" class="title">{{carform.transport_address}}</td>
			</tr>
			<tr>
				<td class="title">接运时间:</td>
				<td colspan="2" class="title">{{carform.transport_time}}</td>
				<td class="title">择时:</td>
				<td colspan="2" class="title">{{carform.mark_time}}</td>
			</tr>
			<tr>
				<td class="title">车辆:</td>
				<td colspan="2" class="title">{{carInfo.name}}</td>
				<td class="title">冷藏地址:</td>
				<td colspan="2" class="title">{{carform.cell_address}}</td>
			</tr>
			<tr>
				<td class="title">出车人员:</td>
				<td colspan="2">
					<div style="display: flex; align-items: center; text-align: center; justify-content: space-around;">
						<div v-for="carUser in carform.carUerNames" :key="carUser">{{carUser}}</div>
					</div>
				</td>
				<td class="title">出车负责:</td>
				<td colspan="2" class="title">{{caradmin.name}}</td>
			</tr>
			<tr>
				<td class="title">家属签名:</td>
				<td colspan="6" class="title">{{carform.remark}}</td>
			</tr>
		</table>
	</div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
export default {
  name: 'PrintCarForm',
  components: {
    QrcodeVue
  },
  data () {
    return {
      carform: {},
      formItem: {},
      formMaker: {},
      caradmin: {},
      carInfo: {},
      list: [ {value: '冷藏库'}, {value: '单间冷藏库'}, {value: '停尸间'} ]
    }
  },
  created () {
    this.initData()
  },
  methods: {
    print () {
      window.print()
    },
    initData () {
      this.carform = JSON.parse(sessionStorage.getItem('carform'))
      this.formItem = JSON.parse(sessionStorage.getItem('formItem'))
      this.formMaker = JSON.parse(sessionStorage.getItem('formMaker'))
      this.caradmin = JSON.parse(sessionStorage.getItem('caradmin'))
      this.carInfo = JSON.parse(sessionStorage.getItem('carInfo'))
    }
  },
  computed: {
  }
}
</script>

<style scoped>
.container {
    width: 794px;
    height: 1123px;
    background: #fff;
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 2cm;
    padding-left: 2cm;
    padding-right: 2cm;
    font-size: 14;
    font-weight: 900;
    display: flex;
    flex-direction: column;
    position: relative;
}
.title {
    width: 50px;
    height: 100px;
    white-space: nowrap;
    text-align: center;
}
td {
  font-weight: 400;
  padding: 5px 2px;
  box-sizing: border-box;
}
th {
  font-weight: bold;
}
.center {
  text-align: center;
}
.ft13 {
  font-size: 13px;
}
.flex-box {
  display: flex;
  margin: 5px 5px 5px 5px;
  text-align: center;
}
::v-deep .el-radio__label{
  color: #ABABAB;
  margin-right:10px;
  font-size: 12px;
}
@page {
    size: A4;
}
@media print {
  .print-hide {
      display: none;
    }
}
</style>
