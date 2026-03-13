export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle API Proxy requests
    if (url.pathname.startsWith('/api/proxy/')) {
      // Extract the endpoint path after /api/proxy/
      const endpoint = url.pathname.replace('/api/proxy/', '');
      
      // Construct the target URL
      const targetUrl = new URL(`https://magma-api.biz.id/${endpoint}`);
      targetUrl.search = url.search;
      
      // Create a new request to the target API
      const proxyRequest = new Request(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'follow'
      });
      
      // Set a generic User-Agent to avoid being blocked
      proxyRequest.headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      try {
        const response = await fetch(proxyRequest);
        
        // Create a new response to add CORS headers
        const newResponse = new Response(response.body, response);
        newResponse.headers.set('Access-Control-Allow-Origin', '*');
        newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        newResponse.headers.set('Access-Control-Allow-Headers', '*');
        
        return newResponse;
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Proxy error', details: error.message }), {
          status: 500,
          headers: { 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*' 
          }
        });
      }
    }
    
    // For all other requests, serve the static assets (Cloudflare Pages)
    try {
      const response = await env.ASSETS.fetch(request);
      // Fallback for SPA routing if asset not found
      if (response.status === 404) {
        const indexUrl = new URL(request.url);
        indexUrl.pathname = '/index.html';
        return await env.ASSETS.fetch(new Request(indexUrl, request));
      }
      return response;
    } catch (e) {
      return new Response('Error loading assets', { status: 500 });
    }
  }
};
