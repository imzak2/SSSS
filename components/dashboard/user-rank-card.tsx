import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, ChevronUp, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function UserRankCard() {
  // Current rank data
  const currentRank = {
    category: "Pentesting Web",
    rank: "Hacker",
    level: 5,
    points: 740,
    nextRankAt: 1000,
    nextRank: "Pro"
  };

  // Calculate progress to next rank
  const progress = Math.floor((currentRank.points / currentRank.nextRankAt) * 100);

  return (
    <Card className="bg-background/50 backdrop-blur-sm border border-border overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
      
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Trophy className="mr-2 h-5 w-5 text-yellow-400" />
          Current Rank
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col items-center py-4">
          <div className="relative mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-sm opacity-80"></div>
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-background border-2 border-purple-500 text-2xl font-bold">
              {currentRank.level}
            </div>
          </div>
          
          <h3 className="text-xl font-bold">{currentRank.rank}</h3>
          <p className="text-sm text-muted-foreground mb-4">{currentRank.category}</p>
          
          <div className="w-full space-y-2 mb-2">
            <div className="flex justify-between text-sm">
              <span>{currentRank.points} XP</span>
              <span>{currentRank.nextRankAt} XP</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <ChevronUp className="h-4 w-4 text-purple-400 mr-1" />
            <span>
              <span className="font-medium text-foreground">{currentRank.nextRank}</span> in {currentRank.nextRankAt - currentRank.points} XP
            </span>
          </div>
        </div>
        
        <div className="mt-2 pt-4 border-t border-border">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <Zap className="h-4 w-4 text-purple-400 mr-1" />
              <span>Daily points earned</span>
            </div>
            <span className="font-medium">+45</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}