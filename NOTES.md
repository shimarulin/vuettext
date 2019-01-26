# Notes

## Best practices

### String case

Write your translation string in lowercase and use CSS to capitalize first letter of strings if it need:

```css
button::first-letter {
    text-transform: uppercase;
}
```

If it isn't possible, you can use [Vue filters](https://vuejs.org/v2/guide/filters.html)

```vue
<!-- in mustaches -->
<p>
  {{ $t('first capitalized message') | capitalize }}
  {{ $t('second capitalized message') | capitalize }}
</p>


<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>
```

If you will support German, Dutch, Greek and some more languages, don't forget about implementation language-specific 
letter case mapping rules in your custom Vue filters. 
[Read more...](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform)

The reason: you can use translated string as part of other string with
[linked](https://kazupon.github.io/vue-i18n/guide/messages.html#linked-locale-messages)
or [named](https://kazupon.github.io/vue-i18n/guide/formatting.html#named-formatting) interpolation. If you keep your
translate strings in lowercase it will be simple.
