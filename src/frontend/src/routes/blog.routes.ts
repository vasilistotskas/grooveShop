import { RouteRecordRaw } from 'vue-router'
import { MainRoutePaths } from '@/routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

const blogRoutes: Array<RouteRecordRaw> = [
	{
		path: MainRoutePaths.BLOG,
		name: MainRouteNames.BLOG,
		component: () => import('@/pages/Blog/Blog.vue'),
		props: true,
		meta: {
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Blog',
					to: {
						full_path: 'blog'
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.AUTHOR,
		name: MainRouteNames.AUTHOR,
		component: () => import('@/pages/Blog/BlogAuthor.vue'),
		props: true,
		meta: {
			breadcrumb: (route: any): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Blog',
					to: {
						full_path: 'blog'
					}
				},
				{
					name: 'Author - ' + route.email,
					to: {
						full_path: 'author' + '/' + route.email
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.POST,
		name: MainRouteNames.POST,
		component: () => import('@/pages/Blog/BlogPost.vue'),
		props: true,
		meta: {
			breadcrumb: (route: any): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Blog',
					to: {
						full_path: 'blog'
					}
				},
				{
					name: 'Post - ' + route.slug,
					to: {
						full_path: 'post' + '/' + route.slug
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.POSTS_BY_TAG,
		name: MainRouteNames.POSTS_BY_TAG,
		component: () => import('@/pages/Blog/BlogPostsByTag.vue'),
		props: true,
		meta: {
			breadcrumb: (route: any): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Blog',
					to: {
						full_path: 'blog'
					}
				},
				{
					name: 'Tag - ' + route.tag,
					to: {
						full_path: 'tag' + '/' + route.tag
					}
				}
			])
		}
	}
]

export default blogRoutes