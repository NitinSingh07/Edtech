import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Zap, BarChart3, Users, ChevronRight, Terminal } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/30">
      {/* Header */}
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <ShieldAlert className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">ResolvX</span>
        </div>
        <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#solutions" className="hover:text-primary transition-colors">Solutions</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <div className="h-4 w-px bg-border" />
          <Link href="/login" className="hover:text-primary transition-colors">Log in</Link>
          <Button asChild size="sm" className="rounded-lg px-5">
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />
          <div className="container px-6 lg:px-12 mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest animate-fade-in">
              <Sparkles className="h-3 w-3" />
              Now with AI Insights
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1]">
              Incident Management <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-600">Reimagined.</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Detect, analyze, and resolve system outages faster with ResolvX. The production-grade platform powered by AI for modern engineering teams.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" asChild className="rounded-xl px-8 h-12 text-base font-semibold group shadow-xl shadow-primary/20 transition-all hover:-translate-y-1">
                <Link href="/register">
                  Start Resolving
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="rounded-xl px-8 h-12 text-base font-semibold border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:bg-muted/50">
                <Link href="https://github.com/NitinSingh07/Edtech">
                  <Terminal className="mr-2 h-5 w-5" />
                  View Source
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 bg-muted/30 border-y border-border/50">
          <div className="container px-6 lg:px-12 mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Built for Reliability</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to maintain 99.9% uptime and keep your customers happy.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Real-time Tracking", icon: Zap, desc: "Monitor incident lifecycles from detection to resolution with millisecond precision." },
                { title: "AI Severity Detection", icon: Sparkles, desc: "Automatically classify issues using Gemini-powered intelligence based on descriptions." },
                { title: "Team Collaboration", icon: Users, desc: "Seamless communication between SREs, developers, and product managers." },
                { title: "In-depth Analytics", icon: BarChart3, desc: "Visualize MTTR, incident frequency, and team workload with interactive charts." },
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all group">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 border-t border-border/50 bg-background">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-primary" />
            <span className="font-bold">ResolvX</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 House of Edtech. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
             <Link href="#" className="hover:text-primary">Privacy</Link>
             <Link href="#" className="hover:text-primary">Terms</Link>
             <Link href="#" className="hover:text-primary">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Sparkles } from "lucide-react";
