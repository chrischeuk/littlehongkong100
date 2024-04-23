import { useEffect } from "react";

type useInfiniteLoadingPropsType = {
  fetchData: () => void;
  loaderRef: React.MutableRefObject<null>;
  firstLoad: boolean;
  loading: boolean;
};

export default function useInfiniteLoading({
  fetchData,
  loaderRef,
  firstLoad,
  loading,
}: useInfiniteLoadingPropsType) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !firstLoad && !loading) {
        fetchData();
        // console.log("target isIntersecting");
      }
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchData]);
}
