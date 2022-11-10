# 回调事件

```vue
<script>
    function ScrollEnd (){
        console.log('ScrollEnd')
    }
</script>

<template>
  <div class="demo">
    <vue3ScrollSeamless
      class="scroll-wrap"
      :classOptions="classOptions"
      :dataList="list"
      @ScrollEnd="ScrollEnd"
    >
      <ul class="ui-wrap">
        <li class="li-item" v-for="(item,i) of list" :key="i">
            <p>{{item.title}}</p>
        </li>
      </ul>
    </vue3ScrollSeamless>
  </div>
</template>
```