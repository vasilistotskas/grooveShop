<template>
  <div ref="animation" />
</template>

<script lang="ts">
import { inject } from 'vue'
import * as Lottie from 'lottie-web'
import { Emitter, EventType } from 'mitt'
import { Options as Component, Vue } from 'vue-class-component'
import {
  AnimationConfigWithData,
  AnimationConfigWithPath,
  AnimationItem,
  LottiePlayer,
  RendererType,
} from 'lottie-web'

@Component({
  name: 'LottiePlayerMain',
  props: {
    animationData: {
      type: [Object, String],
      required: true,
    },
    loop: {
      type: [Boolean, Number],
      default: false,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    renderer: {
      type: String,
      default: 'svg',
    },
    speed: {
      type: Number,
      default: 1,
    },
  },
})
export default class LottiePlayerMain extends Vue {
  emitter: Emitter<Record<EventType, unknown>> | undefined = inject('emitter')

  anim!: AnimationItem
  animationData!: AnimationItem | string
  loop!: boolean | number
  autoPlay!: boolean
  renderer!: RendererType | undefined
  speed!: number

  get getLottieInstance(): LottiePlayer {
    return Lottie as unknown as LottiePlayer
  }

  mounted() {
    this.emitter?.on('lottie-replay', () => this.replay())
    this.emitter?.on('lottie-play', () => this.play())
    this.emitter?.on('lottie-stop', () => this.stop())
    this.emitter?.on('lottie-pause', () => this.pause())

    this.init()
  }

  beforeDestroy() {
    if (this.anim) this.anim.destroy()
  }

  init() {
    const settings: AnimationConfigWithPath<RendererType> | AnimationConfigWithData<RendererType> =
      {
        container: this.$refs.animation as Element,
        renderer: this.renderer,
        loop: this.loop,
        autoplay: this.autoPlay,
        animationData: this.animationData,
      }
    this.anim = this.getLottieInstance.loadAnimation(settings)
    this.anim.addEventListener('loopComplete', () => {
      this.$emit('loopComplete', this.anim)
    })
    this.anim.addEventListener('complete', () => {
      this.$emit('complete', this.anim)
    })
    this.anim.addEventListener('enterFrame', () => {
      this.$emit('enterFrame', this.anim)
    })
  }

  replay() {
    this.anim.stop()
    this.anim.play()
  }

  play() {
    if (this.anim) this.anim.play()
  }

  stop() {
    if (this.anim) this.anim.stop()
  }

  pause() {
    if (this.anim) this.anim.pause()
  }
}
</script>
