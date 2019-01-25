export default {
  data: () => ({
    limit: 10,
    count: false,
  }),
  computed: {
    has () {
      return `${this.$tc('apple', this.count)} ${this.$t('of')} ${this.$tc('apple', this.limit)}`
    },
  },
  methods: {
    increment () {
      this.count < this.limit && this.count++
    },
  },
}
