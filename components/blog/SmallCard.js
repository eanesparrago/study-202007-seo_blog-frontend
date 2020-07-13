import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";

const SmallCard = ({ blog }) => {
  return (
    <div className="card">
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              src={`${API}/blog/photo/${blog.slug}`}
              alt={`${blog.title}`}
              className="img img-fluid"
              style={{ maxHeight: "auto", width: "100%" }}
            />
          </a>
        </Link>
      </section>

      <div className="card-body">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h5 className="card-title">{blog.title}</h5>
            </a>
          </Link>

          <div className="card-text">{renderHTML(blog.excerpt)}</div>
        </section>
      </div>

      <div className="card-body">
        <Link href={`/blogs/${blog.slug}`}>
          <a className="btn btn-primary mb-3">Read more</a>
        </Link>

        <div>
          Posted {moment(blog.updatedAt).fromNow()} by{" "}
          <Link href={`/`}>
            <a>{blog.postedBy.name}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
