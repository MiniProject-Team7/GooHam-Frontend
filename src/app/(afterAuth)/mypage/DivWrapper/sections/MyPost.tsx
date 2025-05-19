"use client";

  return (
    <section className="w-full max-w-[940px] mx-auto mt-[10px]">
      {/* 사용자 정보 */}
      <div className="flex flex-col items-center md:items-start md:flex-row gap-6">
        <Avatar className="w-[120px] h-[120px]">
          <AvatarImage src={userInfo.profile_image} alt="Profile" className="object-cover" />
          <AvatarFallback>{userInfo.member_name}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col mt-[30px]">
          <div className="flex items-center gap-4">
            <h2 className="text-title-lg">{userInfo.member_name}</h2>
            <span className="text-lable-lg">{userInfo.birth_date}</span>
          </div>

          <p className="text-lable-lg text-center md:text-left">{userInfo.member_email}</p>
        </div>
      </div>

      {/* 탭 영역 */}
      <Tabs defaultValue="posts" className="mt-8 bg-white">
        <TabsList className="w-full justify-start gap-6 bg-white h-auto p-0">
          <TabsTrigger
            value="posts"
            className="bg-white cursor-pointer text-title-lg tracking-wide leading-[24px] data-[state=active]:text-primary-500 transition-all duration-300"
          >
            작성한 게시글
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            className="bg-white cursor-pointer text-title-lg tracking-wide leading-[24px] data-[state=active]:text-primary-500 transition-all duration-300"
          >
            작성한 댓글
          </TabsTrigger>
        </TabsList>

        {/* 작성한 게시글 */}
        <TabsContent value="posts" className="mt-6 space-y-6 ml-[55px]">
          {Array.isArray(myPosts) &&
            myPosts.map((post) => (
              <div key={post.id} className="inline-block min-w-[690px] max-w-[940px] mx-auto">
                <PostCard post={post} />
              </div>
            ))}
        </TabsContent>

        {/* 작성한 댓글 */}
        <TabsContent value="comments" className="mt-6 space-y-6">
          {loadingComments ? (
            <p>댓글 불러오는 중...</p>
          ) : comments.length === 0 ? (
            <p>작성한 댓글이 없습니다.</p>
          ) : (
            comments.map((comment) => (
              <Card key={comment.id} className="p-4 mb-4 bg-white border border-gray-22">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={comment.profileImg} />
                    <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{comment.userName}</p>
                    <p className="text-sm text-black">{comment.createdAt}</p>
                  </div>
                </div>

                <p className="mt-2 text-black">{comment.content}</p>

                <div className="flex justify-end mt-2">
                  <Button variant="default" className="px-8 py-3 text-white">
                    <a href={`/posts/${comment.postId}`}>원글 보러가기</a>
                  </Button>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};
