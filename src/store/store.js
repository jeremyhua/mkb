import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import loginModule from "./module/users.js"
import loanModule from "./module/loancenter.js"
import cards from "./module/card.js"
import creditCircle from './module/creditCircle.js'
const store = new Vuex.Store({
    modules: {
        login:loginModule,
        loan:loanModule,
        card:cards,
        cricle:creditCircle,
    }
})

export default store