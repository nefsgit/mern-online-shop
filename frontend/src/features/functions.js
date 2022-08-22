import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

// Set headers for authorization purposes
export const setHeaders = () => {
  const headers = {
      headers: {
          "x-auth-token": localStorage.getItem("token")
      }
  }

  return headers
}

// Load more function
export function loadMore ({ hasNextPage, loadMoreRef, fetchNextPage }) {
    if (!hasNextPage) {
        return;
      }
  
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => entry.isIntersecting && fetchNextPage()),
        {
          root: null,
          margin: "0px",
          treshold: 1.0
        }
      );
  
      const el = loadMoreRef && loadMoreRef.current;
  
      if (!el) {
        return;
      }
  
      observer.observe(el);
}

// Function to handle several modals
export const handleModal = async (objectUrl, setObject, modalFunc, id) => {
    try {
        const foundObject = id ? await axios.get(`${process.env.REACT_APP_API_URL}/${objectUrl}/${id}`, setHeaders()) :
        await axios.get(`${process.env.REACT_APP_API_URL}/${objectUrl}`, setHeaders());
        
        if(foundObject) {
          setObject(foundObject.data);
          modalFunc(true);
        }
    } catch (error) {
        toast.error('Oops. Something went wrong. Please try again later.', {
          position: "bottom-left",
          autoClose: 2500,
        });
    }
}

// Function to handle closing modals when clicked outside
export const useOutsideCloser = (ref, modalFunc) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        modalFunc(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

// Function to handle fetching data
export const getData = async (objectUrl, setObject, setLoading, id) => {
    if (setLoading) {
        setLoading(true);
    }
    async function fetchData() {
      try {
        const response = id ? await axios.get(`${process.env.REACT_APP_API_URL}/${objectUrl}/${id}`, setHeaders()) :
        await axios.get(`${process.env.REACT_APP_API_URL}/${objectUrl}`, setHeaders());
        setObject(response.data);
      } catch (error) {
        toast.error('Oops. Something went wrong. Please try again later.', {
            position: "bottom-left",
            autoClose: 2500,
        });
      }
      if (setLoading) {
        setLoading(false);
      }
    }
    fetchData();
}

// Function to handle image inputs
export const transformFile = (file, setProductImg, setPreviewImg) => {
    const reader = new FileReader();

    if(file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProductImg(reader.result);
            if (setPreviewImg) {
              setPreviewImg(reader.result);
            }
        }
    } else {
        setProductImg("");
    }
}
