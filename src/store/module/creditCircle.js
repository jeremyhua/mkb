const creditCircle = {
    state: {
        post_list: '' ,
    },
    mutations: {
        GET_POST_LIST(state, post_list) {
            // console.log(state, post_list,"mutations")
            localStorage.setItem('post_list', post_list);
            state.post_list = post_list;
        },
       
    },
    actions: {
        get_list({ commit }, param) {
            this.axios.post("/api/Post/post_list", param.data).then((results) => {
                if (results.code == 200) {
                    commit("GET_POST_LIST", results.data);
                    param.fn && param.fn(200, results.data);
                } else {
                    param.fn && param.fn(-1, results.msg);
                }
            }).catch((err) => {
                param.fn && param.fn(-99);
            });
        },
        del_list({commit},param){
            this.axios.post("/api/Post/del_my_comment", param.data).then((results) => {
                if (results.code == 200) {
                    // commit("GET_POST_LIST", results.data);
                    param.fn && param.fn(200, results.msg);
                } else {
                    param.fn && param.fn(-1, results.msg);
                }
            }).catch((err) => {
                param.fn && param.fn(-99);
            });
        },
    },
    getters: {
        post_list(state) {
            return state.post_list;
        },
    }
}

export default creditCircle