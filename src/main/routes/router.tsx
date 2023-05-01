import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import {
  makeLogin,
  makeSignUp,
  makeSurveyList,
  makeSurveyResult,
} from '@/main/factories/pages'
import { ApiContext } from '@/presentation/contexts'
import {
  setCurrentAccountAdapter,
  getCurrentAccountAdapter,
} from '@/main/adapters/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'

const Router: React.FC = () => {
  return (
    <RecoilRoot>
      <ApiContext.Provider
        value={{
          setCurrentAccount: setCurrentAccountAdapter,
          getCurrentAccount: getCurrentAccountAdapter,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={makeLogin} />
            <Route path="/signup" exact component={makeSignUp} />
            <PrivateRoute path="/" exact component={makeSurveyList} />
            <PrivateRoute path="/surveys/:id" component={makeSurveyResult} />
          </Switch>
        </BrowserRouter>
      </ApiContext.Provider>
    </RecoilRoot>
  )
}

export default Router
