export default async function handler(req, res) {
  const { method, body } = req;
  console.log(body);
  const headers = {
    "Content-Type": "application/json",
  };

  if (method === "POST") {
    const response = await fetch("http://smneevgptapi.centralindia.cloudapp.azure.com/response", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // Handle non-successful responses (e.g., 404, 500)
      res.status(response.status).json({ error: "Server Error" });
      return;
    }

    const responseData = await response.json();
    console.log(responseData.answer);
    res.status(200).json(responseData);
  }
}
