import { createServerFn } from "@tanstack/react-start";

export const generateDashboardInsights = createServerFn({ method: "POST" })
  .validator((data: { dashboardData: any }) => data)
  .handler(async ({ data }) => {
    try {
      const { AzureOpenAI } = await import("openai");
      const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
      const apiKey = process.env.AZURE_OPENAI_API_KEY;
      const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
      const apiVersion = "2024-02-15-preview";

      if (!endpoint || !apiKey || !deployment) {
        throw new Error("Azure OpenAI credentials are not fully configured.");
      }

      const client = new AzureOpenAI({
        endpoint,
        apiKey,
        apiVersion,
        deployment,
      });

      const systemPrompt = `You are an AI architect analyzing enterprise software modernization dashboards.
Based on the provided JSON data about the user's dashboard, generate 3-5 key insights and 4-5 top recommendations.

Return ONLY a valid JSON object matching this schema:
{
  "keyInsights": [
    {
      "icon": "AlertTriangle" | "Recycle" | "TrendingUp" | "Wrench" | "Leaf" | "AppWindow" | "Copy" | "Package",
      "tone": "warning" | "info" | "success" | "primary" | "rose",
      "title": "String (Short, descriptive title)",
      "body": "String (1-2 sentences of explanation)",
      "remediation": "String (Specific, actionable steps to remediate or address this insight)",
      "tag": "High Impact" | "Medium Impact" | "Low Impact"
    }
  ],
  "recommendations": [
    {
      "title": "String (Actionable recommendation)",
      "impact": "String (e.g. '28 Apps', 'Immediate', 'High ROI')"
    }
  ]
}`;

      const messages: any = [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Here is the current dashboard data:\n${JSON.stringify(data.dashboardData, null, 2)}` }
      ];

      const response = await client.chat.completions.create({
        messages,
        model: deployment,
        max_completion_tokens: 1500,
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      const resultText = response.choices[0].message.content;
      if (!resultText) throw new Error("Empty response from AI");
      
      const parsed = JSON.parse(resultText);
      return { success: true, data: parsed };
      
    } catch (error: any) {
      console.error("Generate Insights Error:", error);
      return { success: false, error: error.message };
    }
  });
