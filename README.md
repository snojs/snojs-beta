# # Snoflake

v3 Building the web [your way.](https://github.com/snojs)

### Snojs; _truly reactive_...

```html
<body data='{"count":0]}'>
  <p react>{{count}}</p>
  <button onclick='$("count++;")'>+</button>
  <script src="./sno.js"></script>
</body>
```

### *Change*log

Click functions are __much__ more functional.<br/>
```html
<!-- Original way: it fails on low power devices -->
<button click="count++;">+</button>
<!-- New way: it functions on older devices-->
<button onclick='$("count++;")'>+</button>
```

__REAL REACTIVITY__.
```html
<!-- In old sno it updates every millisecond-->
<p react>{{count}}</p>
<!-- In NEW sno it only updates on value change-->
```

This reactivity also applies to any other function such as `bind`, `for`, `if` etc.<br/>
Outdated functions removed: `save()`, `retrieve()` 
