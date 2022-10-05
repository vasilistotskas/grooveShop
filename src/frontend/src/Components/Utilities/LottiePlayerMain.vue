<template>
  <div ref="animation" />
</template>

<script lang="ts">
import Lottie, {
  AnimationConfigWithData,
  AnimationConfigWithPath,
  AnimationItem,
  RendererType,
} from 'lottie-web'
import { inject, PropType } from 'vue'
import { Emitter, EventType } from 'mitt'
import { Options as Component, Vue } from 'vue-class-component'

@Component({
  name: 'LottiePlayerMain',
  props: {
    animationData: {
      type: [Object as PropType<AnimationItem>, String],
      required: false,
      default: undefined,
    },
    iconPath: {
      type: String,
      required: false,
      default: undefined,
    },
    loop: {
      type: Boolean,
      required: false,
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
  iconPath!: string
  loop!: boolean | number
  autoPlay!: boolean
  renderer!: RendererType | undefined
  speed!: number

  get getLottieInstance() {
    return Lottie
  }

  mounted(): void {
    this.emitter?.on('lottie-replay', () => this.replay())
    this.emitter?.on('lottie-play', () => this.play())
    this.emitter?.on('lottie-stop', () => this.stop())
    this.emitter?.on('lottie-pause', () => this.pause())

    this.init()
  }

  beforeDestroy(): void {
    if (this.anim) this.anim.destroy()
  }

  init(): void {
    const settings: AnimationConfigWithPath<RendererType> | AnimationConfigWithData<RendererType> =
      {
        container: this.$refs.animation as Element,
        renderer: this.renderer,
        loop: this.loop,
        autoplay: this.autoPlay,
        animationData: this.animationData,
        path: this.iconPath,
      }
    try {
      this.anim = this.getLottieInstance.loadAnimation(settings)
    } catch (error) {
      console.error(error)
    }
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
