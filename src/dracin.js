const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Helper function untuk mengembalikan response JSON
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    },
  });
}

export default {
  async fetch(request, env, ctx) {
    // 1. Handle CORS Preflight Request
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    try {
      const url = new URL(request.url);
      const path = url.pathname;
      
      // Base URL untuk upstream API (sumber data Dracin)
      const UPSTREAM_API = "https://magma-api.biz.id/dramabox";

      // --- LOGIKA ROUTING API ---

      // Root Endpoint (Informasi API)
      if (path === "/" || path === "/api") {
        return jsonResponse({
          name: "Dracin API Worker",
          version: "1.0.0",
          status: "online",
          message: "Welcome to Dracin API",
          endpoints: {
            home: "/api/home",
            trending: "/api/trending",
            latest: "/api/latest",
            search: "/api/search?q={keyword}",
            detail: "/api/detail/{id}"
          }
        });
      }

      // Endpoint Search (/api/search?q=...)
      if (path === "/api/search") {
        const query = url.searchParams.get("q");
        if (!query) {
          return jsonResponse({ error: "Query parameter 'q' is required" }, 400);
        }
        
        const response = await fetch(`${UPSTREAM_API}/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        return jsonResponse({
          status: "success",
          query: query,
          data: data
        });
      }

      // Endpoint Detail (/api/detail/:id)
      if (path.startsWith("/api/detail/")) {
        const id = path.split("/").pop();
        if (!id) return jsonResponse({ error: "Drama ID is required" }, 400);
        
        const response = await fetch(`${UPSTREAM_API}/detail?id=${id}`);
        const data = await response.json();
        
        return jsonResponse({
          status: "success",
          data: data
        });
      }

      // Dynamic Proxy untuk endpoint lainnya (trending, latest, home, dll)
      if (path.startsWith("/api/")) {
        const endpoint = path.replace("/api/", "");
        const targetUrl = `${UPSTREAM_API}/${endpoint}${url.search}`;
        
        const response = await fetch(targetUrl, {
          headers: {
            "Accept": "application/json",
            "User-Agent": "Dracin-Worker/1.0"
          }
        });

        if (!response.ok) {
          return jsonResponse({ 
            error: "Upstream API error", 
            status: response.status 
          }, response.status);
        }

        const data = await response.json();
        return jsonResponse({
          status: "success",
          endpoint: endpoint,
          data: data
        });
      }

      // 404 Fallback jika route tidak ditemukan
      return jsonResponse({ 
        error: "Endpoint not found",
        message: `The path ${path} does not exist.`
      }, 404);

    } catch (error) {
      // Error Handling Global
      console.error("Worker Error:", error);
      return jsonResponse({ 
        status: "error",
        error: "Internal Server Error", 
        message: error.message 
      }, 500);
    }
  },
};
