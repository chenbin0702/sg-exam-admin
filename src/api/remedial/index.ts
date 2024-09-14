import {defHttp} from '/@/utils/http/axios';
import {ApiRes} from "/@/api/constant";
const prefix='/sg-user-service'
export const remediationSaveOrUpdate = (data: any) =>
defHttp.post(
    {
      url: prefix+'/v1/remediation/saveOrUpdate',
      data,
    },        
  );         
export const remediationList = (data: any) =>
defHttp.get(
    {
      url: prefix+'/v1/remediation/list',
      params: data,
    },        
  ).then(res=>{
    return{
      list:res.content
    }
  })

  // /v1/remediation/delete/{id} 删除
  export const remediationDelete = (id: string) =>
  defHttp.post(
      {
        url: prefix+'/v1/remediation/delete/'+id,
      },        
    );
