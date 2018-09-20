import {
 SET_VINNUMAT_A,
 SET_VINNUMAT_C,
 SET_ONN,
 SET_ALDUR
} from '../actions';



export default function reducerinn(state={vinnumatA: 0, vinnumatC: 0, onn: 'vor', aldur: '30 ára-'},action) {
  switch(action.type) {
      case SET_VINNUMAT_A:
        return {
            ...state,
          	vinnumatA: action.vinnumatA,
          }
      case SET_ALDUR:
        return {
            ...state,
            aldur: action.aldur,
          }
      case SET_VINNUMAT_C:
        return {
            ...state,
            vinnumatC: action.vinnumatC,
          }
      case SET_ONN: 
        return {
          ...state,
          onn: action.onn
        }
      default:
        return state;
  }
}