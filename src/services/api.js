import axios from './axios'
import config from './config'

let baseUrl = ''
config.env === 'development' ? baseUrl = config.testDomain : baseUrl = config.domain

const api = {
  // 主要的公共api
  mainApi: {
    getClassList: (data) => { // 获取表单分类列表
      return axios.http({
        method: 'post',
        data: data,
        url: baseUrl + '/form/FormClassList'
      })
    },
    editClass: (data) => { // 表单分类添加和编辑
      return axios.http({
        method: 'post',
        data: data,
        url: baseUrl + '/form/FormClassAdd'
      })
    },
    delClass: (data) => { // 表单分类删除
      return axios.http({
        method: 'get',
        data: data,
        url: baseUrl + '/form/FormClassDelete'
      })
    },
    getFormList: (data) => { // 获取表单列表
      return axios.http({
        method: 'post',
        data: data,
        url: baseUrl + '/form/list'
      })
    },
    getFormDetail: (data) => { // 获取表单详情
      return axios.http({
        method: 'get',
        data: data,
        url: baseUrl + '/form/info'
      })
    },
    delForm: (data) => { // 删除表单
      return axios.http({
        method: 'get',
        data: data,
        url: baseUrl + '/form/FormDelete'
      })
    },
    editForm: (data) => { // 表单添加和删除
      return axios.http({
        method: 'post',
        data: data,
        url: baseUrl + '/form/FormAdd'
      })
    },
    getAuthSelectList: (data) => { // 获取权限选择列表
      return axios.http({
        method: 'get',
        data: data,
        url: baseUrl + '/form/DList'
      })
    },
    saveFormAuth: (data) => { // 保存表单发起权限
      return axios.http({
        method: 'post',
        data: data,
        url: baseUrl + '/form/FormSee'
      })
    },
    loadFormAuth: (data) => { // 加载表单发起权限
      return axios.http({
        method: 'get',
        data: data,
        url: baseUrl + '/form/FormSeeList'
      })
    },
    saveFormApprove: (data) => { // 保存表单审批流程
      return axios.http({
        method: 'post',
        data: data,
        url: baseUrl + '/form/FormSP'
      })
    },
    loadFormApprove: (data) => { // 加载表单审批流程
      return axios.http({
        method: 'get',
        data: data,
        url: baseUrl + '/form/FormSPList'
      })
    }
  }
}

export default api
