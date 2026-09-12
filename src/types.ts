export interface LmpcItem {
  id: string;
  name: string;
  mandatory: boolean;
  status: 'pass' | 'fail' | 'warning';
  foundValue: string;
  lawRef: string;
}

export interface FssaiItem {
  id: string;
  name: string;
  mandatory: boolean;
  status: 'pass' | 'fail' | 'warning';
  foundValue: string;
  lawRef: string;
}

export interface FontIssue {
  field: string;
  requiredMm: number;
  estimatedMm: number;
  status: 'pass' | 'fail';
  ruleRef: string;
  detail: string;
}

export interface FontAudit {
  requiredFontHeightMm: number;
  estimatedNetQtyFontMm: number;
  readabilityScore: number;
  fontIssues: FontIssue[];
  isCompliant: boolean;
}

export interface CaloricDiscrepancy {
  type: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  detail: string;
}

export interface ScientificAudit {
  isValid: boolean;
  declaredKcal: number | null;
  calculatedKcal: number;
  variancePct: number;
  discrepancies: CaloricDiscrepancy[];
}

export interface MacroSplit {
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
  totalKcal: number;
}

export interface ExtractedEntities {
  manufacturer: string;
  commonName: string;
  netQuantity: string;
  mfdDate: string;
  expiryDate: string;
  mrp: string;
  unitSalePrice: string;
  batchNo: string;
  consumerCare: string;
  countryOfOrigin: string;
  fssaiLicense: string;
  energy: string;
  protein: string;
  carbohydrates: string;
  totalSugar: string;
  addedSugar: string;
  dietaryFiber: string;
  totalFat: string;
  saturatedFat: string;
  transFat: string;
  cholesterol: string;
  sodium: string;
  servingSize: string;
  ingredients: string;
  vegLogo?: string;
}

export interface AdditiveFlag {
  name: string;
  category: string;
  risk: 'low' | 'moderate' | 'high';
  description: string;
}

export interface InspectionRecord {
  id: string;
  scanId: string;
  timestamp: string;
  productName: string;
  brand: string;
  mfgName: string;
  mrp: string;
  netQty: string;
  complianceStatus: 'COMPLIANT' | 'NON_COMPLIANT' | 'WARNING';
  lmpcFailures: number;
  fssaiFailures: number;
  fontFailures: number;
  scientificFailures: number;
  totalFailures: number;
  violations: string[];
  entities: ExtractedEntities;
  lmpcReport: LmpcItem[];
  fssaiReport: FssaiItem[];
  fontAudit: FontAudit;
  scientificAudit: ScientificAudit;
  macroSplit: MacroSplit;
  additives: AdditiveFlag[];
  imageSrc?: string;
  preprocessedImageSrc?: string;
  rawExtractedText?: string;
  isManuallyEdited?: boolean;
  aiInsights?: string;
}

export interface DashboardAnalytics {
  totalScans: number;
  compliantScans: number;
  nonCompliantScans: number;
  warningScans: number;
  violationRate: number;
  lmpcTotalFails: number;
  fssaiTotalFails: number;
  fontTotalFails: number;
  scientificTotalFails: number;
  topViolations: { category: string; count: number }[];
  topViolatingManufacturers: { name: string; violations: number }[];
  macroDistributionAverage: {
    avgProteinPct: number;
    avgCarbsPct: number;
    avgFatPct: number;
  };
}

export interface NLPMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  citations?: string[];
}
