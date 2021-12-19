<template>
  <div class="container mt-2 mb-4">
    <ul class="breadcrumb">
      <li v-for="param in routeParams" class="breadcrumb__item breadcrumb__item-firstChild">
        <span class="breadcrumb__inner">
          <span class="breadcrumb__title">{{ param }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"

@Options({
  name: "Breadcrumbs",
  props: {
    routeParams: {}
  }
})

export default class Breadcrumbs extends Vue {
  routeParams!: {}
}

</script>

<style lang="scss" scoped>

ul.breadcrumb {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.breadcrumb__item {
  height: 100%;
  background-color: white;
  color: #252525;
  font-family: 'Oswald', sans-serif;
  border-radius: 7px;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  transform: skew(-21deg);
  box-shadow: 0 2px 5px rgba(0,0,0,0.26);
  margin: 5px;
  padding: 0 40px;
  cursor: pointer;
}

.breadcrumb__item:hover {
  background: #490099;
  color: #FFF;
}

.breadcrumb__inner {
  display: flex;
  flex-direction: column;
  margin: auto;
  z-index: 2;
  transform: skew(21deg);
}

.breadcrumb__title {
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

@media all and (max-width: 1000px) {
  .breadcrumb {
    height: 35px;
  }
  .breadcrumb__title{
    font-size: 10px;
  }
  .breadcrumb__item {
    padding: 0 30px;
  }
}

@media all and (max-width: 710px) {
  .breadcrumb {
    height: 30px;
  }
  .breadcrumb__item {
    padding: 0 20px;
  }
}

</style>