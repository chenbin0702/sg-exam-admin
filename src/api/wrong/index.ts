
import {defHttp} from '/@/utils/http/axios';
const prefix='/sg-user-service'
export const mistakesSaveOrUpdate = (data: any) =>
defHttp.post(
    {
      url: prefix+'/v1/mistakes/saveOrUpdate',
      data,
    },        
  );         
export const mistakesList = (data: any) =>
defHttp.get(
    {
      url: prefix+'/v1/mistakes/list',
      params: data,
    },        
  ).then(res=>{
    return{
      list:res.content
    }
  })

