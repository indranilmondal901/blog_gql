import React, { useEffect, useState } from "react";

const BlogList = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showContent, setShowContent] = useState(false);

  const [focus, setFocus] = useState({});

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              getPosts {
                id
                title
                content
              }
            }
          `,
        }),
      });
      const data = await response.json();
      let allPosts = data.data.getPosts;
      setFocus(allPosts[allPosts.length - 1]);
      setBlogs(data.data.getPosts);
      setLoading(false);
    } catch (error) {
      //   console.error("Error fetching blogs:", error);
      window.alert("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add new blog post
    const response = await fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation AddPost($title: String!, $content: String!) {
            addPost(title: $title, content: $content) {
              id
              title
              content
            }
          }
        `,
        variables: {
          title: title,
          content: content,
        },
      }),
    });
    const data = await response.json();

    if (data.errors) {
      console.error("Error adding post:", data.errors);
      window.alert("Error adding post:", data.errors);
      return;
    }

    setFocus(data.data.addPost);
    // Add the new post to the state and hide the form
    setBlogs([data.data.addPost, ...blogs]);
    setShowForm(false);
    setTitle("");
    setContent("");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleToggleContent = (id) => {
    setShowContent((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredBlogs = blogs
    .filter((blog) => blog.title.toLowerCase().includes(searchTerm))
    .sort((a, b) => {
      if (sortOrder === "asc") return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

  return (
    <div className="blog-container">
      <h1 className="blog-title">Blog Posts</h1>

      {/* Search and Sort Controls */}
      <div className="blog-controls">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearch}
          className="blog-search"
        />
        <button onClick={handleSortToggle} className="blog-sort-button">
          Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="blog-toggle-button"
      >
        {showForm ? "Close" : "Create Blog"}
      </button>

      {showForm && (
        <div className="blog-form-container">
          <h2 className="form-title">Create New Blog</h2>
          <form onSubmit={handleSubmit} className="blog-form">
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="form-textarea"
              ></textarea>
            </div>
            <button type="submit" className="form-submit-button">
              Create Blog
            </button>
          </form>
        </div>
      )}

      {/* Blog List */}
      {loading && <h6> Loading data....</h6>}
      <div className="main-section">
        <div className="latest-blog">
            {console.log(loading, focus)}
          {!loading && focus && Object.keys(focus).length > 0 &&
          <div className="blog-item-title">
            <img id="latest-blog-img"
              src={
                "https://placehold.jp/150x150.png"
              }
              alt={focus?.title}
            />
          </div>
          }

          <h3 className="blog-item-title">{focus.title}</h3>
            <p className="blog-item-content">{focus.content}</p>
        </div>

        <div className="other-blog-scroll-sec">
          <ul className="blog-list">
            {!loading &&
              filteredBlogs.map((blog) => (
                <li key={blog.id} className="blog-item">
                  <h3 className="blog-item-title">{blog.title}</h3>
                  <button id="showbtn" onClick={() => setFocus(blog)}>show</button>


                  <div id="readmore">
                    <a
                      onClick={() => handleToggleContent(blog.id)} // Toggle specific post's content
                      style={{ color: showContent[blog.id] ? "red" : "blue" }}
                    >
                      {showContent[blog.id] ? "Close" : "Read more"}
                    </a>
                  </div>
                  {showContent[blog.id] && (
                    <p className="blog-item-content">{blog.content}</p>
                  )}
                </li>


              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
