import { useState, useEffect } from "react";

import classes from "./comment-list.module.css";

function CommentList() {

  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    fetch('/api/comments').then((response) => response.json())
    .then((data) => setCommentList(data.comments));
  }, [])

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}

      {commentList.map((item) => (
        <li key={item.id}>
          <p>{item.comment}</p>
          <div>
            By <address>{item.user}</address>
          </div>
        </li>
      ))}

      {/* <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li> */}
    </ul>
  );
}

export default CommentList;
