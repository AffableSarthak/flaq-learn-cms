import Link from 'next/link'
import React from 'react'
import { BlogPages } from '../src/utils/parse-properties'

function SideBar({ blogData }: { blogData: BlogPages[] }) {
  return (
    <>
      <div className="menu-container">
        <div className="logo">
          <Link href="/">FLAQ ACADEMY</Link>
        </div>
        {blogData.map((blog) => (
          <div key={blog.pageId} className="menu-item">
            <Link href={`/blog/${blog.pageId}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default SideBar
