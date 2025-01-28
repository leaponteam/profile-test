import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import {client} from "../lib/client"
import { PortableText } from "@portabletext/react"
import {format} from "date-fns"
import urlBuilder from '@sanity/image-url'
import {getImageDimensions} from '@sanity/asset-utils'
export default function BlogPost() {
  const [singlePost, setSinglePost] = useState([])
  const { slug } = useParams()
  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"] {
        title,
        body,
        publishedAt,
        tags,
        "name": author->name,
        "categories": categories[]->title,
        mainImage {
          asset -> {
            _id,
            url
          },
          alt
        },
        relatedPosts[]->{
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
  }
      }`
      )
      .then((data) => {setSinglePost(data[0]);
        console.log(data)
    // console.log(singlePost.publishedAt)

      })
    
  }, [slug])

  const SampleImageComponent = ({value, isInline}) => {
    const {width, height} = getImageDimensions(value)
    return (
      <img
        src={urlBuilder(client)
          .image(value)
          .width(isInline ? 100 : 800)
          .fit('max')
          .auto('format')
          .url()}
        alt={value.alt || ' '}
        loading="lazy"
        style={{
          // Display alongside text if image appears inside a block text span
          display: isInline ? 'inline-block' : 'block',

          // Avoid jumping around with aspect-ratio CSS property
          aspectRatio: width / height,
        }}
      />
    )
  }
  const components = {
    types: {
      image: SampleImageComponent,
      // Any other custom types you have in your content
      // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
    },
  }

  return (
    <>
      {singlePost &&
        <section className="px-5 xl:max-w-6xl xl:mx-auto pb-20">
          <h1 className="uppercase font-bold text-4xl tracking-wide mb-10 md:text-6xl lg:text-8xl text-center mt-5">
            {singlePost.title}
          </h1>
          {singlePost.categories && singlePost.categories.map((category) =>(
    <p>Category: {category}</p>
))}
{singlePost.tags && singlePost.tags.map((tag) =>(
    <p>Tag: {tag}</p>
))}
          {singlePost.mainImage && singlePost.mainImage.asset && (
            <img
              src={singlePost.mainImage.asset.url}
              alt={singlePost.title}
              title={singlePost.title}
            />
          )}
          <p>By {singlePost.name}</p>
{singlePost.publishedAt && <p>Date: {format(new Date(singlePost.publishedAt), "dd MMMM yyyy")}</p>}


          <div>
            <PortableText
              value={singlePost.body}
              components={components}
            />
          </div>
          <div>

            <h1>Related Posts</h1>
            {singlePost.relatedPosts && singlePost.relatedPosts.map((story) => (
        <Link to={`/blog/${story.slug}`} key={story.slug}>
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
          </div>

          <button>
            <Link
              to="/blog"
            >
              Read more articles
            </Link>
          </button>
        </section>
      }
    </>
  )
}