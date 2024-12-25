<template>
  <div class="box">
    <!--startprint-->
    <div class="container" id="tableId">
      <div>
        <div class="flex">
          <p>逝者姓名：</p>
          <p>{{ formItem.name }}</p>
        </div>
        <div class="flex">
          <p>逝者性别：</p>
          <p>{{ formItem.info.sex == 1 ? "男" : "女" }}</p>
        </div>
        <div class="flex">
          <p>逝者年龄：</p>
          <p>{{ formItem.info.age }}岁</p>
        </div>
      </div>
      <div><QrcodeVue :value="url" :size="55" level="H"></QrcodeVue></div>
    </div>
    <!--b-->
    <el-button class="btn print-hide" type="primary" @click="print"
      >打印</el-button
    >
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import getLodop from '../utils/print'

export default {
  name: 'PrintQrCode',
  components: {
    QrcodeVue
  },
  data () {
    let formItem = sessionStorage.getItem('codeRow')
    if (formItem) {
      formItem = JSON.parse(formItem)
    }
    // let formItem = {
    //   id: 1,
    //   name: '232',
    //   info: {
    //     age: 90,
    //     sex: 1
    //   }
    // }
    return {
      formItem,
      url: `http://124.223.215.28/index.html#/detail?id=${formItem.id}`
    }
  },
  methods: {
    // print () {
    //   window.print()
    // },
    print () {
      // let bdhtml = window.document.body.innerHTML
      // let sprnstr = '<!--startprint-->'
      // let eprnstr = '<!--b-->'
      // console.log(bdhtml, 'bdhtml')

      // let prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr))
      // console.log(prnhtml, 'prnhtml1')
      // prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr))
      // window.document.body.innerHTML = prnhtml
      // console.log(prnhtml, 'prnhtml2')
      let lodop = getLodop()

      lodop.PRINT_INIT('') // 初始化
      lodop.SET_PRINT_PAGESIZE(1, 600, 400, 'A4') // 设置横向
      lodop.ADD_PRINT_TEXT(40, 15, 150, 20, `逝者姓名：${this.formItem.name}`)
      lodop.ADD_PRINT_TEXT(70, 15, 100, 20, `逝者性别：${this.formItem.info.sex === 1 ? '男' : '女'}`)
      lodop.ADD_PRINT_TEXT(100, 15, 100, 20, `逝者年龄：${this.formItem.info.age}岁`)
      lodop.SET_PRINT_STYLEA(0, 'AlignJustify', 1)
      lodop.ADD_PRINT_BARCODE(
        30, 130, 95, 95,
        'QRCode',
        `${this.url}`
      )
      // lodop.ADD_PRINT_HTM('1%', '1%', '98%', '98%') // 设置打印内容
      lodop.SET_PREVIEW_WINDOW(2, 0, 0, 800, 600, '') // 设置预览窗口模式和大小
      lodop.PREVIEW()
      // window.print()
      // top.layer.closeAll()
    },
    closes () {
      // top.layer.closeAll()
    }
  }
}
</script>

<style scoped>
.box {
  /* margin-top: 40px; */
  width: 200px;
  height: 160px;
  background: #fff;
  margin: 0px auto;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  padding: 10px;
}
.btn {
  margin-top: 40px;
  position: absolute;
  right: 30px;
}
.container {
  box-sizing: border-box;
  font-size: 12;
  font-weight: 900;
  display: flex;
  justify-content: space-around;
  position: relative;
}
.flex {
  line-height: 20px;
  display: flex;
  font-size: 10px;
}
@page {
  /* size: A4; */
  width: 60px;
  height: 40px;
}
@media print {
  .print-hide {
    display: none;
  }
  @page {
    /* size: A4; */
    /* size:8cm 8cm; */
    margin-top:0px;
    margin-bottom:0px;
  }
}
</style>
