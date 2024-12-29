import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Shield, Database, Bell, Search, FileText, Users, Zap, Lock, CheckCircle, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import Component from '@/components/sections/how-it-works'
import Problem_Component from '@/components/sections/problem'
import Header from '@/components/sections/header'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-48 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Secure Your Systems with Orbis
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Get real-time threat intelligence, research, and security information for your systems.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild className="bg-[#ff1c47] hover:bg-[#e0193f] text-white">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              7 day free trial. Start securing your systems today.
            </p>
          </div>
        </section>
        <section className="py--20">
        <Problem_Component />
        </section>
        <Component />

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Comprehensive Cyber Security Solutions</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Real-time Threat Intelligence',
                  description: 'Stay ahead of cyber threats with our advanced AI-powered threat detection system.',
                  icon: Shield
                },
                {
                  title: 'Comprehensive Research Database',
                  description: 'Access our vast database of security research, best practices, and historical threat data.',
                  icon: Database
                },
                {
                  title: 'Custom Alerts and Monitoring',
                  description: 'Set up personalized alerts for your specific technologies and systems.',
                  icon: Bell
                },
                {
                  title: 'Vulnerability Assessment',
                  description: 'Regular scans and assessments of your systems to identify potential weaknesses.',
                  icon: Search
                },
                {
                  title: 'Incident Response Planning',
                  description: 'Develop and maintain robust incident response plans with expert guidance.',
                  icon: FileText
                },
                {
                  title: 'Security Awareness Training',
                  description: 'Empower your team with knowledge through interactive training modules.',
                  icon: Users
                }
              ].map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <feature.icon className="h-8 w-8 text-indigo-600 mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Why Choose Orbis?</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {[
                {
                  title: 'Proactive Protection',
                  description: 'Our AI-driven system continuously monitors and adapts to new threats.',
                  icon: Shield
                },
                {
                  title: 'Comprehensive Coverage',
                  description: 'End-to-end cybersecurity solutions tailored to your needs.',
                  icon: Lock
                },
                {
                  title: 'Expert Support',
                  description: '24/7 assistance from our team of cybersecurity experts.',
                  icon: Users
                },
                {
                  title: 'Rapid Response',
                  description: 'Real-time alerts and automated incident response protocols.',
                  icon: Zap
                }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{benefit.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-indigo-700 py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Boost your cybersecurity today.</span>
              <span className="block mt-2">Start using Orbis now.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-200">
              Protect your systems, data, and reputation with our advanced cybersecurity solutions.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Trusted by Industry Leaders</h2>
              <p className="mt-4 text-lg text-gray-500">Join thousands of companies that trust Orbis for their cybersecurity needs.</p>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
              <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                <img className="h-12" src="/placeholder.svg?height=48&width=158" alt="Tuple" width="158" height="48" />
              </div>
              <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                <img className="h-12" src="/placeholder.svg?height=48&width=158" alt="Mirage" width="158" height="48" />
              </div>
              <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                <img className="h-12" src="/placeholder.svg?height=48&width=158" alt="StaticKit" width="158" height="48" />
              </div>
              <div className="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
                <img className="h-12" src="/placeholder.svg?height=48&width=158" alt="Transistor" width="158" height="48" />
              </div>
              <div className="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
                <img className="h-12" src="/placeholder.svg?height=48&width=158" alt="Workcation" width="158" height="48" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Testimonials</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Trusted by security professionals
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Hear from our satisfied customers about how Orbis has transformed their cybersecurity strategy.
              </p>
            </div>
            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Sarah Thompson",
                    role: "CISO, TechCorp",
                    image: "/placeholder.svg?height=96&width=96",
                    quote: "Orbis has been a game-changer for our organization. The real-time threat intelligence and expert support have significantly improved our security posture."
                  },
                  {
                    name: "Michael Chen",
                    role: "IT Director, GlobalFinance",
                    image: "/placeholder.svg?height=96&width=96",
                    quote: "The comprehensive coverage and rapid response capabilities of Orbis have given us peace of mind. It's like having an elite cybersecurity team on call 24/7."
                  },
                  {
                    name: "Emily Rodriguez",
                    role: "Security Analyst, E-commerce Solutions",
                    image: "/placeholder.svg?height=96&width=96",
                    quote: "I'm impressed by the depth of Orbis's research database. It's an invaluable resource for staying ahead of emerging threats and implementing best practices."
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-xl font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="mt-1 text-base text-gray-500">{testimonial.role}</p>
                        <p className="mt-3 text-base text-gray-500">"{testimonial.quote}"</p>
                      </div>
                    </div>
                    <div className="flex items-center p-6 bg-gray-50">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={testimonial.image} alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <CheckCircle key={i} className="h-5 w-5 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Pricing</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Simple, transparent pricing
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Choose the plan that best fits your needs. All plans include our core features.
              </p>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-12">
              {[
                {
                  name: "Basic",
                  price: "$99",
                  description: "Perfect for small businesses and startups",
                  features: [
                    "Real-time threat intelligence",
                    "24/7 monitoring",
                    "Email alerts",
                    "Basic reporting"
                  ]
                },
                {
                  name: "Pro",
                  price: "$299",
                  description: "Ideal for growing companies with advanced needs",
                  features: [
                    "All Basic features",
                    "Custom alert rules",
                    "API access",
                    "Advanced analytics",
                    "Phone support"
                  ]
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  description: "For large organizations with complex requirements",
                  features: [
                    "All Pro features",
                    "Dedicated account manager",
                    "On-site training",
                    "Custom integrations",
                    "SLA guarantees"
                  ]
                }
              ].map((plan, index) => (
                <Card key={index} className="flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-4xl font-extrabold">{plan.price}</span>
                      <span className="text-base font-normal">/month</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <div className="p-6 mt-auto">
                    <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                      {index === 2 ? "Contact Sales" : "Get Started"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
              <p className="mt-4 text-lg text-gray-500">
                Can't find the answer you're looking for? Reach out to our customer support team.
              </p>
            </div>
            <div className="mt-12 space-y-8">
              {[
                {
                  question: "How does Orbis protect my systems?",
                  answer: "Orbis uses advanced AI and machine learning algorithms to continuously monitor your systems for potential threats. We analyze patterns, detect anomalies, and provide real-time alerts to keep your data safe."
                },
                {
                  question: "Is Orbis suitable for small businesses?",
                  answer: "We offer scalable solutions that cater to businesses of all sizes. Our Basic plan is perfect for small businesses looking to enhance their cybersecurity without breaking the bank."
                },
                {
                  question: "Can Orbis integrate with my existing security tools?",
                  answer: "Yes, Orbis is designed to integrate seamlessly with a wide range of security tools and platforms. Our API allows for easy integration, and our team can assist with custom integrations for Enterprise clients."
                },
                {
                  question: "How often is the threat intelligence database updated?",
                  answer: "Our threat intelligence database is updated in real-time. As new threats are detected and analyzed by our global network and research team, the information is immediately made available to all our clients."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white shadow overflow-hidden rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{faq.question}</h3>
                    <div className="mt-2 text-base text-gray-500">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Solutions</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Threat Intelligence</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Vulnerability Assessment</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Incident Response</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Security Training</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Guides</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">API Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">About</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Blog</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Jobs</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 flex items-center justify-between">
            <p className="text-base text-gray-400">&copy; 2023 Orbis, Inc. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
