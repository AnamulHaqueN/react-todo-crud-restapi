import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import '../App.css';

const Posts = () => {
  
  const [data, setData] = useState([])

  const getPostData = async () => {
    const res = await getPost();
    console.log(res);
    setData(res.data);
  }
  
  const handleDelete = async(id: number) => {
    try {

      const res = await deletePost(id);
      console.log(res);
      if(res.status === 200) {
        const newUpdatedPosts = data.filter((curPost) => {
          return curPost.id !== id;
        });
        setData(newUpdatedPosts);
      }
      else console.log("Failed to delete the post: ", res.status);

    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPostData();
  }, []);

  return <section className="section-post">
    <ol>
      {
        data.map((curElem) => {
          const {id, body, title} = curElem;
          return (
            <li key={id}>
              <p>{title}</p>
              <p>{body}</p>
              <button>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(id)} >Delete</button>
            </li>
          )
        })
      }
    </ol>
  </section>
}

export default Posts;