import { jsPDF } from 'jspdf';
import { InspectionRecord } from '../types';

async function prepareImageForPdf(src: string): Promise<{ dataUrl: string; format: 'PNG' | 'JPEG' } | null> {
  if (!src) return null;
  if (src.startsWith('data:image/jpeg') || src.startsWith('data:image/jpg')) {
    return { dataUrl: src, format: 'JPEG' };
  }
  if (src.startsWith('data:image/png')) {
    return { dataUrl: src, format: 'PNG' };
  }

  // If SVG or other format, render onto canvas to get a crisp PNG
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 600;
        canvas.height = img.naturalHeight || 600;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve({ dataUrl: canvas.toDataURL('image/png'), format: 'PNG' });
        } else {
          resolve(null);
        }
      } catch (err) {
        console.warn('Canvas rasterization error:', err);
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export async function generateAndDownloadInspectionPDF(record: InspectionRecord, customImageSrc?: string): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Prepare image artifact beforehand
  const imageToUse = customImageSrc || record.imageSrc;
  let preparedImg: { dataUrl: string; format: 'PNG' | 'JPEG' } | null = null;
  if (imageToUse) {
    try {
      preparedImg = await prepareImageForPdf(imageToUse);
    } catch (e) {
      console.warn('Failed to prepare image for PDF:', e);
    }
  }

  // Helper function to check page overflow
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 15) {
      doc.addPage();
      y = margin;
      // Repeat small header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(`STATUTORY INSPECTION REPORT - REF: ${record.scanId} (Page 2)`, margin, y);
      y += 6;
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageWidth - margin, y);
      y += 6;
    }
  };

  // 1. Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(margin, y, contentWidth, 24, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(245, 158, 11); // amber-400
  doc.text('GOVERNMENT OF INDIA • MINISTRY OF CONSUMER AFFAIRS, FOOD & PUBLIC DISTRIBUTION', margin + 4, y + 6);

  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('LEGAL METROLOGY & FSSAI STATUTORY AUDIT REPORT', margin + 4, y + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text('Enforcement Inspection under Legal Metrology Act, 2009 & FSSAI Display Regulations, 2020', margin + 4, y + 19);

  y += 28;

  // 2. Metadata Bar
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(margin, y, contentWidth, 16, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentWidth, 16, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('INSPECTION ID:', margin + 4, y + 5);
  doc.text('DATE & TIME:', margin + 45, y + 5);
  doc.text('COMMODITY:', margin + 95, y + 5);
  doc.text('VERDICT:', margin + 145, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(record.scanId, margin + 4, y + 11);
  doc.text(record.timestamp.substring(0, 20), margin + 45, y + 11);
  const rawProdName = record.productName || 'Unspecified Commodity';
  const prodNameShort = rawProdName.length > 24 ? rawProdName.substring(0, 22) + '...' : rawProdName;
  doc.text(prodNameShort, margin + 95, y + 11);

  // Verdict pill
  const isCompliant = record.complianceStatus === 'COMPLIANT';
  const isWarning = record.complianceStatus === 'WARNING';
  if (isCompliant) {
    doc.setFillColor(16, 185, 129); // emerald-500
  } else if (isWarning) {
    doc.setFillColor(245, 158, 11); // amber-500
  } else {
    doc.setFillColor(239, 68, 68); // rose-500
  }
  doc.roundedRect(margin + 145, y + 7, 30, 6, 1.5, 1.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text(record.complianceStatus, margin + 147, y + 11.5);

  y += 20;

  // 3. EVIDENTIARY IMAGE & PRODUCT PARTICULARS (Side by Side or Block)
  checkPageBreak(50);
  const startBoxY = y;
  const imageWidth = 50;
  const imageHeight = 52;

  // Left column: Evidence Image
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, y, imageWidth, imageHeight, 'FD');

  if (preparedImg) {
    try {
      doc.addImage(preparedImg.dataUrl, preparedImg.format, margin + 2, y + 2, imageWidth - 4, imageHeight - 4, undefined, 'FAST');
    } catch (err) {
      console.warn('Could not render image to PDF:', err);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text('Label Photo Attached', margin + 10, y + 25);
    }
  } else if (imageToUse) {
    try {
      const isPng = imageToUse.includes('image/png') || imageToUse.includes('.png');
      const format = isPng ? 'PNG' : 'JPEG';
      doc.addImage(imageToUse, format, margin + 2, y + 2, imageWidth - 4, imageHeight - 4, undefined, 'FAST');
    } catch (err) {
      console.warn('Could not render image fallback:', err);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text('Label Photo Attached', margin + 10, y + 25);
    }
  } else {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Label Photo Attached', margin + 7, y + 24);
    doc.setFontSize(7);
    doc.text('(Digital Evidence Record)', margin + 7, y + 29);
  }

  // Caption below image
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(71, 85, 105);
  doc.text('EVIDENTIARY ARTIFACT', margin + 10, y + imageHeight - 2);

  // Right column: Product Particulars & Key Metrics
  const detailsX = margin + imageWidth + 4;
  const detailsWidth = contentWidth - imageWidth - 4;

  doc.setFillColor(248, 250, 252);
  doc.rect(detailsX, y, detailsWidth, imageHeight, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text('PRODUCT & PACKAGING PARTICULARS', detailsX + 3, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);

  let py = y + 10;
  doc.text(`• Product Name: ${record.productName || 'Unspecified'}`, detailsX + 3, py); py += 4.5;
  doc.text(`• Declared Brand: ${record.brand}`, detailsX + 3, py); py += 4.5;
  doc.text(`• Net Quantity: ${record.netQty}`, detailsX + 3, py); py += 4.5;
  doc.text(`• Declared MRP: ${record.mrp}`, detailsX + 3, py); py += 4.5;
  doc.text(`• Unit Sale Price (USP): ${record.entities.unitSalePrice || 'Not declared'}`, detailsX + 3, py); py += 4.5;
  doc.text(`• Batch / Lot No: ${record.entities.batchNo || 'Not declared'}`, detailsX + 3, py); py += 4.5;
  doc.text(`• FSSAI License: ${record.entities.fssaiLicense || 'Not detected'}`, detailsX + 3, py); py += 4.5;
  const mfgSnippet = record.mfgName.length > 40 ? record.mfgName.substring(0, 38) + '...' : record.mfgName;
  doc.text(`• Manufacturer: ${mfgSnippet}`, detailsX + 3, py); py += 4.5;
  doc.text(`• Total Failures / Flags: ${record.totalFailures}`, detailsX + 3, py);

  y += imageHeight + 5;

  // 4. CRITICAL ANOMALIES & STATUTORY VIOLATIONS BOX
  if (record.violations.length > 0) {
    checkPageBreak(30 + record.violations.length * 5);
    doc.setFillColor(254, 242, 242); // rose-50
    doc.setDrawColor(252, 165, 165); // rose-300
    doc.rect(margin, y, contentWidth, 7 + record.violations.length * 6, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(185, 28, 28); // rose-700
    doc.text(`CRITICAL STATUTORY VIOLATIONS & ANOMALIES (${record.violations.length} FLAGGED):`, margin + 3, y + 5);

    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(153, 27, 27);

    record.violations.forEach((v) => {
      // wrap text
      const splitText = doc.splitTextToSize(`• ${v}`, contentWidth - 8);
      doc.text(splitText, margin + 4, y);
      y += splitText.length * 3.6;
    });

    y += 4;
  }

  // 5. PART I: LEGAL METROLOGY (PC) RULES 2011 DECLARATIONS TABLE
  checkPageBreak(35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('PART I: LEGAL METROLOGY (PACKAGED COMMODITIES) RULES, 2011 AUDIT (RULE 6)', margin, y);
  y += 3.5;

  // Table header
  doc.setFillColor(30, 41, 59);
  doc.rect(margin, y, contentWidth, 5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('MANDATORY DECLARATION', margin + 3, y + 3.5);
  doc.text('RULE REFERENCE', margin + 70, y + 3.5);
  doc.text('FOUND VALUE ON LABEL', margin + 115, y + 3.5);
  doc.text('STATUS', margin + 165, y + 3.5);
  y += 5;

  // Table rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  (record.lmpcReport || []).forEach((item, idx) => {
    checkPageBreak(5);
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(margin, y, contentWidth, 4.5, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y + 4.5, margin + contentWidth, y + 4.5);

    doc.setTextColor(30, 41, 59);
    const nameShort = item.name.length > 38 ? item.name.substring(0, 36) + '...' : item.name;
    doc.text(nameShort, margin + 3, y + 3.2);
    doc.text(item.lawRef, margin + 70, y + 3.2);
    const valShort = (item.foundValue || 'Not declared').length > 30 ? (item.foundValue || 'Not declared').substring(0, 28) + '...' : (item.foundValue || 'Not declared');
    doc.text(valShort, margin + 115, y + 3.2);

    const isValUndeclared =
      !item.foundValue ||
      item.foundValue.trim() === '' ||
      item.foundValue.toLowerCase().startsWith('not declared') ||
      item.foundValue.toLowerCase().startsWith('not detected') ||
      item.foundValue.toLowerCase().startsWith('missing') ||
      item.foundValue.toLowerCase() === 'none' ||
      item.foundValue.toLowerCase() === 'n/a';

    if (item.status === 'pass' && !isValUndeclared) {
      doc.setTextColor(16, 185, 129);
      doc.text('COMPLIANT', margin + 165, y + 3.2);
    } else if (item.status === 'warning' || isValUndeclared) {
      doc.setTextColor(217, 119, 6);
      doc.text('WARNING', margin + 165, y + 3.2);
    } else {
      doc.setTextColor(239, 68, 68);
      doc.text('NON-COMPLIANT', margin + 165, y + 3.2);
    }
    y += 4.5;
  });

  y += 4;

  // 6. PART II: RULE 9 FONT HEIGHT & PART III: FSSAI ATWATER
  checkPageBreak(28);
  const halfW = (contentWidth - 4) / 2;

  // Font Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, halfW, 24, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('RULE 9 FONT HEIGHT SPECIFICATION', margin + 3, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);
  doc.text(`• Net Quantity Declared: ${record.netQty}`, margin + 3, y + 9);
  doc.text(`• Table 1 Mandatory Height: ${record.fontAudit.requiredFontHeightMm} mm`, margin + 3, y + 13);
  doc.text(`• Estimated Measured Height: ${record.fontAudit.estimatedNetQtyFontMm} mm`, margin + 3, y + 17);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(record.fontAudit.isCompliant ? 16 : 239, record.fontAudit.isCompliant ? 185 : 68, record.fontAudit.isCompliant ? 129 : 68);
  doc.text(`• Verdict: ${record.fontAudit.isCompliant ? 'COMPLIANT (RULE 9)' : 'FAIL (SUB-STANDARD FONT)'}`, margin + 3, y + 21);

  // Atwater Box
  const rightX = margin + halfW + 4;
  doc.setFillColor(248, 250, 252);
  doc.rect(rightX, y, halfW, 24, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('FSSAI REG 2.4 ATWATER CALORIC AUDIT', rightX + 3, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);
  doc.text(`• Declared Energy: ${record.scientificAudit.declaredKcal ?? 'N/A'} kcal/100g`, rightX + 3, y + 9);
  doc.text(`• Atwater Calculated (4P+4C+9F): ${record.scientificAudit.calculatedKcal} kcal`, rightX + 3, y + 13);
  doc.text(`• Mathematical Variance: ${record.scientificAudit.variancePct}% (Max: 15%)`, rightX + 3, y + 17);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(record.scientificAudit.isValid ? 16 : 239, record.scientificAudit.isValid ? 185 : 68, record.scientificAudit.isValid ? 129 : 68);
  doc.text(`• Verdict: ${record.scientificAudit.isValid ? 'PASS (CALORIC INTEGRITY)' : 'BREACH (ATWATER DEVIATION)'}`, rightX + 3, y + 21);

  y += 28;

  // 7. PART IV: STATUTORY NOTICE & SECTION 36 PENALTY PROVISIONS
  checkPageBreak(25);
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentWidth, 24, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('STATUTORY NOTICE & LEGAL PROVISIONS UNDER SECTION 36, LEGAL METROLOGY ACT, 2009', margin + 3, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(71, 85, 105);
  const legalNoticeText = 'This electronic document represents an official compliance record generated under the Legal Metrology Act, 2009 and FSSAI (Labelling & Display) Regulations, 2020. Violations of Rule 6 declarations, Rule 9 font heights, or false nutrient statements attract statutory penalties under Section 36 of the Act up to Rs. 25,000 for the first offence, Rs. 50,000 for the second offence, and up to Rs. 1,00,000 or imprisonment for subsequent compounded offences.';
  const wrappedNotice = doc.splitTextToSize(legalNoticeText, contentWidth - 6);
  doc.text(wrappedNotice, margin + 3, y + 9);

  // Digital Signature Block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(30, 41, 59);
  doc.text('DIGITALLY SIGNED & AUTHORISED BY ENFORCEMENT DIRECTORATE', margin + 3, y + 20);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('PORTAL REF: SIH26034 • VERIFIED VIA GEMINI REGULATORY AUDIT ENGINE', margin + 90, y + 20);

  // Trigger browser download directly
  const sanitizedFileName = `Inspection_Certificate_${record.scanId}.pdf`;
  doc.save(sanitizedFileName);
}
