import { useEffect, useState } from "react";
import { getPost } from "../api/PostApi";
import '../App.css';

const Posts = () => {
  
  const [data, setData] = useState([])

  const getPostData = async () => {
    const res = await getPost();
    console.log(res);
    setData(res.data);
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
              <button className="btn-delete" >Delete</button>
            </li>
          )
        })
      }
    </ol>
  </section>
}

export default Posts;