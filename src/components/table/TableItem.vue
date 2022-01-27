<template>
    <tr class="list-user">
        <td>{{people.username}}</td>
        <td>{{people.email}}</td>
        <td>{{dateReg(people)}}</td>
        <td>{{people.rating}}</td>
        <td><button @click="dataModal"><i class="fas fa-times"></i></button></td>
    </tr>
</template>

<script>
export default {
    name: "TableItem",
    props: ['people'],
    data() { return{} },
    methods: {
        dateReg(people) { // фильтр даты
            return new Date(Date.parse(people.registration_date)).toLocaleDateString()
        },
        dataModal() {
            this.$emit('dataModal', {
                user: this.people
            })
        }
    }
}
</script>

<style lang="sass" scoped>
.list-user
    position: relative
    border-top: 1px solid rgba(34, 34, 34, .15)
    width: 100%
    > td
        position: relative
        padding: .9375rem 1.25rem
        font:
            size: .875rem
            weigth: 200
        &:last-child
            position: absolute
            right: 5rem
            padding: .5rem 1.25rem

    button
        background: none
        border: 0
        outline: none
        font:
            size: 1.125rem
        color: red
        cursor: pointer
        transition: .4s
        &:hover
            transform: scale(1.1)

</style>