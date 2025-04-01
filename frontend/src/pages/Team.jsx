import Layout from "../components/admin/Layout.jsx"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input.jsx"
import { ChevronRight, Search } from "lucide-react"

function Team() {
    return (
        <Layout>
            <div className="grid grid-cols-1 gap-6">
                {/* Top creators */}
                <Card className="bg-[#242634] border-[#3e435d]/20 text-white">
                    <CardHeader>
                        <CardTitle>Top creators</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { name: "Leo Resin", role: "Team Leader", avatar: "LR" },
                                { name: "Tarik Hamid", role: "UX/UI Designer", avatar: "TH" },
                                { name: "Aliza Birdie", role: "Developer", avatar: "AB" },
                                { name: "Mehrin Saberim", role: "QA Engineer", avatar: "MS" },
                            ].map((creator, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <Avatar className="h-20 w-20 mb-3 border-2 border-white">
                                        <AvatarFallback className="bg-[#3e435d] text-lg">{creator.avatar}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="font-medium">{creator.name}</h3>
                                    <p className="text-sm text-gray-400">{creator.role}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Members */}
                <Card className="bg-[#242634] border-[#3e435d]/20 text-white">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Members</CardTitle>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input placeholder="Search" className="pl-9 bg-[#1f2124] border-none text-white" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                {
                                    name: "Tanjimul Alam",
                                    action: "Completed Task: Update of Project Alfa",
                                    time: "11 min ago",
                                    avatar: "TA",
                                },
                                {
                                    name: "Sarah Rahman",
                                    action: "Updated PR for Support: Update of Project X",
                                    time: "53 min ago",
                                    avatar: "SR",
                                },
                                {
                                    name: "Anika Tabassum",
                                    action: "Completed Task: Update of Project Remax",
                                    time: "1 hours ago",
                                    avatar: "AT",
                                },
                                {
                                    name: "Raiyan Khan",
                                    action: "QA Test Done: Update of Project Sonic",
                                    time: "2 min ago",
                                    avatar: "RK",
                                },
                                {
                                    name: "Salma Hayek",
                                    action: "Request for System Support: Update of Project Alfa",
                                    time: "11 min ago",
                                    avatar: "SH",
                                },
                            ].map((member, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#1f2124]">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarFallback className="bg-[#3e435d]">{member.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{member.name}</p>
                                            <p className="text-sm text-gray-400">{member.action}</p>
                                            <p className="text-xs text-gray-500">{member.time}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </div>
                            ))}

                            <Button variant="outline" className="w-full mt-4 bg-[#1f2124] border-[#3e435d]/20 text-white">
                                See More
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    )
}

export default Team

