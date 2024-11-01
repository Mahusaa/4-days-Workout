import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import { Ruler, Weight, Target } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen-minus-header flex items-center justify-center ">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl">John Doe</CardTitle>
            <CardDescription>Fitness Enthusiast</CardDescription>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
              <Badge variant="secondary">Beginner</Badge>
              <Badge variant="secondary">Weight Loss</Badge>
              <Badge variant="secondary">Strength Training</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Ruler className="text-gray-500" />
              <div>
                <div className="font-semibold">Height</div>
                <div>180 cm</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Weight className="text-gray-500" />
              <div>
                <div className="font-semibold">Weight</div>
                <div>75 kg</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Target className="text-gray-500" />
              <div>
                <div className="font-semibold">BMI</div>
                <div>23.1 (Normal)</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Gender</h3>
            <p>Male</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Fitness Goals</h3>
            <p>Lose weight, build muscle, and improve overall fitness. Aiming to run a 5K race in the next 6 months and increase strength in major lifts.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Current Fitness Level</h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Cardio Endurance</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Edit Profile</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
