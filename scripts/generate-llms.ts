/**
 * Generates public/llms.txt and public/llms-full.txt from the site's
 * schema definitions, content indexes, and MDX source files.
 *
 * Run: tsx scripts/generate-llms.ts
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

import {
  createSchemaDefinition,
  schemaJSON,
  eventsSchemaJSON,
  type SchemaDefinition,
} from "@mml-io/mml-schema";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Guide = { id: string; title: string; description: string; mdx: string };
type BlogPost = { id: string; title: string; description: string; date: string; mdx: string };
type CodeExample = { name: string; code: string };

// Using `any` for schema types that aren't fully exported
type EventClass = {
  name: string;
  comment?: { summary?: Array<{ text: string }> };
  children?: Array<{
    name: string;
    flags?: { isExternal?: boolean };
    comment?: { summary?: Array<{ text: string }> };
  }>;
};

// ---------------------------------------------------------------------------
// 1. Load schema
// ---------------------------------------------------------------------------
const schema: SchemaDefinition = createSchemaDefinition(schemaJSON);

const elements = Object.values(schema.elements).filter((el) => el.name.startsWith("m-"));
const eventClasses: EventClass[] = ((eventsSchemaJSON as any).children || []).filter(
  (c: EventClass) => c.name.endsWith("Event"),
);

// ---------------------------------------------------------------------------
// 2. Load guide metadata (read index.ts files as text, extract title/description)
// ---------------------------------------------------------------------------
const GUIDES_DIR = join(ROOT, "src/content/guides");
const GUIDE_DIRS = readdirSync(GUIDES_DIR).filter((d) => {
  const indexPath = join(GUIDES_DIR, d, "index.ts");
  return existsSync(indexPath);
});

// Build a directory-name to route-ID mapping from the guides index,
// because directory names don't always match the route slug.
const GUIDES_INDEX_PATH = join(ROOT, "src/content/guides/index.ts");
const guidesIndexContent = readFileSync(GUIDES_INDEX_PATH, "utf-8");
const importToDir: Record<string, string> = {};
for (const m of guidesIndexContent.matchAll(
  /import\s+(\w+)\s+from\s+["'](?:@\/)?src\/content\/guides\/([^"']+)["']/g,
)) {
  importToDir[m[1]] = m[2];
}
const dirToRouteId: Record<string, string> = {};
for (const m of guidesIndexContent.matchAll(
  /\{\s*id:\s*["']([^"']+)["'],\s*guide:\s*(\w+)\s*\}/g,
)) {
  const routeId = m[1];
  const varName = m[2];
  if (importToDir[varName]) {
    dirToRouteId[importToDir[varName]] = routeId;
  }
}

function extractTsField(content: string, field: string): string {
  // Match double-quoted strings (handling escaped quotes and apostrophes)
  const dq = new RegExp(`${field}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "m");
  const dm = content.match(dq);
  if (dm) return dm[1];

  // Fallback: single-quoted or backtick-quoted
  const sq = new RegExp(`${field}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, "m");
  const sm = content.match(sq);
  if (sm) return sm[1];

  const bq = new RegExp(`${field}:\\s*\`((?:[^\`\\\\]|\\\\.)*)\``, "m");
  const bm = content.match(bq);
  return bm ? bm[1] : "";
}

function stripMdxImports(mdx: string): string {
  return mdx
    .replace(/^import\s+.*$/gm, "")
    .replace(/<[A-Z][A-Za-z]*\s*[^>]*\/>/g, "")
    .replace(/<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function loadGuide(dirName: string): Guide {
  const indexPath = join(GUIDES_DIR, dirName, "index.ts");
  const indexContent = readFileSync(indexPath, "utf-8");
  const title = extractTsField(indexContent, "title");
  const description = extractTsField(indexContent, "description");
  const mdxPath = join(GUIDES_DIR, dirName, "body.mdx");
  const mdx = existsSync(mdxPath) ? readFileSync(mdxPath, "utf-8") : "";
  return { id: dirToRouteId[dirName] || dirName, title, description, mdx: stripMdxImports(mdx) };
}

const guides = GUIDE_DIRS.map(loadGuide);

// ---------------------------------------------------------------------------
// 3. Load blog post metadata
// ---------------------------------------------------------------------------
const BLOG_DIR = join(ROOT, "src/content/blogPosts");
const BLOG_DIRS = readdirSync(BLOG_DIR).filter((d) => {
  const indexPath = join(BLOG_DIR, d, "index.ts");
  return existsSync(indexPath);
});

function loadBlogPost(dirName: string): BlogPost {
  const indexPath = join(BLOG_DIR, dirName, "index.ts");
  const indexContent = readFileSync(indexPath, "utf-8");
  const title = extractTsField(indexContent, "title");
  const description = extractTsField(indexContent, "description");
  const date = extractTsField(indexContent, "date");
  const mdxPath = join(BLOG_DIR, dirName, "body.mdx");
  const mdx = existsSync(mdxPath) ? readFileSync(mdxPath, "utf-8") : "";
  return { id: dirName, title, description, date, mdx: stripMdxImports(mdx) };
}

const blogPosts = BLOG_DIRS.map(loadBlogPost);

// ---------------------------------------------------------------------------
// 4. Load element example code
// ---------------------------------------------------------------------------
const DOCS_DIR = join(ROOT, "src/content/docs");

function loadElementExamples(elementName: string): CodeExample[] {
  const dir = join(DOCS_DIR, elementName);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mml"))
    .map((f) => ({
      name: f.replace(".mml", ""),
      code: readFileSync(join(dir, f), "utf-8").trim(),
    }));
}

// ---------------------------------------------------------------------------
// 5. Generate llms.txt (summary)
// ---------------------------------------------------------------------------
function generateLlmsTxt(): string {
  const lines: string[] = [];
  lines.push("# MML - Metaverse Markup Language");
  lines.push("");
  lines.push(
    "> MML is an open source system for building multi-user interactive 3D experiences on the web. It uses familiar HTML/JS patterns extended with 3D-specific elements.",
  );
  lines.push("");

  lines.push("## Docs");
  lines.push("");
  for (const g of guides) {
    lines.push(`- [${g.title}](https://mml.io/docs/guides/${g.id}): ${g.description}`);
  }
  lines.push("");

  lines.push("## Elements Reference");
  lines.push("");
  for (const el of elements) {
    const desc = el.description?.[0]?.replaceAll("\n", " ") || "";
    lines.push(`- [<${el.name}>](https://mml.io/docs/reference/elements/${el.name}): ${desc}`);
  }
  lines.push("");

  lines.push("## Events Reference");
  lines.push("");
  for (const ev of eventClasses) {
    const summary =
      ev.comment?.summary
        ?.map((s) => s.text)
        .join("") || "";
    lines.push(`- [${ev.name}](https://mml.io/docs/reference/events/${ev.name}): ${summary}`);
  }
  lines.push("");

  lines.push("## Blog");
  lines.push("");
  for (const post of blogPosts) {
    lines.push(`- [${post.title}](https://mml.io/blog/${post.id}): ${post.description}`);
  }
  lines.push("");

  lines.push("## Optional");
  lines.push("");
  lines.push("- [Examples](https://mml.io/examples): Interactive code examples");
  lines.push("- [GitHub](https://github.com/mml-io/mml): Source code and issues");
  lines.push("");

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// 6. Generate llms-full.txt (comprehensive)
// ---------------------------------------------------------------------------
function generateLlmsFullTxt(): string {
  const lines: string[] = [];
  lines.push("# MML - Metaverse Markup Language");
  lines.push("");
  lines.push(
    "MML is an open source system for building multi-user interactive 3D experiences on the web. It uses familiar HTML/JS patterns extended with 3D-specific elements. MML documents are HTML files that use custom elements (like `<m-cube>`, `<m-sphere>`, `<m-model>`) to describe 3D content. Interactive documents include `<script>` tags and run on a server, streaming updates to all connected clients over WebSocket - making them multi-user by default.",
  );
  lines.push("");
  lines.push("---");
  lines.push("");

  // Guides
  lines.push("## Guides");
  lines.push("");
  for (const g of guides) {
    lines.push(`### ${g.title}`);
    lines.push("");
    lines.push(`URL: https://mml.io/docs/guides/${g.id}`);
    lines.push("");
    lines.push(g.mdx);
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  // Attribute Groups
  const attrGroups = Object.values(schema.attributeGroups);
  if (attrGroups.length) {
    lines.push("## Shared Attribute Groups");
    lines.push("");
    lines.push(
      "Many MML elements share common sets of attributes through attribute groups. When an element lists an attribute group, it inherits all of that group's attributes.",
    );
    lines.push("");
    for (const group of attrGroups) {
      lines.push(`### ${group.name}`);
      lines.push("");
      if (group.attributes?.length) {
        for (const attr of group.attributes) {
          const type = attr.type ? ` (${attr.type})` : "";
          const enumVals = attr.enum ? ` - values: ${attr.enum.join(", ")}` : "";
          const desc = attr.description?.[0]?.replaceAll("\n", " ") || "";
          lines.push(`- \`${attr.name}\`${type}${enumVals}${desc ? ": " + desc : ""}`);
        }
      }
      lines.push("");
    }
    lines.push("---");
    lines.push("");
  }

  // Elements
  lines.push("## Elements Reference");
  lines.push("");
  for (const el of elements) {
    lines.push(`### <${el.name}>`);
    lines.push("");
    lines.push(`URL: https://mml.io/docs/reference/elements/${el.name}`);
    lines.push("");

    if (el.description?.length) {
      lines.push(el.description.map((d) => d.replaceAll("\n", " ")).join("\n\n"));
      lines.push("");
    }

    // Attributes
    if (el.attributes?.length) {
      lines.push("**Attributes:**");
      lines.push("");
      for (const attr of el.attributes) {
        const type = attr.type ? ` (${attr.type})` : "";
        const enumVals = attr.enum ? ` - values: ${attr.enum.join(", ")}` : "";
        const desc = attr.description?.[0]?.replaceAll("\n", " ") || "";
        lines.push(`- \`${attr.name}\`${type}${enumVals}${desc ? ": " + desc : ""}`);
      }
      lines.push("");
    }

    // Attribute groups
    if (el.attributeGroups?.length) {
      lines.push("**Attribute Groups:** " + el.attributeGroups.join(", "));
      lines.push("");
    }

    // Examples
    const examples = loadElementExamples(el.name);
    if (examples.length) {
      lines.push("**Examples:**");
      lines.push("");
      for (const ex of examples) {
        lines.push(`*${ex.name}:*`);
        lines.push("```html");
        lines.push(ex.code);
        lines.push("```");
        lines.push("");
      }
    }

    lines.push("---");
    lines.push("");
  }

  // Events
  lines.push("## Events Reference");
  lines.push("");
  for (const ev of eventClasses) {
    lines.push(`### ${ev.name}`);
    lines.push("");
    lines.push(`URL: https://mml.io/docs/reference/events/${ev.name}`);
    lines.push("");

    if (ev.comment?.summary) {
      lines.push(ev.comment.summary.map((s) => s.text).join(""));
      lines.push("");
    }

    // Properties
    const props = (ev.children || []).filter((child) => !child.flags?.isExternal);
    if (props.length) {
      lines.push("**Properties:**");
      lines.push("");
      for (const prop of props) {
        const desc =
          prop.comment?.summary
            ?.map((s) => s.text)
            .join("")
            .trim() || "";
        lines.push(`- \`${prop.name}\`${desc ? ": " + desc : ""}`);
      }
      lines.push("");
    }

    // Event examples
    const eventExamples = loadElementExamples(ev.name);
    if (eventExamples.length) {
      lines.push("**Examples:**");
      lines.push("");
      for (const ex of eventExamples) {
        lines.push(`*${ex.name}:*`);
        lines.push("```html");
        lines.push(ex.code);
        lines.push("```");
        lines.push("");
      }
    }

    lines.push("---");
    lines.push("");
  }

  // Blog
  lines.push("## Blog Posts");
  lines.push("");
  for (const post of blogPosts) {
    lines.push(`### ${post.title}`);
    lines.push("");
    lines.push(`URL: https://mml.io/blog/${post.id}`);
    lines.push(`Date: ${post.date}`);
    lines.push("");
    lines.push(post.mdx);
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// 7. Write files
// ---------------------------------------------------------------------------
const llmsTxt = generateLlmsTxt();
const llmsFullTxt = generateLlmsFullTxt();

writeFileSync(join(ROOT, "public/llms.txt"), llmsTxt, "utf-8");
writeFileSync(join(ROOT, "public/llms-full.txt"), llmsFullTxt, "utf-8");

console.log(`Generated public/llms.txt (${(llmsTxt.length / 1024).toFixed(1)} KB)`);
console.log(`Generated public/llms-full.txt (${(llmsFullTxt.length / 1024).toFixed(1)} KB)`);
