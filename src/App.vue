<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <left-bar></left-bar>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-container>
          <el-main><router-view/></el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LeftBar from './views/publicComponent/LeftBar'
export default {
  name: 'App',
  components:{
    LeftBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
