<template>
  <div>
    <div class="container">
      <el-button class="print-hide" style="position: absolute; right: 20px; top: 20px" type="primary" @click="print">打印</el-button>
      <el-button class="print-hide" style="position: absolute; right: 90px; top: 20px" type="primary" @click="expierExcel">导出Excel</el-button>
      <div class="title" style="text-align: center;">
        平远县殡仪馆收费项目汇总表({{startTime}}-{{endTime}})
      </div>
      <table border="1" style="border-collapse: collapse;" ref="table">
        <tr class="ft13 center">
          <td>项目名称</td>
          <td>数量</td>
          <td>总实收</td>
          <td>项目名称</td>
          <td>数量</td>
          <td>总实收</td>
        </tr>
        <tr class="ft13">
          <td class="td1">遗体接运</td>
          <td>{{formItem.countcarryCity}}</td>
          <td class="sum">{{formItem.carryCity}}</td>
          <td>仪式主持服务</td>
          <td>{{formItem.countyishizhuchi}}</td>
          <td class="sum">{{ formItem.yishizhuchi }}</td>
        </tr>
        <tr class="ft13">
          <td>骨灰寄存</td>
          <td>{{formItem.countjicun}}</td>
          <td class="sum">{{formItem.jicun}}</td>
          <td>租用悼念厅（大型）</td>
          <td>{{formItem.countdadaolian}}</td>
          <td class="sum">{{formItem.dadaolian}}</td>
        </tr>
        <tr class="ft13">
          <td>遗体消毒</td>
          <td>{{formItem.countxiaodu}}</td>
          <td class="sum">{{formItem.xiaodu}}</td>
          <td>租用悼念厅（中型）</td>
          <td>{{formItem.countzhongdaodiao}}</td>
          <td class="sum">{{formItem.zhongdaodiao}}</td>
        </tr>
        <tr class="ft13">
          <td>遗体存放</td>
          <td>{{formItem.countcunfang}}</td>
          <td class="sum">{{formItem.cunfang}}</td>
          <td>租用休息室</td>
          <td>{{formItem.countzuyongxiuxishi}}</td>
          <td class="sum">{{formItem.zuyongxiuxishi}}</td>
        </tr>
        <tr class="ft13">
          <td>遗体告别厅租用</td>
          <td>{{formItem.countzuyong}}</td>
          <td class="sum">{{formItem.zuyong}}</td>
          <td>租用灵堂（21平方米以上）</td>
          <td>{{formItem.countzuyonglingtangda}}</td>
          <td class="sum">{{formItem.zuyonglingtangda}}</td>
        </tr>
        <tr class="ft13">
          <td>基本骨灰盒</td>
          <td>{{ formItem.countghh }}</td>
          <td class="sum">{{ formItem.ghh }}</td>
          <td>租用灵堂（20平方米以下）</td>
          <td>{{ formItem.countzuyonglingtangxiao}}</td>
          <td class="sum">{{ formItem.zuyonglingtangxiao}}</td>
        </tr>
        <tr class="ft13">
          <td>租用纸(绢)花圈</td>
          <td>{{ formItem.counthuaquan }}</td>
          <td class="sum">{{ formItem.huaquan }}</td>
          <td>资料查询、补开证明</td>
          <td>{{ formItem.countziliaochaxun }}</td>
          <td class="sum">{{ formItem.ziliaochaxun }}</td>
        </tr>
        <tr class="ft13">
          <td>其他殡葬用品</td>
          <td>{{ formItem.countqitayongpin }}</td>
          <td class="sum">{{ formItem.qitayongpin }}</td>
          <td>选用拣灰炉</td>
          <td>{{ formItem.countjianhuilu }}</td>
          <td class="sum">{{ formItem.jianhuilu }}</td>
        </tr>
        <tr class="ft13">
          <td>包裹</td>
          <td>{{ formItem.countbaoguo }}</td>
          <td class="sum">{{ formItem.baoguo }}</td>
          <td>电子屏幕</td>
          <td>{{ formItem.countdianzipingmu }}</td>
          <td class="sum">{{ formItem.dianzipingmu }}</td>
        </tr>
        <tr class="ft13">
          <td>化妆、整容</td>
          <td>{{ formItem.counthuazhuang }}</td>
          <td class="sum">{{ formItem.huazhuang }}</td>
          <td>护灵柩</td>
          <td>{{ formItem.counthulingjiu }}</td>
          <td class="sum">{{ formItem.hulingjiu }}</td>
        </tr>
        <tr class="ft13">
          <td>穿、脱衣</td>
          <td>{{ formItem.counttuoyi }}</td>
          <td class="sum">{{ formItem.tuoyi }}</td>
          <td>等候费</td>
          <td>{{ formItem.countdenghoufei }}</td>
          <td class="sum">{{ formItem.denghoufei }}</td>
        </tr>
        <tr class="ft13">
          <td>清洗</td>
          <td>{{ formItem.countqingxi }}</td>
          <td class="sum">{{ formItem.qingxi }}</td>
          <td>车载冰棺费用</td>
          <td>{{ formItem.countchezaibingguan }}</td>
          <td class="sum">{{ formItem.chezaibingguan }}</td>
        </tr>
        <tr class="ft13">
          <td>抬尸</td>
          <td>{{ formItem.counttaishi }}</td>
          <td class="sum">{{ formItem.taishi }}</td>
          <td>冰棺上车、下车费用</td>
          <td>{{ formItem.counttaibingguan }}</td>
          <td class="sum">{{ formItem.taibingguan }}</td>
        </tr>
        <tr class="ft13">
          <td>预约收尸服务</td>
          <td>{{ formItem.countshoushi }}</td>
          <td class="sum">{{ formItem.shoushi }}</td>
          <td>残肢火化费</td>
          <td>{{ formItem.countcanzhihuohua }}</td>
          <td class="sum">{{ formItem.canzhihuohua }}</td>
        </tr>
        <tr class="ft13">
          <td>特殊尸体处理</td>
          <td>{{ formItem.countshitichuli }}</td>
          <td class="sum">{{ formItem.shitichuli }}</td>
          <td>棺木处理费1类</td>
          <td>{{ formItem.countguanmuchuli1 }}</td>
          <td class="sum">{{ formItem.guanmuchuli1 }}</td>
        </tr>
        <tr class="ft13">
          <td>事故尸体整容</td>
          <td>{{ formItem.countshitizhengrong }}</td>
          <td class="sum">{{ formItem.shitizhengrong }}</td>
          <td>棺木处理费2类</td>
          <td>{{ formItem.countguanmuchuli2 }}</td>
          <td class="sum">{{ formItem.guanmuchuli2 }}</td>
        </tr>
        <tr class="ft13">
          <td>协助尸检</td>
          <td>{{ formItem.countshijian }}</td>
          <td class="sum">{{ formItem.shijian }}</td>
          <td>棺木处理费3类</td>
          <td>{{ formItem.countguanmuchuli3 }}</td>
          <td class="sum">{{ formItem.guanmuchuli3 }}</td>
        </tr>
        <tr class="ft13">
          <td>移动冰棺出租</td>
          <td>{{ formItem.countbingguanchuzu }}</td>
          <td class="sum">{{ formItem.bingguanchuzu }}</td>
          <td>（雕）刻费</td>
          <td>{{ formItem.countdiaoke }}</td>
          <td class="sum">{{ formItem.diaoke }}</td>
        </tr>
        <tr class="ft13">
          <td>外来冰棺消毒</td>
          <td>{{ formItem.countbingguanxiaodu }}</td>
          <td class="sum">{{ formItem.bingguanxiaodu }}</td>
          <td>骨灰格位（小）</td>
          <td>{{ formItem.countguhuigeweixiao }}</td>
          <td class="sum">{{ formItem.guhuigeweixiao }}</td>
        </tr>
        <tr class="ft13">
          <td>瞻仰(认尸)</td>
          <td>{{ formItem.countzhanyang }}</td>
          <td class="sum">{{ formItem.zhanyang }}</td>
          <td>骨灰格位（大）</td>
          <td>{{ formItem.countguhuigeweida }}</td>
          <td class="sum">{{ formItem.guhuigeweida }}</td>
        </tr>
        <tr class="ft13">
          <td>拜祭先人(骨灰)</td>
          <td>{{ formItem.countbaiji }}</td>
          <td class="sum">{{ formItem.baiji }}</td>
          <td>骨灰寄存工本费</td>
          <td>{{ formItem.countguhuijicun }}</td>
          <td class="sum">{{ formItem.guhuijicun }}</td>
        </tr>
        <tr class="ft13">
          <td>选择平板炉或拣灰炉(留炉)</td>
          <td>{{ formItem.countliulu }}</td>
          <td class="sum">{{ formItem.liulu }}</td>
          <td>收敛袋</td>
          <td>{{ formItem.countshouna }}</td>
          <td class="sum">{{ formItem.shouna }}</td>
        </tr>
        <tr class="ft13">
          <td>火化垫尸板（平板炉）</td>
          <td>{{ formItem.countpingbanlu }}</td>
          <td class="sum">{{ formItem.pingbanlu }}</td>
          <td>司仪</td>
          <td>{{ formItem.countsiyi }}</td>
          <td class="sum">{{ formItem.siyi }}</td>
        </tr>
        <tr class="ft13">
          <td>火化垫尸板（捡灰炉）</td>
          <td>{{ formItem.countjianhuilu }}</td>
          <td class="sum">{{ formItem.jianhuilu }}</td>
          <td>丧葬用品</td>
          <td>{{ formItem.countbiaozang }}</td>
          <td class="sum">{{ formItem.biaozang }}</td>
        </tr>
        <tr class="ft13">
          <td>随葬品处理1类</td>
          <td>{{ formItem.countzangpin1 }}</td>
          <td class="sum">{{ formItem.zangpin1 }}</td>
          <td>馆内冰馆</td>
          <td>{{ formItem.countgnbingguan }}</td>
          <td class="sum">{{ formItem.gnbingguan }}</td>
        </tr>
        <tr class="ft13">
          <td>随葬品处理2类</td>
          <td>{{ formItem.countzangpin2 }}</td>
          <td class="sum">{{ formItem.zangpin2 }}</td>
          <td>红布</td>
          <td>{{ formItem.counthongbu }}</td>
          <td class="sum">{{ formItem.hongbu }}</td>
        </tr>
        <tr class="ft13">
          <td>骨灰处理</td>
          <td>{{ formItem.countguhuichuli }}</td>
          <td class="sum">{{ formItem.guhuichuli }}</td>
          <td>面议服务</td>
          <td>{{ formItem.countmianyi }}</td>
          <td class="sum">{{ formItem.mianyi }}</td>
        </tr>
        <tr class="ft13">
          <td>化骨骸</td>
          <td>{{ formItem.counthuaguhai }}</td>
          <td class="sum">{{ formItem.huaguhai }}</td>
          <td>选择骨灰盒</td>
          <td>{{ formItem.countguhuihe }}</td>
          <td class="sum">{{ formItem.guhuihe }}</td>
        </tr>
        <tr class="ft13">
          <td>鲜花伴灵</td>
          <td>{{ formItem.countxianhuabanling }}</td>
          <td class="sum">{{ formItem.xianhuabanling }}</td>
          <td>其他</td>
          <td>{{ formItem.countother }}</td>
          <td class="sum">{{ formItem.other }}</td>
        </tr>
        <tr style="font-size: 16px; font-weight: 600;">
          <td style="border-right: 0px;"> 汇总金额</td>
          <td style="border-right: 0px; border-left: 0px;"></td>
          <td style="border-left: 0px;">{{ total }}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {request} from '../common/config'
// let keyValue = {
//   carryCity: '遗体接运',
//   yishizhuchi: '仪式主持服务',
//   jicun: '骨灰寄存',
//   dadaolian: '租用悼念厅（大型）',
//   xiaodu: '遗体消毒',
//   zhongdaodiao: '租用悼念厅（中型）',
//   cunfang: '遗体存放',
//   zuyongxiuxishi: '租用休息室',
//   zuyong: '遗体告别厅租用',
//   zuyonglingtangda: '租用灵堂（21平方米以上）',
//   ghh: '基本骨灰盒',
//   zuyonglingtangxiao: '租用灵堂（20平方米以下）',
//   huaquan: '租用纸(绢)花圈',
//   ziliaochaxun: '资料查询、补开证明',
//   qitayongpin: '其他殡葬用品',
//   xuanyongjianhuilu: '选用拣灰炉',
//   baoguo: '包裹',
//   dianzipingmu: '电子屏幕',
//   huazhuang: '化妆、整容',
//   hulingjiu: '护灵柩',
//   tuoyi: '穿、脱衣',
//   denghoufei: '等候费',
//   taishi: '抬尸',
//   taibingguan: '冰棺上车、下车费用',
//   shoushi: '预约收尸服务',
//   canzhihuohua: '残肢火化费',
//   shitichuli: '特殊尸体处理',
//   guanmuchuli1: '棺木处理费1类',
//   shitizhengrong: '事故尸体整容',
//   guanmuchuli2: '棺木处理费2类',
//   shijian: '协助尸检',
//   guanmuchuli3: '棺木处理费3类',
//   bingguanchuzu: '移动冰棺出租',
//   diaoke: '（雕）刻费',
//   bingguanxiaodu: '外来冰棺消毒）',
//   guhuigeweixiao: '骨灰格位（小）',
//   zhanyang: '瞻仰(认尸)',
//   guhuigeweida: '骨灰格位（大）',
//   baiji: '拜祭先人(骨灰)',
//   guhuijicun: '骨灰寄存工本费',
//   liulu: '收敛袋',
//   shouna: '冰棺上车、下车费用',
//   pingbanlu: '火化垫尸板（平板炉）',
//   biaozang: '丧葬用品',
//   zangpin1: '随葬品处理1类',
//   gnbingguan: '馆内冰馆',
//   zangpin2: '随葬品处理2类',
//   hongbu: '红布',
//   guhuichuli: '骨灰处理',
//   mianyi: '面议服务',
//   huaguhai: '化骨骸',
//   guhuihe: '选择骨灰盒',
//   xianhuabanling: '鲜花伴灵',
//   other: '其他'
// }
export default {
  name: 'CheckInfo',
  data () {
    return {
      formItem: {},
      startTime: '',
      endTime: '',
      total: 0,
      rowData: [],
      tableData: []
    }
  },
  methods: {
    getPrince () {
      this.startTime = sessionStorage.getItem('startTime')
      this.endTime = sessionStorage.getItem('endTime')
      request.get('/admin/Collect/getSale', {params: {start_time: this.startTime, end_time: this.endTime}}).then(res => {
        this.formItem = res.data
        for (let key in res.data) {
          let price = Number(res.data[key]) || 0
          if (price > 0) {
            this.total += price
          }
        }
      })
    },
    print () {
      window.print()
    },
    expierExcel () {
      const XLSX = require('xlsx')
      let workSheet = XLSX.utils.aoa_to_sheet(this.tableData)
      let bookNew = XLSX.utils.book_new()
      workSheet['!cols'] = [
        {
          wpx: 150
        },
        {
          wpx: 50
        },
        {
          wpx: 60
        }
      ]
      workSheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
        { s: { r: this.tableData.length - 2, c: 0 }, e: { r: this.tableData.length - 2, c: 1 } }
      ]
      workSheet['A1'].s = {
        alignment: { horizontal: 'center' },
        font: { bold: true, sz: 10, name: '等线' }
      }
      workSheet['A2'].s = {
        alignment: { horizontal: 'center' },
        font: { bold: true, sz: 10, name: '等线' }
      }
      workSheet['B2'].s = {
        alignment: { horizontal: 'center' },
        font: { bold: true, sz: 10, name: '等线' }
      }
      workSheet['C2'].s = {
        alignment: { horizontal: 'center' },
        font: { bold: true, sz: 10, name: '等线' }
      }
      XLSX.utils.book_append_sheet(bookNew, workSheet, 'Sheet1') // 工作簿名称
      let name = '平远县殡仪馆收费项目汇总表.xlsx'
      XLSX.writeFile(bookNew, name)
    },
    tableBuiler (rows) {
      for (let i = 1; i < rows.length; i++) {
        this.rowData = []
        for (let j = 0; j < 6; j++) {
          this.rowData.push(rows[i].cells[j].innerText)
        }
        this.tableData.push(this.rowData.slice(0, 3))
        this.tableData.push(this.rowData.slice(3, 6))
      }
    }
  },
  created () {
  },
  mounted () {
    this.getPrince()
    this.tableData = [
      ['平远县殡仪馆收费项目汇总表'],
      ['项目名称', '数量', '总实收'] // 导出表头
    ]
    let tb = this.$refs['table']
    let rows = tb.rows
    setTimeout(() => {
      this.tableBuiler(rows)
    }, 2000)
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
    margin-bottom: 10px;
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
