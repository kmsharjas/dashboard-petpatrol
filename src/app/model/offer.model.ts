export interface Offer {
  id?: number;
  offertitle: string;
  startdate: Date | string;
  enddate: Date | string;
  isofferactive: boolean;
  minimumquantity: 1;
}
