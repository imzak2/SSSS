import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChallengeCardProps {
  challenge: {
    title: string;
    category: string;
    difficulty: string;
    points: number;
    completedBy: string;
    color: string;
    icon: React.ReactNode;
  }
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  // Map difficulty to color
  const difficultyColor = 
    challenge.difficulty === "Easy" ? "bg-green-500/10 text-green-400 border-green-500/20" :
    challenge.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
    challenge.difficulty === "Hard" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
    "bg-red-500/10 text-red-400 border-red-500/20";

  return (
    <div className="relative group overflow-hidden">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
      <div className="relative flex items-center bg-background/95 border border-border rounded-lg p-4 overflow-hidden">
        <div className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full mr-4",
          `bg-gradient-to-r ${challenge.color} text-white`
        )}>
          {challenge.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium truncate pr-2">{challenge.title}</h3>
            <Badge className={difficultyColor}>
              {challenge.difficulty}
            </Badge>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <span className="truncate">{challenge.category}</span>
            <span className="mx-2">•</span>
            <span>{challenge.points} points</span>
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <Users className="h-3 w-3 mr-1" />
            <span>Completed by {challenge.completedBy} of users</span>
          </div>
        </div>
        
        <Button size="sm" className="ml-4 shrink-0 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
          Start <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}