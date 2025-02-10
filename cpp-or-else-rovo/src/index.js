import api, { route } from "@forge/api"

export function messageLogger(payload) {
  console.log(`Logging message: ${payload.message}`);
}

export async function fetchFile(payload) {
    const title = payload.message
    console.log(JSON.stringify(payload, null, 2))
    console.log("hello")
    
    const response = await api.asUser().requestConfluence(route`/wiki/api/v2/pages?title=${title}`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    
    const data = await response.json()


    const result = await Promise.all(
        data.results.map(async (page) => {
            const pageResponse = await api.asUser().requestConfluence(route`/wiki/api/v2/pages/${page.id}?body-format=atlas_doc_format`, {
            headers: {
                'Accept': 'application/json'  // Fix typo here
            }
            });
            return pageResponse.json();  // Await JSON parsing
        })
        );
    
        return result
}
