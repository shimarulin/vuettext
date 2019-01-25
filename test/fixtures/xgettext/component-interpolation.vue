<template>
  <div id="app">
    <!-- ... -->
    <i18n path="term" tag="label" for="tos">
      <a :href="url" target="_blank">{{ $t('tos') }}</a>
    </i18n>
    <!-- ... -->
  </div>
</template>
