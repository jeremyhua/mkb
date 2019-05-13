const loanModule = {
    state: {
        loancenter: '' || localStorage.getItem("loancenter")
    },
    mutations: {
        LOAN_CENTER(state, loancenter) {
            localStorage.setItem("loancenter", JSON.stringify(loancenter));
            state.loancenter = loancenter;
        }
    },
    actions: {
        loancenter({ commit }, param) {
            this.axios.post("/api/Lenders/base_info", param.data).then((results) => {
                if (results.code == 200) {
                    commit("LOAN_CENTER", results.data);
                    param.fn && param.fn(200, results.data);
                } else {
                    param.fn && param.fn(-1, results.msg);
                }
            }).catch((err) => {
                param.fn && param.fn(-99);
            });
        }
    },
    getters: {
        loancenter(state) {
            return localStorage.getItem("loancenter") ? JSON.parse(localStorage.getItem("loancenter")) : state;
        }
    }
}

export default loanModule