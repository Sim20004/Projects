export default async function handler(req, res) {
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
  res.status(200).json(data);
}
