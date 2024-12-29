"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "../../components/navbar"
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp, deleteDoc, doc } from "firebase/firestore"
import { db, useAuth } from "../../lib/firebase"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip"
import { Shield, Info } from "lucide-react"

import { Timestamp } from "firebase/firestore";

interface Assessment {
  id: string;
  systemType: string;
  os: string;
  services: string[];
  accessPoints: string;
  firewallRules: string;
  roles: string;
  timestamp: Timestamp;
  userId: string;
}

export default function SecurityAnalysisForm() {
  const router = useRouter()
  const { user, loading: authLoading, error: authError } = useAuth();
  const [systemType, setSystemType] = useState("")
  const [os, setOS] = useState("")
  const [services, setServices] = useState<string[]>([])
  const [accessPoints, setAccessPoints] = useState("")
  const [firewallRules, setFirewallRules] = useState("")
  const [roles, setRoles] = useState("")
  const [userAssessments, setUserAssessments] = useState<Assessment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  useEffect(() => {
    const checkUserAndFetch = async () => {
      if (user) {
        await fetchUserAssessments();
      } else {
        setUserAssessments([]);
      }
    };

    checkUserAndFetch();
  }, [user]);

  const handleDelete = async (assessmentId: string) => {
    if (!user) return;
    
    try {
      const docRef = doc(db, "systemAnalysis", assessmentId);
      await deleteDoc(docRef);
      // Update local state to remove the deleted assessment
      setUserAssessments(prev => prev.filter(assessment => assessment.id !== assessmentId));
      setDeleteConfirmId(null); // Reset confirmation state
    } catch (error) {
      console.error("Error deleting assessment:", error);
    }
  };

  const fetchUserAssessments = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const systemAnalysisRef = collection(db, "systemAnalysis");
      const q = query(
        systemAnalysisRef,
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      
      const assessments: Assessment[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Ensure all fields exist with proper types
        if (data && typeof data.systemType === 'string') {
          try {
            assessments.push({
              id: doc.id,
              systemType: data.systemType || '',
              os: data.os || '',
              services: Array.isArray(data.services) ? data.services : [],
              accessPoints: data.accessPoints || '',
              firewallRules: data.firewallRules || '',
              roles: data.roles || '',
              timestamp: data.timestamp || null,
              userId: data.userId || ''
            });
          } catch (error) {
            console.error("Error processing assessment document:", doc.id, error);
          }
        } else {
        }
      });
      
      setUserAssessments(assessments);
    } catch (error) {
      console.error("Error fetching assessments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addService = (service: string) => {
    if (service) setServices((prev) => [...prev, service])
  }

  const handleSubmit = async () => {
    if (!user) {
      alert("Please sign in to submit an assessment");
      return;
    }

    try {
      // Create the assessment data object first
      const assessmentData = {
        userId: user.uid,
        systemType,
        os,
        services,
        accessPoints,
        firewallRules,
        roles,
        timestamp: serverTimestamp(),
      };
      
      const docRef = await addDoc(collection(db, "systemAnalysis"), assessmentData);
      alert(`Assessment submitted successfully!`);
      
      // Reset form
      setSystemType("");
      setOS("");
      setServices([]);
      setAccessPoints("");
      setFirewallRules("");
      setRoles("");
      
      // Wait for the server timestamp to be processed
      setTimeout(async () => {
        try {
          await fetchUserAssessments();
        } catch (error) {
          console.error("Error fetching updated assessments:", error);
          alert("Your assessment was saved but there was an error refreshing the list. Please refresh the page.");
        }
      }, 2000);
    } catch (error) {
      console.error("Error adding document: ", error)
      alert("Failed to submit assessment. Please try again.")
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center py-16 px-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Assessment Form */}
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Threat & Risk Assessment</CardTitle>
              </div>
              <CardDescription>
                Submit information about your system to receive targeted security insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <TooltipProvider>
                  <div className="flex items-center gap-1">
                    <label className="text-sm font-medium">System Type / Purpose</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 cursor-help text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Select the type of system or the general function.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
                <Select value={systemType} onValueChange={setSystemType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select system type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="server">Server</SelectItem>
                    <SelectItem value="workstation">Workstation</SelectItem>
                    <SelectItem value="network-device">Network Device</SelectItem>
                    <SelectItem value="cloud-instance">Cloud Instance</SelectItem>
                    <SelectItem value="container">Container</SelectItem>
                    <SelectItem value="iot-device">IoT Device</SelectItem>
                    <SelectItem value="conceptual">Conceptual / Prototype</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <TooltipProvider>
                  <div className="flex items-center gap-1">
                    <label className="text-sm font-medium">Operating System (optional)</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 cursor-help text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Specify the OS (e.g., Ubuntu 22.04, Windows Server 2019).
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
                <Input
                  placeholder="e.g., Ubuntu 22.04, Windows Server 2019"
                  value={os}
                  onChange={(e) => setOS(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <TooltipProvider>
                  <div className="flex items-center gap-1">
                    <label className="text-sm font-medium">Running Services (optional)</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 cursor-help text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Add main services or key functionalities. Press Enter to add.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
                <div className="space-y-2">
                  <Input
                    placeholder="Add a service (e.g., SSH on Port 22) then press Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        addService(e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {services.map((service, index) => (
                      <span
                        key={index}
                        className="rounded bg-muted px-2 py-1 text-muted-foreground"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <TooltipProvider>
                  <div className="flex items-center gap-1">
                    <label className="text-sm font-medium">Entry Points / Network Exposure</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 cursor-help text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Describe how this system is accessed or exposed.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
                <Textarea
                  placeholder="Describe any external or internal access points"
                  className="min-h-[100px]"
                  value={accessPoints}
                  onChange={(e) => setAccessPoints(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <TooltipProvider>
                  <div className="flex items-center gap-1">
                    <label className="text-sm font-medium">Firewall / Security Policies</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 cursor-help text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Provide any known firewall rules or security policies.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
                <Textarea
                  placeholder="Describe firewall rules or other protective measures"
                  className="min-h-[100px]"
                  value={firewallRules}
                  onChange={(e) => setFirewallRules(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <TooltipProvider>
                  <div className="flex items-center gap-1">
                    <label className="text-sm font-medium">Roles / Access Control</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 cursor-help text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        List how privileges are distributed.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
                <Textarea
                  placeholder="Describe roles and user privileges"
                  className="min-h-[100px]"
                  value={roles}
                  onChange={(e) => setRoles(e.target.value)}
                />
              </div>

              <Button className="w-full" size="lg" onClick={handleSubmit}>
                Submit Assessment
              </Button>
            </CardContent>
          </Card>

          {/* User's Assessments */}
          <Card className="w-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Your Assessments</CardTitle>
                  <CardDescription>
                    View your previously submitted system assessments
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    fetchUserAssessments();
                  }}
                >
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {authLoading ? (
                <div className="text-center text-muted-foreground">
                  Checking authentication...
                </div>
              ) : authError ? (
                <div className="text-center text-red-500">
                  Authentication error: {authError.message}
                </div>
              ) : !user ? (
                <div className="text-center text-muted-foreground">
                  Please sign in to view your assessments
                </div>
              ) : isLoading ? (
                <div className="text-center text-muted-foreground">
                  Loading assessments...
                </div>
              ) : userAssessments.length === 0 ? (
                <div className="text-center text-muted-foreground">
                  No assessments submitted yet
                </div>
              ) : (
                userAssessments.map((assessment) => (
                  <Card 
                    key={assessment.id} 
                    className="bg-muted cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={(e) => {
                      // Prevent navigation if clicking delete button
                      if (!(e.target as HTMLElement).closest('.delete-actions')) {
                        router.push(`/threat-assessment-output?id=${assessment.id}`)
                      }
                    }}
                  >
                    <CardContent className="pt-6 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{assessment.systemType}</h3>
                          <p className="text-sm text-muted-foreground">
                            {assessment.os || "No OS specified"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {assessment.timestamp?.toDate ? 
                              new Date(assessment.timestamp.toDate()).toLocaleDateString() 
                              : "No date"}
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="delete-actions">
                                  {deleteConfirmId === assessment.id ? (
                                    <div className="flex gap-2">
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(assessment.id)}
                                      >
                                        Confirm
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setDeleteConfirmId(null)}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  ) : (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setDeleteConfirmId(assessment.id)}
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete this assessment</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      {assessment.services.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {assessment.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-background rounded px-2 py-1"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
