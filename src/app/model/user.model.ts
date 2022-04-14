// export interface User {
//   id?: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   mobile: number;
// }

export interface AdminUser {
  id?: number;
  name: string;
  email: string;
  mobile_no: string;
  username: string;
  desig_id: `${AdminRole}`;
  user_designation: string;
  addr_line1: string;
  addr_line2: string;
  addr_line3: string;
  pincode: string;
  district: number;
  state: number;
}

export interface Designation {
  id?: number;
  designation: string;
}

export enum AdminRole {
  SUPER_ADMIN = '1',
  BACK_OFFICE_USER = '2',
  SHOPS = '3',
}
