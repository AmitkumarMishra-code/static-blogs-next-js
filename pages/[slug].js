import Image from "next/image"
import Link from "next/link"
import blogs from "../data/blogs.json"

export async function getStaticPaths() {
  const paths = blogs.map(blog => ({
    params: { slug: blog.slug }
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const blog = blogs.find(blog => blog.slug === params.slug)
  return { props: { blog } }
}

export default function Blog({ blog }) {
  return <div className='blog-page'>
    <h1  style = {{color: '#7f7f7f'}}>{blog.title}</h1>
    <div style={{display: 'flex', gap: '1rem', alignItems:'center'}}>
      <div style = {{width: '100px', height: '100px', borderRadius: '50%', overflow:'hidden'}}>
        <Image src={blog.image} alt = {blog.author} width = '100px' height = '100px' objectFit="cover"/>  
      </div>
      <h4 style = {{color: '#7f7f7f'}}>{blog.author}</h4>
    </div>
    <p style = {{textAlign:'justify', color: "#191919", width: '80%', lineHeight:'2rem'}}>
      <span style = {{color:'#000000', fontSize:'36px'}}>{blog.content[0]}</span>
      {blog.content.substring(1)}
      </p>
      <hr/>
    <Link href = '/' passHref><p style = {{color: "blue", cursor:"pointer"}}>Home</p></Link>
  </div>
}