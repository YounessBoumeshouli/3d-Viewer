import Layout from "../components/admin/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BarChart, DollarSign, PieChart, Users } from "lucide-react"

function Dashboard() {
    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card className="bg-[#242634] border-[#3e435d]/20 text-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-[#4353ff]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-[#22c55e] flex items-center mt-1">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#242634] border-[#3e435d]/20 text-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-[#4353ff]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,431</div>
                        <p className="text-xs text-[#22c55e] flex items-center mt-1">+12.5% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#242634] border-[#3e435d]/20 text-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Conversion Rate</CardTitle>
                        <PieChart className="h-4 w-4 text-[#4353ff]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3.24%</div>
                        <p className="text-xs text-[#ef4444] flex items-center mt-1">-4.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#242634] border-[#3e435d]/20 text-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Avg. Session</CardTitle>
                        <BarChart className="h-4 w-4 text-[#4353ff]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12m 24s</div>
                        <p className="text-xs text-[#22c55e] flex items-center mt-1">+7.3% from last month</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-[#242634] border-[#3e435d]/20 text-white mb-6">
                <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { name: "Alex Johnson", role: "Product Designer", status: "Active", avatar: "AJ" },
                            { name: "Sarah Williams", role: "Frontend Developer", status: "In Meeting", avatar: "SW" },
                            { name: "Michael Brown", role: "Marketing Lead", status: "Offline", avatar: "MB" },
                            { name: "Emily Davis", role: "UX Researcher", status: "Active", avatar: "ED" },
                        ].map((member, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarFallback className="bg-[#3e435d]">{member.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{member.name}</p>
                                        <p className="text-sm text-gray-400">{member.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                  <span
                      className={`inline-block w-2 h-2 rounded-full ${
                          member.status === "Active"
                              ? "bg-[#22c55e]"
                              : member.status === "In Meeting"
                                  ? "bg-[#eab308]"
                                  : "bg-gray-400"
                      }`}
                  />
                                    <span className="text-sm text-gray-400">{member.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </Layout>
    )
}

export default Dashboard

