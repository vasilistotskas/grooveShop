import Blog from '@/Pages/Blog/Blog.vue'
import { RouteRecordRaw } from 'vue-router'
import BlogPost from '@/Pages/Blog/BlogPost.vue'
import BlogAuthor from '@/Pages/Blog/BlogAuthor.vue'
import BlogPostsByTag from '@/Pages/Blog/BlogPostsByTag.vue'
import { MainRoutePaths } from '@/Routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/Routes/Interface/BreadcrumbItemInterface'

const blogRoutes: Array<RouteRecordRaw> = [
	{
		path: MainRoutePaths.BLOG,
		name: MainRouteNames.BLOG,
		component: Blog,
		props: true,
		meta: {
			breadcrumb: [
				{
					name: 'Blog',
					to: {
						full_path: 'blog'
					}
				}
			] as Array<BreadcrumbItemInterface>
		}
	},
	{
		path: MainRoutePaths.AUTHOR,
		name: MainRouteNames.AUTHOR,
		component: BlogAuthor,
		props: true,
		meta: {
			breadcrumb: (route: Record<string, string>): Array<BreadcrumbItemInterface> =>
				[
					{
						name: 'Blog',
						to: {
							full_path: 'blog'
						}
					},
					{
						name: 'Author - ' + route.id,
						to: {
							full_path: 'author' + '/' + route.id
						}
					}
				] as Array<BreadcrumbItemInterface>
		}
	},
	{
		path: MainRoutePaths.POST,
		name: MainRouteNames.POST,
		component: BlogPost,
		props: true,
		meta: {
			breadcrumb: (route: Record<string, string>): Array<BreadcrumbItemInterface> =>
				[
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
				] as Array<BreadcrumbItemInterface>
		}
	},
	{
		path: MainRoutePaths.POSTS_BY_TAG,
		name: MainRouteNames.POSTS_BY_TAG,
		component: BlogPostsByTag,
		props: true,
		meta: {
			breadcrumb: (route: Record<string, string>): Array<BreadcrumbItemInterface> =>
				[
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
				] as Array<BreadcrumbItemInterface>
		}
	}
]

export default blogRoutes
