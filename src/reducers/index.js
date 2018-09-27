import {
 SET_VINNUMAT_A,
 SET_VINNUMAT_C,
 SET_ONN,
 SET_ALDUR, 
 SET_FJOLDI,
 ADD_AFANGI,
 DELETE_AFANGI
} from '../actions';



export default function reducerinn(state={vinnumatA: 0, 
                                          vinnumatC: 0, 
                                          onn: 'vor', aldur: '30 ára-', afangar: {'fj0': [39,39,39]}},action) {
  switch(action.type) {
      case DELETE_AFANGI:
        const nyr_afangar = {...state.afangar};
        const m = Object.keys(state.afangar).length;
        if (m == 1) {
          return {...state}
        }
        else {
          const heiti = 'fj' + (m-1).toString();
          delete nyr_afangar[heiti];
          return {
            ...state,
            afangar: {
              ...nyr_afangar
            }
          }
        }
        
      case ADD_AFANGI:
        const n = Object.keys(state.afangar).length;
        const heiti = 'fj' + n.toString();
        return {
          ...state,
          afangar: {...state.afangar, [heiti]: [39,39,39]}
        }
      case SET_FJOLDI: 
        let a = state.afangar[action.afangi];
        a[action.index] = action.value;

        return {
          ...state, 
          afangar: {...state.afangar, [action.afangi]: a}
        }
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