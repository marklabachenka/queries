// Note: the "@anthropic-ai/claude-code" package has been renamed
// to "@anthropic-ai/claude-agent-sdk"
import { query } from "@anthropic-ai/claude-agent-sdk";

const prompt = "Look for duplicate queries in src/queries and report any that are identical or nearly identical, along with their file names and line numbers.";

for await (const message of query({
  prompt,
  options: {
    allowedTools: ["Edit"],
  },
})) {
  console.log(JSON.stringify(message, null, 2));
}
