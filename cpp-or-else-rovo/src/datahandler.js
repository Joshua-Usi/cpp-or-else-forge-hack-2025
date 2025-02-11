import api, {route} from '@forge/api'

/*
    Fetch all files
        - blog posts
        - pages
    Filter on content
        - pass it into the rovo agent?
    Return it out
*/

export async function fetchAllFiles() {
  try {
    const [pagesResponse, blogsResponse] = await Promise.all([
      api.asUser().requestConfluence(
          route`/wiki/api/v2/pages?body-format=storage`),
      api.asUser().requestConfluence(
          route`/wiki/api/v2/blogposts?body-format=storage`)
    ]);


    const [pagesJson, blogsJson] =
        await Promise.all([pagesResponse.json(), blogsResponse.json()]);


    const mappedPages = pagesJson.result.map(page => ({
                                               id: page.id,
                                               title: page.title,
                                               createdAt: page.createdAt,
                                               storage: blog.body.storage.value
                                             }));


    const mappedBlogs = blogsJson.result.map(blog => ({
                                               id: blog.id,
                                               title: blog.title,
                                               createdAt: blog.createdAt,
                                               storage: blog.body.storage.value
                                             }));


    console.log('Mapped Pages:', mappedPages);
    console.log('Mapped Blogs:', mappedBlogs);


    return {pages: mappedPages, blogs: mappedBlogs};
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
}
