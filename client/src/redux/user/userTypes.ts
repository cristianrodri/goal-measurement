import { User } from '../../types'

export enum UserTypes {
  COMPLETED_DATA = 'COMPLETED_DATA',
  USER_DATA = 'USER_DATA',
  IS_AUTH = 'IS_AUTH',
  USER_AVATAR = 'USER_AVATAR',
  RESET = 'RESET'
}

export interface CompletedDataAction {
  type: UserTypes.COMPLETED_DATA
}

export interface UserDataAction {
  type: UserTypes.USER_DATA
  payload: User
}

export interface IsAuthAction {
  type: UserTypes.IS_AUTH
  payload: boolean
}

export interface UserAvatarAction {
  type: UserTypes.USER_AVATAR
  payload: string
}

export interface ResetAction {
  type: UserTypes.RESET
}

export type UserAction =
  | CompletedDataAction
  | UserDataAction
  | IsAuthAction
  | UserAvatarAction
  | ResetAction
