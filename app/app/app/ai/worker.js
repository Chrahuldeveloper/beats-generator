
export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
      const { prompt } = await request.json();

      const result = await env.AI.run(
        "@cf/meta/llama-3.1-8b-instruct-fast",
        {
          messages: [
            {
              role: "system",
              content: `Generate musical beat parameters from the user's description.
Return ONLY a JSON object:
{"bpm": 120, "duration": 90, "sample_rate": 22050, "energy": 0.7}`
            },
            { role: "user", content: prompt }
          ],
          max_tokens: 100
        }
      );
  return new Response(
    JSON.stringify(
      typeof result.response === "string"
        ? JSON.parse(result.response)
        : result.response
    ),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
);    } catch (error) {
      return Response.json(
        { error: String(error) },
        {
          status: 500,
          headers: corsHeaders,
        }
      );
    }
  }
};
