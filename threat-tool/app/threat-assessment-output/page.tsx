"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Navbar } from "../../components/navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { Button } from "../../components/ui/button"
import { AlertTriangle, Shield, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../lib/firebase"

interface Assessment {
  id: string;
  systemType: string;
  os: string;
  services: string[];
  accessPoints: string;
  firewallRules: string;
  roles: string;
  timestamp: any;
  userId: string;
}

interface Threat {
  id: string
  name: string
  severity: "critical" | "high" | "medium" | "low"
  description: string
  impact: string
  mitigation: string
  likelihood: number
  applicable_system_types: string[]
  associated_technologies: string[]
  relevant_industries: string[]
  references: string[]
}

// Dummy threats data
const dummyThreats: Threat[] = [
  {
    id: "T0011",
    name: "Tizen OS Remote Code Execution",
    severity: "critical",
    description: "Critical vulnerabilities in Tizen OS allowed remote code execution to push malicious apps.",
    impact: "Attackers could gain full control over affected devices, potentially accessing sensitive user data or using the device for malicious purposes.",
    mitigation: "Update to the latest version of Tizen OS. Implement strict app vetting processes for the Tizen Store.",
    likelihood: 75,
    applicable_system_types: ["Smart TVs", "Smartwatches"],
    associated_technologies: ["Tizen Store"],
    relevant_industries: ["IoT Devices"],
    references: ["https://www.vice.com/en/article/xy9p7n/samsung-tizen-operating-system-bugs-vulnerabilities"]
  },
  {
    id: "T0012",
    name: "Unencrypted Data Transmission",
    severity: "high",
    description: "Data transmitted between the device and the server is not encrypted, leaving it vulnerable to interception.",
    impact: "Sensitive user data could be intercepted and exploited by malicious actors.",
    mitigation: "Implement SSL/TLS encryption for all data transmissions. Use strong, up-to-date encryption protocols.",
    likelihood: 60,
    applicable_system_types: ["IoT Devices", "Mobile Apps"],
    associated_technologies: ["HTTP"],
    relevant_industries: ["Smart Home", "Healthcare"],
    references: ["https://owasp.org/www-project-internet-of-things/"]
  },
  {
    id: "T0013",
    name: "Weak Authentication Mechanisms",
    severity: "high",
    description: "The system uses weak or easily guessable default passwords, making it vulnerable to unauthorized access.",
    impact: "Attackers could gain unauthorized access to devices and user accounts.",
    mitigation: "Implement strong password policies. Enforce multi-factor authentication. Remove or change default passwords before deployment.",
    likelihood: 70,
    applicable_system_types: ["IoT Devices", "Web Applications"],
    associated_technologies: ["User Authentication Systems"],
    relevant_industries: ["Smart Home", "Enterprise Software"],
    references: ["https://www.owasp.org/index.php/Authentication_Cheat_Sheet"]
  },
  {
    id: "T0014",
    name: "Insufficient Update Mechanism",
    severity: "medium",
    description: "The system lacks a robust mechanism for applying security updates, leaving devices vulnerable to known exploits.",
    impact: "Devices remain vulnerable to known security issues, increasing the risk of successful attacks over time.",
    mitigation: "Implement an automatic, secure update mechanism. Provide clear update instructions to users.",
    likelihood: 55,
    applicable_system_types: ["IoT Devices", "Embedded Systems"],
    associated_technologies: ["Firmware"],
    relevant_industries: ["Consumer Electronics", "Industrial IoT"],
    references: ["https://www.enisa.europa.eu/publications/good-practices-for-security-of-iot"]
  },
  {
    id: "T0015",
    name: "Insecure Data Storage",
    severity: "medium",
    description: "Sensitive data is stored on the device without proper encryption or access controls.",
    impact: "Local attackers could access and exploit sensitive user data stored on the device.",
    mitigation: "Implement strong encryption for stored data. Use secure hardware elements where available. Minimize storage of sensitive data on the device.",
    likelihood: 50,
    applicable_system_types: ["Mobile Devices", "IoT Devices"],
    associated_technologies: ["Local Databases", "File Systems"],
    relevant_industries: ["Finance", "Healthcare"],
    references: ["https://mobile-security.gitbook.io/mobile-security-testing-guide/general-mobile-app-testing-guide/0x05d-testing-data-storage"]
  }
]

function ThreatDetails({ systemType, threats = dummyThreats }: { systemType: string, threats?: Threat[] }) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="w-full max-w-4xl space-y-8">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>System Threat Assessment</CardTitle>
            </div>
            <Badge variant="outline">{systemType}</Badge>
          </div>
          <CardDescription>
            Comprehensive analysis of potential threats and vulnerabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div className="text-sm font-medium">Critical Threats</div>
                  </div>
                  <div className="mt-2 text-2xl font-bold">
                    {threats.filter((t) => t.severity === "critical").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <div className="text-sm font-medium">High Risk Items</div>
                  </div>
                  <div className="mt-2 text-2xl font-bold">
                    {threats.filter((t) => t.severity === "high").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div className="text-sm font-medium">Low Risk Items</div>
                  </div>
                  <div className="mt-2 text-2xl font-bold">
                    {threats.filter((t) => t.severity === "low").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {threats.map((threat) => (
                <AccordionItem key={threat.id} value={threat.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4">
                      <Badge className={`${getSeverityColor(threat.severity)} text-white`}>
                        {threat.severity.toUpperCase()}
                      </Badge>
                      <span>{threat.name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-muted-foreground">{threat.description}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Potential Impact</h4>
                        <p className="text-muted-foreground">{threat.impact}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Likelihood</h4>
                        <Progress value={threat.likelihood} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-1">
                          {threat.likelihood}% chance of occurrence
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Recommended Mitigation</h4>
                        <p className="text-muted-foreground">{threat.mitigation}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Applicable System Types</h4>
                        <div className="flex flex-wrap gap-2">
                          {threat.applicable_system_types.map((type, index) => (
                            <Badge key={index} variant="secondary">{type}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Associated Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {threat.associated_technologies.map((tech, index) => (
                            <Badge key={index} variant="outline">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Relevant Industries</h4>
                        <div className="flex flex-wrap gap-2">
                          {threat.relevant_industries.map((industry, index) => (
                            <Badge key={index} variant="secondary">{industry}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">References</h4>
                        <ul className="list-disc pl-5">
                          {threat.references.map((ref, index) => (
                            <li key={index}>
                              <a href={ref} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                {ref}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ThreatAssessmentOutput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAssessment = async () => {
      const id = searchParams.get('id')
      if (!id) {
        setError('No assessment ID provided')
        setLoading(false)
        return
      }

      try {
        const docRef = doc(db, "systemAnalysis", id)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          setAssessment({
            id: docSnap.id,
            ...docSnap.data()
          } as Assessment)
        } else {
          setError('Assessment not found')
        }
      } catch (err) {
        setError('Error fetching assessment')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAssessment()
  }, [searchParams])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center py-16 px-4">
          <div className="w-full max-w-4xl">
            <p>Loading assessment...</p>
          </div>
        </main>
      </>
    )
  }

  if (error || !assessment) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center py-16 px-4">
          <div className="w-full max-w-4xl">
            <p className="text-red-500">{error || 'Assessment not found'}</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center py-16 px-4">
        <div className="container mx-auto">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assessments
          </Button>
          
          <ThreatDetails systemType={assessment.systemType} />
        </div>
      </main>
    </>
  )
}
