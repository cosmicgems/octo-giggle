import React from "react";
import {DiscussionEmbed} from "disqus-react"
import { API } from "../config";

const Disqus = ({ blog }) => {
    const disqusShortname = "pearlbox"
    const disqusConfig = {
      url: `${API}${blog.id}`,
      identifier: blog.slug, // Single post id
      title: blog.title // Single post title
    }
    return (
      <div>
        <DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
    )
  }
  export default Disqus;