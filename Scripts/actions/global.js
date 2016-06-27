/*eslint-env browser*/
import types from '../constants/actionTypes'

export const calculateResponsiveState = () => {
  const {innerWidth, innerHeight, matchMedia} = window
  return {
    type: types.CALCULATE_RESPONSIVE_STATE,
    innerWidth,
    innerHeight,
    matchMedia,
  }
}

export const openNavigationDrawer = () => ({
  type: types.OPEN_NAVIGATION_DRAWER,
})

export const closeNavigationDrawer = () => ({
  type: types.CLOSE_NAVIGATION_DRAWER,
})

export const deleteSnack = () => ({
  type: types.DELETE_SNACK,
})

export const setFilter = errorType => ({
  type: types.SET_FILTER,
  payload: errorType,
})
