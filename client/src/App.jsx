import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import CreateBuild from './pages/CreateBuild'
import BuildList from './pages/BuildList'
import BuildDetail from './pages/BuildDetail'
import EditBuild from './pages/EditBuild'
import './App.css'

const App = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <CreateBuild />
    },
    {
      path: '/builds',
      element: <BuildList />
    },
    {
      path: '/builds/:id',
      element: <BuildDetail />
    },
    {
      path: '/builds/:id/edit',
      element: <EditBuild />
    }
  ])

  return (
    <div className='app-shell'>
      <Navigation />
      {element}
    </div>
  )
}

export default App
