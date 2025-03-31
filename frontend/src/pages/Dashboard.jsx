import React from 'react';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import { Bell, ChevronDown } from 'lucide-react';

const Dashboard = () => {
    // Mock data for charts and components
    const users = [
        { id: 1, name: 'Raima Hasan', avatar: '/api/placeholder/40/40' },
        { id: 2, name: 'Nisha Anjum', avatar: '/api/placeholder/40/40' },
        { id: 3, name: 'Sami Ahmad', avatar: '/api/placeholder/40/40' },
        { id: 4, name: 'Raima Hasan', avatar: '/api/placeholder/40/40' },
    ];

    const creators = [
        { id: 1, name: 'Leo Resim', avatar: '/api/placeholder/40/40' },
        { id: 2, name: 'Haris Hamid', avatar: '/api/placeholder/40/40' },
        { id: 3, name: 'Adam Ibra', avatar: '/api/placeholder/40/40' },
        { id: 4, name: 'Mehrin Samaan', avatar: '/api/placeholder/40/40' },
    ];

    const recentProjects = [
        { name: 'Name of model', created: '25 May, 2020', creator: 'Raima Hasan', due: '10 July, 2020' },
        { name: 'Name of model', created: '12 May, 2020', creator: 'Leo Resim', due: '28 June, 2020' },
        { name: 'Name of model', created: '21 April, 2020', creator: 'Tamim Iqbal', due: '11 June, 2020' },
    ];

    const members = [
        { name: 'Tanvimul Alam', avatar: '/api/placeholder/40/40', activity: 'Completed Task: Update of Project Alfa', time: '11 min ago' },
        { name: 'Sarah Rahman', avatar: '/api/placeholder/40/40', activity: 'Updated Task: Support Update of Project X', time: '53 min ago' },
        { name: 'Anika Tabassum', avatar: '/api/placeholder/40/40', activity: 'Completed Task: Update of Project Remake', time: '3 hours ago' },
        { name: 'Raiyan Khan', avatar: '/api/placeholder/40/40', activity: 'QA Work Done: Update of Project Sonic', time: '2 min ago' },
        { name: 'Salma Hayek', avatar: '/api/placeholder/40/40', activity: 'Request for system Support: Update of Project Alfa', time: '11 min ago' },
    ];

    // Data for monthly stats chart
    const monthlyData = Array.from({ length: 22 }, (_, i) => ({
        month: i + 1,
        value: Math.floor(Math.random() * 500),
        highlighted: i >= 8 && i <= 15
    }));

    // Data for monthly project views chart
    const projectViewsData = [
        { name: 'Jan', views: 100 },
        { name: 'Feb', views: 180 },
        { name: 'Mar', views: 220 },
        { name: 'Apr', views: 280 },
        { name: 'May', views: 250 },
        { name: 'Jun', views: 270 },
        { name: 'Jul', views: 300 },
        { name: 'Aug', views: 350 },
        { name: 'Sep', views: 400 },
        { name: 'Oct', views: 500 },
    ];

    // Data for feature effort estimation chart
    const featureEffortData = [
        { name: 'Research & Planning', value: 25, color: '#3b82f6' },
        { name: 'Development', value: 45, color: '#60a5fa' },
        { name: 'Design', value: 15, color: '#93c5fd' },
        { name: 'Testing', value: 15, color: '#bfdbfe' },
    ];

    // Components for stat summaries
    const StatSummary = ({ title, value, percentage, color }) => (
        <div className="flex flex-col h-full">
            <div className="flex items-center mb-4">
                <h3 className="text-white text-sm font-medium">{title}</h3>
            </div>
            <div className="flex items-center justify-center flex-grow">
                <div className="relative inline-flex">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700">
                        <div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-semibold"
                        >
                            {percentage}%
                        </div>
                        <svg className="w-32 h-32" viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={color}
                                strokeWidth="3"
                                strokeDasharray={`${percentage}, 100`}
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="text-white text-center mt-4">
                {value}
            </div>
        </div>
    );

    // Components for navigation sidebar
    const SidebarItem = ({ icon, active }) => (
        <div className={`w-14 h-14 flex items-center justify-center rounded-lg ${active ? 'bg-blue-600' : 'hover:bg-gray-700 cursor-pointer'}`}>
            {icon}
        </div>
    );

    return (
        <div className="flex bg-gray-900 text-white min-h-screen">
            {/* Left Sidebar */}
            <div className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-8">
                <div className="text-blue-500 font-bold text-xl mb-4">DBM.</div>

                <SidebarItem
                    icon={<div className="grid grid-cols-2 gap-1"><div className="w-3 h-3 bg-blue-500"></div><div className="w-3 h-3 bg-white"></div><div className="w-3 h-3 bg-white"></div><div className="w-3 h-3 bg-white"></div></div>}
                    active={true}
                />
                <SidebarItem
                    icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>}
                />
                <SidebarItem
                    icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>}
                />
                <SidebarItem
                    icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
                />
                <SidebarItem
                    icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>}
                />
                <div className="flex-1"></div>
                <SidebarItem
                    icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="8 12 12 16 16 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line></svg>}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navigation */}
                <div className="bg-gray-900 p-4 flex justify-between items-center">
                    <div className="flex space-x-4">
                        <button className="bg-gray-800 text-blue-500 px-6 py-2 rounded-md">Dashboard</button>
                        <button className="bg-gray-800 text-white px-6 py-2 rounded-md">Message</button>
                        <button className="bg-gray-800 text-white px-6 py-2 rounded-md">Help</button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-white">
                            <Bell size={20} />
                        </div>
                        <div className="flex items-center space-x-2">
                            <img src="/api/placeholder/40/40" alt="User Avatar" className="w-8 h-8 rounded-full" />
                            <span className="text-white">Admin</span>
                            <ChevronDown size={16} />
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="flex flex-1 p-4 space-x-4">
                    {/* Main Dashboard Area */}
                    <div className="flex-1 space-y-4">
                        {/* Top Cards */}
                        <div className="grid grid-cols-3 gap-4">
                            {/* Users Card */}
                            <div className="bg-blue-900 rounded-lg p-4">
                                <div className="mb-4">
                                    <h2 className="text-white font-medium mb-4">Members:</h2>
                                    <div className="flex -space-x-2">
                                        {users.map(user => (
                                            <div key={user.id} className="relative">
                                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-blue-900" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <StatSummary title="Active Users" value="1 465" percentage="70" color="#3b82f6" />
                            </div>

                            {/* Models Card */}
                            <div className="bg-blue-900 rounded-lg p-4">
                                <div className="mb-4">
                                    <h2 className="text-white font-medium mb-4">Top creators</h2>
                                    <div className="flex -space-x-2">
                                        {creators.map(creator => (
                                            <div key={creator.id} className="relative">
                                                <img src={creator.avatar} alt={creator.name} className="w-10 h-10 rounded-full border-2 border-blue-900" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <StatSummary title="Active Models" value="847" percentage="52" color="#ef4444" />
                            </div>

                            {/* Components Card */}
                            <div className="bg-blue-900 rounded-lg p-4">
                                <div>
                                    <h2 className="text-white font-bold text-lg mb-1">Add Component</h2>
                                    <p className="text-gray-300 text-sm mb-4">Create new project and customize it with your priority base UI kit element.</p>
                                    <button className="bg-blue-900 border border-gray-500 rounded-full p-2 mb-6">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </button>
                                    <button className="bg-blue-700 text-white px-4 py-2 rounded-md w-full">Create New Component</button>
                                </div>
                                <StatSummary title="Active Components" value="847" percentage="52" color="#22c55e" />
                            </div>
                        </div>

                        {/* Recent Projects Table */}
                        <div className="bg-gray-800 rounded-lg p-4">
                            <h2 className="text-white font-medium mb-4">RECENT PROJECTS</h2>
                            <table className="w-full">
                                <thead>
                                <tr className="text-left text-gray-400">
                                    <th className="pb-3 font-normal">Name of model</th>
                                    <th className="pb-3 font-normal">CREATED</th>
                                    <th className="pb-3 font-normal">Creator</th>
                                    <th className="pb-3 font-normal">DUE</th>
                                    <th className="pb-3 font-normal"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {recentProjects.map((project, index) => (
                                    <tr key={index} className="border-t border-gray-700">
                                        <td className="py-3">{project.name}</td>
                                        <td className="py-3">{project.created}</td>
                                        <td className="py-3">{project.creator}</td>
                                        <td className="py-3">{project.due}</td>
                                        <td className="py-3 text-right">
                                            <button className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm">Check it</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Application Overview */}
                        <div className="bg-gray-800 rounded-lg p-4">
                            <h2 className="text-white font-medium mb-4">Application Overview</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {/* Monthly Stats */}
                                <div className="bg-gray-900 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-400 text-sm">Monthly Stats</span>
                                        <span className="text-white font-medium">85901 <span className="text-green-500">▲</span></span>
                                    </div>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={monthlyData}>
                                            <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                                                {monthlyData.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={entry.highlighted ? '#3b82f6' : '#e5e7eb'}
                                                    />
                                                ))}
                                            </Bar>
                                            <XAxis dataKey="month" axisLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Monthly Project Views */}
                                <div className="bg-gray-900 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-400 text-sm">Monthly Project Views</span>
                                        <span className="text-white font-medium">17221 <span className="text-green-500">▲</span></span>
                                    </div>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <LineChart data={projectViewsData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                                            <XAxis dataKey="name" axisLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                                            <Line type="monotone" dataKey="views" stroke="#3b82f6" dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#1e3a8a' }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Feature Effort Estimation */}
                                <div className="bg-gray-900 rounded-lg p-4">
                                    <div className="mb-2">
                                        <span className="text-gray-400 text-sm">Feature Effort Estimation</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <ResponsiveContainer width="100%" height={150}>
                                            <PieChart>
                                                <Pie
                                                    data={featureEffortData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={40}
                                                    outerRadius={60}
                                                    paddingAngle={0}
                                                    dataKey="value"
                                                >
                                                    {featureEffortData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="grid grid-cols-2 gap-2 w-full mt-4">
                                            {featureEffortData.map((item, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                                    <span className="text-gray-400 text-xs">{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Members */}
                    <div className="w-72 bg-gray-800 rounded-lg p-4">
                        <h2 className="text-white font-medium mb-4">Members</h2>
                        <div className="space-y-4">
                            {members.map((member, index) => (
                                <div key={index} className="flex space-x-3 bg-gray-700 p-3 rounded-lg">
                                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                                    <div className="flex-1">
                                        <h3 className="text-white font-medium">{member.name}</h3>
                                        <p className="text-gray-400 text-xs">{member.activity}</p>
                                        <p className="text-gray-500 text-xs mt-1">{member.time}</p>
                                    </div>
                                    <button className="text-gray-400 self-center">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </button>
                                </div>
                            ))}
                            <button className="w-full bg-gray-700 text-white py-2 rounded-lg mt-4">See More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;