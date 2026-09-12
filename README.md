# SIH26034 Enforcement Portal — Legal Metrology & FSSAI Compliance Engine

[![Status](https://img.shields.io/badge/Compliance-LMPC_2011_%26_FSSAI_2020-emerald)](https://consumeraffairs.nic.in)
[![Model](https://img.shields.io/badge/AI_Engine-Gemini_3.8_Flash-blue)](https://ai.google.dev)
[![Architecture](https://img.shields.io/badge/Full--Stack-Express_%2B_React_19_%2B_Vite-indigo)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-Proprietary_Government_Enforcement-slate)](https://consumeraffairs.nic.in)

A real-time, automated statutory compliance audit and label inspection portal built for enforcement officers under the **Ministry of Consumer Affairs, Food & Public Distribution (Government of India)** and the **Food Safety and Standards Authority of India (FSSAI)**.

This system digitizes and accelerates packaged commodity audits by ingesting packaging artwork, labels, or photographs, extracting all statutory declarations with multimodal AI, executing rigorous legal and biochemical rule checks, and generating tamper-evident, court-admissible PDF inspection certificates.

---

## 1. Problem Statement & Executive Overview

### The Challenge (SIH26034)
Under the **Legal Metrology (Packaged Commodities) Rules, 2011 (LMPC Rules)** and the **Food Safety and Standards (Labelling and Display) Regulations, 2020 (FSSAI Regulations)**, every pre-packaged commodity sold in India must display specific mandatory declarations, adhere to strict numeral font height thresholds, accurately represent nutritional facts, and avoid misleading claims.

Manual inspection by field officers is laborious, error-prone, and incapable of catching:
- **Atwater Energy Discrepancies**: Hidden caloric mismatch between declared energy and macronutrients.
- **Impossible Sugar Fractions**: Declaring added sugar higher than total carbohydrates or total sugars.
- **Font Height Non-Compliance**: Printing net quantity numerals below statutory minimum millimeter thresholds (Rule 9).
- **Prohibited Tolerance Clauses**: Printing deceptive declarations like `170g ± 5%`.
- **Licensing Flaws**: Missing or invalid 14-digit FSSAI numbers, missing packer/marketer cross-references, or omitted vegetarian emblems.

### The Solution
This enforcement portal provides a unified interface that:
1. **Scans & Extracts**: Uses Google Gemini 3.8 Flash vision to extract all 9 mandatory LMPC inscriptions, FSSAI numbers, and nutritional panels in seconds.
2. **Performs Algorithmic Audits**: Cross-references statutory requirements with deterministic rules (Rule 6, Rule 9 Table 1, FSSAI Reg 2.2 & 2.4).
3. **Verifies Biochemical Integrity**: Applies the Atwater energy equation (`4×P + 4×C + 9×F + 2×Fib`) to catch nutritional fraud with a 15% statutory tolerance window.
4. **Calculates Legal Compounding**: Automates penalty calculation under **Section 36 of the Legal Metrology Act, 2009** (₹25,000 for 1st offense, ₹50,000 for 2nd offense, up to ₹1,00,000 or imprisonment for subsequent offenses).
5. **Issues Official PDF Certificates**: Generates signed, formal inspection certificates with case reference numbers, evidence photos, violation checklists, and statutory citations.

---

## 2. Complete Technology Stack & Libraries Used

| Library / Dependency | Version | Primary Role & Architectural Purpose |
| :--- | :--- | :--- |
| **`@google/genai`** | `^2.4.0` | **Multimodal Vision & AI Extraction**: Official Google GenAI SDK. Powers server-side Gemini 3.8 Flash extraction to parse statutory declarations, nutritional tables, batch numbers, and manufacturer addresses from raw images. |
| **`express`** | `^4.21.2` | **Backend HTTP Server**: Serves API routes (`/api/analyze-label`, `/api/chat-nlp`, `/api/health`) and integrates Vite development middleware. |
| **`jspdf`** | `^4.2.1` | **Client-Side PDF Document Generation**: Compiles official, multi-page Ministry of Consumer Affairs inspection certificates with custom branding, tables, vector badges, and evidence photos without external server round-trips. |
| **`react` & `react-dom`** | `^19.0.1` | **User Interface Architecture**: React 19 provides concurrent rendering, state synchronization, and reactive component trees. |
| **`vite`** | `^6.2.3` | **Build System & Dev Server**: Fast ES module bundling, instant reload, and production static asset optimization. |
| **`recharts`** | `^3.10.1` | **Data Visualization**: Renders responsive SVG charts (macronutrient splits, compliance trends, manufacturer violation leaderboards) in the Analytics tab. |
| **`lucide-react`** | `^0.546.0` | **Vector Iconography**: Clean, consistent icons (Scales of Justice, ShieldAlert, CheckCircle, FileText, BarChart3, Bot). |
| **`motion`** | `^12.23.24` | **UI Animations**: Smooth transitions between scanner, NLP assistant, analytics, and repository views. |
| **`@tailwindcss/vite` & `tailwindcss`** | `^4.1.14` | **Styling Engine**: Tailwind CSS v4 powering the sleek, dark-mode command center palette (`#090d16` background). |
| **`tsx` & `esbuild`** | `^4.21.0` / `^0.25.0` | **TypeScript Runtime & Bundler**: `tsx` executes `server.ts` directly in development, while `esbuild` compiles it into a production-ready, self-contained `dist/server.cjs` bundle. |
| **`dotenv`** | `^17.2.3` | **Environment Configuration**: Safely manages `GEMINI_API_KEY` and runtime parameters. |

---

## 3. End-to-End Flow of Control: Image Upload to PDF Generation

The diagram and detailed steps below explain how a product packaging label moves through the system:

```
[User Uploads Label Image (JPG/PNG/WebP/SVG)]
                      │
                      ▼
[Phase 1: Client-Side Image Preprocessing (HTML5 Canvas)]
  - Max dimension clamped to 1600px, JPEG quality 0.88 (~250KB)
  - Data URL generated & uploadedFileName saved
                      │
                      ▼
[Phase 2: API Ingestion via POST /api/analyze-label]
  - Express server receives imageBase64, mimeType & productHint
                      │
                      ▼
[Phase 3: Multimodal Extraction via Gemini 3.8 Flash]
  - @google/genai SDK sends image part + statutory inspection prompt
  - Strict JSON schema extracted (LMPC declarations, FSSAI numbers, macros)
  - Resilient Fallback: If AI is throttled, heuristic regex parser activates
                      │
                      ▼
[Phase 4: Statutory & Scientific Compliance Engines]
  ├─ LMPC 2011 Rule 6: Checks all 9 mandatory declarations
  ├─ LMPC 2011 Rule 9: Calculates required numeral font height vs declared net qty
  ├─ FSSAI 2020 Rules: Validates 14-digit FSSAI licenses (Marketer & Packer) + Veg logo
  ├─ Atwater Engine: Computes 4-4-9 kcal, verifies 15% tolerance & sugar sub-fractions
  └─ Legal Compounding: Evaluates Section 36 penalties and builds violation list
                      │
                      ▼
[Phase 5: State Synchronization & UI Rendering]
  - Returns complete InspectionRecord with scanId, reports & metrics
  - React updates ScannerTab, stores record in Repository & refreshes Analytics
                      │
                      ▼
[Phase 6: Official PDF Report Generation (jsPDF)]
  - Offscreen canvas rasterizes evidence image to crisp PNG/JPEG
  - Generates Ministry of Consumer Affairs official document header
  - Stamps Case Reference, Scan ID, Verdict Badge (COMPLIANT / NON-COMPLIANT)
  - Draws evidence photo container & extracted statutory entities
  - Generates Part I (LMPC), Part II (FSSAI), Part III (Font), Part IV (Atwater) tables
  - Appends Section 36 Legal Compounding Notice & Inspector Sign-off block
  - Automatically downloads: LMPC_Inspection_Report_<scanId>.pdf
```

---

### Detailed Phase Breakdown

#### Phase 1: Client-Side Preprocessing (`ScannerTab.tsx`)
1. The user selects or drags and drops a packaging image (`File` object).
2. `optimizeImage()` reads the file into a `FileReader`.
3. An offscreen HTML5 `<canvas>` evaluates dimensions: if width or height exceeds 1600px, it proportionally downscales the image.
4. The canvas renders a solid white background and draws the image, exporting a clean `image/jpeg` at 0.88 quality.
5. This reduces massive 10MB phone camera uploads to ~250KB, ensuring sub-second network transfers while preserving crisp text readability for small statutory footers.

#### Phase 2: Transport to Backend (`server.ts`)
1. The client sends a `POST` request to `/api/analyze-label` with:
   - `imageBase64`: The optimized image data string.
   - `mimeType`: `image/jpeg`.
   - `productHint`: Cleaned filename (e.g., `"Raw Pumpkin Seeds"`) to assist prompt context.
   - `textInput`: Optional manual OCR or text override.

#### Phase 3: Gemini Multimodal Vision Extraction (`server.ts`)
1. The backend initializes `GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })`.
2. A structured prompt instructs the model as an Inspector for the Ministry of Consumer Affairs and FSSAI.
3. The prompt explicitly enforces extraction rules:
   - **Dual FSSAI Detection**: Scans for all 14-digit numbers (e.g. Marketer `13615010000200` and Packer `13619034000112`).
   - **Veg Logo**: Detects green dot inside green square, vegan emblems, or raw botanical produce declarations.
   - **Nutritional Panel**: Verbatim extraction of per-100g energy, protein, carbohydrates, total sugar, added sugar, dietary fibre, total fat, saturated fat, trans fat, and sodium.
   - **LMPC Declarations**: Manufacturer name, address, MRP, USP, batch number, dates, net quantity, and consumer grievance contacts.
4. The request runs through `generateGeminiWithFallback` targeting `gemini-3.8-flash` with a 10-second timeout.
5. If the AI model is temporarily unreachable or rate-limited, the system seamlessly engages `extractLabelHeuristics()`—a regex-based parser that guarantees the officer is never blocked during field inspections.

#### Phase 4: Deterministic Statutory Auditing
Once the data is extracted into `extractedData`, four deterministic verification engines run:

1. **LMPC 2011 Rule 6 Engine**:
   - Evaluates all 9 mandatory declarations: Manufacturer details, Generic Name, Net Quantity, Date of Manufacture/Packing, MRP, Consumer Care Contact, Country of Origin, Unit Sale Price (USP), and Batch Number.
   - **Undeclared Parameter Warning Logic**: Parameters that are omitted or marked as `"Not declared"` / `"Not detected"` are explicitly assigned an advisory `WARNING` status rather than automatically passing.
   - Flags prohibited ambiguous tolerances (e.g. `± 5%`) and defective addresses with hard `FAIL` non-compliance statuses.
   - Checks that consumer care provides at least one contact channel (phone, email, or physical address).

2. **Rule 9 Numeral Font Height Engine**:
   - Parses declared net quantity value (e.g., `100g`).
   - Maps net quantity to statutory minimum numeral heights from **Table 1 of Rule 9**:
     - $\le 50\text{ g/ml} \to 1.5\text{ mm}$
     - $50\text{ g/ml} - 200\text{ g/ml} \to 2.0\text{ mm}$
     - $200\text{ g/ml} - 1\text{ kg/l} \to 4.0\text{ mm}$
     - $> 1\text{ kg/l} \to 6.0\text{ mm}$
   - Flags non-compliance if estimated font size is below threshold.

3. **FSSAI 2020 Engine**:
   - Verifies 14-digit license number format (`/^\d{14}$/`). Supports dual marketer/packer registrations.
   - Validates mandatory vegetarian/non-vegetarian logo (or verifies 100% botanical plant produce exemption).
   - Checks ingredient list ordering (must be descending by weight).

4. **Biochemical & Scientific Integrity Engine (Atwater System)**:
   - Calculates theoretical energy:
     $$\text{Calculated kcal} = (4 \times \text{Protein}) + (4 \times \text{Carbohydrates}) + (9 \times \text{Total Fat}) + (2 \times \text{Dietary Fibre})$$
   - Computes variance against declared energy:
     $$\text{Variance \%} = \frac{|\text{Declared} - \text{Calculated}|}{\text{Declared}} \times 100$$
   - Flags critical violations if variance exceeds the **FSSAI 15% statutory tolerance**.
   - Validates that $\text{Added Sugars} \le \text{Total Sugars} \le \text{Total Carbohydrates}$.
   - Flags toxic sodium values (e.g. declaring `14g` instead of `14mg`—which would represent 35g of salt per 100g).

5. **Consolidation**:
   - If any failures exist $\to$ status is `NON_COMPLIANT` or `WARNING`.
   - If all tests pass $\to$ status is `COMPLIANT`.
   - Generates unique record ID (e.g., `rec-1789116940218`) and scan ID (`LM-1789116940218-P1J5`).

#### Phase 5: Client Synchronization (`App.tsx`)
1. The response JSON is received by `ScannerTab.tsx`.
2. The UI renders:
   - Top banner: Green **"ALL STATUTORY REQUIREMENTS SATISFIED"** or Red **"FLAGGED VIOLATIONS"**.
   - KPI metric cards: LMPC Failures, Rule 9 Font Height, Atwater Caloric Variance, FSSAI Status.
   - Detailed Part I (LMPC), Part II (FSSAI), and Biochemical audit tables.
   - Interactive macro split chart.
3. `handleSaveRecord` adds the inspection to the Repository and dynamically recalculates aggregated Analytics.

#### Phase 6: PDF Report Compilation (`src/utils/pdfExport.ts`)
When the officer clicks **"Download PDF Report"** or **"Download Official Compliance Certificate"**:

1. **Evidence Preparation**:
   - `prepareImageForPdf()` checks if the image is JPEG, PNG, or an SVG data URI.
   - If SVG, it rasterizes the vector graphic onto an offscreen canvas at $600 \times 600\text{px}$ to produce a high-resolution PNG data URL.
2. **Document Initialization**:
   - Instantiates `new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })`.
   - Sets standard margins ($14\text{mm}$) and computes printable page width ($182\text{mm}$).
3. **Statutory Header & Case Reference**:
   - Draws dark slate header bar (`#0F172A`) with amber branding: *"GOVERNMENT OF INDIA • MINISTRY OF CONSUMER AFFAIRS, FOOD & PUBLIC DISTRIBUTION"*.
   - Inscribes Case Reference, Scan ID, Officer ID (`INSP-DL-4082`), and Timestamp.
4. **Overall Status Badge**:
   - Renders a color-coded status box: Emerald (`COMPLIANT`), Rose (`NON-COMPLIANT`), or Amber (`WARNING`).
5. **Evidence Image & Entity Summary**:
   - Embeds the packaging photo using `doc.addImage(preparedImg.dataUrl, format, ...)`.
   - Draws an adjacent tabular breakdown: Declared MRP, USP, Net Quantity, Batch No., Mfg Date, Expiry Date, and FSSAI License Number(s).
6. **Statutory Audit Tables**:
   - Iterates through `lmpcReport` and `fssaiReport` items, rendering checkmarks (`PASS`) or warning flags (`FAIL`) alongside governing clauses (e.g., *Rule 6(1)(a)*, *FSSAI Reg 2.4.1*).
   - Includes Rule 9 Font Height numerical readings and Atwater variance percentages.
7. **Legal Notice & Compounding Clause**:
   - Inscribes statutory notice: *"This document constitutes an official inspection record under Section 15 of the Legal Metrology Act, 2009. Non-compliance is subject to compounding penalties under Section 36..."*
8. **Signature & Stamp Block**:
   - Renders authorized inspection officer signature and official stamp blocks.
9. **Instant Download**:
   - Triggers direct browser download: `doc.save('LMPC_Inspection_Report_<scanId>.pdf')`.
   - Operates 100% client-side with zero latency and zero server file accumulation.

---

## 4. Key Statutory & Regulatory Engines

### 1. Legal Metrology (Packaged Commodities) Rules, 2011
- **Rule 6(1)(a)**: Full name and physical address of the manufacturer, packer, or marketer.
- **Rule 6(1)(b)**: Generic or common name of the commodity contained in the package.
- **Rule 6(1)(c)**: Net quantity in standard units of weight, measure, or number (no unauthorized tolerances like `± 5%`).
- **Rule 6(1)(d)**: Month and year in which the commodity is manufactured, packed, or imported.
- **Rule 6(1)(e)**: Maximum Retail Price (MRP) inclusive of all taxes, with the rupee symbol (₹ or Rs.).
- **Rule 6(1)(f)**: Consumer grievance redressal details (name, address, telephone number, and email ID).
- **Rule 6(1)(g)**: Country of Origin for all manufactured or imported commodities.
- **Rule 6(1)(h)**: Unit Sale Price (USP) declared in ₹ per g/ml for commodities $<1\text{kg/l}$ or ₹ per kg/l for $\ge 1\text{kg/l}$.
- **Rule 6 & General**: Batch, lot, or code number for traceability.
- **Rule 9 (Table 1)**: Minimum height of numerals and letters for net quantity declarations based on packaging area/weight.

### 2. Food Safety and Standards (Labelling and Display) Regulations, 2020
- **Reg 2.2(1)**: Ingredient list in descending order of incoming weight or volume ($m/m$).
- **Reg 2.2(4)**: Mandatory Vegetarian emblem (green circle inside green square) or Non-Vegetarian emblem (brown triangle inside brown square).
- **Reg 2.4.1**: Mandatory nutritional facts per 100g or 100ml: Energy (kcal), Protein (g), Carbohydrates (g), Total Sugars (g), Added Sugars (g), Total Fat (g), Saturated Fat (g), Trans Fat (g), and Sodium (mg).
- **FSSAI Licensing Regulations 2011**: 14-digit FSSAI license number and FSSAI logo clearly displayed, including marketer and packer cross-references.

### 3. Legal Metrology Act, 2009 — Section 36 Compounding Penalties
- **First Offense**: Compounding fine of **₹25,000**.
- **Second Offense**: Compounding fine of **₹50,000**.
- **Subsequent / Repeat Offense**: Fine up to **₹1,00,000** or imprisonment up to **one year**, or both.

---

## 5. Directory Structure

```
├── server.ts                  # Express backend: API endpoints, Gemini vision prompt, regex fallback
├── src/
│   ├── main.tsx               # React application entry point
│   ├── App.tsx                # Master container: state orchestration, tabs, analytics recalculation
│   ├── index.css              # Global styling: Tailwind CSS v4 imports & fonts
│   ├── types.ts               # Complete TypeScript interfaces: InspectionRecord, Audits, Analytics
│   ├── components/
│   │   ├── Header.tsx         # Top navigation bar, Gemini health indicator, tab switcher
│   │   ├── ScannerTab.tsx     # Image upload, canvas optimizer, audit results display, verdict card
│   │   ├── NLPAssistantTab.tsx# Regulatory chatbot powered by Gemini for statutory legal Q&A
│   │   ├── AnalyticsTab.tsx   # Enforcement metrics: charts, macro splits, manufacturer rankings
│   │   ├── RepositoryTab.tsx  # Historical audit log repository with search, filter & export
│   │   └── InspectionReportModal.tsx # Full-screen interactive modal certificate preview
│   ├── utils/
│   │   └── pdfExport.ts       # jsPDF engine: canvas rasterizer, tables, vectors, stamp & download
│   └── data/
│       └── mockData.ts        # Pre-loaded statutory sample inspections & baseline analytics
├── metadata.json              # Applet metadata, capabilities & frame permissions
├── package.json               # Dependencies, scripts, and build pipeline definitions
├── vite.config.ts             # Vite configuration with React & Tailwind plugins
└── README.md                  # Comprehensive architectural & statutory documentation
```

---

## 6. Installation & Local Development

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v9.x` or higher
- **Google Gemini API Key**: Obtainable from [Google AI Studio](https://aistudio.google.com)

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone <repository-url>
cd sih26034-enforcement-portal

# Install all npm packages
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Google AI Studio Gemini API Key
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Server Port (defaults to 3000)
PORT=3000
```

### 3. Start Development Server
```bash
npm run dev
```
The server will start at `http://localhost:3000`. In development mode, `tsx server.ts` starts Express and attaches Vite middleware for fast client-side HMR.

### 4. Build for Production
```bash
npm run build
```
This executes:
1. `vite build` — Compiles the React client application into static assets in `dist/`.
2. `esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs` — Compiles the backend into a standalone, optimized CommonJS bundle.

### 5. Run in Production Mode
```bash
npm start
```
Starts `node dist/server.cjs` binding to `0.0.0.0:3000`.

---

## 7. API Reference

### `POST /api/analyze-label`
Analyzes a packaging label image or text context for statutory LMPC and FSSAI compliance.
- **Request Body**:
  ```json
  {
    "imageBase64": "data:image/jpeg;base64,...",
    "mimeType": "image/jpeg",
    "productHint": "Raw Pumpkin Seeds",
    "textInput": ""
  }
  ```
- **Response**: Returns a complete `InspectionRecord` object containing:
  - `complianceStatus`: `"COMPLIANT" | "NON_COMPLIANT" | "WARNING"`
  - `lmpcReport`: Array of 9 statutory Rule 6 evaluations
  - `fssaiReport`: Array of nutritional and licensing checks
  - `fontAudit`: Rule 9 font height estimation and required mm threshold
  - `scientificAudit`: Atwater caloric calculation, variance %, and discrepancy list
  - `violations`: Array of human-readable statutory violation statements

### `POST /api/chat-nlp`
Conversational legal assistant grounded in LMPC 2011 and FSSAI 2020 regulatory gazettes.
- **Request Body**:
  ```json
  {
    "message": "What is the penalty for missing Unit Sale Price under Section 36?",
    "currentRecord": { ... }
  }
  ```
- **Response**:
  ```json
  {
    "reply": "Under Section 36 of the Legal Metrology Act, 2009, selling or distributing pre-packaged commodities without mandatory declarations (such as Unit Sale Price under Rule 6(1)(h)) is punishable with a fine of up to ₹25,000 for the first offense..."
  }
  ```

### `GET /api/health`
Checks server status and Gemini API connectivity.
- **Response**:
  ```json
  {
    "status": "ok",
    "geminiConfigured": true,
    "model": "gemini-3.8-flash",
    "timestamp": "2026-09-11T09:00:00.000Z"
  }
  ```

---

## 8. Authors & Statutory Disclaimer

Developed for the **Ministry of Consumer Affairs, Food & Public Distribution** and **FSSAI** enforcement authorities.

> **Statutory Disclaimer**: *This portal assists statutory enforcement officers in preliminary screening and statutory compounding calculations. Formal seizure, notice issuance, and prosecution under Section 15 & Section 36 of the Legal Metrology Act, 2009, or Section 50-65 of the Food Safety and Standards Act, 2006, must be executed by authorized gazetted inspectors.*
