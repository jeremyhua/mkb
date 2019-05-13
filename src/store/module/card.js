const GET_BANK_CARD = 'GET_BANK_CARD';
const GET_CREDIT_CARD = 'GET_CREDIT_CARD';
const ERROR_MSG = 'ERROR_MSG';


const initState = {
    bankCard:[],
    creditCard:[]||localStorage.getItem('creditCard'),
    msg: '',
}
const card = {
    state: initState,
    mutations: {
        GET_BANK_CARD(state, { result, msg }) {
            state.bankCard = result;
            state.msg = msg + (new Date()).valueOf();
        },
        GET_CREDIT_CARD(state, { result, msg }) {
            state.creditCard = result;
            localStorage.setItem("creditCard", JSON.stringify(result));
            state.msg = msg + (new Date()).valueOf();
        },
        ERROR_MSG(state, { msg }) {
            state.msg = msg + (new Date()).valueOf();
        }
    },
    actions: {
        getBankCard({ commit }) {
            this.axios.post('/api/api/seeBank')
                .then(res => {
                    switch (res.code) {
                        case 1:  //成功
                            commit(GET_BANK_CARD, res)
                            break;
                        default: //失败
                            commit(ERROR_MSG, { msg: res.msg })
                            break;
                    }
                })
        },
        getCreditCard({ commit }) {
            this.axios.post('/api/api/seeCredit')
                .then(res => {
                    console.log(res)
                    switch (res.code) {
                        case 1:  //成功
                            commit(GET_CREDIT_CARD, res)
                            break;
                        default: //失败
                            commit(ERROR_MSG, { msg: res.msg })
                            break;
                    }
                })
        },

    }
}


export default card
 