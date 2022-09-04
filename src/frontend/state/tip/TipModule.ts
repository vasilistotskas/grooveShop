import gql from 'graphql-tag'
import store from '@/renderer/dynamicStore'
import TipModel from '@/state/tip/TipModel'
import { clientApollo } from '@/apollo.provider'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Module, Action, Mutation } from 'vuex-module-decorators'

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  stateFactory: true,
  name: 'tip',
})
export default class TipModule extends AppBaseModule {
  allTips: Array<TipModel> = []

  get getAllTips(): TipModel[] {
    return this.allTips
  }

  @Mutation
  setAllTips(tips: TipModel[]): void {
    this.allTips = tips
  }

  @Action
  async fetchAllTipsFromRemote(): Promise<void> {
    try {
      const tips = await clientApollo.query({
        query: gql`
          query {
            allTips {
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
        `,
      })

      const data = tips.data.allTips
      this.context.commit('setAllTips', data)
      return data
    } catch (error) {
      console.log(JSON.stringify(error, null, 2))
    }
  }
}
