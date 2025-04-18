import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Award, Star, Shield, Zap, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

export function RecentAchievements() {
  // Achievement data
  const achievements = [
    {
      title: "First Blood",
      description: "Complete a challenge within 24 hours of release",
      icon: <Flag className="h-4 w-4" />,
      color: "from-red-500 to-orange-500",
      earned: true
    },
    {
      title: "Perfect Score",
      description: "Complete a challenge with 100% accuracy",
      icon: <Star className="h-4 w-4" />,
      color: "from-yellow-500 to-amber-500",
      earned: true
    },
    {
      title: "Streak Master",
      description: "Maintain a 7-day activity streak",
      icon: <Zap className="h-4 w-4" />,
      color: "from-blue-500 to-cyan-500",
      earned: true
    },
    {
      title: "Web Warrior",
      description: "Complete 5 web pentesting challenges",
      icon: <Shield className="h-4 w-4" />,
      color: "from-purple-500 to-blue-500",
      earned: false
    },
    {
      title: "Crypto King",
      description: "Master all cryptography basics",
      icon: <Award className="h-4 w-4" />,
      color: "from-green-500 to-emerald-500",
      earned: false
    }
  ];

  return (
    <Card className="bg-background/50 backdrop-blur-sm border border-border">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Trophy className="mr-2 h-5 w-5 text-yellow-400" />
          Recent Achievements
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[220px] pr-3">
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center space-x-4 rounded-md p-2",
                  achievement.earned ? "opacity-100" : "opacity-50"
                )}
              >
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                  achievement.earned ? `bg-gradient-to-r ${achievement.color} text-white` : "bg-muted text-muted-foreground"
                )}>
                  {achievement.icon}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {achievement.title}
                    {!achievement.earned && " (Locked)"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}