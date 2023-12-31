// export  const loginStart=(userCredential)=>({
//     type:"LOGIN_START"
// })

// export const loginSuccess=(user)=>({
//     type:"LOGIN_SUCCESS",
//     user:user
// })

// export const loginFailure=()=>({
//     type:"LOGIN_FAILURE"
// })


// export const logout=()=>({
//     type:"LOGOUT"
// })

export const updateStart=(userCredential)=>({
    type:"UPDATE_START"
})

export const updateSuccess=(userData)=>({
    type:"UPDATE_SUCCESS",
    updateUserData:userData
})

export const updateFailure=()=>({
    type:"UPDATE_FAILURE"
})
