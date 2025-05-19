import PostWrite from "../../write/page";

export default function EditPage({ params }: { params: { id: number } }) {
  return <PostWrite postId={params.id} editMode={true} />;
}
