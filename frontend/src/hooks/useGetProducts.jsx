import { useInfiniteQuery } from "react-query";

const useGetProducts = () => {
  return useInfiniteQuery(
    "products",
    async ({ pageParam = 0 }) => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products/all?cursor=${pageParam}`,
      );
      if (!res.ok) {
        throw new Error("something went wrong server side...");
      }
      return res.json();
    },
    {
      refetchInterval: 10500,
      getNextPageParam: lastPage =>
        lastPage.products.length >= 12 ? lastPage.cursor : undefined,
    }
  );
};

export default useGetProducts;