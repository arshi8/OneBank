import { createServerFn } from "@tanstack/react-start";
export const getAIInsight = createServerFn({ method: "POST" })
  .validator((data: { prompt: string; history?: { role: string; content: string }[] }) => data)
  .handler(async ({ data }) => {
    try {
      const { AzureOpenAI } = await import("openai");
      const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
      const apiKey = process.env.AZURE_OPENAI_API_KEY;
      const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
      const apiVersion = "2024-02-15-preview";

      if (!endpoint || !apiKey || !deployment) {
        throw new Error("Azure OpenAI credentials are not fully configured in the environment.");
      }

      const client = new AzureOpenAI({
        endpoint,
        apiKey,
        apiVersion,
        deployment,
      });

      const systemPrompt = `You are an AI Insights assistant for OneBank Platform, an enterprise software architecture platform. 
Provide professional, concise, and technical recommendations about architecture, technical debt, security, or cost optimization. Use Markdown formatting.`;

      const messages: any = [
        { role: "system", content: systemPrompt },
        ...(data.history || []).map((msg) => ({ role: msg.role === "user" ? "user" : "assistant", content: msg.content })),
        { role: "user", content: data.prompt }
      ];

      const response = await client.chat.completions.create({
        messages,
        model: deployment,
        max_completion_tokens: 800,
        temperature: 0.7,
      });

      return {
        success: true,
        response: response.choices[0].message.content,
      };
    } catch (error: any) {
      console.error("AI Insight Error:", error);
      return {
        success: false,
        error: error.message || "An error occurred while fetching AI insights.",
      };
    }
  });
