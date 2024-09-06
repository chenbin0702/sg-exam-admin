import {defHttp} from '/@/utils/http/axios';
import {ApiRes} from "/@/api/constant";
// v1/homework/saveOrUpdate 学生作业 保存或修改
const prefix='/sg-user-service'
export const homeworkSaveOrUpdate = (data: any) =>
defHttp.post(
    {
      url: prefix+'/v1/homework/saveOrUpdate',
      data,
    },        
  );         

/*v1/homework/list 列表 参数为  get请求

 */ 
export const homeworkList = (data: any) =>
defHttp.get(
    {
      url: prefix+'/v1/homework/list',
      params: data,
    },        
  ).then(res=>{
    return{
      list:res.content
    }
  })

