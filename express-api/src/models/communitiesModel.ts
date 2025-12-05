// 菜单接口定义
export interface communities {
  id: string,
  code: string,// 小区编码，唯一标识
  name: string,// 小区名称
  district: string,// 所属行政区域
  address: string,// 详细地址
  propertyCompany: string,// 物业公司名称
  totalBuildings: number,// 楼栋总数量
  totalHouseholds: number,// 住户总数量
  status: string,// 状态：active-活跃, inactive-停用
  createdTime: string,// 创建时间
  updatedTime: string,// 更新时间
}