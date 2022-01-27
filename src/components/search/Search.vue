<template>
    <div class="search">
        <div class="search__box">
            <input type="text" @keyup.enter="searchType(search)" placeholder="поиск..." class="search__input" v-model="search">
            <button class="search__icon"
                    @click="searchType(search)"><i class="fas fa-search"></i></button>
        </div>
        <button @click="deleteSearch()" v-if="this.$store.getters.SEARCH_VALUE != '' || this.$store.getters.PARAM_SORT != ''"
                class="search__btn"><i class="fas fa-check search__btn-icon"></i>Очистить фильтр</button>
    </div>
</template>


<script>
import {mapActions} from 'vuex'
export default {
    name: 'Search',
    data() {
        return {search: ""}
    },

    methods: {
        ...mapActions([
        'GET_SEARCH_PRODUCT',
        "GET_PARAMETERS_SORT"
      ]),
      searchType(value) {
        this.GET_SEARCH_PRODUCT(value);
      },
      deleteSearch() {
        this.search = "";
        this.GET_SEARCH_PRODUCT("");
        this.GET_PARAMETERS_SORT("");
      }

    }
}
</script>

<style lang="sass" scoped>
.search
    position: relative
    background: #fff
    margin: .9375rem 0
    padding: .9375rem 1.25rem
    border-radius: .625rem
    display: block
    min-height: 5rem
    &__box
        position: relative
        transition: .5s
    &__btn
        display: inline-flex
        align-items: center
        background: transparent
        border: 0
        margin: .625rem 0 0 0
        font:
            weight: 700
        &-icon
            display: block
            margin: 0 .5rem 0 0
    &__icon    
        position: absolute
        left: .5rem
        top: 50%
        transform: translateY(-50%)
        opacity: .35
        border: 0
        outline: none
        z-index: 10
        cursor: pointer
        font:
            size: 1.125rem
        transition: .5s all

    &__input
        width: 100%
        background: #f0f0f0
        color: $text-color
        border-radius: .3125rem
        padding: .75rem .625rem .75rem 2.875rem
        box-sizing: border-box
        border: 0
        &::placeholder
            color: #9c9c9c
        &:focus::placeholder
            opacity: 0

    &__input:focus + &__icon
        opacity: 1

</style>