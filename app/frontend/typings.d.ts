declare module '*.md' {
	const value: string;
	export default value;
}

declare module 'swiper/vue' {
	import { DefineComponent } from 'vue';
	export const Swiper: DefineComponent<any, any, any>;
	export const SwiperSlide: DefineComponent<any, any, any>;
}