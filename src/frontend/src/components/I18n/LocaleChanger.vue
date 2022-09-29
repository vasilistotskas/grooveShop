<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
        {{ locale }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'
import { MessageSchema } from '@/locales/LocaleType'
import { Options as Component, setup, Vue } from 'vue-class-component'

@Component({
  name: 'LocaleChanger',
})
export default class LocaleChanger extends Vue {
  myContext = setup(() => {
    const { t, n } = useI18n<{ message: MessageSchema }>({
      useScope: 'global',
    })
    return { t, n }
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/I18n/LocaleChanger';
</style>
