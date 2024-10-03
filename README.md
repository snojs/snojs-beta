# # Snostorm

> v2 beta version of sno

`ex glande quercus` : `out of the acorn grows the oak`

### Snojs just got **buffed**.

```html
<body data='{"array":["Crazy","Simple","Perfect","Dense","Speedy","Tiny","Portable","Reactive","Lightweight"]}'>
  <!-- Save a random num to temporary storage -->
  <p exc="save(random(array.length))"></p>
  <button click='save(random(array.length))'>What is sno?</button>
  <!-- read temporary storage -->
  <p react>{{array[retrieve()]}}</p>
  <script src="./sno-storm.js"></script>
</body>
```

## ## With **CRAZY** new features

|Attribute|Function|
|---|---|
|react|Show Reactive Data|
|exc|Update Data onload|
|save()|Save a value to temporary storage|
|retrieve()|Retrieve this value|
|toggle()|Flip flop booleans|
|random()|Returns a random number with (max)|
