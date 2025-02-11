import api, {route} from '@forge/api'

export async function fetchAllFiles(payload) {
  try {
    // fetches all pages and blogs
    const [pagesResponse, blogsResponse] = await Promise.all([
      api.asUser().requestConfluence(
          route`/wiki/api/v2/pages?body-format=storage&sort=-created-date`),
      api.asUser().requestConfluence(
          route`/wiki/api/v2/blogposts?body-format=storage&sort=-created-date`)
    ]);

    // gets the json to be mapped and filterd
    const [pagesJson, blogsJson] =
        await Promise.all([pagesResponse.json(), blogsResponse.json()]);

    // map response object to the essential fields
    const mappedPages =
        (pagesJson.results || []).map(page => ({
                                        id: page.id,
                                        title: page.title,
                                        createdAt: page.createdAt,
                                        content: page.body?.storage?.value || ''
                                      }));

    const mappedBlogs =
        (blogsJson.results || []).map(blog => ({
                                        id: blog.id,
                                        title: blog.title,
                                        createdAt: blog.createdAt,
                                        content: blog.body?.storage?.value || ''
                                      }));

    // If a keyword is provided, filter the results
    let filteredPages = mappedPages;
    let filteredBlogs = mappedBlogs;

    if (payload.keyword) {
      const lowerKeyword = payload.keyword.toLowerCase();
      filteredPages = mappedPages.filter(
          page => page.title.toLowerCase().includes(lowerKeyword) ||
              page.content.toLowerCase().includes(lowerKeyword));
      filteredBlogs = mappedBlogs.filter(
          blog => blog.title.toLowerCase().includes(lowerKeyword) ||
              blog.content.toLowerCase().includes(lowerKeyword));
    }

    return {pages: filteredPages, blogs: filteredBlogs};
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
}
