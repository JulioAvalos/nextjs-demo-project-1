import classes from "./comment-list.module.css";

function CommentList(props) {
  const { items } = props;

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items.map((item) => (
        <li key={item.id}>
          <p>{item.comment}</p>
          <div>
            By <address>{item.user}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
