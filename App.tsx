
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PipelineBoard from './components/PipelineBoard';
import Intelligence from './components/Intelligence';
import { 
  PatientLead, 
  ReferralPartner, 
  PatientStage, 
  PartnerStage, 
  PartnerType 
} from './types';
import { ICONS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState<PatientLead[]>([]);
  const [partners, setPartners] = useState<ReferralPartner[]>([]);

  // Seed Initial Data
  useEffect(() => {
    const mockPartners: ReferralPartner[] = [
      {
        id: 'p1',
        name: 'St. Mary\'s General Hospital',
        type: 'Hospital',
        npi: '1234567890',
        stage: PartnerStage.ACTIVE_REFERRER,
        referralVolume: 42,
        conversionRate: 0.45,
        contactName: 'Sarah Jenkins',
        contactRole: 'Lead Discharge Planner',
        lastVisit: '2023-10-24'
      },
      {
        id: 'p2',
        name: 'Hilltop Skilled Nursing',
        type: 'SNF',
        stage: PartnerStage.FIRST_MEETING,
        referralVolume: 8,
        conversionRate: 0.25,
        contactName: 'Mike Ross',
        contactRole: 'Social Worker',
        lastVisit: '2023-11-01'
      },
      {
        id: 'p3',
        name: 'Downtown Rehab Center',
        type: 'Rehab',
        stage: PartnerStage.LUNCH_AND_LEARN,
        referralVolume: 15,
        conversionRate: 0.33,
        contactName: 'Dr. Emily Vance',
        contactRole: 'Director of Care',
        lastVisit: '2023-10-15'
      }
    ];

    const mockLeads: PatientLead[] = [
      {
        id: 'l1',
        name: 'Robert Thompson',
        dob: '1945-05-12',
        gender: 'Male',
        address: '123 Oak St, San Francisco',
        stage: PatientStage.NEW_INQUIRY,
        medicalNeeds: ['Bathing', 'Dressing'],
        cognitiveStatus: 'Mild Dementia',
        insurance: { payer: 'Medicare', policyId: 'MC9988', groupNo: 'G1' },
        referralSourceId: 'p1',
        createdAt: '2023-11-03T10:00:00Z',
        lastContact: '2023-11-03T10:15:00Z'
      },
      {
        id: 'l2',
        name: 'Mary Williams',
        dob: '1938-11-30',
        gender: 'Female',
        address: '456 Pine Ave, San Francisco',
        stage: PatientStage.INSURANCE_VERIFICATION,
        medicalNeeds: ['Medication Management'],
        cognitiveStatus: 'Alert',
        insurance: { payer: 'UnitedHealth', policyId: 'UH123', groupNo: 'GR-X' },
        referralSourceId: 'p1',
        createdAt: '2023-11-01T08:00:00Z',
        lastContact: '2023-11-02T09:00:00Z'
      },
      {
        id: 'l3',
        name: 'George Miller',
        dob: '1952-02-14',
        gender: 'Male',
        address: '789 Maple Blvd, San Francisco',
        stage: PatientStage.ASSESSMENT_SCHEDULED,
        medicalNeeds: ['Wound Care', 'Mobility Assistance'],
        cognitiveStatus: 'Alert',
        insurance: { payer: 'Kaiser', policyId: 'KP009', groupNo: '77A' },
        referralSourceId: 'p3',
        createdAt: '2023-10-25T14:00:00Z',
        lastContact: '2023-11-03T11:00:00Z'
      }
    ];

    setPartners(mockPartners);
    setLeads(mockLeads);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard leads={leads} partners={partners} />;
      case 'patients':
        return (
          <PipelineBoard 
            title="Patient Sales Funnel" 
            stages={Object.values(PatientStage)} 
            items={leads} 
            renderCard={(lead: PatientLead) => (
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-sky-400 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{lead.name}</h4>
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <ICONS.Calendar /> {new Date(lead.dob).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <ICONS.Dashboard /> Source: {partners.find(p => p.id === lead.referralSourceId)?.name || 'Direct'}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                   <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold">JD</div>
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-sky-100 flex items-center justify-center text-[8px] font-bold text-sky-600">RN</div>
                   </div>
                   <span className="text-[10px] text-slate-400 font-medium">Updated 2h ago</span>
                </div>
              </div>
            )}
          />
        );
      case 'partners':
        return (
          <PipelineBoard 
            title="Referral Management Pipeline" 
            stages={Object.values(PartnerStage)} 
            items={partners} 
            renderCard={(partner: ReferralPartner) => (
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-400 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    partner.type === 'Hospital' ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'
                  }`}>
                    {partner.type}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Vol: {partner.referralVolume}</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{partner.name}</h4>
                <div className="space-y-1">
                  <p className="text-xs text-slate-600 flex items-center gap-1">
                    <ICONS.Patients /> {partner.contactName}
                  </p>
                  <div className="w-full bg-slate-100 h-1 rounded-full mt-3 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full" 
                      style={{ width: `${partner.conversionRate * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Conv. Rate: {Math.round(partner.conversionRate * 100)}%</p>
                </div>
              </div>
            )}
          />
        );
      case 'intelligence':
        return <Intelligence />;
      case 'settings':
        return (
          <div className="max-w-2xl bg-white p-8 rounded-xl border border-slate-200">
            <h2 className="text-2xl font-bold mb-6">CRM Configuration</h2>
            <div className="space-y-6">
              <section>
                <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Integrations</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white border rounded flex items-center justify-center">E</div>
                      <div>
                        <p className="font-medium">eFax Digital Bridge</p>
                        <p className="text-xs text-slate-500">Connected</p>
                      </div>
                    </div>
                    <div className="w-10 h-6 bg-emerald-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg opacity-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white border rounded flex items-center justify-center">M</div>
                      <div>
                        <p className="font-medium">HCHB / MatrixCare Sync</p>
                        <p className="text-xs text-slate-500">Disconnected</p>
                      </div>
                    </div>
                    <div className="w-10 h-6 bg-slate-300 rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Compliance</h3>
                <div className="p-4 bg-sky-50 border border-sky-100 rounded-lg">
                  <p className="text-sm text-sky-800 font-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    HIPAA Protection Active
                  </p>
                  <p className="text-xs text-sky-600 mt-1">Data is encrypted at rest and in transit. BAA on file.</p>
                </div>
              </section>
            </div>
          </div>
        );
      default:
        return <Dashboard leads={leads} partners={partners} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
