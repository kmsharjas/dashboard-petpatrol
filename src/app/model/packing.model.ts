export interface Package {
  id?: number;
  offertitle: string;
  startdate: Date | string;
  enddate: Date | string;
  isofferactive: boolean;
  minimumquantity: 1;
}
export interface Packing {
  id: number;
  type: string;
}
