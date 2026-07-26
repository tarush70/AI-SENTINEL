import React, { useState } from 'react';
import { BriefcaseBusiness, CheckCircle2, Code2, Mail, MessageCircle, X } from 'lucide-react';

const notices = {
  privacy: { title: 'Privacy at AI Sentinel', body: 'We use the email you submit only to respond to your demo or early-access request. This product demo does not collect security telemetry or run a real scan.' },
  terms: { title: 'Terms of use', body: 'AI Sentinel is a product demonstration. Security simulation results are illustrative and should not be used as a production security assessment.' },
  changelog: { title: 'Changelog', body: 'Version 1.4.2: refreshed the interactive threat simulations, responsive navigation, and the enterprise enquiry flow.' },
};

export default function Footer() {
  const [notice, setNotice] = useState(null);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <footer className="bg-slate-950 border-t border-slate-900 px-6 pt-14 pb-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-slate-100 mb-3">AI Sentinel</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">Autonomous application security for teams deploying the next generation of AI systems.</p>
          <div className="flex gap-3 mt-5" aria-label="Social channels">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="AI Sentinel on GitHub" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:bg-white hover:text-slate-950 transition-colors"><Code2 size={17} /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="AI Sentinel on LinkedIn" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:bg-blue-700 hover:text-white transition-colors"><BriefcaseBusiness size={17} /></a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="AI Sentinel on X" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:bg-sky-600 hover:text-white transition-colors"><MessageCircle size={17} /></a>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-slate-100 mb-4">Product</h3>
          <div className="flex flex-col items-start gap-3 text-sm text-slate-400">
            <button type="button" onClick={() => scrollTo('features')} className="hover:text-blue-400 transition-colors">Threat hunting</button>
            <button type="button" onClick={() => scrollTo('demo')} className="hover:text-blue-400 transition-colors">Live simulations</button>
            <button type="button" onClick={() => scrollTo('integration')} className="hover:text-blue-400 transition-colors">Integration guide</button>
            <button type="button" onClick={() => scrollTo('enterprise')} className="hover:text-blue-400 transition-colors">Enterprise plans</button>
            <button type="button" onClick={() => setNotice('changelog')} className="hover:text-blue-400 transition-colors">Changelog</button>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-slate-100 mb-4">Company</h3>
          <div className="flex flex-col items-start gap-3 text-sm text-slate-400">
            <a href="mailto:contact@aisentinel.com" className="hover:text-blue-400 transition-colors flex items-center gap-2"><Mail size={14} />Contact sales</a>
            <button type="button" onClick={() => setNotice('privacy')} className="hover:text-blue-400 transition-colors">Privacy policy</button>
            <button type="button" onClick={() => setNotice('terms')} className="hover:text-blue-400 transition-colors">Terms of service</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-900 pt-7 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
        <p>© 2026 AI Sentinel Inc. All rights reserved.</p>
        <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /><span>Demo systems operational</span></div>
      </div>

      {notice && (
        <div className="fixed inset-0 z-[60] bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-5" role="dialog" aria-modal="true" aria-labelledby="notice-title" onMouseDown={() => setNotice(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4"><h2 id="notice-title" className="text-lg font-bold text-white">{notices[notice].title}</h2><button type="button" onClick={() => setNotice(null)} aria-label="Close dialog" className="text-slate-400 hover:text-white"><X /></button></div>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">{notices[notice].body}</p>
            <button type="button" onClick={() => setNotice(null)} className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">Got it</button>
          </div>
        </div>
      )}
    </footer>
  );
}
