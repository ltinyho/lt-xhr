### Introduction

```text
axios + lru-cache
```


### install
```bash
yarn add axios 
yarn add lru-cache 
yarn add lt-xhr
```


### usage
```js
import xhr, { Xhr } from 'lt-xhr'
class TestSrv {
  getList(id) {
    return xhr({
      url: `/test`,
      cache: true, // 缓存
      params: {
        id,
      },
    });
  }
}
```
