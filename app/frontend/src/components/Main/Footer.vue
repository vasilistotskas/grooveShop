<template>
  <footer class="main-footer text-center text-white">
    <div class="container p-4">
      <section class="footer-section-newsletter mb-4 pt-4">
        <form method="post">
          <div class="footer-grid-newsletter">
            <div class="grid-item-one mb-2">
              <p>
                <strong>Sign up for our newsletter</strong>
              </p>
            </div>
            <div class="grid-item-two">
              <!-- Email input -->
              <input id="form5Example21" class="form-control" type="email" />
              <label class="form-label mt-2" for="form5Example21">Email address</label>
            </div>
            <div class="grid-item-three">
              <button class="btn-outline-primary-one mb-4" type="submit">
                Subscribe
              </button>
            </div>
          </div>
        </form>
      </section>

      <section class="footer-section-links mb-4 mt-4">
        <div class="grid-item-one">
          <span class="text-uppercase">Links</span>
          <ul>
            <li>
              <a href="#!">Link 1</a>
            </li>
            <li>
              <a href="#!">Link 2</a>
            </li>
            <li>
              <a href="#!">Link 3</a>
            </li>
            <li>
              <a href="#!">Link 4</a>
            </li>
          </ul>
        </div>
        <div class="grid-item-two">
          <span class="text-uppercase">Links</span>
          <ul>
            <li>
              <a href="#!">Link 1</a>
            </li>
            <li>
              <a href="#!">Link 2</a>
            </li>
            <li>
              <a href="#!">Link 3</a>
            </li>
            <li>
              <a href="#!">Link 4</a>
            </li>
          </ul>
        </div>
        <div class="grid-item-three">
          <span class="text-uppercase">Links</span>
          <ul>
            <li>
              <a href="#!">Link 1</a>
            </li>
            <li>
              <a href="#!">Link 2</a>
            </li>
            <li>
              <a href="#!">Link 3</a>
            </li>
            <li>
              <a href="#!">Link 4</a>
            </li>
          </ul>
        </div>
        <div class="grid-item-four">
          <span class="text-uppercase">Links</span>
          <ul>
            <li>
              <a href="#!">Link 1</a>
            </li>
            <li>
              <a href="#!">Link 2</a>
            </li>
            <li>
              <a href="#!">Link 3</a>
            </li>
            <li>
              <a href="#!">Link 4</a>
            </li>
          </ul>
        </div>
      </section>
    </div>

    <div class="main-copyright text-center p-3">
      <span>© 2020 Copyright:</span>
      <a href="#">GrooveBtch</a>
    </div>
  </footer>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'Footer'
})
export default class Footer extends Vue {
}

</script>

<style lang="scss" scoped>

  .main-footer{
    background-color: $primary-color-5;
  }
  .main-copyright{
    background-color: $primary-color-2;
    text-align: center;
    padding: 5px;
    span {
      font-size: 12px;
    }
  }
  .footer-grid-newsletter {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 80% 20%;
    max-width: 500px;
    margin: 0 auto;
    .grid-item {
      &-one {
        grid-column-start: 1;
        grid-column-end: span col4-start;
        grid-row-start: 1;
      }
      &-two {
        label {
          display: block;
        }
      }
    }
  }
  .footer-section-links {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    .grid-item {
      &-one, &-two, &-three, &-four {
        text-align: center;
      }
    }
  }
</style>