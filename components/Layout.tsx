import React from 'react'
import { queryDatabase } from '../src/api/query-database'
import { BlogPages, parseProperties } from '../src/utils/parse-properties'
import SideBar from './SideBar'

function Layout({
  children,
  blogData,
}: {
  children: React.ReactNode
  blogData: BlogPages[]
}) {
  return (
    <div className="main-container">
      <div className="sidebar-container">
        <SideBar blogData={blogData} />
      </div>
      <div className="body-container">{children}</div>
    </div>
  )
}

export default Layout
