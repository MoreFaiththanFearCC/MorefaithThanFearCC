
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { ICONS, COLORS } from '../constants';
import { PatientLead, ReferralPartner, PatientStage } from '../types';

interface DashboardProps {
  leads: PatientLead[];
  partners: ReferralPartner[];
}

const Dashboard: React.FC<DashboardProps> = ({ leads, partners }) => {
  const stats = [
    { label: 'New Inquiries (Today)', value: '12', trend: '+15%', color: 'sky' },
    { label: 'Pending Assessments', value: '8', trend: '-2', color: 'indigo' },
    { label: 'Admissions (MTD)', value: '24', trend: '+12%', color: 'emerald' },
    { label: 'Conversion Rate', value: '38%', trend: '+5%', color: 'amber' },
  ];

  const funnelData = Object.values(PatientStage).map(stage => ({
    name: stage.split(' ')[0],
    value: leads.filter(l => l.stage === stage).length
  }));

  const referralData = partners
    .sort((a, b) => b.referralVolume - a.referralVolume)
    .slice(0, 5)
    .map(p => ({
      name: p.name,
      leads: p.referralVolume,
      quality: Math.round(p.conversionRate * 100)
    }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Operational Overview</h2>
        <div className="flex gap-2">
           <span className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1 rounded text-sm text-slate-600">
            <ICONS.Calendar /> Last 30 Days
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-slate-400'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel Progress */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <ICONS.Patients /> Patient Intake Funnel
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} fontSize={12} stroke="#64748b" />
                <Tooltip 
                   cursor={{fill: '#f8fafc'}}
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {funnelData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % Object.values(COLORS).length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Referral Partners */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <ICONS.Partners /> Top Referral Performance
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={referralData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={10} stroke="#64748b" />
                <YAxis fontSize={12} stroke="#64748b" />
                <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="leads" fill={COLORS.primary} radius={[4, 4, 0, 0]} name="Lead Count" />
                <Bar dataKey="quality" fill={COLORS.secondary} radius={[4, 4, 0, 0]} name="Conv Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Critical Tasks Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <ICONS.Clock /> Urgent Follow-ups
          </h3>
          <button className="text-sm text-sky-500 font-medium hover:underline">View All</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Lead Name</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Source</th>
              <th className="px-6 py-3">Due In</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.slice(0, 4).map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{lead.name}</div>
                  <div className="text-xs text-slate-500">ID: {lead.id.slice(0, 8)}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                    {lead.stage}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {partners.find(p => p.id === lead.referralSourceId)?.name || 'Direct'}
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    22 minutes
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-slate-400 hover:text-sky-500 transition-colors">
                    <ICONS.Plus />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
