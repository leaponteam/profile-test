import React, {useEffect, useState} from 'react'
import {client} from "../lib/client"
import {format} from "date-fns"
import { Link } from 'react-router-dom'
export default function HomePage() {
    const [stories, setStories] = useState([])
    useEffect(() => {
        client.fetch(
            `
            *[_type == "post"]{
  title,
  "slug": slug.current,
  "name": author->name,
  "categories": categories[]->title,
  mainImage{
    asset->{
      url
    },
    alt
  },
  publishedAt
} | order(publishedAt desc)

            `
        )
        .then((response) => {
            setStories(response);
            console.log(response);
            })
            .catch(error => console.error(error));
            },[])

  return (
    <>
    <div>Blogs</div>
    {stories.map((story) => (
        <Link to={`${story.slug}`} key={story.slug}>
<div>
<p>Author: {story.name}</p>
<p>Title: {story.title}</p>
<p>Date: {format(new Date(story.publishedAt), "dd MMMM yyyy")}</p>
<p>Slug: {story.slug}</p>
{story.categories.map((category) =>(
    <p>Category: {category}</p>
))}
</div>

<div>
<p>Image:</p>
{story.mainImage && <img
src={story.mainImage.asset.url}
alt={story.mainImage.alt}
loading='lazy'
/>}
</div>


    </Link>
        
    ))}
    </>
  )
}
