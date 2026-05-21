import { promises as fs } from "node:fs";
import path from "node:path";

const siteUrl = "https://neurolab.cc";
const rootDir = process.cwd();
const blogsDir = path.join(rootDir, "src", "content", "blogs");
const careersDir = path.join(rootDir, "src", "content", "careers");
const sitemapPath = path.join(rootDir, "public", "sitemap.xml");

const staticRoutes = [
  { url: "/", priority: "1.0" },
  { url: "/about", priority: "0.8" },
  { url: "/ai-platform", priority: "0.9" },
  { url: "/blog", priority: "0.7" },
  { url: "/careers", priority: "0.6" },
  { url: "/contact", priority: "0.5" },
  { url: "/docs", priority: "0.7" },
  { url: "/shop", priority: "0.6" },
  { url: "/legal", priority: "0.4" },
];

const readJsonFiles = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".json"));

  return Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(dir, file.name);
      const source = await fs.readFile(fullPath, "utf8");
      const stat = await fs.stat(fullPath);
      return {
        data: JSON.parse(source),
        lastmod: stat.mtime.toISOString().slice(0, 10),
      };
    }),
  );
};

const xmlEscape = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const serializeUrl = ({ loc, lastmod, priority }) => `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;

const main = async () => {
  const [blogPosts, departments] = await Promise.all([
    readJsonFiles(blogsDir),
    readJsonFiles(careersDir),
  ]);

  const today = new Date().toISOString().slice(0, 10);
  const blogRoutes = blogPosts
    .filter(({ data }) => data.slug)
    .map(({ data, lastmod }) => ({
      loc: `${siteUrl}/blog/${data.slug}`,
      lastmod,
      priority: "0.6",
    }));

  const careerRoutes = departments.flatMap(({ data, lastmod }) =>
    (Array.isArray(data.roles) ? data.roles : [])
      .filter((role) => role.slug)
      .map((role) => ({
        loc: `${siteUrl}/careers/${role.slug}`,
        lastmod,
        priority: "0.5",
      })),
  );

  const routes = [
    ...staticRoutes.map((route) => ({
      loc: `${siteUrl}${route.url}`,
      lastmod: today,
      priority: route.priority,
    })),
    ...blogRoutes,
    ...careerRoutes,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(serializeUrl).join("\n")}
</urlset>
`;

  await fs.writeFile(sitemapPath, xml, "utf8");
};

main().catch((error) => {
  console.error("Failed to generate sitemap:", error);
  process.exitCode = 1;
});
