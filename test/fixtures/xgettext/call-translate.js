export class myClass {
  classFields = 'this is a class field'
}

export default {
  data: () => ({
    isVisible: false,
  }),
  computed: {
    status () {
      return this.isVisible ? this.$t('open') : this.$t('closed')
    },
  },
  methods: {
    toggle () {
      this.isVisible = !this.isVisible
    },

    hide () {
      this.isVisible = false
    },

    show () {
      this.isVisible = true
    },
  },
}
