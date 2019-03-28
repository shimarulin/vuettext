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

    dynamicImportTest: () => import('external-package')
  },
}
