import Features from "@/components/features-vertical";
import Section from "@/components/section";
import { ShieldCheck, Cpu, BarChart2 } from "lucide-react";


const data = [
  {
    id: 1,
    title: "1. Provide System Details",
    content:
      "Easily upload system architecture, configurations, or technical details in supported formats. Our platform ensures secure handling of your data throughout the process.",
    image: "threat-tool\images\Threat tool.png",
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "2. Analyze with AI",
    content:
      "Leverage our AI-powered threat assessment engine to identify vulnerabilities, potential risks, and relevant threats across your system's components.",
    image: "threat-tool\images\Threat tool.png",
    icon: <Cpu className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Review Threat Insights",
    content:
      "Get a detailed report of identified threats, their sources, descriptions, and actionable recommendations to strengthen your system's security posture.",
    image: "Threat tool.png",
    icon: <BarChart2 className="w-6 h-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="How it works"  subtitle="Assess your system in 3 simple steps">
      <Features data={data} />
    </Section>
  );
}
