// app/test-posts/page.tsx
"use client"

import { useState } from "react"
import { useUserPosts, useCategoryPosts, useAllPosts, useRefreshPosts } from "@/components/data/usePosts"
import type { Post } from "@/types/post"

export default function TestPostsPage() {
  const [userId, setUserId] = useState<number>(1)
  const [categoryId, setCategoryId] = useState<number>(1)

  // 각각의 훅
  const { data: userPosts, isLoading: uLoading } = useUserPosts(userId)
  const { data: catData, isLoading: cLoading } = useCategoryPosts(categoryId, {
    page: 0,
    size: 5,
    sortField: "createdAt",
    sortOrder: "asc",
  })
  const { data: allPosts, isLoading: aLoading } = useAllPosts()
  const refreshPosts = useRefreshPosts()

  const loading = uLoading || cLoading || aLoading

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">🧪 Test Posts Hooks</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => refreshPosts()}
      >
        전체 Posts 리프레시
      </button>

      <div className="space-y-4">
        <label>
          User ID:&nbsp;
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            className="border px-2 py-1 rounded"
          />
        </label>
        <h2 className="text-xl">User {userId} Posts</h2>
        {uLoading ? (
          <p>로딩 중…</p>
        ) : userPosts?.length ? (
          <ul className="list-disc pl-6">
            {userPosts.map((p: Post) => (
              <li key={p.id}>
                [{p.id}] {p.title} by {p.userName} with {p.images}
              </li>
            ))}
          </ul>
        ) : (
          <p>글이 없습니다.</p>
        )}
      </div>

      <div className="space-y-4">
        <label>
          Category ID:&nbsp;
          <input
            type="number"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="border px-2 py-1 rounded"
          />
        </label>
        <h2 className="text-xl">Category {categoryId} Posts</h2>
        {cLoading ? (
          <p>로딩 중…</p>
        ) : catData?.posts.length ? (
          <ul className="list-disc pl-6">
            {catData.posts.map((p: Post) => (
              <li key={p.id}>
                [{p.id}] {p.title} ({p.createdAt})
              </li>
            ))}
          </ul>
        ) : (
          <p>글이 없습니다.</p>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl">All Posts</h2>
        {aLoading ? (
          <p>로딩 중…</p>
        ) : allPosts?.length ? (
          <ul className="list-disc pl-6">
            {allPosts.map((p: Post) => (
              <li key={p.id}>
                [{p.id}] {p.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>글이 없습니다.</p>
        )}
      </div>
    </div>
  )
}
