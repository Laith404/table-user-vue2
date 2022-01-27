<template>
    <div class="modal">
        <div class="modal__mask">
            <div class="modal__container">
                <h3 class="modal__header">
                    Удалить?
                </h3>
                <p class="modal__body">
                    Вы уверенны что хотите удалить данного пользователя?
                </p>
                <div class="modal__footer">
                        <button class="modal__btn" @click="deleteUser">Да</button>
                        <button class="modal__btn not-delete" @click="$emit('close')">нет</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Modal",
    props: ['peopleModal'],
    data() { return{} },
    methods: {
      deleteUser() {
        this.$emit('yes', );
        this.$emit('close');
      }
    }
}
</script>


<style lang="sass" scoped>
.modal
  &__mask
    position: fixed
    z-index: 9998
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.5)
    display: table
  &__container 
    width: 300px
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%,-50%)
    margin: 0px auto
    padding: 20px 30px
    background-color: #fff
    border-radius: 2px
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33)
    font-family: Helvetica, Arial, sans-serif
  &__header h3
    margin-top: 0
    color: $text-color
    font:
      size: 2.5rem
  &__body 
    margin: 20px 0
    line-height: 1.35
  &__footer
    display: flex
  &__btn
    display: block
    margin: 1rem .5rem 0
    width: 40%
    background: none
    border: 1px solid $text-color
    padding: .25rem .3125rem
    transition: .5s ease-in-out
    cursor: pointer
    outline: none
    &:active
      transform: scale(0.9)
    &:hover
      background: green
      border-color: green
      color: #fff
      
    &.not-delete
      background: red
      border-color: red
      color: #fff

</style>