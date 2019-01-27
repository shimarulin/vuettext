# Notes

## Zero-count flag

In some case, you may want to use more human-readable string to specifying zero items. For example, it can be used 
as "No apples", "No more...", "No one...". Because _gettext_ haven't way for this, my suggestion is to add 
custom setting for language to `package.json` for example:

```json
{
  "vuettext": {
    "languages": {
      "en_US": {
        "zero_count": {
          "prefix": "No",
          "msgstr_idx": 1
        }
      }
    }
  }
}
```

- `prefix` - first part of string
- `msgstr_idx` - message string index (if you have `msgstr[0] "apple"` and `msgstr[1] "apples"`, according to settings
in the example above "apples" will be used). For some strings you can add special comment like:

```gettext
#: zero_count_prefix: "No more"
#: zero_count_msgstr_idx: 1
#: test/fixtures/xgettext/call-translate-plural.js:8
msgid "apple"
msgid_plural "apple"
msgstr[0] "apple"
msgstr[1] "apples"
```

It can be added to _vuettext_ in future.

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
