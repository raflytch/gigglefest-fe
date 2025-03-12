import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "../components/ui/button";

export default function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await api.get("/posts");
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Home Page</h1>
      <p className="mb-4">Welcome to GiggleFest!</p>
      <Button>Click Me</Button>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Posts</h2>
        {data?.map((post: any) => (
          <div key={post.id} className="border p-4 mb-4 rounded">
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
