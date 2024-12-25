<template>
  <div>
    <div class="container" v-if="type == 1">
      <el-button class="print-hide" style="position: absolute; right: 20px; top: 20px" type="primary" @click="print">打印</el-button>
      <div class="qr-code" style="top:50px">
        <QrcodeVue :value="url" :size="70" level="H"></QrcodeVue>
      </div>
      <div style="text-align: center">殡葬基本服务收费清单</div>
      <div style="display: flex; justify-content: space-between; margin-top: 1.4cm; padding: 0 20px">
        <div>业务编号：{{formItem.number}}</div>
        <div>制表日期：{{formItem.create_time}}</div>
      </div>
      <table style="flex: 1; border-collapse: collapse" border="1">
        <tr>
          <th style="width: 80px; height: 40px">逝者姓名</th>
          <td class="center" style="width: 60px">{{formItem.name}}</td>
          <th style="width:50px">性别</th>
          <td class="center" style="width: 50px">{{formItem.info.sex === 1 ? '男' : '女'}}</td>
          <th style="width:60px" class="center">年龄</th>
          <td style="width: 35px" class="center">{{formItem.info.age}}岁</td>
          <th style="width:70px">身份类型</th>
          <td colspan="3" class="center">{{formItem.info.identity === 1 ? '本地户口' : '外地户口'}}</td>
        </tr>
        <tr style="height: 2cm">
          <th>告别厅</th>
          <td class="center">{{formItem.info.gaobie}}</td>
          <th colspan="2">告别厅预约时间</th>
          <td colspan="2" class="center">{{formItem.info.appointment}}</td>
          <th>火化时间</th>
          <td class="center">{{formItem.info.cremation}}</td>
          <th style="width: 50px">遗体承运公里数</th>
          <td class="center" style="width: 50px">{{formItem.info.duration}}公里</td>
        </tr>
        <tr>
          <td colspan="10"></td>
        </tr>
        <tr>
          <th>殡葬服务</th>
          <th colspan="2">具体内容</th>
          <th>数量</th>
          <th colspan="2">管理方式</th>
          <th>计费单位</th>
          <th>最高收费标准</th>
          <th>实收</th>
          <th>备注</th>
        </tr>
        <tr class="ft13">
          <td rowspan="10" class="center"><span style="width: 20px; display: inline-block">殡葬基本服务</span></td>
          <td colspan="2">1.遗体接运（普通殡葬专用车）</td>
          <td class="center">{{carryNum}}</td>
          <td colspan="2" class="center">省级政府部门制定标准</td>
          <td></td>
          <td></td>
          <td></td>
          <td rowspan="6" class="center">平发改收费[2018]7号</td>
        </tr>
        <tr class="ft13">
          <td colspan="2">城区内</td>
          <td class="center">{{formItem.info.carryCity.num}}</td>
          <td colspan="2"></td>
          <td class="center">元/具</td>
          <td>180</td>
          <td>{{formItem.info.carryPrice | getPrice}}</td>
        </tr>
        <tr class="ft13">
          <td colspan="2">农村、跨市(县)</td>
          <td class="center">{{formItem.info.carryCountry.num}}</td>
          <td colspan="2"></td>
          <td class="center">元/具 · 公里</td>
          <td>3.5(每具收费不低于120元，以来回程距离计算)</td>
          <td>{{formItem.info.carryCountry.price | getPrice}}</td>
        </tr>
        <tr class="ft13">
          <td colspan="2">2.遗体火化(普通火化炉)</td>
          <td class="center">{{formItem.info.huohua.num}}</td>
          <td colspan="2" class="center">省级政府部门制定标准</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr class="ft13">
          <td colspan="2">二级殡仪馆</td>
          <td class="center">{{formItem.info.huohua.num}}</td>
          <td colspan="2"></td>
          <td class="center">元/具</td>
          <td>230(含骨灰清理、包装)</td>
          <td>{{formItem.info.huohua.price | getPrice}}</td>
        </tr>
        <tr class="ft13">
          <td colspan="2">3.骨灰寄存</td>
          <td class="center">{{formItem.info.jicun.num}}</td>
          <td colspan="2" class="center">省级政府部门制定标准</td>
          <td class="center">元/格位 · 年</td>
          <td>60(含管理费:寄存在殡仪馆内的骨灰楼或骨灰堂)</td>
          <td>{{formItem.info.jicun.price | getPrice}}</td>
        </tr>
        <tr class="ft13">
          <td colspan="2">4.遗体消毒</td>
          <td class="center">{{formItem.info.xiaodu.num}}</td>
          <td colspan="2" class="center">授权市、县人民政府制定标准</td>
          <td class="center">元/具 </td>
          <td>60</td>
          <td>{{formItem.info.xiaodu.price | getPrice}}</td>
          <td class="center">平发改收费[2018]7号</td>
        </tr>
        <tr class="ft13">
          <td colspan="2">5.遗体存放</td>
          <td class="center">{{formItem.info.cunfang.num}}</td>
          <td colspan="2" class="center">授权市、县人民政府制定标准</td>
          <td class="center">元/具 · 天</td>
          <td>100</td>
          <td>{{formItem.info.cunfang.price | getPrice}}</td>
          <td class="center">平发改收费[2018]7号</td>
        </tr>
        <tr class="ft13">
          <td colspan="2">6.遗体告别厅租用(小型告别厅)</td>
          <td class="center">{{formItem.info.zuyong.num}}</td>
          <td colspan="2" class="center">授权市、县人民政府制定标准</td>
          <td class="center">元/具 · 间</td>
          <td>280</td>
          <td>{{formItem.info.zuyong.price | getPrice}}</td>
          <td class="center">平发改收费[2018]7号</td>
        </tr>
        <tr class="ft13">
          <td colspan="2">7.骨灰盒(点简易标准型)</td>
          <td class="center">{{formItem.info.guhuihe.num}}</td>
          <td colspan="2" class="center">授权市、县人民政府制定标准</td>
          <td class="center">元/只</td>
          <td>160</td>
          <td>{{formItem.info.guhuihe.price | getPrice}}</td>
          <td class="center">平发改收费[2018]7号</td>
        </tr>
        <tr class="ft13">
          <td :rowspan="formItem.info.baseOther?3:2" class="center"><span style="width:20px; display: inline-block">殡葬用品</span></td>
          <td colspan="2">租用纸(绢)花圈</td>
          <td class="center">{{formItem.info.huaquan.num}}</td>
          <td colspan="2" class="center">授权市、县人民政府制定标准</td>
          <td class="center">元/只</td>
          <td>10</td>
          <td>{{formItem.info.huaquan.price | getPrice}}</td>
          <td class="center">平发改收费[2018]7号</td>
        </tr>
        <tr class="ft13">
          <td colspan="2">其他殡葬用品</td>
          <td class="center">{{formItem.info.qitayongpin.num}}</td>
          <td colspan="2" class="center">市场调节价</td>
          <td class="center">元/只</td>
          <td></td>
          <td>{{formItem.info.qitayongpin.price | getPrice}}</td>
          <td class="center">自选骨灰盅</td>
        </tr>
        <tr class="ft13" v-if="formItem.info.baseOther">
          <td colspan="2">{{formItem.info.baseOther.name}}</td>
          <td class="center">{{formItem.info.baseOther.num}}</td>
          <td colspan="2" class="center">{{formItem.info.baseOther.manage}}</td>
          <td class="center">{{formItem.info.baseOther.unit}}</td>
          <td>{{formItem.info.baseOther.maxPrice}}</td>
          <td>{{formItem.info.baseOther.price | getPrice}}</td>
          <td class="center">{{formItem.info.baseOther.remarks}}</td>
        </tr>
        <tr>
          <td colspan="5"></td>
          <td colspan="5">实收金额合计： {{totalPrice}}元</td>
        </tr>
        <tr>
          <td colspan="10">
            <div style="display: flex; justify-content: space-between">
              <div style="margin-left: 20px">经办人：</div>
              <div style="margin-right: 120px">付款人签字：</div>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <div class="container" style="padding-top: 40px" v-else>
      <el-button class="print-hide" style="position: absolute; right: 20px; top: 20px" type="primary" @click="print">打印</el-button>
      <div style="text-align: center">殡葬选择性服务收费清单</div>
      <div style="display: flex; justify-content: space-between; margin-top: 40px; padding: 0 20px">
        <div>业务编号：{{formItem.number}}</div>
        <div>制表日期：{{formItem.create_time}}</div>
      </div>
      <table style="flex: 1; border-collapse: collapse" border="1">
        <tr>
          <th style="width: 90px; height: 50px">逝者姓名</th>
          <td class="center" style="width: 60px">{{formItem.name}}</td>
          <th style="width: 50px">性别</th>
          <td class="center" style="width: 50px">{{formItem.info.sex === 1 ? '男' : '女'}}</td>
          <th style="width: 50px" class="center">年龄</th>
          <td style="width: 90px" class="center">{{formItem.info.age}}岁</td>
          <th style="width: 60px">身份类型</th>
          <td colspan="3" class="center">{{formItem.info.identity === 1 ? '本地户口' : '外地户口'}}</td>
        </tr>
        <tr>
          <td colspan="10">自选服务项目 实收合计：{{totalPrice2}}元</td>
        </tr>
        <tr>
          <th style="height: 40px">名称</th>
          <th>数量</th>
          <th>应收</th>
          <th>计费单位</th>
          <th>实收</th>
          <th>名称</th>
          <th>数量</th>
          <th style="width: 50px">应收</th>
          <th style="width: 60px">计费单位</th>
          <th>实收</th>
        </tr>
        <tr class="ft13 center">
          <td>包裹</td>
          <td>{{formItem.info.baoguo.num}}</td>
          <td>150</td>
          <td>元/具</td>
          <td>{{formItem.info.baoguo.check ?(formItem.info.baoguo.price | getPrice) : ''}}</td>
          <td>仪式主持服务</td>
          <td>{{formItem.info.yishizhuchi.num}}</td>
          <td>面议</td>
          <td>元/次</td>
          <td>{{formItem.info.yishizhuchi.chenck?(formItem.info.yishizhuchi.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>化妆、整容</td>
          <td>{{formItem.info.huazhuang.num}}</td>
          <td>200</td>
          <td>元/具</td>
          <td>{{formItem.info.huazhuang.check?(formItem.info.huazhuang.price | getPrice) :''}}</td>
          <td>租用悼念厅（大型）</td>
          <td>{{formItem.info.dadaolian.num}}</td>
          <td>986</td>
          <td>元/次·间</td>
          <td>{{ formItem.info.dadaolian.check?(formItem.info.dadaolian.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>穿、脱衣</td>
          <td>{{formItem.info.tuoyi.num}}</td>
          <td>200</td>
          <td>元/具</td>
          <td>{{formItem.info.tuoyi.check?(formItem.info.tuoyi.price | getPrice):''}}</td>
          <td>租用悼念厅（大型）</td>
          <td>{{formItem.info.zhongdaodiao.num}}</td>
          <td>280</td>
          <td>元/次·间</td>
          <td>{{formItem.info.zhongdaodiao.check?(formItem.info.zhongdaodiao.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>清洗</td>
          <td>{{formItem.info.qingxi.num}}</td>
          <td>200</td>
          <td>元/具</td>
          <td>{{formItem.info.qingxi.check?(formItem.info.qingxi.price | getPrice):''}}</td>
          <td>租用休息室</td>
          <td>{{formItem.info.zuyongxiuxishi.num}}</td>
          <td>400</td>
          <td>元/次</td>
          <td>{{formItem.info.zuyongxiuxishi.check?(formItem.info.zuyongxiuxishi.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>抬尸</td>
          <td>{{formItem.info.taishi.num}}</td>
          <td>160</td>
          <td>80/人·次</td>
          <td>{{formItem.info.taishi.check?(formItem.info.taishi.price | getPrice):''}}</td>
          <td>租用灵堂（21平方米以上）</td>
          <td>{{formItem.info.zuyonglingtangda.num}}</td>
          <td>316</td>
          <td>元/天</td>
          <td>{{formItem.info.zuyonglingtangda.check?(formItem.info.zuyonglingtangda.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>预约收尸服务</td>
          <td>{{formItem.info.shoushi.num}}</td>
          <td>200</td>
          <td>元/具</td>
          <td>{{formItem.info.shoushi.check?(formItem.info.shoushi.price | getPrice):''}}</td>
          <td>租用灵堂（20平方米以下）</td>
          <td>{{formItem.info.zuyonglingtangxiao.num}}</td>
          <td>188</td>
          <td>元/天</td>
          <td>{{formItem.info.zuyonglingtangxiao.check?(formItem.info.zuyonglingtangxiao.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>特殊尸体处理</td>
          <td>{{formItem.info.shitichuli.num}}</td>
          <td></td>
          <td>元/次</td>
          <td>{{formItem.info.shitichuli.check?(formItem.info.shitichuli.price | getPrice):''}}</td>
          <td>资料查询</td>
          <td>{{formItem.info.ziliaochaxun.num}}</td>
          <td>50</td>
          <td>元/次</td>
          <td>{{formItem.info.ziliaochaxun.check?(formItem.info.ziliaochaxun.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>事故尸体整容</td>
          <td>{{formItem.info.shitizhengrong.num}}</td>
          <td></td>
          <td>元/具</td>
          <td>{{formItem.info.shitizhengrong.check?(formItem.info.shitizhengrong.price | getPrice):''}}</td>
          <td>选用拣灰炉</td>
          <td>{{formItem.info.xuanyongjianhuilu.num}}</td>
          <td>816</td>
          <td>元/具</td>
          <td>{{formItem.info.xuanyongjianhuilu.check?(formItem.info.xuanyongjianhuilu.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>协助尸检</td>
          <td>{{formItem.info.shijian.num}}</td>
          <td>170</td>
          <td>具/次</td>
          <td>{{formItem.info.shijian.check?(formItem.info.shijian.price | getPrice):''}}</td>
          <td>电子屏幕</td>
          <td>{{formItem.info.dianzipingmu.num}}</td>
          <td>480</td>
          <td>对</td>
          <td>{{formItem.info.dianzipingmu.check?(formItem.info.dianzipingmu.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>移动冰棺出租</td>
          <td>{{formItem.info.bingguanchuzu.num}}</td>
          <td>100</td>
          <td>元/天</td>
          <td>{{formItem.info.bingguanchuzu.check?(formItem.info.bingguanchuzu.price | getPrice):''}}</td>
          <td>护灵柩</td>
          <td>{{formItem.info.hulingjiu.num}}</td>
          <td>200</td>
          <td>元/次</td>
          <td>{{formItem.info.hulingjiu.check?(formItem.info.hulingjiu.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>外来冰棺消毒</td>
          <td>{{formItem.info.bingguanxiaodu.num}}</td>
          <td>100</td>
          <td>元/副</td>
          <td>{{formItem.info.bingguanxiaodu.check?(formItem.info.bingguanxiaodu.price | getPrice):''}}</td>
          <td>等候费</td>
          <td>{{formItem.info.denghoufei.num}}</td>
          <td>60</td>
          <td>次</td>
          <td>{{formItem.info.denghoufei.check?(formItem.info.denghoufei.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>瞻仰(认尸)</td>
          <td>{{formItem.info.zhanyang.num}}</td>
          <td>60</td>
          <td>元/次</td>
          <td>{{formItem.info.zhanyang.check?(formItem.info.zhanyang.price | getPrice):''}}</td>
          <td>车载冰棺费用</td>
          <td>{{formItem.info.chezaibingguan.num}}</td>
          <td>100</td>
          <td>次</td>
          <td>{{formItem.info.chezaibingguan.check?(formItem.info.chezaibingguan.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>拜祭先人(骨灰)</td>
          <td>{{formItem.info.baiji.num}}</td>
          <td>30</td>
          <td>元/次</td>
          <td>{{formItem.info.baiji.check?(formItem.info.baiji.price | getPrice):''}}</td>
          <td>冰棺上车、下车费用</td>
          <td>{{formItem.info.taibingguan.num}}</td>
          <td>100</td>
          <td>次</td>
          <td>{{formItem.info.taibingguan.check?(formItem.info.taibingguan.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>留炉</td>
          <td>{{formItem.info.liulu.num}}</td>
          <td>100</td>
          <td>元/具</td>
          <td>{{formItem.info.liulu.check?(formItem.info.liulu.price | getPrice):''}}</td>
          <td>残肢火化费</td>
          <td>{{formItem.info.canzhihuohua.num}}</td>
          <td>150</td>
          <td>只</td>
          <td>{{formItem.info.canzhihuohua.check?(formItem.info.canzhihuohua.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>火化垫尸板（平板炉）</td>
          <td>{{formItem.info.pingbanlu.num}}</td>
          <td>30</td>
          <td>元/块</td>
          <td>{{formItem.info.pingbanlu.check?(formItem.info.pingbanlu.price | getPrice):''}}</td>
          <td>棺木处理费1类</td>
          <td>{{formItem.info.guanmuchuli1.num}}</td>
          <td>100</td>
          <td>副</td>
          <td>{{formItem.info.guanmuchuli1.check?(formItem.info.guanmuchuli1.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>火化垫尸板（捡灰炉）</td>
          <td>{{formItem.info.jianhuilu.num}}</td>
          <td>74</td>
          <td>元/块</td>
          <td>{{formItem.info.jianhuilu.check?(formItem.info.jianhuilu.price | getPrice):''}}</td>
          <td>棺木处理费2类</td>
          <td>{{formItem.info.guanmuchuli2.num}}</td>
          <td>168</td>
          <td>副</td>
          <td>{{formItem.info.guanmuchuli2.check?(formItem.info.guanmuchuli2.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>随葬品处理1类</td>
          <td>{{formItem.info.zangpin1.num}}</td>
          <td>66</td>
          <td>元/批</td>
          <td>{{formItem.info.zangpin1.check?(formItem.info.zangpin1.price | getPrice):''}}</td>
          <td>棺木处理费3类</td>
          <td>{{formItem.info.guanmuchuli3.num}}</td>
          <td>300</td>
          <td>副</td>
          <td>{{formItem.info.guanmuchuli3.check?(formItem.info.guanmuchuli3.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>随葬品处理2类</td>
          <td>{{formItem.info.zangpin2.num}}</td>
          <td>160</td>
          <td>元/批</td>
          <td>{{formItem.info.zangpin2.check?(formItem.info.zangpin2.price | getPrice):''}}</td>
          <td>（雕）刻费</td>
          <td>{{formItem.info.diaoke.num}}</td>
          <td></td>
          <td>只</td>
          <td>{{formItem.info.diaoke.check?(formItem.info.diaoke.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>骨灰处理</td>
          <td>{{formItem.info.guhuichuli.num}}</td>
          <td>150</td>
          <td>元/具</td>
          <td>{{formItem.info.guhuichuli.check?(formItem.info.guhuichuli.price | getPrice):''}}</td>
          <td>骨灰格位（小）</td>
          <td>{{formItem.info.guhuigeweixiao.num}}</td>
          <td>360</td>
          <td>元/位</td>
          <td>{{formItem.info.guhuigeweixiao.check?(formItem.info.guhuigeweixiao.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>化骨骸</td>
          <td>{{formItem.info.guhuichuli.num}}</td>
          <td>160</td>
          <td>元/副</td>
          <td>{{formItem.info.guhuichuli.check?(formItem.info.guhuichuli.price | getPrice):''}}</td>
          <td>骨灰格位（大）</td>
          <td>{{formItem.info.guhuigeweida.num}}</td>
          <td>560</td>
          <td>元/位</td>
          <td>{{formItem.info.guhuigeweida.check?(formItem.info.guhuigeweida.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>鲜花伴灵</td>
          <td>{{formItem.info.xianhuabanling.num}}</td>
          <td>面议</td>
          <td>元/人·次</td>
          <td>{{formItem.info.xianhuabanling.check?(formItem.info.xianhuabanling.price | getPrice):''}}</td>
          <td>骨灰寄存工本费</td>
          <td>{{formItem.info.jicun.num}}</td>
          <td>10</td>
          <td>元/本</td>
          <td>{{formItem.info.jicun.check?(formItem.info.jicun.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>收纳袋</td>
          <td>{{formItem.info.shouna.num}}</td>
          <td>100</td>
          <td>元/个</td>
          <td>{{formItem.info.shouna.check?(formItem.info.shouna.price | getPrice):''}}</td>
          <td>司仪</td>
          <td>{{formItem.info.siyi.num}}</td>
          <td></td>
          <td>元/个</td>
          <td>{{formItem.info.siyi.check?(formItem.info.siyi.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>丧葬用品</td>
          <td>{{formItem.info.biaozang.num}}</td>
          <td></td>
          <td>元/份</td>
          <td>{{formItem.info.biaozang.check?(formItem.info.biaozang.price | getPrice):''}}</td>
          <td>馆内冰棺</td>
          <td>{{formItem.info.gnbingguan.num}}</td>
          <td></td>
          <td>元/位</td>
          <td>{{formItem.info.gnbingguan.check?(formItem.info.gnbingguan.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>红布</td>
          <td>{{formItem.info.hongbu.num}}</td>
          <td></td>
          <td>元/份</td>
          <td>{{formItem.info.hongbu.check?(formItem.info.hongbu.price | getPrice):''}}</td>
          <td>面议抬尸</td>
          <td>{{formItem.info.taishi.num}}</td>
          <td></td>
          <td>元/次</td>
          <td>{{formItem.info.taishi.check?(formItem.info.taishi.price | getPrice):''}}</td>
        </tr>
        <tr class="ft13 center">
          <td>骨灰盒</td>
          <td>{{formItem.info.ghh.num}}</td>
          <td></td>
          <td>元/个</td>
          <td>{{formItem.info.ghh.check?(formItem.info.ghh.price | getPrice):''}}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr  class="ft13 center">
          <td :style="{height: !getOther(0, 'name') ? '30px' : 'auto'}">{{getOther(0, 'name')}}</td>
          <td>{{getOther(0, 'num')}}</td>
          <td>{{getOther(0, 'price1')}}</td>
          <td>{{getOther(0, 'unit')}}</td>
          <td>{{getOther(0, 'check')?getOther(0, 'price2'):''}}</td>
          <td>{{getOther(1, 'name')}}</td>
          <td>{{getOther(1, 'num')}}</td>
          <td>{{getOther(1, 'price1')}}</td>
          <td>{{getOther(1, 'unit')}}</td>
          <td>{{getOther(1, 'check')?getOther(1, 'price2'):''}}</td>
        </tr>
        <tr  class="ft13 center">
          <td :style="{height: !getOther(2, 'name') ? '30px' : 'auto'}">{{getOther(2, 'name')}}</td>
          <td>{{getOther(2, 'num')}}</td>
          <td>{{getOther(2, 'price1')}}</td>
          <td>{{getOther(2, 'unit')}}</td>
          <td>{{getOther(2, 'check')?getOther(2, 'price2'):''}}</td>
          <td>{{getOther(3, 'name')}}</td>
          <td>{{getOther(3, 'num')}}</td>
          <td>{{getOther(3, 'price1')}}</td>
          <td>{{getOther(3, 'unit')}}</td>
          <td>{{getOther(3, 'check')?getOther(3, 'price2'):''}}</td>
        </tr>
        <tr  class="ft13 center">
          <td :style="{height: !getOther(4, 'name') ? '30px' : 'auto'}">{{getOther(4, 'name')}}</td>
          <td>{{getOther(4, 'num')}}</td>
          <td>{{getOther(4, 'price1')}}</td>
          <td>{{getOther(4, 'unit')}}</td>
          <td>{{getOther(4, 'check')?getOther(4, 'price2'):''}}</td>
          <td>{{getOther(5, 'name')}}</td>
          <td>{{getOther(5, 'num')}}</td>
          <td>{{getOther(5, 'price5')}}</td>
          <td>{{getOther(5, 'unit')}}</td>
          <td>{{getOther(5, 'check')?getOther(5, 'price2'):''}}</td>
        </tr>
        <tr  class="ft13 center">
          <td :style="{height: !getOther(6, 'name') ? '30px' : 'auto'}">{{getOther(6, 'name')}}</td>
          <td>{{getOther(6, 'num')}}</td>
          <td>{{getOther(6, 'price1')}}</td>
          <td>{{getOther(6, 'unit')}}</td>
          <td>{{getOther(6, 'check')?getOther(6, 'price2'):''}}</td>
          <td>{{getOther(7, 'name')}}</td>
          <td>{{getOther(7, 'num')}}</td>
          <td>{{getOther(7, 'price1')}}</td>
          <td>{{getOther(7, 'unit')}}</td>
          <td>{{getOther(7, 'check')?getOther(7, 'price2'):''}}</td>
        </tr>
      </table>
      <br>
      <table style="flex: 1; border-collapse: collapse" border="1">
        <tr style="height: 30px;">
          <th style="width: 60px;">序号</th>
          <th style="width: 140px;">项目</th>
          <th style="width: 100px">计算单位</th>
          <th style="width: 100px">标准（元）</th>
          <th>服务内容</th>
        </tr>
        <tr class="ft13 center" v-for="(item, key ,index) in formItem.info" :key="key">
          <td>{{index+1}}</td>
          <td>{{key}}</td>
          <td>{{item}}</td>
        </tr>
      </table>

    </div>
  </div>
</template>

<script>
import moment from 'moment'
import QrcodeVue from 'qrcode.vue'
export default {
  name: 'print',
  components: {
    QrcodeVue
  },
  filters: {
    getPrice (price) {
      return price && price > 0 ? price : ''
    }
  },
  data () {
    const params = this.$route.query
    let formItem = sessionStorage.getItem('row')

    if (formItem) {
      formItem = JSON.parse(formItem)
      formItem.create_time = moment(formItem.create_time).format('YYYY年MM月DD日')
      console.log(formItem.info)
    }

    return {
      formItem,
      type: params.type || 1,
      url: `http://47.120.57.123/index.html#/detail?id=${formItem.id}`
    }
  },
  methods: {
    print () {
      window.print()
    },
    getOther (index, key) {
      const data = this.formItem.info.other ? this.formItem.info.other[index] : ''
      return data ? data[key] : ''
    }
  },
  computed: {
    carryNum () {
      return this.formItem.info.carry === 1 ? this.formItem.info.carryCity.num : this.formItem.info.carryCountry.num
    },
    totalPrice () {
      let totalPrice = 0;
      ['carryCity', 'carryCountry', 'huohua', 'jicun', 'xiaodu', 'cunfang', 'zuyong', 'guhuihe', 'huaquan', 'qitayongpin', 'baseOther'].forEach(key => {
        let price = this.formItem.info[key] ? this.formItem.info[key].price : 0
        price = price && price > 0 ? Number(price) : 0
        totalPrice += price
      })

      return totalPrice
    },
    totalPrice2 () {
      let totalPrice = 0;

      [
        'baoguo', 'huazhuang', 'tuoyi', 'qingxi', 'taishi', 'shoushi', 'shitichuli', 'shitizhengrong', 'shijian',
        'bingguanchuzu', 'bingguanxiaodu', 'zhanyang', 'baiji', 'liulu', 'pingbanlu', 'jianhuilu', 'zangpin1', 'zangpin2',
        'guhuichuli', 'huaguhai', 'xianhuabanling', 'yishizhuchi', 'dadaolian', 'zhongdaodiao', 'zuyongxiuxishi',
        'zuyonglingtangda', 'zuyonglingtangxiao', 'ziliaochaxun', 'xuanyongjianhuilu', 'dianzipingmu', 'hulingjiu',
        'denghoufei', 'chezaibingguan', 'taibingguan', 'canzhihuohua', 'guanmuchuli1', 'guanmuchuli2', 'guanmuchuli3',
        'diaoke', 'guhuigeweixiao', 'guhuigeweida', 'guhuijicun', 'shouna', 'siyi', 'gnbingguan', 'hongbu', 'ghh', 'taishi', 'biaozang'
      ].forEach(key => {
        let price = this.formItem.info[key] && this.formItem.info[key].check ? this.formItem.info[key].price : 0
        price = price && price > 0 ? Number(price) : 0
        totalPrice += price
      });

      (this.formItem.info.other || []).forEach(item => {
        let price = item.price2
        price = price && item.check && price > 0 ? Number(price) : 0
        totalPrice += price
      })

      return totalPrice
    }
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
.qr-code{
  widows: 50px;
  height: 50px;
  position: absolute;
  left: 2cm;
}
td {
  font-weight: 400;
  /* padding: 5px 2px; */
  box-sizing: border-box;
}
th {
  font-weight: bold;
  white-space: nowrap;
}
.center {
  text-align: center;
}
.ft13 {
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
