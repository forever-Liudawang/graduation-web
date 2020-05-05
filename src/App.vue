<template>
   <div>
     <keep-alive>
        <Aplayer/>
        <router-view v-if="$route.path=='/album'"/>
     </keep-alive>
     <router-view/>
  </div>
</template>
<script>
import Aplayer from './views/Aplayer';
export default {
   components:{
      Aplayer
   }
}
</script>

<style lang="scss">

</style>
