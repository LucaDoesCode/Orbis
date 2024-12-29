import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Cpu, Lock } from "lucide-react";

const problems = [
  {
    title: "Fragmented Threat Data",
    description:
      "Businesses and development teams face challenges consolidating threat intelligence from diverse sources such as research, reports, and frameworks, leading to inefficiencies.",
    icon: AlertTriangle,
  },
  {
    title: "Delays in Understanding Threats",
    description:
      "Manually analyzing and interpreting large volumes of threat information slows decision-making, increasing the risk of missed vulnerabilities.",
    icon: Cpu,
  },
  {
    title: "Security Knowledge Gaps",
    description:
      "Teams struggle to stay informed about the latest threats to their technology, leaving critical gaps in their security strategies.",
    icon: Lock,
  },
];

export default function problem_Component() {
  return (
    <Section
      title="Problem"
      subtitle="Simplifying threat intelligence is critical."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {problems.map((problem, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="bg-background border-none shadow-none">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
