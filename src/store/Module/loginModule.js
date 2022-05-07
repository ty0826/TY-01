export default {
    namespaced: true,
    state: {
        userInfor: {
            user: "",
            token: ''
        }
    },
    mutations: {
        //设置用户信息
        setUser(state, users) {
            state.userInfor = users
        },
        //清空信息
        clearUser(state) {
            state.userInfor = {
                user: "",
                token: ''
            }
        }
    }
}