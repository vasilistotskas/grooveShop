export default defineAppConfig({
	name: 'DeepWeb - defineAppConfig',
	description: 'DeepWeb Description',
	buildDate: new Date().toISOString(),
	facebookAppId: '123456789',
	author: {
		name: 'vasilistotskas',
		github_url: 'https://github.com/vasilistotskas'
	},
	public: {
		domainName: 'localhost',
		canonicalUrl: 'http://www.localhost:8010',
		baseUrl: 'http://localhost:8010',
		apiBaseUrl: 'http://localhost:8010/api/v1'
	}
})
