import { useInfiniteQuery } from "react-query";

const useGetProdReviews = (id) => {
  return useInfiniteQuery(
    "prod_reviews",
    async ({ pageParam = 0 }) => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/reviews/product/${id}?cursor=${pageParam}`,
      );
      if (!res.ok) {
        throw new Error("something went wrong server side...");
      }
      return res.json();
    },
    {
      refetchInterval: 1000,
      getNextPageParam: lastPage =>
        lastPage.reviews.length >= 20 ? lastPage.cursor : undefined,
    }
  );
};

export default useGetProdReviews;