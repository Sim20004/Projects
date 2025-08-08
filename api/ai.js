export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    // Handle preflight request
    res.setHeader("Access-Control-Allow-Origin", "https://simarpreetsingh.org");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.status(204).end();
    return;
  }

  const body = await req.json();

  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: body.prompt }),
    }
  );

  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "https://simarpreetsingh.org");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  res.status(200).json(data);
}
