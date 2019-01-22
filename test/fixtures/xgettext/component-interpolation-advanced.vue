<template>
  <div id="app">
    <!-- ... -->
    <i18n path="info" tag="p">
      <span place="limit">{{ changeLimit }}</span>
      <a place="action" :href="changeUrl">{{ $t('change') }}</a>
    </i18n>
    <!-- ... -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      changeUrl: '/change',
      changeLimit: 15,
    }
  }
}
</script>
