import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";

const Card = ({ blog }) => {
  const showBlogCategories = () => {
    return blog.categories.map((category) => (
      <Link key={category._id} href={`/categories/${category.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">
          {category.name}
        </a>
      </Link>
    ));
  };

  const showBlogTags = () => {
    return blog.tags.map((tag) => (
      <Link key={tag._id} href={`/tags/${tag.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{tag.name}</a>
      </Link>
    ));
  };

  return (
    <div className="lead pb-4">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className=" pt-3 pb-3 font-weight-bold">{blog.title}</h2>
          </a>
        </Link>
      </header>

      <section>
        <p className="mark ml-1 pt-2 pb-2">
          Written by {blog.postedBy.name} | Published{" "}
          {moment(blog.updatedAt).fromNow()}
        </p>
      </section>

      <section>
        {showBlogCategories()}
        {showBlogTags()}
        <br/>
      </section>

      <div className="row">
        <div className="col-md-4">image</div>

        <div className="col-md-8">
          <section className="pb-3">
            <div>{renderHTML(blog.excerpt)}</div>

            <Link href={`/blogs/${blog.slug}`}>
              <a className="btn btn-primary pt-2">Read more</a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
