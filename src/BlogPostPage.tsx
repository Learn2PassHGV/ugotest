import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Clock, Phone } from 'lucide-react';
import type { Post } from './data/posts';
import { POSTS } from './data/posts';

interface BlogPostPageProps {
  post: Post;
  onNavigate?: (page: string) => void;
  onRequestQuote?: () => void;
}

/** Article template for the blog guides, with Article + FAQ structured data. */
export function BlogPostPage({ post, onNavigate, onRequestQuote }: BlogPostPageProps) {
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.datePublished,
    author: { '@type': 'Organization', name: 'UGO Coach & Minibus Hire' },
    publisher: { '@type': 'Organization', name: 'UGO Coach & Minibus Hire (Pullman Direct Ltd)' },
    mainEntityOfPage: `https://www.coaches.business/blog/${post.slug}`,
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const others = POSTS.filter((p) => p.slug !== post.slug);

  return (
    <div className="bg-stone-50 min-h-screen font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Header */}
      <section className="bg-stone-50 pt-32 pb-12 md:pt-40 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <a
            href="/blog"
            onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('blog'); }}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-600 hover:text-amber-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All guides
          </a>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-600 mb-4">{post.kicker}</p>
          <h1 className="font-serif text-3xl md:text-5xl text-slate-900 leading-tight mb-6">{post.title}</h1>
          <div className="flex items-center gap-4 text-xs text-slate-500 font-sans">
            <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readingMinutes} minute read</span>
            <span>·</span>
            <span>By the UGO family team, St Albans</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="py-14">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <p className="font-sans text-slate-700 font-light text-lg leading-relaxed mb-10">{post.intro}</p>

          {post.sections.map((s) => (
            <section key={s.heading} className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-slate-900 leading-tight mb-4">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="font-sans text-slate-700 font-light leading-relaxed text-[15.5px] mb-4">{p}</p>
              ))}
              {s.bullets && (
                <ul className="space-y-3 mt-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                      <span className="font-sans text-[15px] text-slate-700 font-light leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-slate-900 leading-tight mb-6">Quick answers</h2>
            <div className="space-y-4">
              {post.faqs.map((f) => (
                <details key={f.q} className="group bg-white border border-stone-200 rounded-xl p-5">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                    <span className="font-serif text-base text-slate-900">{f.q}</span>
                    <ChevronRight className="w-4 h-4 text-amber-600 transition-transform group-open:rotate-90 shrink-0" />
                  </summary>
                  <p className="mt-3 font-sans text-sm text-slate-700 font-light leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-slate-950 text-stone-50 rounded-2xl p-8 md:p-10">
            <h3 className="font-serif text-2xl mb-3">{post.cta.heading}</h3>
            <p className="font-sans text-slate-300 font-light text-sm leading-relaxed mb-6">{post.cta.text}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onRequestQuote}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold tracking-[0.15em] text-xs uppercase py-4 px-8 rounded-xl shadow-lg hover:scale-[1.02] transition-transform cursor-pointer flex items-center justify-center gap-2"
              >
                Request a Smart Quote <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:07833226623"
                className="border border-white/20 hover:border-amber-500/60 text-white font-semibold tracking-[0.15em] text-xs uppercase py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-500" /> Owners direct: 07833 226 623
              </a>
            </div>
          </div>

          {/* Related */}
          {others.length > 0 && (
            <div className="mt-12 pt-8 border-t border-stone-200">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-4">More guides</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {others.map((o) => (
                  <a
                    key={o.slug}
                    href={`/blog/${o.slug}`}
                    onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(`post-${o.slug}`); }}
                    className="group bg-white border border-stone-200 hover:border-amber-500/50 rounded-xl p-5 transition-colors"
                  >
                    <span className="font-serif text-base text-slate-900 leading-snug block mb-2">{o.title}</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-amber-600 inline-flex items-center gap-1.5">
                      Read guide <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
