import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalyzedSystem {
  id: string
  systemType: string
  os: string
  timestamp: Date
}

interface AnalyzedSystemsListProps {
  systems: AnalyzedSystem[]
}

export function AnalyzedSystemsList({ systems }: AnalyzedSystemsListProps) {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Analyzed Systems</CardTitle>
        <CardDescription>Your previously analyzed systems</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {systems.length === 0 ? (
          <p className="text-sm text-muted-foreground">No systems analyzed yet.</p>
        ) : (
          <ul className="space-y-4">
            {systems.map((system) => (
              <li key={system.id} className="border-b pb-2">
                <h3 className="font-semibold">{system.systemType}</h3>
                <p className="text-sm text-muted-foreground">OS: {system.os || "N/A"}</p>
                <p className="text-xs text-muted-foreground">
                  Analyzed on: {system.timestamp.toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

