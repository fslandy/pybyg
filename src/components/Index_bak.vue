<template>
    <el-container>
        <el-header height="40px">

          <div class="div1">
            <el-button type="primary" size="small" @click="addInfo">添加</el-button>
            <el-button type="danger" size="small" @click="batchDelInfo">删除</el-button>
            <el-button type="warning" size="small" @click="goFreezer">冻库</el-button>
          </div>
          <div class="div2">
            <el-form :inline="true">
              <el-form-item label="逝者姓名">
                <el-input placeholder="逝者姓名" v-model="name" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>

            </el-form>
          </div>
        </el-header>
        <div class="table-box">
          <el-table  border :data="list" @selection-change="selectInfo">
          <el-table-column
            align="center"
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
              align="center"
              label="业务编号"
              prop="number"
              width="200"
          ></el-table-column>
          <el-table-column
              align="center"
              label="逝者姓名"
              prop="name"
              width="160"
          ></el-table-column>
          <el-table-column
              align="center"
              label="性别"
              width="100"
          >
              <span slot-scope="scope">{{scope.row.info.sex === 1 ? '男' : '女'}}</span>
          </el-table-column>
          <el-table-column
              align="center"
              label="年龄"
              width="100"
          >
              <span slot-scope="scope">{{scope.row.info.age}}岁</span>
          </el-table-column>
          <el-table-column
              align="center"
              label="身份类型"
              width="150"
          >
              <span slot-scope="scope">{{scope.row.info.identity === 1 ? '本地户口' : '外地户口'}}</span>
          </el-table-column>
          <el-table-column
              align="center"
              label="告别厅预约时间"
              prop="info.appointment"
              width="160"
          ></el-table-column>
          <el-table-column
              align="center"
              label="火化时间"
              prop="info.cremation"
              width="160"
          ></el-table-column>
          <el-table-column
              align="center"
              label="遗体承运公里数"
              prop="info.duration"
              width="150"
          ></el-table-column>
          <el-table-column
              align="center"
              label="操作"
          >
              <template slot-scope="scope">
                <div class="opera-box">
                  <el-button type="text" @click="handleEditInfo(scope.row)">基本信息</el-button>
                  <el-button type="text" @click="gotoPrintCode(scope.row)">二维码打印</el-button>
                  <el-button type="text" @click="handleEditPrice(scope.row)">基本服务</el-button>
                  <el-button type="text" @click="gotoPrint(scope.row, 1)">基本服务打印</el-button>
                  <el-button type="text" @click="handleEditPrice2(scope.row)">选择性服务</el-button>
                  <el-button type="text" @click="gotoPrint(scope.row, 2)">选择性服务打印</el-button>
                </div>
              </template>
          </el-table-column>
        </el-table>
        </div>
        <el-footer>
            <el-pagination
                :total="total"
                :page-size="pagination.pageSize"
                :current-page="pagination.page"
                :page-sizes="[10,20,50]"
                layout="total,sizes,prev,pager,next,jumper"
                @current-change="pageChange"
                @size-change="pageSizeChange"
            />
        </el-footer>

        <el-dialog :visible.sync="infoVisible" title="基本信息" width="800px">
            <el-form label-width="120px">
                <el-form-item label="姓名">
                    <el-input v-model="formItem.name" />
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="formItem.info.age" type="number" />
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="formItem.info.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="身份类型">
                    <el-radio-group v-model="formItem.info.identity">
                        <el-radio :label="1">本地户口</el-radio>
                        <el-radio :label="2">外地户口</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="告别厅">
                    <el-input v-model="formItem.info.gaobie" />
                </el-form-item>
                <el-form-item label="告别厅预约时间">
                    <el-date-picker value-format="yyyy/MM/dd" format="yyyy/MM/dd" v-model="formItem.info.appointment" />
                </el-form-item>
                <el-form-item label="火化时间">
                    <el-date-picker value-format="yyyy/MM/dd" format="yyyy/MM/dd" v-model="formItem.info.cremation" />
                </el-form-item>
                <el-form-item label="遗体承运公里数">
                    <el-input v-model="formItem.info.duration" type="number" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 基本服务弹窗 -->
        <el-dialog :visible.sync="priceVisible" title="基本服务" width="800px">
            <el-form label-width="120px">
                <el-form-item label="业务编号">
                    <el-input v-model="formItem.number" disabled />
                </el-form-item>
                 <el-form-item label="姓名">
                    <el-input v-model="formItem.name" disabled />
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="formItem.info.age" type="number" disabled />
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="formItem.info.sex" disabled>
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="身份类型">
                    <el-radio-group v-model="formItem.info.identity" disabled>
                        <el-radio :label="1">本地户口</el-radio>
                        <el-radio :label="2">外地户口</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="告别厅">
                    <el-input v-model="formItem.info.gaobie" disabled />
                </el-form-item>
                <el-form-item label="告别厅预约时间">
                    <el-date-picker value-format="yyyy/MM/dd" format="yyyy/MM/dd" v-model="formItem.info.appointment" disabled />
                </el-form-item>
                <el-form-item label="火化时间">
                    <el-date-picker value-format="yyyy/MM/dd" format="yyyy/MM/dd" v-model="formItem.info.cremation" disabled />
                </el-form-item>
                <el-form-item label="遗体承运公里数" >
                    <el-input v-model="formItem.info.duration" type="number" disabled />
                </el-form-item>
                <el-form-item label="遗体接运">
                    <el-radio-group v-model="formItem.info.carry">
                        <el-radio :label="1">城区</el-radio>
                        <el-radio :label="2">农村、跨市</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="遗体接运(城区)" v-if="formItem.info.carry == 1">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.carryCity.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" v-model="formItem.info.carryCity.price" />
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form-item>
                <el-form-item label="遗体接运(跨市)" v-if="formItem.info.carry == 2">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.carryCountry.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" v-model="formItem.info.carryCountry.price" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="遗体火化">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.huohua.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" v-model="formItem.info.huohua.price" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="骨灰寄存">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.jicun.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" v-model="formItem.info.jicun.price" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="遗体消毒">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.xiaodu.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" v-model="formItem.info.xiaodu.price" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="遗体存放">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.cunfang.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" v-model="formItem.info.cunfang.price" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="遗体告别厅租用">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.zuyong.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" v-model="formItem.info.zuyong.price" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="骨灰盒">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.guhuihe.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" v-model="formItem.info.guhuihe.price" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="租用纸(绢)花圈">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.huaquan.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" v-model="formItem.info.huaquan.price" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="其他殡葬用品">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.qitayongpin.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" v-model="formItem.info.qitayongpin.price" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item v-if="formItem.info.baseOther" :label="formItem.info.baseOther.name">
                  <el-row>
                      <el-col :span="9">
                          <el-form-item label="数量" label-width="50px">
                              <el-input type="number" v-model="formItem.info.baseOther.num"  />
                          </el-form-item>
                      </el-col>
                      <el-col :span="9">
                          <el-form-item label="实收" label-width="50px">
                              <el-input type="number" v-model="formItem.info.baseOther.price" />
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                            <el-button size="mini" style="margin-left: 10px; padding: 7px 8px" type="primary" @click="addBaseOther('edit')">
                                编辑
                            </el-button>
                            <el-button size="mini" style="margin-left: 0; padding: 7px 8px" type="danger" @click="deleteBaseOther()">
                                删除
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">保存</el-button>
                    <el-button @click="addBaseOther('add')" v-if="!formItem.info.baseOther">添加</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 添加基本信息弹窗 -->
        <el-dialog title="添加基本信息" :visible.sync="BaseOtherVisible">
            <el-form label-width="130px" ref="baseOtherForm" :model="baseOtherData">
                <el-form-item label="服务名称" prop="name" :rules="[
                    { required: true, message: '请输入服务名称', trigger: 'blur' },
                  ]">
                    <el-input v-model="baseOtherData.name" />
                </el-form-item>
                <el-form-item label="数量" required>
                    <el-input v-model="baseOtherData.num" type="number" />
                </el-form-item>
                <el-form-item label="管理方式">
                    <el-input v-model="baseOtherData.manage" />
                </el-form-item>
                <el-form-item label="计费单位">
                    <el-input v-model="baseOtherData.unit"  />
                </el-form-item>
                <el-form-item label="最高收费标准">
                    <el-input v-model="baseOtherData.maxPrice" />
                </el-form-item>
                <el-form-item label="实收">
                    <el-input v-model="baseOtherData.price" type="number" />
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="baseOtherData.remarks" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="BaseOtherVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmBaseOtherAdd('baseOtherForm')" >确定</el-button>
            </span>
        </el-dialog>

        <el-dialog :visible.sync="priceVisible2" title="选择性服务" width="800px">
            <el-form label-width="120px">
                <el-form-item label="业务编号">
                    <el-input v-model="formItem.number" disabled />
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formItem.name" disabled />
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="formItem.info.age" type="number" disabled />
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="formItem.info.sex" disabled>
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="身份类型">
                    <el-radio-group v-model="formItem.info.identity" disabled>
                        <el-radio :label="1">本地户口</el-radio>
                        <el-radio :label="2">外地户口</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="告别厅">
                    <el-input v-model="formItem.info.gaobie" disabled />
                </el-form-item>
                <el-form-item label="告别厅预约时间">
                    <el-date-picker value-format="yyyy/MM/dd" format="yyyy/MM/dd" v-model="formItem.info.appointment" disabled />
                </el-form-item>
                <el-form-item label="火化时间">
                    <el-date-picker value-format="yyyy/MM/dd" format="yyyy/MM/dd" v-model="formItem.info.cremation" disabled />
                </el-form-item>
                <el-form-item label="遗体承运公里数" >
                    <el-input v-model="formItem.info.duration" type="number" disabled />
                </el-form-item>
                <el-form-item label="包裹">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{150}}</span>
                                <!-- <el-input value="150" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.baoguo.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.baoguo.check" v-model="formItem.info.baoguo.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.baoguo.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="化妆、整容">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{200}}</span>
                                <!-- <el-input value="200" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.huazhuang.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.huazhuang.check" v-model="formItem.info.huazhuang.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.huazhuang.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="穿、脱衣">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{200}}</span>
                                <!-- <el-input value="200" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.tuoyi.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.tuoyi.check" v-model="formItem.info.tuoyi.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.tuoyi.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="清洗">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{200}}</span>
                                <!-- <el-input value="200" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.qingxi.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.qingxi.check" v-model="formItem.info.qingxi.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.qingxi.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="抬尸">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{160}}</span>
                                <!-- <el-input value="160" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.taishi.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.taishi.check" v-model="formItem.info.taishi.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.taishi.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="预约收尸服务">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{200}}</span>
                                <!-- <el-input value="200" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.shoushi.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.shoushi.check" v-model="formItem.info.shoushi.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.shoushi.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="特殊尸体处理">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span></span>
                                <!-- <el-input value="" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.shitichuli.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.shitichuli.check" v-model="formItem.info.shitichuli.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.shitichuli.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="事故尸体整容">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span></span>
                                <!-- <el-input value="" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.shitizhengrong.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.shitizhengrong.check" v-model="formItem.info.shitizhengrong.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.shitizhengrong.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="协助尸检">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{170}}</span>
                                <!-- <el-input value="170" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.shijian.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.shijian.check" v-model="formItem.info.shijian.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.shijian.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="移动冰棺出租">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{100}}</span>
                                <!-- <el-input value="100" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.bingguanchuzu.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.bingguanchuzu.check" v-model="formItem.info.bingguanchuzu.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.bingguanchuzu.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="外来冰棺消毒">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{100}}</span>
                                <!-- <el-input value="100" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.bingguanxiaodu.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.bingguanxiaodu.check" v-model="formItem.info.bingguanxiaodu.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.bingguanxiaodu.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="瞻仰(认尸)">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{60}}</span>
                                <!-- <el-input value="60" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.zhanyang.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.zhanyang.check" v-model="formItem.info.zhanyang.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.zhanyang.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="拜祭先人(骨灰)">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{30}}</span>
                                <!-- <el-input value="30" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.baiji.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.baiji.check" v-model="formItem.info.baiji.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.baiji.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="留炉">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{100}}</span>
                                <!-- <el-input value="100" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.liulu.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.liulu.check" v-model="formItem.info.liulu.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.liulu.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="火化垫尸板（平板炉）">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{30}}</span>
                                <!-- <el-input value="30" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.pingbanlu.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.pingbanlu.check" v-model="formItem.info.pingbanlu.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.pingbanlu.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="火化垫尸板（捡灰炉）">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{74}}</span>
                                <!-- <el-input value="74" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.jianhuilu.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.jianhuilu.check" v-model="formItem.info.jianhuilu.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.jianhuilu.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="随葬品处理1类">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{66}}</span>
                                <!-- <el-input value="66" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.zangpin1.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.zangpin1.check" v-model="formItem.info.zangpin1.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.zangpin1.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="随葬品处理2类">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{160}}</span>
                                <!-- <el-input value="160" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.zangpin2.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.zangpin2.check" v-model="formItem.info.zangpin2.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.zangpin2.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="骨灰处理">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{150}}</span>
                                <!-- <el-input value="150" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.guhuichuli.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.guhuichuli.check" v-model="formItem.info.guhuichuli.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.guhuichuli.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="化骨骸">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{160}}</span>
                                <!-- <el-input value="160" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.huaguhai.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.huaguhai.check" v-model="formItem.info.huaguhai.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.huaguhai.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="鲜花伴灵">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>面议</span>
                                <!-- <el-input value="面议" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.xianhuabanling.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.xianhuabanling.check" v-model="formItem.info.xianhuabanling.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.xianhuabanling.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="仪式主持服务">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>面议</span>
                                <!-- <el-input value="面议" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.yishizhuchi.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.yishizhuchi.check" v-model="formItem.info.yishizhuchi.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.yishizhuchi.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="租用悼念厅（大型）">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{986}}</span>
                                <!-- <el-input value="986" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.dadaolian.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.dadaolian.check" v-model="formItem.info.dadaolian.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.dadaolian.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="租用悼念厅（中型）">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{280}}</span>
                                <!-- <el-input value="280" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.zhongdaodiao.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.zhongdaodiao.check" v-model="formItem.info.zhongdaodiao.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.zhongdaodiao.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="租用休息室">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{400}}</span>
                                <!-- <el-input value="400" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.zuyongxiuxishi.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.zuyongxiuxishi.check" v-model="formItem.info.zuyongxiuxishi.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.zuyongxiuxishi.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="租用灵堂（21平方米以上）">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{315}}</span>
                                <!-- <el-input value="316" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.zuyonglingtangda.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.zuyonglingtangda.check" v-model="formItem.info.zuyonglingtangda.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.zuyonglingtangda.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="租用灵堂（20平方米以下）">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{188}}</span>
                                <!-- <el-input value="188" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.zuyonglingtangxiao.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.zuyonglingtangxiao.check" v-model="formItem.info.zuyonglingtangxiao.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.zuyonglingtangxiao.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="资料查询">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{50}}</span>
                                <!-- <el-input value="50" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.ziliaochaxun.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.ziliaochaxun.check" v-model="formItem.info.ziliaochaxun.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.ziliaochaxun.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="选用拣灰炉">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{816}}</span>
                                <!-- <el-input value="816" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.xuanyongjianhuilu.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.xuanyongjianhuilu.check" v-model="formItem.info.xuanyongjianhuilu.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.xuanyongjianhuilu.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="电子屏幕">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{480}}</span>
                                <!-- <el-input value="480" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.dianzipingmu.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.dianzipingmu.check" v-model="formItem.info.dianzipingmu.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.dianzipingmu.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="护灵柩">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{200}}</span>
                                <!-- <el-input value="200" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.hulingjiu.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.hulingjiu.check" v-model="formItem.info.hulingjiu.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.hulingjiu.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="等候费">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{60}}</span>
                                <!-- <el-input value="60" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.denghoufei.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.denghoufei.check" v-model="formItem.info.denghoufei.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.denghoufei.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="车载冰棺费用">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{100}}</span>
                                <!-- <el-input value="100" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.chezaibingguan.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.chezaibingguan.check" v-model="formItem.info.chezaibingguan.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.chezaibingguan.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="冰棺上车、下车费用">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{100}}</span>
                                <!-- <el-input value="100" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.taibingguan.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.taibingguan.check" v-model="formItem.info.taibingguan.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.taibingguan.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="残肢火化费">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{150}}</span>
                                <!-- <el-input value="150" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.canzhihuohua.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.canzhihuohua.check" v-model="formItem.info.canzhihuohua.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.canzhihuohua.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="棺木处理费1类">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{100}}</span>
                                <!-- <el-input value="100" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.guanmuchuli1.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.guanmuchuli1.check" v-model="formItem.info.guanmuchuli1.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.guanmuchuli1.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="棺木处理费2类">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{168}}</span>
                                <!-- <el-input value="168" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.guanmuchuli2.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.guanmuchuli2.check" v-model="formItem.info.guanmuchuli2.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.guanmuchuli2.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="棺木处理费3类">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{300}}</span>
                                <!-- <el-input value="300" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.guanmuchuli3.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.guanmuchuli3.check" v-model="formItem.info.guanmuchuli3.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.guanmuchuli3.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="（雕）刻费">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span></span>
                                <!-- <el-input value="" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.diaoke.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.diaoke.check" v-model="formItem.info.diaoke.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.diaoke.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="骨灰格位（小）">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{360}}</span>
                                <!-- <el-input value="360" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.guhuigeweixiao.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.guhuigeweixiao.check" v-model="formItem.info.guhuigeweixiao.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.guhuigeweixiao.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="骨灰格位（大）">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{560}}</span>
                                <!-- <el-input value="560" disabled  /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.guhuigeweida.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.guhuigeweida.check" v-model="formItem.info.guhuigeweida.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.guhuigeweida.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="骨灰寄存工本费">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="应收：" label-width="80px">
                              <span>10</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="formItem.info.guhuijicun.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!formItem.info.guhuijicun.check" v-model="formItem.info.guhuijicun.price" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="formItem.info.guhuijicun.check" ></el-checkbox>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item v-for="(item, index) in formItem.info.other" :key="index" :label="item.name">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="应收：" label-width="80px">
                              <span>{{item.price1}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="数量" label-width="50px">
                                <el-input type="number" v-model="item.num"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="实收" label-width="50px">
                                <el-input type="number" :disabled="!item.check" v-model="item.price2"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-col :span="3" style="text-align:center">
                            <el-checkbox  v-model="item.check" ></el-checkbox>
                        </el-col>
                            <el-button size="mini" style="margin-left: 10px; padding: 7px 8px" type="primary" @click="editOhter(index)">
                                编辑
                            </el-button>
                            <el-button size="mini" style="margin-left: 0; padding: 7px 8px" type="danger" @click="deleteOther(index)">
                                删除
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">保存</el-button>
                    <el-button @click="addOther" v-if="formItem.info.other.length < 8">添加</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="添加选择服务" :visible.sync="otherVisible">
            <el-form label-width="80px">
                <el-form-item label="服务名称">
                    <el-input v-model="otherData.name" />
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="otherData.num" type="number" />
                </el-form-item>
                <el-form-item label="应收">
                    <el-input v-model="otherData.price1" />
                </el-form-item>
                <el-form-item label="计费单位">
                    <el-input v-model="otherData.unit" />
                </el-form-item>
                <el-form-item label="实收">
                    <el-input v-model="otherData.price2" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="otherVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmAdd">确定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
import {request} from '../common/config'

export default {
  name: 'Index',

  data () {
    return {
      infoVisible: false,
      priceVisible: false,
      priceVisible2: false,
      otherVisible: false,
      BaseOtherVisible: false,
      pagination: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      selectInfoList: [],
      list: [],
      formItem: {
        id: 0,
        number: '',
        info: {}
      },
      baseOtherData: {
        name: '',
        num: 1,
        manage: '',
        maxPrice: '',
        price: '',
        unit: '',
        remarks: ''
      },
      otherData: {},
      otherIndex: -1,
      name: ''
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    this.getList()
  },
  methods: {
    pageChange (page) {
      this.$set(this.pagination, 'page', page)
      this.$nextTick(() => {
        this.getList()
      })
    },
    pageSizeChange (pageSize) {
      this.pagination = {page: 1, pageSize}
      this.$nextTick(() => {
        this.getList()
      })
    },
    initData () {
      this.formItem = {
        id: 0,
        number: '',
        name: '',
        info: {
          age: '',
          sex: 1,
          identity: 1,
          appointment: '',
          cremation: '',
          duration: '',
          gaobie: '',
          carry: 1,
          carryCity: {
            num: 1,
            price: ''
          },
          carryCountry: {
            num: 1,
            price: ''
          },
          huohua: {
            num: 1,
            price: ''
          },
          jicun: {
            num: 1,
            price: ''
          },
          xiaodu: {
            num: 1,
            price: ''
          },
          cunfang: {
            num: 1,
            price: ''
          },
          zuyong: {
            num: 1,
            price: ''
          },
          guhuihe: {
            num: 1,
            price: ''
          },
          huaquan: {
            num: 1,
            price: ''
          },
          qitayongpin: {
            num: 1,
            price: ''
          },
          baoguo: {
            num: 1,
            price: 150,
            check: false
          },
          huazhuang: {
            num: 1,
            price: 200,
            check: false
          },
          tuoyi: {
            num: 1,
            price: 200,
            check: false
          },
          qingxi: {
            num: 1,
            price: 200,
            check: false
          },
          taishi: {
            num: 1,
            price: 160,
            check: false
          },
          shoushi: {
            num: 1,
            price: 200,
            check: false
          },
          shitichuli: {
            num: 1,
            price: '',
            check: false
          },
          shitizhengrong: {
            num: 1,
            price: '',
            check: false
          },
          shijian: {
            num: 1,
            price: 170,
            check: false
          },
          bingguanchuzu: {
            num: 1,
            price: 100,
            check: false
          },
          bingguanxiaodu: {
            num: 1,
            price: 100,
            check: false
          },
          zhanyang: {
            num: 1,
            price: 60,
            check: false
          },
          baiji: {
            num: 1,
            price: 30,
            check: false
          },
          liulu: {
            num: 1,
            price: 100,
            check: false
          },
          pingbanlu: {
            num: 1,
            price: 30,
            check: false
          },
          jianhuilu: {
            num: 1,
            price: 74,
            check: false
          },
          zangpin1: {
            num: 1,
            price: 66,
            check: false
          },
          zangpin2: {
            num: 1,
            price: 160,
            check: false
          },
          guhuichuli: {
            num: 1,
            price: 150,
            check: false
          },
          huaguhai: {
            num: 1,
            price: 160,
            check: false
          },
          xianhuabanling: {
            num: 1,
            price: '',
            check: false
          },
          yishizhuchi: {
            num: 1,
            price: '',
            check: false
          },
          dadaolian: {
            num: 1,
            price: 986,
            check: false
          },
          zhongdaodiao: {
            num: 1,
            price: 280,
            check: false
          },
          zuyongxiuxishi: {
            num: 1,
            price: 400,
            check: false
          },
          zuyonglingtangda: {
            num: 1,
            price: 315,
            check: false
          },
          zuyonglingtangxiao: {
            num: 1,
            price: 188,
            check: false
          },
          ziliaochaxun: {
            num: 1,
            price: 50,
            check: false
          },
          xuanyongjianhuilu: {
            num: 1,
            price: 816,
            check: false
          },
          dianzipingmu: {
            num: 1,
            price: 480,
            check: false
          },
          hulingjiu: {
            num: 1,
            price: 200,
            check: false
          },
          denghoufei: {
            num: 1,
            price: 60,
            check: false
          },
          chezaibingguan: {
            num: 1,
            price: 100,
            check: false
          },
          taibingguan: {
            num: 1,
            price: 100,
            check: false
          },
          canzhihuohua: {
            num: 1,
            price: 150,
            check: false
          },
          guanmuchuli1: {
            num: 1,
            price: 100,
            check: false
          },
          guanmuchuli2: {
            num: 1,
            price: 168,
            check: false
          },
          guanmuchuli3: {
            num: 1,
            price: 300,
            check: false
          },
          diaoke: {
            num: 1,
            price: '',
            check: false
          },
          guhuigeweixiao: {
            num: 1,
            price: 360,
            check: false
          },
          guhuigeweida: {
            num: 1,
            price: 560,
            check: false
          },
          guhuijicun: {
            num: 1,
            price: 10,
            check: false
          },
          other: []
        }
      }
    },
    initOther () {
      this.otherData = {
        name: '',
        num: 1,
        price1: '',
        unit: '',
        price2: '',
        check: false
      }
      this.otherIndex = -1
    },
    addInfo () {
      this.initData()
      this.infoVisible = true
    },
    search () {
      request.get('/getList', {params: {page: this.pagination.page, page_size: this.pagination.pageSize, name: this.name}}).then(res => {
        this.list = res.data
        this.total = res.count
      })
    },
    getList () {
      request.get('/getList', {params: {page: this.pagination.page, page_size: this.pagination.pageSize}}).then(res => {
        this.list = res.data
        this.total = res.count
      })
    },
    submit () {
      const data = JSON.parse(JSON.stringify(this.formItem))
      let action = 'create_data'
      if (data.id > 0) {
        action = 'update_data'
      }
      data.action = action
      data.info = JSON.stringify(data.info)

      request.post('/modify', data).then(res => {
        if (res.success) {
          this.infoVisible = false
          this.priceVisible = false
          this.priceVisible2 = false
          this.pagination = {
            page: 1,
            pageSize: this.pagination.pageSize
          }
          this.getList()
        }
      })
    },
    handleEditInfo (row) {
      this.initData()
      const data = JSON.parse(JSON.stringify(row))
      data.info = {...this.formItem.info, ...data.info}
      this.formItem = data

      this.infoVisible = true
    },
    handleEditPrice (row) {
      this.initData()
      const data = JSON.parse(JSON.stringify(row))
      data.info = {...this.formItem.info, ...data.info}
      this.formItem = data

      this.priceVisible = true
    },
    handleEditPrice2 (row) {
      this.initData()
      const data = JSON.parse(JSON.stringify(row))
      data.info = {...this.formItem.info, ...data.info}
      this.formItem = data

      this.priceVisible2 = true
    },
    selectInfo (data) {
      this.selectInfoList = data
    },
    // 删除
    // handleDeleteInfo (row) {
    //   this.$confirm('此操作将删除此信息, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     let data = {
    //       action: 'del',
    //       bos_id: [row.id]
    //     }
    //     request.post('/modify', data).then(res => {
    //       if (res.success) {
    //         this.infoVisible = false
    //         this.priceVisible = false
    //         this.priceVisible2 = false
    //         this.pagination = {
    //           page: 1,
    //           pageSize: this.pagination.pageSize
    //         }
    //         this.getList()
    //         this.$message({
    //           type: 'success',
    //           message: '删除成功!'
    //         })
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // 批量删除
    batchDelInfo () {
      if (!this.selectInfoList.length) return this.$message.info('请先勾选数据')
      this.$confirm('是否批量删除所选数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          action: 'del',
          bos_id: this.selectInfoList.map(el => el.id)
        }
        request.post('/modify', data).then(res => {
          if (res.success) {
            this.infoVisible = false
            this.priceVisible = false
            this.priceVisible2 = false
            this.pagination = {
              page: 1,
              pageSize: this.pagination.pageSize
            }
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 基本信息添加
    addBaseOther (type = 'add') {
      if (type === 'add') {
        this.baseOtherData = {
          name: '',
          num: 1,
          manage: '',
          maxPrice: '',
          price: '',
          unit: '',
          remarks: ''
        }
      } else {
        this.baseOtherData = {
          name: this.formItem.info.baseOther.name || '',
          num: this.formItem.info.baseOther.num || 0,
          manage: this.formItem.info.baseOther.manage || '',
          price: this.formItem.info.baseOther.price || '',
          maxPrice: this.formItem.info.baseOther.maxPrice || '',
          unit: this.formItem.info.baseOther.unit || '',
          remarks: this.formItem.info.baseOther.remarks || ''
        }
      }
      this.BaseOtherVisible = true
    },
    // 删除基本信息添加
    deleteBaseOther () {
      delete this.formItem.info.baseOther
      this.$forceUpdate()
    },
    // 确认添加基本信息
    confirmBaseOtherAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formItem.info.baseOther = this.baseOtherData
          this.BaseOtherVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addOther () {
      this.initOther()
      this.otherVisible = true
    },
    confirmAdd () {
      if (this.otherIndex === -1) this.formItem.info.other.push(this.otherData)
      else this.formItem.info.other.splice(this.otherIndex, 1, this.otherData)
      this.otherVisible = false
    },
    editOhter (index) {
      this.otherData = {...this.formItem.info.other[index]}
      this.otherIndex = index
      this.otherVisible = true
    },
    deleteOther (index) {
      this.formItem.info.other.splice(index, 1)
    },
    gotoPrint (row, type) {
      sessionStorage.setItem('row', JSON.stringify(row))
      window.open('#/print?type=' + type)
    },
    gotoPrintCode (row) {
      sessionStorage.setItem('codeRow', JSON.stringify(row))
      window.open('#/PrintCode')
      // window.open('#/detail?id=' + row.id)
    },
    goFreezer () {
      this.$router.push('/Freezer')
    }
  },
  watch: {
    'formItem.info.carry': function () {
      if (this.formItem.info.carry === 1) {
        this.formItem.info.carryCity = {
          num: 1,
          price: ''
        }
        return
      }

      if (this.formItem.info.duration) {
        const price = Number(this.formItem.info.duration) * 3.5
        this.formItem.info.carryCountry = {
          num: 1,
          price: price > 120 ? price : 120
        }
        return
      }
      this.formItem.info.carryCountry = {
        num: 1,
        price: ''
      }
    }
  }
}
</script>

<style scoped>
.el-header {
    margin-top: 40px;
    display: flex;
}

.el-form {
    margin: 0px 20px 20px 20px;
}
.table-box{
  padding: 0 20px
}

</style>
<style>
.el-checkbox__input .el-checkbox__inner{
    display: inline-block;
    position: relative;
    border: 1px solid #4404f5;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 20px !important;
    height: 20px !important;
    background-color: #FFF;
    z-index: 1;
    -webkit-transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
}
.el-checkbox__inner::after {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 1px solid #FFF;
    border-left: 0;
    border-top: 0;
    height:12px !important;
    left: 7px !important;
    position: absolute;
    top: 1px;
    -webkit-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 3px;
    -webkit-transition: -webkit-transform .15s ease-in .05s;
    transition: -webkit-transform .15s ease-in .05s;
    transition: transform .15s ease-in .05s;
    transition: transform .15s ease-in .05s, -webkit-transform .15s ease-in .05s;
    transition: transform .15s ease-in .05s,-webkit-transform .15s ease-in .05s;
    -webkit-transform-origin: center;
    transform-origin: center;
}
</style>
