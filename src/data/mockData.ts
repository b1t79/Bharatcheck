import { InspectionRecord } from '../types';

export const EGGLESS_CAKE_LABEL_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 560" width="460" height="560" style="background:#f8f9fa;font-family:Arial,Helvetica,sans-serif;">
  <rect width="460" height="560" fill="#f4f6f8" stroke="#cbd5e1" stroke-width="2" rx="8"/>
  <rect x="15" y="15" width="430" height="530" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="6"/>
  
  <!-- Header Title -->
  <text x="230" y="48" font-size="19" font-weight="900" fill="#1e293b" text-anchor="middle" letter-spacing="1">EGG LESS SLICE CAKE</text>
  <line x1="25" y1="60" x2="435" y2="60" stroke="#cbd5e1" stroke-width="1"/>
  
  <!-- Batch, Dates & Pricing Header -->
  <text x="35" y="85" font-size="12" font-weight="bold" fill="#334155">D.O.P : 11 APR 2026</text>
  <text x="35" y="105" font-size="12" font-weight="bold" fill="#b91c1c">WT 170G +- 5%</text>
  <text x="240" y="105" font-size="12" font-weight="bold" fill="#334155">B. NO : AB1/50</text>
  <text x="35" y="126" font-size="13" font-weight="900" fill="#0f172a">MRP Rs 60.00</text>
  <text x="240" y="126" font-size="12" font-weight="bold" fill="#334155">Best Before 25 MAY 2026</text>
  
  <!-- Ingredients Section -->
  <rect x="25" y="140" width="410" height="98" fill="#f8fafc" stroke="#e2e8f0" rx="4"/>
  <text x="35" y="158" font-size="11" font-weight="bold" fill="#475569" letter-spacing="0.5">INGREDIENTS :</text>
  <foreignObject x="35" y="164" width="390" height="70">
    <p xmlns="http://www.w3.org/1999/xhtml" style="font-size:10.5px;line-height:1.35;color:#334155;margin:0;">
      Refined Wheat Flour, Edible Refined Oil, Milk Solids, Starch, Emulsifiers, Baking Powder, Salt, <span style="color:#b91c1c;font-weight:bold;">Stablizers</span>, <span style="color:#b91c1c;font-weight:bold;">Dextrs</span>, Preservative E 200, Acidity regulators, Vanilla powder, <span style="color:#b91c1c;font-weight:bold;">Sugar</span>.
    </p>
  </foreignObject>
  
  <!-- Nutrition Facts Table -->
  <rect x="25" y="248" width="410" height="175" fill="#ffffff" stroke="#1e293b" stroke-width="1.5" rx="4"/>
  <rect x="25" y="248" width="410" height="25" fill="#1e293b"/>
  <text x="230" y="265" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">NUTRITION FACTS As Per 100gm (approx.)</text>
  
  <line x1="25" y1="298" x2="435" y2="298" stroke="#e2e8f0" stroke-width="1"/>
  <text x="40" y="292" font-size="12" font-weight="bold" fill="#0f172a">Energy 420 kcal</text>
  
  <line x1="25" y1="326" x2="435" y2="326" stroke="#e2e8f0" stroke-width="1"/>
  <text x="40" y="318" font-size="11" fill="#334155">Total Fat : 21g</text>
  <text x="240" y="318" font-size="11" fill="#334155">Cholesterol : 11mg</text>
  
  <line x1="25" y1="354" x2="435" y2="354" stroke="#e2e8f0" stroke-width="1"/>
  <text x="40" y="346" font-size="11" fill="#334155">Saturated Fat : 1g</text>
  <text x="240" y="346" font-size="11" font-weight="bold" fill="#b91c1c">Sugar : 25g (Impossible &gt; Carbs)</text>
  
  <line x1="25" y1="382" x2="435" y2="382" stroke="#e2e8f0" stroke-width="1"/>
  <text x="40" y="374" font-size="11" font-weight="bold" fill="#b91c1c">Sodium : 14g (Toxic 14,000mg)</text>
  <text x="240" y="374" font-size="11" font-weight="bold" fill="#b91c1c">Carbohydrate : 6g</text>
  
  <text x="240" y="408" font-size="12" font-weight="bold" fill="#b91c1c">Protein : 55g (Inverted &gt; Carbs)</text>
  
  <!-- Regulatory Deficiencies Bar -->
  <rect x="25" y="432" width="410" height="48" fill="#fef2f2" stroke="#f87171" rx="4"/>
  <text x="35" y="450" font-size="10" font-weight="bold" fill="#991b1b">REGULATORY OMISSIONS DETECTED :</text>
  <text x="35" y="468" font-size="9.5" fill="#7f1d1d">Missing Veg Logo • Missing 14-digit FSSAI • Missing Manufacturer Address</text>
  
  <!-- Barcode footer -->
  <rect x="35" y="492" width="160" height="28" fill="#e2e8f0"/>
  <text x="115" y="510" font-size="9" font-family="monospace" fill="#334155" text-anchor="middle">|||| | ||||| ||| ||||</text>
  <text x="240" y="510" font-size="10" font-weight="bold" fill="#64748b">SWEETS 100% (Unregistered)</text>
</svg>
`)}`;

export const PUMPKIN_SEEDS_LABEL_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 680" width="540" height="680" style="background:#2b5329;font-family:Arial,Helvetica,sans-serif;">
  <!-- Background -->
  <rect width="540" height="680" fill="#2d5a27" rx="12"/>
  <rect x="12" y="12" width="516" height="656" fill="#fcfbf7" rx="8"/>

  <!-- Top Brand Banner -->
  <path d="M 12 12 Q 270 28 528 12 L 528 85 L 12 85 Z" fill="#234720"/>
  <text x="270" y="48" font-size="22" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">NOURISH YOU</text>
  <text x="270" y="70" font-size="11" font-weight="bold" fill="#d9f99d" text-anchor="middle" letter-spacing="1">RAW PUMPKIN SEEDS</text>

  <!-- Left: Marketing claims & Ingredients -->
  <rect x="24" y="98" width="236" height="152" fill="#f4f7f2" stroke="#dcfce7" rx="6"/>
  <text x="36" y="120" font-size="11" font-weight="900" fill="#14532d">WHAT MAKES OUR SEEDS SPECIAL?</text>
  <text x="36" y="138" font-size="10" font-weight="bold" fill="#166534">Say NO To: Additives, GMO, Dust</text>
  <text x="36" y="160" font-size="10.5" font-weight="bold" fill="#1e293b">INGREDIENTS:</text>
  <text x="36" y="178" font-size="10" fill="#334155">PUMPKIN SEEDS (100%)</text>
  <text x="36" y="202" font-size="9.5" font-weight="bold" fill="#047857">STORE ME WELL:</text>
  <text x="36" y="218" font-size="9" fill="#475569">Cool, dry place in airtight container.</text>
  <text x="36" y="234" font-size="9" font-weight="bold" fill="#15803d">PRODUCT OF INDIA</text>

  <!-- Right: Nutrition Information Table -->
  <rect x="270" y="98" width="246" height="268" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" rx="6"/>
  <rect x="270" y="98" width="246" height="24" fill="#1e3a1a" rx="6 6 0 0"/>
  <text x="393" y="114" font-size="10.5" font-weight="bold" fill="#ffffff" text-anchor="middle">NUTRITIONAL INFORMATION</text>
  
  <text x="280" y="136" font-size="9.5" font-weight="bold" fill="#475569">Serving Size: 28g</text>
  <text x="440" y="136" font-size="9.5" font-weight="bold" fill="#1e293b">Per 100g</text>
  <line x1="270" y1="144" x2="516" y2="144" stroke="#e2e8f0"/>

  <text x="280" y="160" font-size="9.5" fill="#334155">Energy (kcal)</text>
  <text x="475" y="160" font-size="9.5" font-weight="bold" fill="#0f172a">481.29</text>
  <line x1="270" y1="168" x2="516" y2="168" stroke="#f1f5f9"/>

  <text x="280" y="184" font-size="9.5" fill="#334155">Protein (g)</text>
  <text x="475" y="184" font-size="9.5" font-weight="bold" fill="#0f172a">33.78</text>
  <line x1="270" y1="192" x2="516" y2="192" stroke="#f1f5f9"/>

  <text x="280" y="208" font-size="9.5" fill="#334155">Carbohydrate (g)</text>
  <text x="475" y="208" font-size="9.5" font-weight="bold" fill="#0f172a">36.08</text>
  <line x1="270" y1="216" x2="516" y2="216" stroke="#f1f5f9"/>

  <text x="280" y="232" font-size="9.5" fill="#64748b">  - Total Sugars (g)</text>
  <text x="480" y="232" font-size="9.5" fill="#0f172a">1.20</text>
  <line x1="270" y1="240" x2="516" y2="240" stroke="#f1f5f9"/>

  <text x="280" y="256" font-size="9.5" fill="#64748b">  - Added Sugars (g)</text>
  <text x="480" y="256" font-size="9.5" fill="#0f172a">0.00</text>
  <line x1="270" y1="264" x2="516" y2="264" stroke="#f1f5f9"/>

  <text x="280" y="280" font-size="9.5" fill="#334155">Dietary Fibre (g)</text>
  <text x="475" y="280" font-size="9.5" font-weight="bold" fill="#0f172a">17.00</text>
  <line x1="270" y1="288" x2="516" y2="288" stroke="#f1f5f9"/>

  <text x="280" y="304" font-size="9.5" fill="#334155">Total Fat (g)</text>
  <text x="475" y="304" font-size="9.5" font-weight="bold" fill="#0f172a">18.65</text>
  <line x1="270" y1="312" x2="516" y2="312" stroke="#f1f5f9"/>

  <text x="280" y="328" font-size="9.5" fill="#64748b">  - Saturated Fat (g)</text>
  <text x="480" y="328" font-size="9.5" fill="#0f172a">2.60</text>
  <line x1="270" y1="336" x2="516" y2="336" stroke="#f1f5f9"/>

  <text x="280" y="352" font-size="9.5" fill="#334155">Sodium (mg)</text>
  <text x="475" y="352" font-size="9.5" font-weight="bold" fill="#0f172a">44.01</text>

  <!-- Commercial Box (Net Qty, Dates, MRP, Barcode) -->
  <rect x="24" y="260" width="236" height="180" fill="#ffffff" stroke="#94a3b8" rx="6"/>
  <text x="36" y="282" font-size="11" font-weight="900" fill="#0f172a">Net Qty: 100 g / 3.5 oz</text>
  <text x="36" y="302" font-size="10" font-weight="bold" fill="#334155">Batch No.: KNP260401</text>
  <text x="36" y="320" font-size="10" fill="#334155">Date of Mfg: 03/07/2026</text>
  <text x="36" y="338" font-size="10" fill="#334155">Date of Expi: 02/04/2027</text>
  <text x="36" y="358" font-size="11" font-weight="900" fill="#0f172a">MRP: Rs. 189.00 (USP: ₹ 1.89/g)</text>
  <text x="36" y="374" font-size="8.5" fill="#64748b">(Inclusive of all taxes)</text>

  <!-- Green Veg Logo (Square with circle) -->
  <rect x="36" y="390" width="22" height="22" fill="#ffffff" stroke="#15803d" stroke-width="2" rx="3"/>
  <circle cx="47" cy="401" r="5.5" fill="#15803d"/>
  <text x="66" y="405" font-size="9.5" font-weight="bold" fill="#15803d">100% VEGETARIAN</text>

  <!-- Barcode -->
  <rect x="270" y="380" width="246" height="60" fill="#f8fafc" stroke="#cbd5e1" rx="4"/>
  <text x="393" y="416" font-size="12" font-family="monospace" fill="#0f172a" text-anchor="middle">|||| | ||||| |||| ||||| ||</text>
  <text x="393" y="432" font-size="9.5" font-family="monospace" fill="#475569" text-anchor="middle">8 908005 459132</text>

  <!-- Statutory & Licensing Bottom Section -->
  <rect x="24" y="452" width="492" height="200" fill="#f8fafc" stroke="#94a3b8" rx="6"/>
  
  <!-- Marketer & Packer Side-by-Side with Lic Numbers -->
  <text x="36" y="474" font-size="10" font-weight="bold" fill="#1e293b">Brand Owned &amp; Marketed by:</text>
  <text x="36" y="490" font-size="9" fill="#334155">Nutriative Foods Pvt. Ltd., Plot No. 1204, Road No. 60,</text>
  <text x="36" y="504" font-size="9" fill="#334155">Jubilee Hills, Hyderabad, Telangana - 500033</text>
  <rect x="36" y="512" width="220" height="22" fill="#dcfce7" stroke="#15803d" rx="4"/>
  <text x="44" y="527" font-size="10" font-weight="bold" fill="#14532d">fssai Lic No: 13615010000200</text>

  <text x="276" y="474" font-size="10" font-weight="bold" fill="#1e293b">Processed and Packed by:</text>
  <text x="276" y="490" font-size="9" fill="#334155">Kilaru Naturals Pvt Ltd., Sy. No. 273, Goundlapochampally,</text>
  <text x="276" y="504" font-size="9" fill="#334155">Medchal, Medchal-Malkajgiri, Telangana - 501401</text>
  <rect x="276" y="512" width="220" height="22" fill="#dcfce7" stroke="#15803d" rx="4"/>
  <text x="284" y="527" font-size="10" font-weight="bold" fill="#14532d">fssai Lic No: 13619034000112</text>

  <line x1="36" y1="548" x2="504" y2="548" stroke="#cbd5e1"/>

  <!-- Grievance & Customer Care -->
  <text x="36" y="568" font-size="9.5" font-weight="bold" fill="#0f172a">For Consumer Feedback / Complaints:</text>
  <text x="36" y="586" font-size="9" fill="#334155">Customer Care Executive: +91 97031 11089 | Email: support@nourishyou.in</text>
  <text x="36" y="602" font-size="9" fill="#334155">Registered Address: Same as Marketed By address above.</text>

  <!-- Verified Badge -->
  <rect x="36" y="618" width="468" height="24" fill="#f0fdf4" stroke="#86efac" rx="4"/>
  <text x="270" y="634" font-size="9.5" font-weight="bold" fill="#166534" text-anchor="middle">✓ FSSAI STATUTORY &amp; LMPC RULE 6 COMPLIANT — DUAL 14-DIGIT LICENSES VERIFIED</text>
</svg>
`)}`;

export const SAMPLE_INSPECTIONS: InspectionRecord[] = [
  {
    id: 'rec-pumpkin-seeds',
    scanId: 'LM-202609110901-PUMPKIN',
    timestamp: '2026-09-11 14:15:00 IST',
    productName: 'Raw Pumpkin Seeds',
    brand: 'Nourish You',
    mfgName: 'Nutriative Foods Pvt. Ltd. (Marketed By) | Kilaru Naturals Pvt Ltd. (Packed By)',
    mrp: 'Rs. 189.00',
    netQty: '100 g / 3.5 oz',
    imageSrc: PUMPKIN_SEEDS_LABEL_DATA_URI,
    complianceStatus: 'COMPLIANT',
    lmpcFailures: 0,
    fssaiFailures: 0,
    fontFailures: 0,
    scientificFailures: 0,
    totalFailures: 0,
    violations: [],
    entities: {
      manufacturer: 'Brand Owned & Marketed by: Nutriative Foods Pvt. Ltd., Jubilee Hills, Hyderabad - 500033 | Packed by: Kilaru Naturals Pvt Ltd., Medchal - 501401',
      commonName: 'Raw Pumpkin Seeds',
      netQuantity: '100 g / 3.5 oz',
      mfdDate: '03/07/2026',
      expiryDate: '02/04/2027',
      mrp: 'Rs. 189.00',
      unitSalePrice: '₹ 1.89/g',
      batchNo: 'KNP260401',
      consumerCare: '+91 97031 11089, support@nourishyou.in',
      countryOfOrigin: 'India (PRODUCT OF INDIA)',
      fssaiLicense: '13615010000200, 13619034000112',
      vegLogo: 'Present',
      energy: '481.29 kcal',
      protein: '33.78g',
      carbohydrates: '36.08g',
      totalSugar: '1.20g',
      addedSugar: '0.00g',
      dietaryFiber: '17.00g',
      totalFat: '18.65g',
      saturatedFat: '2.60g',
      transFat: '<0.1g',
      cholesterol: '0.00mg',
      sodium: '44.01mg',
      servingSize: '28g (Amount per 100g declared)',
      ingredients: 'Pumpkin Seeds (100%)'
    },
    lmpcReport: [
      { id: 'manufacturer', name: 'Name & Address of Manufacturer / Packer / Marketer', mandatory: true, status: 'pass', foundValue: 'Nutriative Foods Pvt. Ltd. (Marketer) & Kilaru Naturals (Packer)', lawRef: 'LMPC Rules 2011, Rule 6(1)(a)' },
      { id: 'common_name', name: 'Generic Commodity / Product Name', mandatory: true, status: 'pass', foundValue: 'Raw Pumpkin Seeds', lawRef: 'LMPC Rules 2011, Rule 6(1)(b)' },
      { id: 'net_quantity', name: 'Net Quantity Specification', mandatory: true, status: 'pass', foundValue: '100 g / 3.5 oz', lawRef: 'LMPC Rules 2011, Rule 6(1)(c)' },
      { id: 'mfd_date', name: 'Month & Year of Manufacture / Packing', mandatory: true, status: 'pass', foundValue: '03/07/2026 (Mfg Date declared)', lawRef: 'LMPC Rules 2011, Rule 6(1)(d)' },
      { id: 'mrp', name: 'Maximum Retail Price (incl. all taxes)', mandatory: true, status: 'pass', foundValue: 'Rs. 189.00', lawRef: 'LMPC Rules 2011, Rule 6(1)(e)' },
      { id: 'consumer_care', name: 'Consumer Care Contact (Phone/Email/Address)', mandatory: true, status: 'pass', foundValue: '+91 97031 11089 / support@nourishyou.in', lawRef: 'LMPC Rules 2011, Rule 6(1)(f)' },
      { id: 'country_of_origin', name: 'Country of Origin', mandatory: false, status: 'pass', foundValue: 'India (PRODUCT OF INDIA)', lawRef: 'LMPC Rules 2011, Rule 6(1)(g)' },
      { id: 'unit_sale_price', name: 'Unit Sale Price (USP per g/ml)', mandatory: false, status: 'pass', foundValue: '₹ 1.89/g', lawRef: 'LMPC Rules 2011, Rule 6(1)(h)' },
      { id: 'batch_no', name: 'Batch / Lot Identification Number', mandatory: true, status: 'pass', foundValue: 'KNP260401', lawRef: 'LMPC Rules 2011, Rule 6' }
    ],
    fssaiReport: [
      { id: 'fssai_license', name: '14-Digit FSSAI License Number', mandatory: true, status: 'pass', foundValue: '13615010000200, 13619034000112 (Marketer & Packer Declared)', lawRef: 'FSSAI Licensing Regulations 2011' },
      { id: 'veg_logo', name: 'Mandatory Veg Logo (Green Dot in Green Square)', mandatory: true, status: 'pass', foundValue: 'Present (Green Dot / 100% Plant Produce)', lawRef: 'FSSAI Labelling Regulations 2020, Reg 2.2(4)' },
      { id: 'energy', name: 'Energy (kcal/100g)', mandatory: true, status: 'pass', foundValue: '481.29 kcal', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'protein', name: 'Protein (g/100g)', mandatory: true, status: 'pass', foundValue: '33.78g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'carbohydrates', name: 'Carbohydrates (g/100g)', mandatory: true, status: 'pass', foundValue: '36.08g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'total_sugar', name: 'Total Sugars (g/100g)', mandatory: true, status: 'pass', foundValue: '1.20g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'added_sugar', name: 'Added Sugars (g/100g)', mandatory: true, status: 'pass', foundValue: '0.00g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'dietary_fiber', name: 'Dietary Fibre (g/100g)', mandatory: true, status: 'pass', foundValue: '17.00g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'total_fat', name: 'Total Fat (g/100g)', mandatory: true, status: 'pass', foundValue: '18.65g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'saturated_fat', name: 'Saturated Fat (g/100g)', mandatory: true, status: 'pass', foundValue: '2.60g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'trans_fat', name: 'Trans Fat (g/100g)', mandatory: true, status: 'pass', foundValue: '<0.1g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'cholesterol', name: 'Cholesterol (mg/100g)', mandatory: true, status: 'pass', foundValue: '0.00mg', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'sodium', name: 'Sodium (mg/100g)', mandatory: true, status: 'pass', foundValue: '44.01mg', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'ingredients', name: 'Ingredient Order & Additive Nomenclature', mandatory: true, status: 'pass', foundValue: 'Pumpkin Seeds (100% Single Ingredient)', lawRef: 'FSSAI Reg 2.2(1)' }
    ],
    fontAudit: {
      requiredFontHeightMm: 2.0,
      estimatedNetQtyFontMm: 2.2,
      readabilityScore: 96,
      fontIssues: [],
      isCompliant: true
    },
    scientificAudit: {
      isValid: true,
      declaredKcal: 481.29,
      calculatedKcal: 468.25,
      variancePct: 2.7,
      discrepancies: []
    },
    macroSplit: {
      proteinPct: 28.9,
      carbsPct: 30.8,
      fatPct: 40.3,
      totalKcal: 468.25
    },
    additives: [],
    aiInsights: 'COMPLIANT STATUTORY NOTICE: High-integrity packaging layout. Dual 14-digit FSSAI licenses (Marketer #13615010000200, Packer #13619034000112) verified. Macro split and caloric densities align with standard botanical Cucurbita pepo seed composition under FSSAI 2020 schedule.'
  },
  {
    id: 'rec-cake-slice',
    scanId: 'LM-202609110820-CAKE',
    timestamp: '2026-09-11 13:30:00 IST',
    productName: 'EGG LESS SLICE CAKE',
    brand: 'Egg Less Slice Cake',
    mfgName: 'Not detected (Missing complete physical manufacturer name, registered address & consumer grievance)',
    mrp: 'Rs 60.00',
    netQty: '170g +- 5%',
    imageSrc: EGGLESS_CAKE_LABEL_DATA_URI,
    complianceStatus: 'NON_COMPLIANT',
    lmpcFailures: 3,
    fssaiFailures: 2,
    fontFailures: 1,
    scientificFailures: 5,
    totalFailures: 11,
    violations: [
      'Critical Nutritional Error: Inverted Protein and Carbohydrates — The label claims 55g Protein and only 6g Carbohydrates per 100g. Standard flour-based sponge cake contains 50–60g carbohydrates and 4–7g protein. The manufacturer clearly swapped the values.',
      'Mathematically Impossible Sugar Value: Lists Sugar 25g, but Carbohydrate 6g. Sugar is a sub-constituent of total carbohydrates; carbohydrates must always be equal to or greater than sugar content (FSSAI Reg 2.4).',
      'Absurd & Toxic Sodium Level: Lists Sodium: 14g per 100g (~35g salt). Fourteen grams of sodium per 100g would be physiologically toxic, corrosive, and inedible. Sodium must be measured in milligrams (mg), not grams (g).',
      'Misleading Ingredient Order (FSSAI Reg 2.2(1)): By food regulations, ingredients must be listed in descending order by weight. Sugar is listed dead last, after vanilla powder and acidity regulators, despite comprising 25% of the product.',
      'Typos & Incomplete Additive Names: Additives are misspelled and truncated ("Stablizers" for Stabilizers, and "Dextrs" for Dextrose/Dextrin). FSSAI requires standardized class names and INS numbers.',
      'Missing Mandatory Statutory Marks: Missing mandatory Green Veg Logo (green dot inside green square under FSSAI 2020 Reg 2.2(4)), missing 14-digit FSSAI license number, and missing complete physical manufacturing address.',
      'Prohibited Net Quantity Tolerance Notation: Declared as "WT 170G +- 5%". Under LMPC Rules 2011 Rule 6(1)(c) and Rule 11, qualifying mandatory net quantity with ambiguous negative tolerance like "+- 5%" is strictly prohibited.',
      'Missing Unit Sale Price (USP): Rule 6(1)(h) mandates Unit Sale Price declaration (e.g., ₹0.35/g) on all pre-packaged commodities.'
    ],
    entities: {
      manufacturer: 'Not detected (Missing full name, factory address & registered office)',
      commonName: 'EGG LESS SLICE CAKE',
      netQuantity: '170g +- 5%',
      mfdDate: '11 APR 2026 (D.O.P)',
      expiryDate: '25 MAY 2026 (Best Before)',
      mrp: 'Rs 60.00',
      unitSalePrice: 'Not declared',
      batchNo: 'AB1/50',
      consumerCare: 'Not detected (Missing telephone, email & grievance address)',
      countryOfOrigin: 'India',
      fssaiLicense: 'Not detected (Missing 14-digit license)',
      energy: '420 kcal',
      protein: '55g',
      carbohydrates: '6g',
      totalSugar: '25g',
      addedSugar: 'Not declared',
      dietaryFiber: 'Not declared',
      totalFat: '21g',
      saturatedFat: '1g',
      transFat: 'Not declared',
      cholesterol: '11mg',
      sodium: '14g',
      servingSize: 'Per 100g (approx.)',
      ingredients: 'Refined Wheat Flour, Edible Refined Oil, Milk Solids, Starch, Emulsifiers, Baking Powder, Salt, Stablizers, Dextrs, Preservative E 200, Acidity regulators, Vanilla powder, Sugar.'
    },
    lmpcReport: [
      { id: 'manufacturer', name: 'Name & Address of Manufacturer / Packer', mandatory: true, status: 'fail', foundValue: 'Not detected (Missing complete address)', lawRef: 'LMPC Rules 2011, Rule 6(1)(a)' },
      { id: 'common_name', name: 'Generic Commodity / Product Name', mandatory: true, status: 'pass', foundValue: 'EGG LESS SLICE CAKE', lawRef: 'LMPC Rules 2011, Rule 6(1)(b)' },
      { id: 'net_quantity', name: 'Net Quantity Specification', mandatory: true, status: 'fail', foundValue: '170g +- 5% (Illegal tolerance)', lawRef: 'LMPC Rules 2011, Rule 6(1)(c) & Rule 11' },
      { id: 'mfd_date', name: 'Month & Year of Manufacture / Packing', mandatory: true, status: 'pass', foundValue: '11 APR 2026 (D.O.P)', lawRef: 'LMPC Rules 2011, Rule 6(1)(d)' },
      { id: 'mrp', name: 'Maximum Retail Price (incl. all taxes)', mandatory: true, status: 'pass', foundValue: 'Rs 60.00', lawRef: 'LMPC Rules 2011, Rule 6(1)(e)' },
      { id: 'consumer_care', name: 'Consumer Care Contact (Phone/Email/Address)', mandatory: true, status: 'fail', foundValue: 'Not detected', lawRef: 'LMPC Rules 2011, Rule 6(1)(f)' },
      { id: 'country_of_origin', name: 'Country of Origin', mandatory: false, status: 'pass', foundValue: 'India', lawRef: 'LMPC Rules 2011, Rule 6(1)(g)' },
      { id: 'unit_sale_price', name: 'Unit Sale Price (USP per g/ml)', mandatory: false, status: 'warning', foundValue: 'Not declared', lawRef: 'LMPC Rules 2011, Rule 6(1)(h)' },
      { id: 'batch_no', name: 'Batch / Lot Identification Number', mandatory: true, status: 'pass', foundValue: 'AB1/50', lawRef: 'LMPC Rules 2011, Rule 6' }
    ],
    fssaiReport: [
      { id: 'fssai_license', name: '14-Digit FSSAI License Number', mandatory: true, status: 'fail', foundValue: 'Not detected (Missing)', lawRef: 'FSSAI Licensing Regulations 2011' },
      { id: 'veg_logo', name: 'Mandatory Veg Logo (Green Dot in Green Square)', mandatory: true, status: 'fail', foundValue: 'Missing / Not Detected', lawRef: 'FSSAI Labelling Regulations 2020, Reg 2.2(4)' },
      { id: 'energy', name: 'Energy (kcal/100g)', mandatory: true, status: 'pass', foundValue: '420 kcal', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'protein', name: 'Protein (g/100g)', mandatory: true, status: 'fail', foundValue: '55g (Inverted Carbohydrates)', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'carbohydrates', name: 'Carbohydrates (g/100g)', mandatory: true, status: 'fail', foundValue: '6g (Inverted Protein)', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'total_sugar', name: 'Total Sugars (g/100g)', mandatory: true, status: 'fail', foundValue: '25g (Exceeds total carbs)', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'sodium', name: 'Sodium Declaration', mandatory: true, status: 'fail', foundValue: '14g (Toxic level, declared in grams)', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'ingredients', name: 'Ingredient Order & Additive Nomenclature', mandatory: true, status: 'fail', foundValue: 'Misleading order (Sugar last) & typos', lawRef: 'FSSAI Reg 2.2(1)' }
    ],
    fontAudit: {
      requiredFontHeightMm: 2.0,
      estimatedNetQtyFontMm: 1.8,
      readabilityScore: 68,
      fontIssues: [
        {
          field: 'Net Quantity Font Height',
          requiredMm: 2.0,
          estimatedMm: 1.8,
          status: 'fail',
          ruleRef: 'LMPC Rules 2011, Rule 9 Table 1',
          detail: 'Measured numeral height is 1.8mm for net quantity 170g; Rule 9 mandates minimum 2.0mm.'
        }
      ],
      isCompliant: false
    },
    scientificAudit: {
      isValid: false,
      declaredKcal: 420,
      calculatedKcal: 433,
      variancePct: 3.1,
      discrepancies: [
        {
          type: 'Inverted Protein and Carbohydrates',
          severity: 'CRITICAL',
          detail: 'The label claims 55g of Protein and only 6g of Carbohydrates per 100g. A standard flour-based sponge cake contains roughly 50–60g carbohydrates and 4–7g protein. The manufacturer clearly swapped the values for carbohydrates and protein.'
        },
        {
          type: 'Mathematically Impossible Sugar Value',
          severity: 'CRITICAL',
          detail: 'Total Sugars (25g) exceeds Total Carbohydrates (6g). Sugar is chemically a constituent of carbohydrates; total carbohydrates must always equal or exceed total sugars.'
        },
        {
          type: 'Absurd Sodium Level',
          severity: 'CRITICAL',
          detail: 'Sodium is declared as 14g per 100g. Fourteen grams of sodium (equivalent to ~35g table salt) is toxic and inedible. Sodium must be measured in milligrams (mg), not grams (g).'
        },
        {
          type: 'Misleading Ingredient Order',
          severity: 'CRITICAL',
          detail: 'By FSSAI 2020 Reg 2.2(1), ingredients must be listed in descending order of weight. Sugar is listed dead last, after vanilla powder and acidity regulators, despite comprising 25% of the product.'
        },
        {
          type: 'Typos and Incomplete Additive Names',
          severity: 'CRITICAL',
          detail: 'Ingredient list contains misspelled and truncated additive names ("Stablizers" for Stabilizers, and "Dextrs" for Dextrose/Dextrin).'
        },
        {
          type: 'Prohibited Net Quantity Tolerance (Rule 11)',
          severity: 'CRITICAL',
          detail: 'Net Quantity declared as "170g +- 5%". Under LMPC Rules 2011 Rule 6(1)(c) and Rule 11, qualifying mandatory net quantity with ambiguous negative tolerance like "+- 5%" is strictly prohibited.'
        }
      ]
    },
    macroSplit: {
      proteinPct: 50.8,
      carbsPct: 5.5,
      fatPct: 43.7,
      totalKcal: 433
    },
    additives: [
      { name: 'Preservative E 200', category: 'Preservative', risk: 'low', description: 'Sorbic acid preservative.' },
      { name: 'Stablizers [sic]', category: 'Texture', risk: 'moderate', description: 'Misspelled technological class name for food stabilizers.' },
      { name: 'Dextrs [sic]', category: 'Sweetener/Bulking', risk: 'moderate', description: 'Truncated chemical declaration (Dextrose or Dextrin).' }
    ],
    aiInsights: 'CRITICAL REGULATORY NOTICE: Severe multi-statutory violation detected on EGG LESS SLICE CAKE. Includes impossible nutritional fractions (Sugar 25g > Carbs 6g), inverted macronutrients (55g protein in a sponge cake), lethal sodium declaration (14g salt toxicity), deceptive ingredient sequence, missing Green Veg logo, missing 14-digit FSSAI license, and prohibited net weight tolerance (+- 5%). Subject to immediate compounding or prosecution under Section 36 of Legal Metrology Act, 2009 and Section 23 of FSSAI Act, 2006.'
  },
  {
    id: 'rec-1',
    scanId: 'LM-202609110415-P01',
    timestamp: '2026-09-11 10:45:12 IST',
    productName: 'Paneer Butter Masala Mix',
    brand: 'Pravin Masalewale',
    mfgName: 'PRAVIN MASALEWALE, Pune, MH - 411037',
    mrp: '₹50.00',
    netQty: '50g',
    complianceStatus: 'NON_COMPLIANT',
    lmpcFailures: 1,
    fssaiFailures: 1,
    fontFailures: 1,
    scientificFailures: 1,
    totalFailures: 4,
    violations: [
      'LMPC Violation: Unit Sale Price (USP) font contrast unreadable under Rule 9',
      'Rule 9 Violation: Net Quantity numeral height is 1.2mm (Statutory minimum 1.5mm for ≤50g)',
      'FSSAI Violation: Trans Fat declared as <0.001g without serving size reference per Reg 2.4.1',
      'Atwater Discrepancy: Declared Energy 350 kcal deviates 18.2% from calculated 414.2 kcal (exceeds 15% tolerance)'
    ],
    entities: {
      manufacturer: 'PRAVIN MASALEWALE, Hadapsar Industrial Estate, Pune 411037',
      commonName: 'Paneer Butter Masala Mix',
      netQuantity: '50g',
      mfdDate: '01/08/2026',
      expiryDate: '31/07/2027',
      mrp: '₹50.00',
      unitSalePrice: '₹1.00/g',
      batchNo: 'F01H1',
      consumerCare: 'Phone: 1800-233-0011, Email: care@suhana.com',
      countryOfOrigin: 'India',
      fssaiLicense: '10014022002634',
      energy: '350 kcal',
      protein: '13.6g',
      carbohydrates: '53.0g',
      totalSugar: '3.0g',
      addedSugar: '7.0g',
      dietaryFiber: '4.2g',
      totalFat: '12.5g',
      saturatedFat: '4.7g',
      transFat: '<0.001g',
      cholesterol: '<0.5mg',
      sodium: '2634mg',
      servingSize: '4 Servings per pack | 12.5g',
      ingredients: 'Onion, Cashew nut, Milk powder, Iodised salt, Coriander, Red chilli, Turmeric, Cumin, Refined cottonseed oil, Cardamom, Bay leaf, Nutmeg, Acidity regulator (INS 330).'
    },
    lmpcReport: [
      { id: 'manufacturer', name: 'Name & Address of Manufacturer', mandatory: true, status: 'pass', foundValue: 'PRAVIN MASALEWALE, Pune 411037', lawRef: 'LMPC Rules 2011, Rule 6(1)(a)' },
      { id: 'common_name', name: 'Generic Commodity Name', mandatory: true, status: 'pass', foundValue: 'Paneer Butter Masala Mix', lawRef: 'LMPC Rules 2011, Rule 6(1)(b)' },
      { id: 'net_quantity', name: 'Net Quantity Specification', mandatory: true, status: 'pass', foundValue: '50g', lawRef: 'LMPC Rules 2011, Rule 6(1)(c)' },
      { id: 'mfd_date', name: 'Month & Year of Manufacture', mandatory: true, status: 'pass', foundValue: '01/08/2026', lawRef: 'LMPC Rules 2011, Rule 6(1)(d)' },
      { id: 'mrp', name: 'Maximum Retail Price (MRP incl. taxes)', mandatory: true, status: 'pass', foundValue: '₹50.00', lawRef: 'LMPC Rules 2011, Rule 6(1)(e)' },
      { id: 'consumer_care', name: 'Consumer Grievance Contact', mandatory: true, status: 'pass', foundValue: '1800-233-0011 / care@suhana.com', lawRef: 'LMPC Rules 2011, Rule 6(1)(f)' },
      { id: 'country_of_origin', name: 'Country of Origin', mandatory: false, status: 'pass', foundValue: 'India', lawRef: 'LMPC Rules 2011, Rule 6(1)(g)' },
      { id: 'unit_sale_price', name: 'Unit Sale Price (USP)', mandatory: false, status: 'pass', foundValue: '₹1.00/g', lawRef: 'LMPC Rules 2011, Rule 6(1)(h)' },
      { id: 'batch_no', name: 'Batch / Lot Number', mandatory: true, status: 'pass', foundValue: 'F01H1', lawRef: 'LMPC Rules 2011, Rule 6' }
    ],
    fssaiReport: [
      { id: 'fssai_license', name: '14-Digit FSSAI License No.', mandatory: true, status: 'pass', foundValue: '10014022002634', lawRef: 'FSSAI Licensing Regulations' },
      { id: 'energy', name: 'Energy (kcal/100g)', mandatory: true, status: 'pass', foundValue: '350 kcal', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'protein', name: 'Protein (g/100g)', mandatory: true, status: 'pass', foundValue: '13.6g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'carbohydrates', name: 'Carbohydrates (g/100g)', mandatory: true, status: 'pass', foundValue: '53.0g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'total_sugar', name: 'Total Sugars (g/100g)', mandatory: true, status: 'pass', foundValue: '3.0g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'added_sugar', name: 'Added Sugars (g/100g)', mandatory: true, status: 'pass', foundValue: '7.0g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'total_fat', name: 'Total Fat (g/100g)', mandatory: true, status: 'pass', foundValue: '12.5g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'saturated_fat', name: 'Saturated Fat (g/100g)', mandatory: true, status: 'pass', foundValue: '4.7g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'trans_fat', name: 'Trans Fat (g/100g)', mandatory: true, status: 'pass', foundValue: '<0.001g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'sodium', name: 'Sodium (mg/100g)', mandatory: true, status: 'pass', foundValue: '2634mg', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'ingredients', name: 'Complete Ingredients Declaration', mandatory: true, status: 'pass', foundValue: 'Declared (12 items listed)', lawRef: 'FSSAI Reg 2.2' }
    ],
    fontAudit: {
      requiredFontHeightMm: 1.5,
      estimatedNetQtyFontMm: 1.2,
      readabilityScore: 84,
      fontIssues: [
        {
          field: 'Net Quantity Font Height',
          requiredMm: 1.5,
          estimatedMm: 1.2,
          status: 'fail',
          ruleRef: 'LMPC Rules 2011, Rule 9 Table 1',
          detail: 'Measured numeral height is 1.2mm, below the statutory minimum of 1.5mm for package sizes up to 50g.'
        }
      ],
      isCompliant: false
    },
    scientificAudit: {
      isValid: false,
      declaredKcal: 350,
      calculatedKcal: 414.2,
      variancePct: 18.3,
      discrepancies: [
        {
          type: 'Atwater Energy Discrepancy',
          severity: 'CRITICAL',
          detail: 'Declared Energy is 350 kcal, but calculated Atwater Energy from macros (4×13.6 + 4×53 + 9×12.5 + 2×4.2) is 414.2 kcal (18.3% variance). Exceeds FSSAI 15% tolerance.'
        },
        {
          type: 'Impossible Sugar Sub-fraction',
          severity: 'CRITICAL',
          detail: 'Added Sugars (7.0g) is declared higher than Total Sugars (3.0g). Under FSSAI display rules, Added Sugar is a strict subset of Total Sugar.'
        }
      ]
    },
    macroSplit: {
      proteinPct: 13.9,
      carbsPct: 54.5,
      fatPct: 31.6,
      totalKcal: 378.9
    },
    additives: [
      { name: 'INS 330', category: 'Acidity Regulator', risk: 'low', description: 'Citric Acid, safe food additive.' },
      { name: 'Refined Cottonseed Oil', category: 'Fats/Oils', risk: 'moderate', description: 'High Omega-6 fatty acid profile, saturated fat source.' },
      { name: 'Cashew Nut & Milk Powder', category: 'Allergens', risk: 'high', description: 'Contains common tree nut and dairy allergens requiring prominent bold declaration.' }
    ],
    aiInsights: 'CRITICAL AUDIT SUMMARY: While the package satisfies core identity declarations, it exhibits severe mathematical inconsistencies in both the nutritional table (Added Sugar > Total Sugar) and energy computation (18.3% discrepancy vs Atwater formula). Section 36 of Legal Metrology Act and Section 23 of FSSAI Act 2006 mandate inspection summon.'
  },
  {
    id: 'rec-2',
    scanId: 'LM-202609101820-B02',
    timestamp: '2026-09-10 16:20:00 IST',
    productName: 'Organic Roasted Almonds',
    brand: 'NutriPure Agro',
    mfgName: 'NutriPure Agro Foods Ltd, Bengaluru - 560068',
    mrp: '₹220.00',
    netQty: '200g',
    complianceStatus: 'COMPLIANT',
    lmpcFailures: 0,
    fssaiFailures: 0,
    fontFailures: 0,
    scientificFailures: 0,
    totalFailures: 0,
    violations: [],
    entities: {
      manufacturer: 'NutriPure Agro Foods Ltd, Electronic City, Bengaluru 560068',
      commonName: 'Roasted Almonds',
      netQuantity: '200g',
      mfdDate: '15/07/2026',
      expiryDate: '14/01/2027',
      mrp: '₹220.00',
      unitSalePrice: '₹1.10/g',
      batchNo: 'NPA-2026-08',
      consumerCare: 'Phone: 1800-425-9988, Email: support@nutripure.in',
      countryOfOrigin: 'India',
      fssaiLicense: '11221334000189',
      energy: '579 kcal',
      protein: '21.2g',
      carbohydrates: '21.6g',
      totalSugar: '4.4g',
      addedSugar: '0.0g',
      dietaryFiber: '12.5g',
      totalFat: '49.9g',
      saturatedFat: '3.8g',
      transFat: '0.0g',
      cholesterol: '0.0mg',
      sodium: '180mg',
      servingSize: 'Per 100g | Pack contains 2 servings',
      ingredients: 'California Almonds (98%), Himalayan Pink Salt (2%).'
    },
    lmpcReport: [
      { id: 'manufacturer', name: 'Name & Address of Manufacturer', mandatory: true, status: 'pass', foundValue: 'NutriPure Agro Ltd, Bengaluru', lawRef: 'LMPC Rules 2011, Rule 6(1)(a)' },
      { id: 'common_name', name: 'Generic Commodity Name', mandatory: true, status: 'pass', foundValue: 'Roasted Almonds', lawRef: 'LMPC Rules 2011, Rule 6(1)(b)' },
      { id: 'net_quantity', name: 'Net Quantity Specification', mandatory: true, status: 'pass', foundValue: '200g', lawRef: 'LMPC Rules 2011, Rule 6(1)(c)' },
      { id: 'mfd_date', name: 'Month & Year of Manufacture', mandatory: true, status: 'pass', foundValue: '15/07/2026', lawRef: 'LMPC Rules 2011, Rule 6(1)(d)' },
      { id: 'mrp', name: 'Maximum Retail Price (MRP incl. taxes)', mandatory: true, status: 'pass', foundValue: '₹220.00', lawRef: 'LMPC Rules 2011, Rule 6(1)(e)' },
      { id: 'consumer_care', name: 'Consumer Grievance Contact', mandatory: true, status: 'pass', foundValue: '1800-425-9988 / support@nutripure.in', lawRef: 'LMPC Rules 2011, Rule 6(1)(f)' },
      { id: 'country_of_origin', name: 'Country of Origin', mandatory: false, status: 'pass', foundValue: 'India', lawRef: 'LMPC Rules 2011, Rule 6(1)(g)' },
      { id: 'unit_sale_price', name: 'Unit Sale Price (USP)', mandatory: false, status: 'pass', foundValue: '₹1.10/g', lawRef: 'LMPC Rules 2011, Rule 6(1)(h)' },
      { id: 'batch_no', name: 'Batch / Lot Number', mandatory: true, status: 'pass', foundValue: 'NPA-2026-08', lawRef: 'LMPC Rules 2011, Rule 6' }
    ],
    fssaiReport: [
      { id: 'fssai_license', name: '14-Digit FSSAI License No.', mandatory: true, status: 'pass', foundValue: '11221334000189', lawRef: 'FSSAI Licensing Regulations' },
      { id: 'energy', name: 'Energy (kcal/100g)', mandatory: true, status: 'pass', foundValue: '579 kcal', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'protein', name: 'Protein (g/100g)', mandatory: true, status: 'pass', foundValue: '21.2g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'carbohydrates', name: 'Carbohydrates (g/100g)', mandatory: true, status: 'pass', foundValue: '21.6g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'total_sugar', name: 'Total Sugars (g/100g)', mandatory: true, status: 'pass', foundValue: '4.4g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'added_sugar', name: 'Added Sugars (g/100g)', mandatory: true, status: 'pass', foundValue: '0.0g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'total_fat', name: 'Total Fat (g/100g)', mandatory: true, status: 'pass', foundValue: '49.9g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'saturated_fat', name: 'Saturated Fat (g/100g)', mandatory: true, status: 'pass', foundValue: '3.8g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'trans_fat', name: 'Trans Fat (g/100g)', mandatory: true, status: 'pass', foundValue: '0.0g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'sodium', name: 'Sodium (mg/100g)', mandatory: true, status: 'pass', foundValue: '180mg', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'ingredients', name: 'Complete Ingredients Declaration', mandatory: true, status: 'pass', foundValue: 'Almonds, Himalayan Pink Salt', lawRef: 'FSSAI Reg 2.2' }
    ],
    fontAudit: {
      requiredFontHeightMm: 2.0,
      estimatedNetQtyFontMm: 2.4,
      readabilityScore: 96,
      fontIssues: [
        {
          field: 'Net Quantity Font Height',
          requiredMm: 2.0,
          estimatedMm: 2.4,
          status: 'pass',
          ruleRef: 'LMPC Rules 2011, Rule 9 Table 1',
          detail: 'Measured numeral height is 2.4mm, complying with the statutory 2.0mm requirement for 50g-200g packages.'
        }
      ],
      isCompliant: true
    },
    scientificAudit: {
      isValid: true,
      declaredKcal: 579,
      calculatedKcal: 545.3,
      variancePct: 5.8,
      discrepancies: []
    },
    macroSplit: {
      proteinPct: 15.6,
      carbsPct: 15.9,
      fatPct: 68.5,
      totalKcal: 520.3
    },
    additives: [
      { name: 'Himalayan Pink Salt', category: 'Seasoning', risk: 'low', description: 'Mineral-rich unrefined sodium chloride.' }
    ],
    aiInsights: 'COMPLIANCE CLEARANCE: Complete conformity with both Legal Metrology 2011 and FSSAI 2020 frameworks. Caloric calculation matches Atwater model within 5.8% variance (well within 15% tolerance). Rule 9 font height passed.'
  },
  {
    id: 'rec-3',
    scanId: 'LM-202609091210-C03',
    timestamp: '2026-09-09 11:30:45 IST',
    productName: 'Instant Oats Crunchy Cookies',
    brand: 'Golden Harvest Bakery',
    mfgName: 'Golden Harvest Foods Pvt Ltd, Ahmedabad, GJ',
    mrp: '₹75.00',
    netQty: '150g',
    complianceStatus: 'WARNING',
    lmpcFailures: 0,
    fssaiFailures: 1,
    fontFailures: 0,
    scientificFailures: 0,
    totalFailures: 1,
    violations: [
      'FSSAI Warning: High Saturated Fat and Sugar content without Front-of-Package Warning (FOPL recommendation under draft norms)'
    ],
    entities: {
      manufacturer: 'Golden Harvest Foods Pvt Ltd, GIDC Naroda, Ahmedabad 382330',
      commonName: 'Oatmeal & Choco Cookies',
      netQuantity: '150g',
      mfdDate: '20/08/2026',
      expiryDate: '19/02/2027',
      mrp: '₹75.00',
      unitSalePrice: '₹0.50/g',
      batchNo: 'GH-OCT-44',
      consumerCare: 'Phone: 079-22819000, Email: contact@goldenharvest.co.in',
      countryOfOrigin: 'India',
      fssaiLicense: '10719001000455',
      energy: '480 kcal',
      protein: '7.5g',
      carbohydrates: '65.0g',
      totalSugar: '28.0g',
      addedSugar: '26.0g',
      dietaryFiber: '5.2g',
      totalFat: '21.0g',
      saturatedFat: '11.5g',
      transFat: '<0.1g',
      cholesterol: '12mg',
      sodium: '340mg',
      servingSize: 'Per 100g',
      ingredients: 'Rolled Oats (32%), Refined Wheat Flour (Maida), Palm Oil, Sugar, Invert Sugar Syrup, Cocoa Solids, Raising Agents (INS 500ii, INS 503ii), Emulsifier (INS 322).'
    },
    lmpcReport: [
      { id: 'manufacturer', name: 'Name & Address of Manufacturer', mandatory: true, status: 'pass', foundValue: 'Golden Harvest Foods, Ahmedabad', lawRef: 'LMPC Rules 2011, Rule 6(1)(a)' },
      { id: 'common_name', name: 'Generic Commodity Name', mandatory: true, status: 'pass', foundValue: 'Oatmeal & Choco Cookies', lawRef: 'LMPC Rules 2011, Rule 6(1)(b)' },
      { id: 'net_quantity', name: 'Net Quantity Specification', mandatory: true, status: 'pass', foundValue: '150g', lawRef: 'LMPC Rules 2011, Rule 6(1)(c)' },
      { id: 'mfd_date', name: 'Month & Year of Manufacture', mandatory: true, status: 'pass', foundValue: '20/08/2026', lawRef: 'LMPC Rules 2011, Rule 6(1)(d)' },
      { id: 'mrp', name: 'Maximum Retail Price (MRP incl. taxes)', mandatory: true, status: 'pass', foundValue: '₹75.00', lawRef: 'LMPC Rules 2011, Rule 6(1)(e)' },
      { id: 'consumer_care', name: 'Consumer Grievance Contact', mandatory: true, status: 'pass', foundValue: '079-22819000 / contact@goldenharvest.co.in', lawRef: 'LMPC Rules 2011, Rule 6(1)(f)' },
      { id: 'country_of_origin', name: 'Country of Origin', mandatory: false, status: 'pass', foundValue: 'India', lawRef: 'LMPC Rules 2011, Rule 6(1)(g)' },
      { id: 'unit_sale_price', name: 'Unit Sale Price (USP)', mandatory: false, status: 'pass', foundValue: '₹0.50/g', lawRef: 'LMPC Rules 2011, Rule 6(1)(h)' },
      { id: 'batch_no', name: 'Batch / Lot Number', mandatory: true, status: 'pass', foundValue: 'GH-OCT-44', lawRef: 'LMPC Rules 2011, Rule 6' }
    ],
    fssaiReport: [
      { id: 'fssai_license', name: '14-Digit FSSAI License No.', mandatory: true, status: 'pass', foundValue: '10719001000455', lawRef: 'FSSAI Licensing Regulations' },
      { id: 'energy', name: 'Energy (kcal/100g)', mandatory: true, status: 'pass', foundValue: '480 kcal', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'protein', name: 'Protein (g/100g)', mandatory: true, status: 'pass', foundValue: '7.5g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'carbohydrates', name: 'Carbohydrates (g/100g)', mandatory: true, status: 'pass', foundValue: '65.0g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'total_sugar', name: 'Total Sugars (g/100g)', mandatory: true, status: 'pass', foundValue: '28.0g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'added_sugar', name: 'Added Sugars (g/100g)', mandatory: true, status: 'pass', foundValue: '26.0g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'total_fat', name: 'Total Fat (g/100g)', mandatory: true, status: 'pass', foundValue: '21.0g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'saturated_fat', name: 'Saturated Fat (g/100g)', mandatory: true, status: 'pass', foundValue: '11.5g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'trans_fat', name: 'Trans Fat (g/100g)', mandatory: true, status: 'pass', foundValue: '<0.1g', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'sodium', name: 'Sodium (mg/100g)', mandatory: true, status: 'pass', foundValue: '340mg', lawRef: 'FSSAI Reg 2.4.1' },
      { id: 'ingredients', name: 'Complete Ingredients Declaration', mandatory: true, status: 'pass', foundValue: 'Declared (8 ingredients)', lawRef: 'FSSAI Reg 2.2' }
    ],
    fontAudit: {
      requiredFontHeightMm: 2.0,
      estimatedNetQtyFontMm: 2.1,
      readabilityScore: 91,
      fontIssues: [
        {
          field: 'Net Quantity Font Height',
          requiredMm: 2.0,
          estimatedMm: 2.1,
          status: 'pass',
          ruleRef: 'LMPC Rules 2011, Rule 9 Table 1',
          detail: 'Measured numeral height is 2.1mm, satisfies the 2.0mm threshold.'
        }
      ],
      isCompliant: true
    },
    scientificAudit: {
      isValid: true,
      declaredKcal: 480,
      calculatedKcal: 489.4,
      variancePct: 1.9,
      discrepancies: []
    },
    macroSplit: {
      proteinPct: 6.3,
      carbsPct: 54.3,
      fatPct: 39.4,
      totalKcal: 479.0
    },
    additives: [
      { name: 'Palm Oil', category: 'Fats', risk: 'high', description: 'Primary source of high saturated fatty acids (11.5g/100g).' },
      { name: 'Refined Wheat Flour (Maida)', category: 'Carbohydrates', risk: 'moderate', description: 'Refined grain with low glycemic index score.' },
      { name: 'INS 500ii, 503ii', category: 'Raising Agents', risk: 'low', description: 'Sodium and ammonium bicarbonates.' }
    ],
    aiInsights: 'ADVISORY NOTICE: Product meets statutory mandatory declarations, but contains prominent high-fat and high-sugar markers (HFSS food product category). Recommend voluntary declaration on nutritional label.'
  }
];

export const INITIAL_ANALYTICS: import('../types').DashboardAnalytics = {
  totalScans: 48,
  compliantScans: 31,
  nonCompliantScans: 12,
  warningScans: 5,
  violationRate: 25.0,
  lmpcTotalFails: 14,
  fssaiTotalFails: 19,
  fontTotalFails: 11,
  scientificTotalFails: 8,
  topViolations: [
    { category: 'Rule 9 Font Height Sub-standard', count: 11 },
    { category: 'Atwater Energy Discrepancy (>15%)', count: 8 },
    { category: 'Missing Unit Sale Price (USP)', count: 7 },
    { category: 'Impossible Sugar Sub-fraction (Added > Total)', count: 6 },
    { category: 'Unverified 14-digit FSSAI Number', count: 5 }
  ],
  topViolatingManufacturers: [
    { name: 'Pravin Masalewale & Co.', violations: 4 },
    { name: 'Sunrise Food Processors', violations: 3 },
    { name: 'Apex Dairy & Confectionery', violations: 2 },
    { name: 'BakeWell FMCG Corp', violations: 2 },
    { name: 'QuickBite Spices', violations: 1 }
  ],
  macroDistributionAverage: {
    avgProteinPct: 16.4,
    avgCarbsPct: 53.2,
    avgFatPct: 30.4
  }
};
