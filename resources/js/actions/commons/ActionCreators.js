import { Types } from './Types'

export const getCommonData = (payload) => {
  return {
    type: Types.GET_COMMON_DATA,
      payload: payload
  }
}

export const getAllPermissions = (payload) => {
  return {
    type: Types.GET_PERMISSIONS,
    payload
  }
}

export const assignPermissions = (payload) => {
  return {
    type: Types.ASSIGN_PERMISSION,
    payload
  }
}

export const getEnrollmentChart = (payload) => {
  return {
    type: Types.GET_ENROLLMENT_CHART,
    payload
  }
}
