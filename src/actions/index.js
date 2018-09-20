export const SET_VINNUMAT_A = 'SET_VINNUMAT_A';
export const SET_VINNUMAT_C = 'SET_VINNUMAT_C';
export const SET_ONN = 'SET_ONN';
export const SET_ALDUR = 'SET_ALDUR';


export function setVinnumatA(vinnumat) {
  return {
      type: SET_VINNUMAT_A,
      vinnumat: vinnumat
    }
}

export function setVinnumatC(vinnumat) {
  return {
      type: SET_VINNUMAT_C,
      vinnumat: vinnumat
    }
}

export function setOnn(onn) {
  return {
      type: SET_ONN,
      onn: onn
    }
}

export function setAldur(aldur) {
  return {
      type: SET_ALDUR,
      aldur: aldur
    }
}
