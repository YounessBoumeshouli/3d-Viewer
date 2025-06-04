import Layout from "../components/admin/Layout.jsx"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input.jsx"
import { ChevronRight, Search } from "lucide-react"
import {useEffect, useState} from "react";
import api from "../services/api.js";
import { format } from 'date-fns';
import UserModel from "../components/admin/UserModel.jsx";


function Team() {
    const [creators,setCreators] = useState([]);
    const [topCreators, setTopCreators] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const TopCreators = (creators)=>{
            setTopCreators(creators.slice(0,4));
            console.log(creators.slice(0,4))
    }
    const handleClose  = ()=>{
        setSelectedUser(null);
    }
    const fetchCreators =async ()=>{
            const response = await api.get('designers');
            setCreators(response.data)
        console.log(response.data)
        TopCreators(response.data)
    }
    useEffect(() => {
        fetchCreators();
    }, []);
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
                            {topCreators && topCreators.map((creator, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <Avatar className="h-20 w-20 mb-3 border-2 border-white">
                                        <AvatarFallback className="bg-[#3e435d] text-lg">{creator.avatar}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="font-medium">{creator.user.name}</h3>
                                    <p className="text-sm text-gray-400">{parseFloat(creator.avg_rating || 0).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Members */}
              <div className="flex justify-around">
                  <Card className="bg-[#242634] border-[#3e435d]/20 text-white w-[400px]" >
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
                              { creators && creators.map((member, i) => (
                                  <div>
                                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#1f2124]">
                                          <div className="flex items-center gap-3">
                                              <Avatar>
                                                  <AvatarFallback className="bg-[#3e435d]">{member.avatar}</AvatarFallback>
                                              </Avatar>
                                              <div>
                                                  <p className="font-medium">{member.user.name}</p>
                                                  <p className="text-sm text-gray-400"> created at : { format(new Date(member.user.created_at), 'yyyy-MM-dd')}</p>
                                                  <p className="text-xs text-gray-500">last update :{format(new Date(member.user.updated_at), 'yyyy-MM-dd')}</p>
                                              </div>
                                          </div>
                                          <ChevronRight className="h-5 w-5 text-gray-400 " onClick={()=>document.getElementById(`member_infos_${member.id}`).classList.toggle('hidden')} />

                                      </div>
                                      <div id={`member_infos_${member.id}`} className="hidden" >
                                          <p  className="font-medium">{member.user.name}</p>
                                          <p className="text-sm text-gray-400"> created at : { format(new Date(member.user.created_at), 'yyyy-MM-dd')}</p>
                                          <p className="text-xs text-gray-500">last update :{format(new Date(member.user.updated_at), 'yyyy-MM-dd')}</p>
                                      </div>

                                  </div>
                              ))}

                              <Button variant="outline" className="w-full mt-4 bg-[#1f2124] border-[#3e435d]/20 text-white">
                                  See More
                              </Button>
                          </div>
                      </CardContent>
                  </Card>
                  <Card className="bg-[#242634] border-[#3e435d]/20 text-white w-[400px]" >
                      <CardHeader>
                          <div className="flex items-center justify-between">
                              <CardTitle>Creators</CardTitle>
                              <div className="relative w-64">
                                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                  <Input placeholder="Search" className="pl-9 bg-[#1f2124] border-none text-white" />
                              </div>
                          </div>
                      </CardHeader>
                      <CardContent>
                          <div className="space-y-4">
                              { creators && creators.map((member, i) => (
                                  <div>
                                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#1f2124]">
                                          <div className="flex items-center gap-3">
                                              <Avatar>
                                                  <AvatarFallback className="bg-[#3e435d]">{member.avatar}</AvatarFallback>
                                              </Avatar>
                                              <div>
                                                  <p className="font-medium">{member.user.name}</p>
                                                  <p className="text-sm text-gray-400"> created at : { format(new Date(member.user.created_at), 'yyyy-MM-dd')}</p>
                                                  <p className="text-xs text-gray-500">last update :{format(new Date(member.user.updated_at), 'yyyy-MM-dd')}</p>
                                              </div>
                                          </div>
                                          <ChevronRight className="h-5 w-5 text-gray-400 " onClick={()=>{
                                              setSelectedUser(member);
                                          }} />

                                      </div>
                                      <div id={`creator_infos_${member.id}`} className="hidden flex" >
                                         <div>
                                             <p className="text-sm text-gray-500 ml-5"> models : {member.houses.length}</p>
                                             <p className="text-sm text-gray-500 ml-5"> plan : {member.useroffer != null ? member.useroffer.offer.type : 'none' }</p>


                                         </div>
                                          <div>
                                              <p className="text-xs text-gray-500 ml-5">rating :{parseFloat(member.avg_rating || 0).toFixed(2)}</p>
                                              <p className="text-xs text-gray-500 ml-5">end date  :{member.useroffer != null ? member.useroffer.end_date : 'none' }</p>

                                          </div>
                                      </div>

                                  </div>
                              ))}

                              <Button variant="outline" className="w-full mt-4 bg-[#1f2124] border-[#3e435d]/20 text-white">
                                  See More
                              </Button>
                              {
                                  selectedUser && <UserModel onClose = {handleClose} creator = {selectedUser}/>
                              }
                          </div>
                      </CardContent>
                  </Card>
              </div>
            </div>
        </Layout>
    )
}

export default Team

