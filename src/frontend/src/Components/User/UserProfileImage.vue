<template>
	<div v-if="src" class="profile-image-grid-container">
		<form
			id="uploadImageForm"
			class="profile-image-grid-form"
			enctype="multipart/form-data"
			name="uploadImageForm"
			title="Change Profile Picture"
		>
			<div class="profile-image-grid-content">
				<div
					:class="{ hovering: profileImageHovering }"
					class="profile-image-part"
					@mouseout="profileImageHovering = false"
					@mouseover="profileImageHovering = true"
				>
					<GrooveImage
						:alt="'User Image'"
						:img-class="'rounded-circle img-fluid'"
						:file-name="src"
						:use-media-stream="true"
						:img-type="ImageTypeOptions.USERS"
						:img-height="110"
						:img-width="110"
						:img-fit="ImageFitOptions.outside"
						:img-position="ImagePositionOptions.center"
					/>
					<label class="profile-image-label" for="image">
						<input
							id="image"
							class="d-none"
							name="image"
							type="file"
							@change="updateUserImage"
						/>
						<font-awesome-icon :icon="cameraIcon" size="3x" />
					</label>
				</div>
				<div class="profile-fullname-part">
					<RouterLink
						:to="{ name: 'UserAccount' }"
						aria-label="MyAccount"
						class="btn-w-effect"
						title="My Account"
					>
						<h5>{{ fullname }}</h5>
					</RouterLink>
				</div>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import {
	ImagePathOptions,
	ImageFormatOptions,
	ImageFitOptions,
	ImagePositionOptions,
	ImageTypeOptions
} from '@/Helpers/MediaStream/ImageUrlEnum'
import { getModule } from 'vuex-module-decorators'
import GrooveImage from '@/Utilities/GrooveImage.vue'
import UserModule from '@/State/User/Profile/UserModule'
import { Options as Component, Vue } from 'vue-class-component'
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera'

@Component({
	name: 'UserProfileImage',
	components: {
		GrooveImage
	},
	props: {
		fullname: {
			type: String,
			default: ''
		},
		src: {
			type: String,
			default: ''
		}
	}
})
export default class UserProfileImage extends Vue {
	src = ''
	fullname = ''
	userModule = getModule(UserModule)
	profileImageHovering = false
	cameraIcon = faCamera
	ImagePathOptions = ImagePathOptions
	ImageFormatOptions = ImageFormatOptions
	ImageFitOptions = ImageFitOptions
	ImagePositionOptions = ImagePositionOptions
	ImageTypeOptions = ImageTypeOptions

	updateUserImage(): void {
		const formEl = document.getElementById('uploadImageForm') as HTMLFormElement
		const data = new FormData(formEl)
		this.userModule.updateUserProfile(data)
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/User/UserProfileImage';
</style>
