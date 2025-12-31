
export enum PatientStage {
  NEW_INQUIRY = 'New Inquiry',
  QUALIFYING = 'Qualifying',
  INSURANCE_VERIFICATION = 'Insurance Verification',
  ASSESSMENT_SCHEDULED = 'Assessment Scheduled',
  ASSESSMENT_CONDUCTED = 'Assessment Conducted',
  PROPOSAL_SENT = 'Proposal/Care Plan Sent',
  CONTRACT_SIGNED = 'Contract Signed',
  ADMITTED = 'Admitted (Converted)'
}

export enum PartnerStage {
  PROSPECTING = 'Prospecting',
  FIRST_MEETING = 'First Meeting',
  LUNCH_AND_LEARN = 'Lunch & Learn',
  ACTIVE_REFERRER = 'Active Referrer',
  AT_RISK = 'At-Risk'
}

export type PartnerType = 'Hospital' | 'SNF' | 'Rehab' | 'Senior Center' | 'Clinic' | 'Physician';

export interface PatientLead {
  id: string;
  name: string;
  dob: string;
  gender: string;
  address: string;
  stage: PatientStage;
  medicalNeeds: string[];
  cognitiveStatus: string;
  insurance: {
    payer: string;
    policyId: string;
    groupNo: string;
  };
  referralSourceId?: string;
  createdAt: string;
  lastContact: string;
}

export interface ReferralPartner {
  id: string;
  name: string;
  type: PartnerType;
  npi?: string;
  stage: PartnerStage;
  referralVolume: number;
  conversionRate: number;
  contactName: string;
  contactRole: string;
  lastVisit: string;
}

export interface DashboardStats {
  newLeadsToday: number;
  activeAssessments: number;
  admissionsMonth: number;
  conversionRate: number;
  topReferrers: ReferralPartner[];
}
