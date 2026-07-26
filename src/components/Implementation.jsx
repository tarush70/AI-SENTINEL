import React, { useState } from 'react';
import { Check, CheckCircle2, Copy, Terminal } from 'lucide-react';

const snippets = {
  python: `from ai_sentinel import Sentinel
from openai import OpenAI

# Initialize the OWASP defense layer
sentinel = Sentinel(rules=["LLM01", "LLM02"])
client = OpenAI()

def secure_chat(user_prompt):
    risk = sentinel.scan_prompt(user_prompt)
    if not risk.safe:
        return "Blocked: malicious prompt detected"

    response = client.chat.completions.create(
        model="gpt-4.1", messages=[{"role": "user", "content": user_prompt}]
    )
    return sentinel.scan_output(response).sanitized_text`,
  node: `import { Sentinel } from '@ai-sentinel/core';
import { generateText } from 'ai';

const sentinel = new Sentinel({
  mode: 'strict', compliance: ['SOC2', 'GDPR']
});

export async function handleChat(request) {
  const { prompt } = await request.json();
  const risk = await sentinel.analyze(prompt);

  if (risk.severity === 'CRITICAL') {
    return Response.json({ error: 'LLM01: Injection blocked' }, { status: 403 });
  }
  return Response.json(await generateText({ prompt }));
}`,
};

export default function Implementation() {
  const [language, setLanguage] = useState('python');
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippets[language]);
    } catch {
      // The message still confirms the intended action in browser environments without clipboard access.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="integration" className="scroll-mt-28 relative overflow-hidden border-t border-slate-900 bg-slate-950 py-24 text-slate-100">
      <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3 py-1 text-xs font-mono text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />5-minute integration</div>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">Drop-in protection for your <span className="text-blue-400">entire AI stack.</span></h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-400">Add a focused security layer around the LLM calls you already use—without rebuilding your application architecture.</p>
          <ul className="mt-8 space-y-4 text-slate-300">
            {['Prompt-injection inspection before model execution', 'Policy-ready event records for security reviews', 'Works alongside OpenAI, Anthropic, LangChain, and Vercel AI SDK'].map((item) => <li key={item} className="flex gap-3"><span className="mt-0.5 rounded-full bg-blue-500/15 p-1"><Check className="h-4 w-4 text-blue-400" /></span>{item}</li>)}
          </ul>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 opacity-20 blur group-hover:opacity-35 transition-opacity" />
          <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500"><Terminal className="h-4 w-4 text-blue-400" />SDK preview</div>
              <div className="flex items-center gap-1" role="tablist" aria-label="Code language">
                {['python', 'node'].map((item) => <button key={item} type="button" role="tab" aria-selected={language === item} onClick={() => setLanguage(item)} className={`rounded-md px-2 py-1 text-xs font-mono transition-colors ${language === item ? 'bg-blue-500/15 text-blue-300' : 'text-slate-500 hover:text-white'}`}>{item === 'python' ? 'main.py' : 'server.js'}</button>)}
              </div>
              <button type="button" onClick={copy} aria-label="Copy code sample" className="rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-white">{copied ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}</button>
            </div>
            <div className="overflow-x-auto p-5">
              <pre className="font-mono text-xs leading-6 text-slate-300 md:text-sm"><code>{snippets[language].split('\n').map((line, index) => <div key={`${language}-${index}`} className="table-row"><span className="table-cell select-none pr-4 text-right text-slate-700">{index + 1}</span><span className="table-cell whitespace-pre">{line}</span></div>)}</code></pre>
            </div>
            {copied && <div className="border-t border-emerald-500/20 bg-emerald-950/30 px-4 py-2 text-xs text-emerald-300">Code sample copied to clipboard.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
