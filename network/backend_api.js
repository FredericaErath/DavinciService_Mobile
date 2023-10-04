import {requests} from './http.js'
 
 
//user
export const login_api = (data) =>
  requests({ url: 'login/', method: 'post', data })
export const get_users_api = (data) =>
  requests({ url: 'admin/get_user', method: 'post', data })
export const add_one_user = (data) =>
  requests({ url: 'admin/add_user', method: 'post', data })
export const delete_user = (data) =>
  requests({ url: 'admin/delete_user', method: 'post', data })
export const revise_user = (data) =>
  requests({ url: 'admin/revise_user', method: 'post', data })
//instrument
export const get_instrument = (data) =>
  requests({ url: 'admin/get_specific_instruments', method: 'post', data })
//consumable
export const get_consumable = (data) =>
  requests({ url: 'admin/get_supply', method: 'post', data })
//surgery
export const get_surgery = (data) =>
  requests({ url: 'admin/get_surgery', method: 'post', data})
export const insert_surgery = (data) =>
  requests({ url: 'admin/insert_surgery_admin', method: 'post', data})
//dashboard
export const get_surgery_dashobard = (data) =>
  requests({ url: 'admin/get_surgery_dashboard', method: 'post', data})
export const get_doctor_contribution = (data) =>
  requests({ url: 'admin/get_doctor_contribution', method: 'post', data})
