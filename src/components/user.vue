<template>
  <div class="user">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mbx">
      <el-breadcrumb-item :to="{ path: 'welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="userobj.query"
        class="input-with-select"
        style="width:300px;margin-right:10px"
        @input.native="init"
      >
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
      <el-button type="success" plain @click="addUserBtn">添加用户</el-button>
      <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

      <el-dialog title="添加用户" :visible.sync="dialogFormVisible" :modal="true">
        <el-form :model="addform" :rules="rules" ref="addform">
          <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
            <el-input auto-complete="off" v-model="addform.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input auto-complete="off" v-model="addform.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input auto-complete="off" v-model="addform.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
            <el-input auto-complete="off" v-model="addform.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUsers">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table :data="users" :border="true" style="width: 100%;margin-top:15px">
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="role_name" label="职位" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="250"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="userstatus(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="caozuo" label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑用户" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              plain
              @click="handleEdit(scope.$index, scope.row)"

            ></el-button>
          </el-tooltip>
          <!-- 编辑用户 -->
          <el-dialog title="编辑用户" :visible.sync="editdialogFormVisible" :before-close="handleClose">
            <el-form :model="editUser" ref="editUser">
              <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
                <el-input auto-complete="off" v-model="editUser.username"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input auto-complete="off" v-model="editUser.email"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
                <el-input auto-complete="off" v-model="editUser.mobile"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editdialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="edituser">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 删除用户 -->
           <el-tooltip class="item" effect="dark" content="删除用户" placement="top">
            <el-button
              type="danger"
              icon="el-icon-delete"
              plain
              @click="deleteHandle(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <!-- 分配用户 -->
          <el-tooltip class="item" effect="dark" content="分配用户" placement="top">
            <el-button
              type="warning"
              icon="el-icon-menu"
              plain

            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userobj.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="userobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >// 这个数据来自于用户列表</el-pagination>
  </div>
</template>
<script>
import { getAllUsers, EditStatus, addusers, eidtUser, deleteUser } from '@/api/user.js'
export default {
  data () {
    return {
      total: 0,
      status: true,
      userkey: '',
      users: [],
      userobj: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      // 添加用户
      addform: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      // 给添加用户表单添加验证规则
      rules: {
        username: [
          { required: true, message: '请输入需要添加的用户名', trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: '请输入需要添加的用户密码',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            pattern: /^1\d{10}$/,
            message: '请输入合法的手机号',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            pattern: /\w+[@]\w+[.]\w+/,
            message: '请输入合法的电子邮箱',
            trigger: 'blur'
          }
        ]
      },
      // 编辑用户
      editdialogFormVisible: false,
      editUser: {
        username: '',
        email: '',
        mobile: '',
        id: 0
      }
    }
  },
  methods: {
    // index编号
    indexMethod (index) {
      return index + 1
    },
    // 点击编辑触发的事件   rou--->scope.row uoqu到当前行的数据   index-->当前行的索引
    handleEdit (index, row) {
      this.editdialogFormVisible = true
      console.log(index, row)
      this.editUser.username = row.username
      this.editUser.email = row.email
      this.editUser.mobile = row.mobile
      this.editUser.id = row.id
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 更改用户状态
    userstatus (row) {
      // console.log(row)
      let uId = row.id
      let type = row.mg_state
      EditStatus(uId, type)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message({ type: 'success', message: res.data.meta.msg })
          } else {
            this.$message({ type: 'error', message: res.data.meta.msg })
          }
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    init () {
      getAllUsers(this.userobj)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.users = res.data.data.users
            this.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSizeChange (val) {
      //  console.log(this)
      // console.log(`每页 ${val} 条`)
      this.userobj.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // console.log(val)
      this.userobj.pagenum = val
      this.init()
    },
    // 添加用户
    addUserBtn () {
      // this.$refs.addform.resetFields()
      // console.log(this.$refs.addform)
      if (this.$refs.addform) {
        this.$refs.addform.resetFields()
      }
      // this.addform.resetFields()
      this.dialogFormVisible = true
    },
    // 二次验证添加的数据
    addUsers () {
      // console.log(this.$refs.addform)
      this.$refs.addform.validate(valid => {
        // 判断添加的数据是否合理
        if (valid) {
          console.log(this.addform)
          addusers(this.addform)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 201) {
                this.$message({
                  type: 'success',
                  message: '数据添加成功'
                })
                // 隐藏对话框
                this.dialogFormVisible = false
                // 重置表单元素的数据
                this.$refs.addform.resetFields()
                // 刷新
                this.init()
              } else {
                this.$message.error(res.data.meta.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({ type: 'error', message: '数据输入不合法' })
          return false
        }
      })
    },
    // 编辑数据
    edituser () {
      let id = this.editUser.id
      console.log(this.editUser)
      eidtUser(id, this.editUser)
        .then((res) => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            this.editdialogFormVisible = false
            this.init()
          } else {
            this.$message.console.error(res.data.meta.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 删除功能
    deleteHandle (index, row) {
      console.log(index, row)
      if (confirm('确定要删除吗')) {
        let id = row.id
        console.log(id)
        deleteUser(id)
          .then((res) => {
            if (res.data.meta.status === 200) {
              this.$message.success(res.data.meta.msg)
              this.init()
            } else {
              this.$message.error(res.data.meta.msg)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less">
.tb {
  text-align: center;
}
.mbx {
  line-height: 45px;
}
</style>
