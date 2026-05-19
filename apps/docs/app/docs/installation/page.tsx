/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { DocPage } from "../../_components/docs/DocPage";

const tocItems = [
  { id: "prerequisites", title: "Prerequisites" },
  { id: "add-as-git-dependency", title: "Add as git dependency" },
  { id: "configure-tailwind", title: "Configure Tailwind v4" },
  { id: "import-components", title: "Import components" },
];

export default function InstallationPage() {
  return (
    <DocPage title="Installation" description="Add MVP UI to a project via git dependency or submodule." tocItems={tocItems}>
      <section>
        <h2 id="prerequisites-heading" className="scroll-mt-8">Prerequisites</h2>
        <ul>
          <li>Node.js 20+</li>
          <li>pnpm 9+</li>
          <li>React 19+</li>
          <li>Tailwind CSS v4</li>
        </ul>
      </section>

      <section>
        <h2 id="add-as-git-dependency-heading" className="scroll-mt-8">Add as git dependency</h2>
        <p>In your project&apos;s <code>package.json</code>:</p>
        <pre><code>{`"dependencies": {
  "@mvp-ui/ui": "git+https://github.com/you/mvp-ui.git#main"
}`}</code></pre>
        <p>Then run:</p>
        <pre><code>pnpm install</code></pre>
      </section>

      <section>
        <h2 id="configure-tailwind-heading" className="scroll-mt-8">Configure Tailwind v4</h2>
        <p>Import the token layer from <code>@mvp-ui/tokens</code> in your CSS entry point:</p>
        <pre><code>{`@import "@mvp-ui/tokens/dist/tokens.css";
@import "tailwindcss";`}</code></pre>
      </section>

      <section>
        <h2 id="import-components-heading" className="scroll-mt-8">Import components</h2>
        <pre><code>{`import { Button, Input, Badge } from "@mvp-ui/ui";`}</code></pre>
        <p>
          All components are client components. The package ships with <code>"use client"</code>{" "}
          stamped on every output file, making it safe to import from both server and client
          modules in Next.js App Router.
        </p>
      </section>
    </DocPage>
  );
}
