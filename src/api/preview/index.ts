import {defHttp} from '/@/utils/http/axios';
import {ApiRes} from "/@/api/constant";
const prefix='/sg-user-service'
export const prepareSaveOrUpdate = (data: any) =>
defHttp.post(
    {
      url: prefix+'/v1/prepare/saveOrUpdate',
      data,
    },        
  );         
export const prepareList = (data: any) =>
defHttp.get(
    {
      url: prefix+'/v1/prepare/list',
      params: data,
    },        
  ).then(res=>{
    return{
      list:res.content
    }
  })

