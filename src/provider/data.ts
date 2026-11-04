import {BaseRecord, DataProvider, GetListParams, GetListResponse} from "@refinedev/core";
import {MOCK_SUBJECTS} from "../constants/mock-data";

export const dataProvider: DataProvider= {

    //type is data provider


  // Define your data provider methods here
  //getList fethes all records used by the table component, USETABLE, USELIST
  //ANYTIME we implement a list resource page REACT MAKE A CALL to getlist to get data and pass to the table bts

  //accepts resource, returns getlistparams then returns promise that get resolves in getlistresponse in tdata
  //returning tdata

  getList: async<TData extends BaseRecord = BaseRecord> ({ resource, pagination, filters, sorters }:GetListParams)
  :Promise<GetListResponse<TData>> => {
    if (resource !== "subjects"){
        return {data: [] as TData[], total:0}
    }
    return{
        data: MOCK_SUBJECTS as unknown as TData[],
        total: MOCK_SUBJECTS.length,
    }
    
  },
  //fetches single record by id
  //throw new error so it wont affect refine data provider doesnt complain of a type issue
  getOne: async () => {throw new Error('This function is not present in the mock')},
  create: async () => {throw new Error('This function is not present in the mock')},
  update: async () => {throw new Error('This function is not present in the mock')},
  deleteOne: async () => {throw new Error('This function is not present in the mock')},

  getApiUrl: () =>'',
};