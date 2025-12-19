// app/[code]/page.tsx
import { redirect } from "next/navigation";

const REDIRECTS: Record<string, string> = {
  // ✅ 测试用：部署后访问 /demo
  demo: "https://www.google.com",

  // 你也可以先放一个你自己的 Google Review 链接来测试
  // abc123: "https://g.page/r/xxxx/review",
};

function normalizeCode(input: string) {
  return (input || "").trim().toLowerCase();
}

function isValidCode(code: string) {
  // 只允许字母数字和 - _
  return /^[a-z0-9_-]{1,64}$/.test(code);
}

export default async function CodePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code: raw } = await params;
  const code = normalizeCode(raw);

  if (!isValidCode(code)) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1>Invalid code</h1>
        <p>Please check the link and try again.</p>
      </main>
    );
  }

  const target = REDIRECTS[code];

  if (!target) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1>Invalid code</h1>
        <p>This code does not exist.</p>
      </main>
    );
  }

  // ✅ 直接跳转（V1 够用）
  redirect(target);
}
