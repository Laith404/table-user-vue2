<template>
    <div class="table">
        <div class="table__sort">
            <span>Сортировать по:</span>
            <div class="table__sort-button">
                <button @click="sort('registration_date')"
                        type="registration_date"
                        :class="[PARAM_SORT === 'registration_date' ? sortDirection + ' active' : '']"
                        >Дате регистрации</button>
                <button @click="sort('rating')" 
                        type="rating"
                        :class="[PARAM_SORT === 'rating' ? sortDirection + ' active' : '']"
                >Рейтингу</button>
            </div>
        </div>
        <table class="table__list">
            <tr class="table__list-header">
                <th>Имя пользователя</th>
                <th>E-mail</th>
                <th>Дата регистранции</th>
                <th>Рейтинг</th>
            </tr>
            <TableItem v-for="people in renderProduct" 
                :key="people.id"
                :people="people"
                @dataModal="viewModal"
                class="table__list-user"/> <!-- Отображение элементов списка -->

        </table>
        <div class="pagination"
             :class="{'hidden': this.sortedPeople.length < 5 || paginationPage < 2 }"> <!-- Пагинация -->
            <div class="pagination__num">
                
                <div class="page back"
                :class="{'hidden': this.pageNum === 1}"
                @click="pageBack()"><i class="fas fa-arrow-left"></i></div>

                <div class="page"
                    v-for='page in paginationPage'
                    @click="pageClick(page)"
                    :class="{'page-active' : page === pageNum}"
                    :key='page'>{{page}}
                    </div>

                <div class="page go"
                    :class="{'hidden': this.pageNum === paginationPage}"
                    @click="pageGo()"><i class="fas fa-arrow-right"></i></div>
                </div>
        </div>
        <transition name="modal">
        <Modal v-if="showModal" 
            @close="showModal = false"
            @yes="deleteUserList()"
            :peopleModal="peopleModal"
    />
    </transition>
    </div>
    
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import Modal from "@/components/modal/Modal"
import TableItem from "./TableItem"

export default {
    name: "Table",
    data() {
        return {
            sortedPeople: [],
            peopleModal: null,
            sortDirection: 'asc',
            perPage: 5,
            showModal: false,
            pageNum: 1
        }
    },
    components: {TableItem, Modal},
    computed: {
        ...mapGetters([
        "PEOPLE",
        "SEARCH_VALUE",
        "PARAM_SORT"
        ]),
        paginationPage() { // вычисление сколько страниц 
            return  Math.ceil(this.sortedPeople.length / this.perPage);

        },
        renderProduct() { // отображение элементов на одной странице
            let from = (this.pageNum - 1 ) * this.perPage;
            let to = from + this.perPage;
            return this.sortedPeople.slice(from, to)
        }
    },
    methods: {
    ...mapActions([
      'GET_API',
      "GET_PARAMETERS_SORT"
    ]),

    viewModal(user) { // открыть модальное окно
        this.peopleModal = user;
        this.showModal = true;
    },

    deleteUserList() { // удалить user'а
            console.log('s')
            this.sortedPeople = this.sortedPeople.filter(i => i.id !== this.peopleModal.user.id);
            this.$store.commit('DELETE_PEOPLE', this.peopleModal.user);
    },
    sort(el) { // сортировка по параметрам
            if(el === this.PARAM_SORT) { 
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.GET_PARAMETERS_SORT(el);
            }
            if(this.PARAM_SORT === "") {// если нет параметров, вернуть весь список
                return this.sortedPeople = [...this.PEOPLE]
            } else {
                return this.sortedPeople.sort((p1,p2) => { // сортировка от большего к меньшему и на оборот
                    let modifier = 1;
                    if(this.sortDirection ==='desc') modifier = -1; 
                    if(p1[this.PARAM_SORT] < p2[this.PARAM_SORT]) return -1 * modifier;
                    if(p1[this.PARAM_SORT] > p2[this.PARAM_SORT]) return 1 * modifier;
                    return 0;
                })
            }
        },
    pageClick(page) {
        this.pageNum = page;
    },
    pageBack() {
        if(this.pageNum > 1) {
            this.pageNum -= 1;   
        }
    },
    pageGo() {
        if(this.pageNum < this.paginationPage) {
            this.pageNum += 1;
        }
    },
    SearchProduct(value) {
            this.sortedPeople = [...this.PEOPLE];
            this.pageNum = 1; // нужно вернуть на первую страницу
            this.sortedPeople = this.sortedPeople.filter(function ({username, email}) {
                return username.toLowerCase().includes(value.toLowerCase()) || email.toLowerCase().includes(value.toLowerCase())
            })
        },
  },
  watch: {
    SEARCH_VALUE() {
            this.SearchProduct(this.SEARCH_VALUE);
    },
    PARAM_SORT() {
        this.sort(this.PARAM_SORT);
    }
  },
  mounted() {
    this.GET_API()
        .then((response) => {
            if(response.data) {
                this.SearchProduct(this.SEARCH_VALUE);
            }
        })
  }
}
</script>

<style lang="sass" scoped>
.table
    margin: 1.25rem 0 0 0
    &__sort
        display: flex
        &-button > button 
            border: 0
            background: transparent
            margin: 0 .25rem
            opacity: .65
            color: $text-color
            font:
                size: 1rem
                weight: 500
            transition: .25s all
            outline: none
            &:active,&:hover,&.active
                opacity: 1
            &:active
                transform: scale(.95)
            &.active
                text-decoration: underline dashed rgba(34, 34, 34, .65)

    &__list
        width: 100%
        border-collapse: collapse
        text-align: left
        table-layout: fixed
        margin: .625rem 0 0 0
        background: #fff
        border-radius: .625rem
        &-header
            > th
                width: 100%
                padding: .9375rem 1.25rem
                font:
                    size: .875rem
                    weight: 400
                opacity: .6
                text-align: left
                


.modal-enter-active,
.modal-leave-active 
  transition: opacity 0.5s ease


.modal-enter-from,
.modal-leave-to
  opacity: 0

            
</style>

<style lang="sass">
.pagination
    position: relative
    width: 100% 
    &__num
        display: flex
        justify-content: center
        padding: 1.25rem 0 0 0 
    .page
        padding: .5rem
        margin: 0 .3125rem
        border: .125rem solid $text-color
        border-radius: .3125rem
        line-height: 1
        cursor: pointer
        font:
            size: .875rem
            weight: 600
        transition: all .15s ease-in-out
        &-active,&:hover
            background: $text-color
            color: #fff

</style>