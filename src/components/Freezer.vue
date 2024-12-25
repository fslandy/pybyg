<template>
  <div class="container">
    <header class="header">
      <el-button type="primary" size="small" @click="goHome">返回首页</el-button>
      <h2 >冻库</h2>
    </header>
    <div class="core-list">
      <div v-for="core in coreList" :key="core.id" class=" wrapper core-wrapper"
       @dblclick.stop="editCore(core,'update_core_name')" @click.stop="handleCore(core)">
        <div class="core-item" :class="[core.id == activeCore.id?'active-core':'']">
          <span class="fs">{{core.name}}</span>
        </div>
      </div>
    </div>
    <div class="core-list cell-list" v-if="activeCore.id">
      <div v-for="cell in cellList" :key="cell.id" class="wrapper cell-wrapper" >
        <div class="cell-item"
          @click.stop="handleCell(cell)"
          @dblclick.stop="editCell(cell,'update_cell_name')"
         :class="[cell.book_id?'active-core':'']">
          <div class="flex_acsb">
            <p>{{cell.name}}</p>
            <!-- <el-button type="danger" size="mini" @click.stop="delCell(cell)">删除</el-button> -->
            <el-button v-show="cell.book_id" type="danger" size="mini" @click.stop="moveCell(cell)">移库</el-button>
          </div>
          <p class="fs text" style="text-align:center">{{cell.book_id?cell.username:''}}</p>
          <div v-show="cell.book_id">
            <p style="text-align:right;margin:5px 0">存放天数：{{cell.ts}}天</p>
            <p style="text-align:right">{{filterTime(cell.in_library_time)}}</p>
          </div>
        </div>
      </div>
      <div class="wrapper cell-wrapper"  @click="handleAdd">
        <div class="add-item">
          +
        </div>
      </div>
    </div>
    <!-- 创建格子或修改 -->
    <el-dialog
      title="编辑名称"
      :visible.sync="editDialog"
      center>
      <el-input type="text" v-model="editName" placeholder="请输入名称"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitModify(actionType)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 选人 -->
    <el-dialog
      title="入库选择"
      :visible.sync="listDialog"
      width="80%"
      center>
       <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        class="table-class"
        cell-class-name="table_cell_style"
        header-cell-class-name="table_cell_style">
        <el-table-column
          type="index"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          property="number"
          label="业务编号"
          align="center"
        >
        </el-table-column>
        <el-table-column
          property="name"
          label="逝者姓名"
          align="center"
          >
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handlePageChange"
        :current-page="page"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="listDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleInCell">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 移库 -->
    <el-dialog
      title="移库操作"
      :visible.sync="moveDialog"
      width="80%"
      center>
        <div class="flex_acs">
          <div class="wrapper-box">
            <div v-for="core in emptyCore" :key="core.id"
             @click="checkEmptyCore(core)"
             class="move-item fs"
             :class="[activeEmptyCore&&core.id == activeEmptyCore.id?'active-core':'']">{{core.name}}</div>
          </div>
          <div class="wrapper-box">
          <div v-for="cell in emptyCell" :key="cell.id"
          @click="checkEmptyCell(cell)"
          class="move-item fs"
          :class="[activeEmptyCell&&cell.id == activeEmptyCell.id?'active-core':'']">{{cell.name}}</div></div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="closeMoveDialog">取 消</el-button>
        <el-button type="primary" @click="submitMoveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {request} from '../common/config'
export default {
  name: 'Freezer',
  data () {
    return {
      coreList: [],
      activeCore: {
        name: '',
        id: 0
      },
      cellList: [],
      activeCell: {},
      activePeople: null,
      editDialog: false,
      editName: '',
      editType: 'core',
      actionType: 'update_core_name',
      listDialog: false,
      tableData: [],
      page: 1,
      total: 0,
      clickTimer: null,
      moveDialog: false,
      emptyCore: [],
      emptyCell: [],
      activeEmptyCore: {},
      activeEmptyCell: null
    }
  },
  mounted () {
    this.getCoreList()
  },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    filterTime (date) {
      if (!date) return
      let dateTimeres = date.replace(/T/g, ' ').replace(/.[\d]{3}Z/, ' ')
      return dateTimeres
    },
    getCoreList () {
      request.get('/admin/Cold/getAllColdList', {}).then(res => {
        this.coreList = res.data
      })
    },
    // 双击
    editCore (item, actionType) {
      clearTimeout(this.clickTimer)
      this.actionType = actionType
      this.activeCore = item
      this.$confirm(`是否要修改冻库“${this.activeCore.name}”的名称`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        lockScroll: true,
        customClass: 'message-box',
        type: 'warning'
      }).then(() => {
        this.editName = item.name
        this.editDialog = true
        this.editType = 'core'
        this.handleCore(item)
      }).catch(() => {
        this.$message.info('取消修改')
        this.editName = ''
      })
    },
    handleCore (item) {
      var that = this
      clearTimeout(that.clickTimer)
      that.clickTimer = setTimeout(() => {
        this.activeCore = item
        request.get(`/admin/Cold/getTDList?core_id=${item.id}`).then(res => {
          let list = res.data
          that.cellList = list
        })
      }, 300)
    },
    // 修改
    async submitModify (type) {
      if (this.editName === '') return this.$message.error('名字不能为空')
      let obj = {}
      if (type === 'create_cell' || type === 'update_core_name') {
        obj = {
          action: type,
          core_id: this.activeCore.id,
          name: this.editName
        }
      } else if (type === 'update_cell_name') {
        obj = {
          action: type,
          core_id: this.activeCore.id,
          name: this.editName,
          cell_id: this.activeCell.id
        }
      }
      request.post('/admin/Cold/addCold', obj).then(res => {
        const {data, items_count: count} = res.data
        this.tableData = data
        this.total = count
      }).catch(() => this.$message.error('添加失败'))
        .finally(() => {
          this.editDialog = false
          this.editName = ''
        })
      if (this.editType === 'core') {
        await this.getCoreList()
        this.$message.success('修改成功')
      } else {
        this.handleCore(this.activeCore)
      }
      this.editType = ''
    },
    handleAdd () {
      this.editDialog = true
      this.actionType = 'create_cell'
      this.editType = 'cell'
    },
    // 点击格子获取列表
    handleCell (cell) {
      var that = this
      clearTimeout(that.clickTimer)
      that.clickTimer = setTimeout(() => {
        this.activeCell = cell
        if (cell.book_id) {
          this.$confirm(`是否要将"${cell.username}"出库`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true,
            lockScroll: true,
            customClass: 'message-box',
            type: 'warning'
          }).then(() => {
            let obj = {
              action: 'out_library',
              id: this.activeCell.id,
              book_id: cell.book_id
            }
            request.post('/admin/Cold/outCold', obj).then(() => {
              this.$message.success('出库成功')
              this.handleCore(this.activeCore)
            })
          }).catch(() => this.$message.info('取消出库'))
        } else {
          request.get('/admin/Book/getList', {params: {page: this.page, page_size: 10}}).then(res => {
            this.tableData = res.data
            this.total = res.count
          })
          this.listDialog = true
        }
      }, 300)
    },
    editCell (item, actionType) {
      clearTimeout(this.clickTimer)
      this.actionType = actionType
      this.activeCell = item
      this.$confirm(`是否要修改格子“${item.name}”的名称`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        lockScroll: true,
        customClass: 'message-box',
        type: 'warning'
      }).then(() => {
        this.editName = item.name
        this.editDialog = true
        this.editType = 'cell'
      }).catch(() => {
        this.$message.info('取消修改')
        this.editName = ''
      })
    },
    handleInCell () {
      this.$confirm(`是否要将"${this.activePeople.name}"入库到"${this.activeCell.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        lockScroll: true,
        customClass: 'message-box',
        type: 'warning'
      }).then(() => {
        let obj = {
          action: 'in_library',
          id: this.activeCell.id,
          book_id: this.activePeople.id
        }
        request.post('/admin/Cold/moveCold', obj).then(() => {
          this.$message.success('入库成功')
          this.handleCore(this.activeCore)
          this.listDialog = false
        }).catch((err) => {
          this.$message.error(err.response.data.detail)
        })
      }).catch(() => this.$message.info('取消入库'))
    },
    delCell (cell) {
      this.$confirm(`是否要删除“${cell.name}”格子`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        lockScroll: true,
        customClass: 'message-box',
        type: 'warning'
      }).then(() => {
        let obj = {
          action: 'del_cell',
          core_id: this.activeCore.id,
          cell_id: cell.id
        }
        request.post('/admin/Cold/delCold', obj).then(() => {
          this.$message.success('删除成功')
          this.handleCore(this.activeCore)
        })
      }).catch(() => this.$message.info('删除失败'))
    },
    moveCell (cell) {
      this.$confirm(`是否要对${cell.username}进行移库`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        lockScroll: true,
        customClass: 'message-box',
        type: 'warning'
      }).then(() => {
        this.getEmptyCore()
        this.activeCell = cell
        this.moveDialog = true
      })
    },
    getEmptyCore () {
      request.get('/admin/Cold/getAllColdList').then((res) => {
        this.emptyCore = res.data
      }).catch((err) => {
        this.$message.error(err.response.data.detail)
      })
    },
    checkEmptyCore (core) {
      request.get('/admin/Cold/getTDList', {params: {core_id: core.id}}).then(res => {
        this.emptyCell = res.data
      })
      this.activeEmptyCell = null
      this.activeEmptyCore = core
      // this.emptyCell = core.cell
    },
    checkEmptyCell (cell) {
      this.activeEmptyCell = cell
    },
    closeMoveDialog () {
      this.moveDialog = false
      this.emptyCell = []
      this.activeEmptyCore = null
      this.activeEmptyCell = null
    },
    submitMoveDialog () {
      if (!this.activeEmptyCell) return this.$message.error('请先选择库')
      request.post(`/admin/Cold/moveCold?book_id=${this.activeCell.book_id}&id=${this.activeEmptyCell.id}&old_cell_id=${this.activeCell.id}`).then(() => {
        this.$message.success('移库成功')
        this.handleCore(this.activeCore)
      }).catch((err) => {
        this.$message.error(err.response.data.detail)
      }).finally(() => {
        this.closeMoveDialog()
      })
    },
    // 选中列表人
    handleCurrentChange (row) {
      this.activePeople = row
    },
    // 切换页数
    handlePageChange (data) {
      this.page = data
      this.handleCell(data)
    }
  },
  filters: {
    filterTime (date) {
      return date.replace(/T/g, ' ').replace(/.[\d]{3}Z/, ' ')
    }
  }
}
</script>

<style>
.header{
  position: relative;
  margin-bottom: 20px;
}
h2{
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-20px,-50%);
}
.table_cell_style{
  color: #000;
  font-size: 25px;
}
.container{
  padding: 10px;
}
.core-list{
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
}
.core-wrapper{
  /* border: 1px solid #000; */
  flex: 0 0 33%;
}
.core-item{
  border: 1px solid #000;
  height: 80px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fs{
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 5px;
}
.active-core{
  background-color: #000;
  color: #fff;
}
.cell-wrapper{
  flex: 0 0 50%;
}
.cell-list{
  margin-top: 80px;
  justify-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
}
.cell-item{
  width: 60%;
  border: 1px solid #000;
  height: 150px;
  padding: 20px;
}
.add-item{
  width: 60%;
  border: 1px solid #000;
  height: 150px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
}
.text{
  height: 60px;
  line-height: 60px;
  margin-top: 20px;
}
.table-class{
  width: 100%;
}
.table-class .el-table__body tr.current-row>td.el-table__cell{
  background-color: #409EFF !important;
}
.table-class.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell{
  background-color: #409EFF !important;
}
.wrapper-box{
  border: 1px solid #409EFF;
  flex: 0 0 30%;
  height: 50vh;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
}
.move-item{
  cursor: pointer;
  text-align: center;
  border: 1px solid #000;
  /* width: 80%; */
  /* background-color: #1f1a1a; */
  padding: 20px;
  margin-bottom: 20px;
}
@media (max-width:900px) {
.table_cell_style{
  color: #000;
  font-size: 18px;
}
  .core-item{
    border: 1px solid #000;
    height: 80px;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text{
    line-height: 30px;
    margin:10px 0px;
  }
  .cell-item{
    width: 60%;
    border: 1px solid #000;
    /* height: 100px; */
    padding: 10 25px;
  }
  .add-item{
    width: 60%;
    border: 1px solid #000;
    height: 80px;
    padding: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
  }
  .fs{
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
  }
  .message-box{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translate(-50%,-50%);
  }
  .cell-list{
    margin-top: 40px;
    justify-content: flex-start;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
