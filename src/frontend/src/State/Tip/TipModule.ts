import gql from 'graphql-tag'
import TipModel from '@/State/Tip/TipModel'
import { clientApollo } from '@/Apollo/ApolloProvider'
import AppBaseModule from '@/State/Common/AppBaseModule'
import { Module, Action, Mutation } from 'vuex-module-decorators'

@Module({
	namespaced: true,
	name: 'tip'
})
export default class TipModule extends AppBaseModule {
	tips: Array<TipModel> = []

	get getTips(): TipModel[] {
		return this.tips
	}

	@Mutation
	setTips(tips: TipModel[]): void {
		this.tips = tips
	}

	@Action
	async fetchTipsFromRemote(): Promise<void> {
		try {
			const tips = await clientApollo.query({
				query: gql`
					query {
						tips {
							id
							title
							content
							kind
							icon {
								name
								path
								size
								url
							}
							url
							createdAt
							active
							mainImageAbsoluteUrl
							mainImageFilename
						}
					}
				`
			})

			const data = tips.data.tips
			this.context.commit('setTips', data)
			return data
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}
}
