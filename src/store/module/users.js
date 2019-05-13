const loginModule = {
    state: {
        users: '' || localStorage.getItem("users"),
        get_product: "",
        enter_loan: "",
        get_userinfo: "" || localStorage.getItem("get_userinfo"),
    },
    mutations: {
        SAVE_USERS(state, users) {
            localStorage.setItem('Token', users.Token);
            localStorage.setItem("users", JSON.stringify(users));
            state.users = users;
            //console.log("mutation" + JSON.stringify(state))
        },
        DELETE_USERS(state, users) {
            localStorage.clear()
            //localStorage.removeItem("users");
            state.users = users;
        },
        GET_PRODUCT(state, get_product) {
            state.get_product = get_product
        },
        ENTER_LOAN(state, enter_loan) {
            localStorage.setItem("enter_loan", JSON.stringify(enter_loan));
            state.enter_loan = enter_loan
        },
        GET_USERINFOS(state, get_userinfo) {
            let users = JSON.parse(state.users);
            users = {...users,...get_userinfo};
           // console.log(users);
            state.users = users;
            localStorage.setItem('Token', users.Token);
            localStorage.setItem("users", JSON.stringify(users));
        }
    },
    actions: {
        signIn({ commit }, param) {
            this.axios.post("/api/Privilege/sign_in", param.data).then((results) => {
                if (results.code == 200) {
                    commit("SAVE_USERS", results.data);
                    param.fn && param.fn(200, results.data);
                } else {
                    param.fn && param.fn(-1, results.msg);
                }
            }).catch((err) => {
                param.fn && param.fn(-99);
            });
        },
        register({ commit }, param) {
            this.axios.post("/api/Privilege/sign_up", param.data).then((results) => {
                if (results.code == 200) {
                    commit("SAVE_USERS", results.data);
                    param.fn && param.fn(200, results.data);
                } else {
                    param.fn && param.fn(-1, results.msg);
                }
            }).catch((err) => {
                param.fn && param.fn(-99);
            });
        },
        signOut({ commit }) {
            commit("DELETE_USERS", "");
        },
        verificationCode({ commit }, param) {
            this.axios.post("/api/Privilege/get_code", param.data).then((results) => {
                if (results.code == 200) {
                    param.fn && param.fn(200, results.data);
                } else {
                    param.fn && param.fn(-1, results.msg);
                }
            }).catch((err) => {
                param.fn && param.fn(-99);
            });
        },
        forgetPassword({ commit }, param) {
            this.axios.post("/api/Privilege/forget_pwd", param.data).then((results) => {
                if (results.code == 200) {
                    param.fn && param.fn(200, results.data);
                } else {
                    param.fn && param.fn(-1, results.msg);
                }
            }).catch((err) => {
                param.fn && param.fn(-99);
            });
        },
        enterLoan({ commit }, param) {
            this.axios.post("/api/Privilege/lenders_sign_up", param.data).then((results) => {
                if (results.code == 200) {
                    commit("ENTER_LOAN", results.data);
                    param.fn && param.fn(200, results.data);
                } else {
                    param.fn && param.fn(-1, results.msg);
                }
            }).catch((err) => {
                param.fn && param.fn(-99);
            });
        },
        get_add_product({ commit }, param) {
            this.axios.post("/api/Product/get_add_product_condition", param.data).then((results) => {
                if (results.code == 200) {
                    commit("GET_PRODUCT", results.data);
                    param.fn && param.fn(200, results.data);
                } else {
                    param.fn && param.fn(-1, results.msg);
                }
            }).catch((err) => {
                param.fn && param.fn(-99);
            });
        },
        userinfo({ commit }, param) {
            this.axios.post('/api/Usercenter/index', param.data).then((results) => {
                //console.log(JSON.stringify(results) + "userinfoaction")
                if (results.code == 200) {
                    commit("GET_USERINFOS", results.data);
                    param.fn && param.fn(200, results.data);
                }else if(results.code == 401) {
                    // commit("GET_USERINFOS", results.data);
                    // console.log(111222,param.fn)
                    param.fn && param.fn(401, results.data);
                } else {
                    param.fn && param.fn(-1, results.msg);
                }
            }).catch((error) => {
                param.fn && param.fn(-99);
            });
        }
    },
    getters: {
        users(state) {
            return localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : state.users;
            // console.log("geeters" + JSON.stringify(state.users))
        },
        get_product(state) {
            return state.get_product
        },
        enter_loan(state) {
            return state.enter_loan
        },
        get_userinfo(state) {
            return localStorage.getItem("get_userinfo") ? JSON.parse(localStorage.getItem("get_userinfo")) : state.get_userinfo;
        },
    }
}

export default loginModule