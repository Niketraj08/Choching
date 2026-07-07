import { jsPDF } from "jspdf";
import { StudyMaterial, Note } from "../types";

interface PDFSection {
  heading: string;
  items: string[];
}

interface PDFContent {
  title: string;
  type: string;
  subject: string;
  className: string;
  sections: PDFSection[];
}

const notesMockContent: Record<string, PDFContent> = {
  n1: {
    title: "Electrostatics: Detailed Formulas and Concepts",
    type: "Premium Lecture Notes",
    subject: "Physics",
    className: "Class 12 Science",
    sections: [
      {
        heading: "1. Electric Charge and Coulomb's Law",
        items: [
          "• Quantization of Charge: Q = ±ne, where e = 1.6 x 10^-19 C and n is an integer.",
          "• Coulomb's Law: F = (1 / 4πε₀) * (q₁q₂ / r²). In vacuum, 1/4πε₀ ≈ 9 x 10^9 N m²/C².",
          "• Principle of Superposition: The total force on any charge due to a number of other charges is the vector sum of all forces on that charge."
        ]
      },
      {
        heading: "2. Electric Field & Electric Dipole",
        items: [
          "• Electric Field Intensity: E = F / q₀. For a point charge: E = (1 / 4πε₀) * (q / r²).",
          "• Electric Dipole Moment: p = q * 2a (directed from negative to positive charge).",
          "• Axial Electric Field of Dipole: E_axial = (1 / 4πε₀) * (2p / r³), for r >> a.",
          "• Equatorial Electric Field of Dipole: E_equatorial = (1 / 4πε₀) * (p / r³), for r >> a."
        ]
      },
      {
        heading: "3. Gauss's Theorem and Applications",
        items: [
          "• Electric Flux: Φ = ∫ E · dA = Q_enclosed / ε₀.",
          "• E due to infinitely long straight wire: E = λ / 2π_ε₀_r (where λ is linear charge density).",
          "• E due to thin infinite plane sheet: E = σ / 2ε₀ (where σ is surface charge density)."
        ]
      }
    ]
  },
  n2: {
    title: "Chemical Kinetics & Reaction Mechanisms",
    type: "Premium Lecture Notes",
    subject: "Chemistry",
    className: "Class 12 Science",
    sections: [
      {
        heading: "1. Rate of Reaction and Rate Law",
        items: [
          "• Average Rate vs. Instantaneous Rate: dx/dt.",
          "• Rate Law Expression: Rate = k [A]^x [B]^y, where x and y are determined experimentally.",
          "• Order of Reaction: Sum of powers of concentrations (x + y). Can be zero, fractional, or integer.",
          "• Molecularity: Number of reacting species taking part in an elementary chemical step."
        ]
      },
      {
        heading: "2. Integrated Rate Equations",
        items: [
          "• Zero-Order Reaction: [A]_t = -kt + [A]₀. Half-life t_1/2 = [A]₀ / 2k.",
          "• First-Order Reaction: k = (2.303 / t) * log([A]₀ / [A]_t). Half-life t_1/2 = 0.693 / k."
        ]
      },
      {
        heading: "3. Arrhenius Equation & Activation Energy",
        items: [
          "• Temperature Dependence: k = A * e^(-Ea / RT), where Ea is activation energy and A is frequency factor.",
          "• Logarithmic Form: log(k₂ / k₁) = (Ea / 2.303R) * [ (T₂ - T₁) / (T₁T₂) ]."
        ]
      }
    ]
  },
  n3: {
    title: "Linear Equations in Two Variables: Solved Proofs",
    type: "Premium Lecture Notes",
    subject: "Mathematics",
    className: "Class 10",
    sections: [
      {
        heading: "1. Algebraic General Form",
        items: [
          "• Pair of Linear Equations: a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0.",
          "• Graphical Representation: Two straight lines in a 2D coordinate system."
        ]
      },
      {
        heading: "2. Core Algebraic Methods",
        items: [
          "• Substitution Method: Express one variable in terms of the other and substitute in second equation.",
          "• Elimination Method: Multiply coefficients to eliminate one variable by adding/subtracting equations.",
          "• Cross-Multiplication: Solves for x and y using determinants ratios."
        ]
      },
      {
        heading: "3. Conditions for Consistency",
        items: [
          "• Unique Solution (Intersecting Lines): a₁/a₂ ≠ b₁/b₂.",
          "• Infinitely Many Solutions (Coincident Lines): a₁/a₂ = b₁/b₂ = c₁/c₂.",
          "• No Solution (Parallel Lines): a₁/a₂ = b₁/b₂ ≠ c₁/c₂."
        ]
      }
    ]
  },
  n4: {
    title: "Financial Statements of a Joint Stock Company",
    type: "Premium Lecture Notes",
    subject: "Accountancy",
    className: "Class 12 Commerce",
    sections: [
      {
        heading: "1. Introduction to Schedule III Part I",
        items: [
          "• Under the Companies Act 2013, financial statements must be prepared in the prescribed format.",
          "• Vertical Presentation: Assets and Liabilities are presented vertically rather than horizontal columns."
        ]
      },
      {
        heading: "2. Key Components of Balance Sheet",
        items: [
          "• Equity & Liabilities: Shareholders' Funds, Non-Current Liabilities, Current Liabilities.",
          "• Assets: Non-Current Assets (Property, Plant, Equipment), Current Assets (Inventories, Cash)."
        ]
      },
      {
        heading: "3. Disclosure of Share Capital",
        items: [
          "• Authorized Capital: The maximum capital a company can raise.",
          "• Issued & Subscribed Capital: Part of authorized capital offered to and subscribed by public.",
          "• Paid-up Capital: Actual money received against subscribed shares."
        ]
      }
    ]
  },
  n5: {
    title: "National Income & Related Aggregates",
    type: "Premium Lecture Notes",
    subject: "Economics",
    className: "Class 12 Commerce",
    sections: [
      {
        heading: "1. Circular Flow of Income",
        items: [
          "• Real Flow: Flow of factor services from households to firms and goods/services from firms to households.",
          "• Money Flow: Flow of factor payments from firms to households and consumption expenditure from households to firms."
        ]
      },
      {
        heading: "2. Basic Aggregate Conversions",
        items: [
          "• Gross to Net: Net = Gross - Depreciation.",
          "• National to Domestic: National = Domestic + NFIA (Net Factor Income from Abroad).",
          "• Market Price to Factor Cost: Factor Cost = Market Price - Net Indirect Taxes (NIT)."
        ]
      },
      {
        heading: "3. Methods of Calculating National Income",
        items: [
          "• Value-Added Method: GDP_mp = Value of Output - Intermediate Consumption.",
          "• Income Method: NDP_fc = Compensation of Employees + Operating Surplus + Mixed Income.",
          "• Expenditure Method: GDP_mp = Private consumption + Govt consumption + Investment + Net Exports."
        ]
      }
    ]
  },
  n6: {
    title: "Cell Division & Genetics Foundations",
    type: "Premium Lecture Notes",
    subject: "Biology",
    className: "Class 11 Science",
    sections: [
      {
        heading: "1. The Cell Cycle and Mitosis",
        items: [
          "• Interphase: G1 phase (cell growth), S phase (DNA replication), G2 phase (prep for division).",
          "• Mitosis Phases: Prophase, Metaphase, Anaphase, Telophase.",
          "• Metaphase: Chromosomes align along the equatorial metaphase plate; spindle fibers attach to kinetochores."
        ]
      },
      {
        heading: "2. Meiosis and Crossing Over",
        items: [
          "• Meiosis I: Reductional division. Prophase I contains Leptotene, Zygotene, Pachytene, Diplotene, Diakinesis.",
          "• Crossing Over: Occurs in the Pachytene phase, facilitating genetic recombination and evolutionary diversity."
        ]
      },
      {
        heading: "3. Principles of Inheritance",
        items: [
          "• Mendel's Laws: Law of Dominance, Law of Segregation, Law of Independent Assortment.",
          "• Phenotypic Ratios: Monohybrid F2 ratio is 3:1; Dihybrid F2 ratio is 9:3:3:1."
        ]
      }
    ]
  }
};

const materialsMockContent: Record<string, PDFContent> = {
  sm1: {
    title: "Integration Micro-Topics Exercise",
    type: "Assignment",
    subject: "Mathematics",
    className: "Class 12 Science",
    sections: [
      {
        heading: "Section A: Core Calculus Concept & Formulas",
        items: [
          "• Integration by Parts: Rule of ∫ u dv = u * v - ∫ v du (Choose functions using ILATE rule).",
          "• Substitution Method: Identify a part of the integrand as g(x) such that its derivative g'(x) is also present.",
          "• Fundamental Theorem of Calculus: ∫[a to b] f(x) dx = F(b) - F(a), where F'(x) = f(x)."
        ]
      },
      {
        heading: "Section B: Step-by-Step Practice Problems",
        items: [
          "Q1. Evaluate the indefinite integral: ∫ (x * e^x) dx.\n    [Hint: Set u = x and dv = e^x dx. Apply parts directly.]",
          "Q2. Find the definite integral: ∫[0 to π/2] (sin³(x) * cos(x)) dx.\n    [Hint: Substitute t = sin(x), then dt = cos(x) dx.]",
          "Q3. Calculate the area bounded by the parabola y = x² and the horizontal line y = 4.\n    [Hint: Integrate 2 * ∫[0 to 2] (4 - x²) dx.]",
          "Q4. Evaluate the indefinite integral: ∫ (1 / (x² + 4x + 13)) dx.\n    [Hint: Complete the square in the denominator to get (x + 2)² + 3².]",
          "Q5. Prove the definite integral property: ∫[0 to a] f(x) dx = ∫[0 to a] f(a - x) dx, and use it to solve ∫[0 to π/2] (sin(x) / (sin(x) + cos(x))) dx."
        ]
      },
      {
        heading: "Section C: Self-Evaluation Guidelines",
        items: [
          "1. Ensure you always include the constant of integration (+ C) for indefinite integrals.",
          "2. For definite substitution, remember to change the limits of integration according to the substituted variable.",
          "3. Double-check algebraic factorization before applying partial fractions."
        ]
      }
    ]
  },
  sm2: {
    title: "Optics Concepts & Lens Formula Booster",
    type: "Practice Sheet",
    subject: "Physics",
    className: "Class 12 Science",
    sections: [
      {
        heading: "Section A: Crucial Optical Formulas",
        items: [
          "• Lens Maker's Formula: 1 / f = (n - 1) * [ (1 / R₁) - (1 / R₂) ]",
          "• Thin Lens Equation: 1 / f = 1 / v - 1 / u (Follow Cartesian sign conventions strictly)",
          "• Linear Magnification: m = height of image / height of object = v / u",
          "• Power of Lens: P = 1 / f (f in meters). S.I. Unit is Dioptre (D)."
        ]
      },
      {
        heading: "Section B: Analytical Practice Problems",
        items: [
          "Q1. An object is placed at a distance of 20 cm in front of a convex lens of focal length 10 cm. Determine the position, nature, and magnification of the image formed.",
          "Q2. State the essential conditions required for Total Internal Reflection (TIR) to occur. Write down the mathematical relationship between critical angle and refractive index.",
          "Q3. A double convex lens made of glass (refractive index n = 1.5) has curvature radii of 15 cm and 25 cm. Calculate its effective focal length in air.",
          "Q4. Derive the Prism Formula relating refractive index n, angle of prism A, and minimum angle of deviation Dm.",
          "Q5. A person suffering from myopia cannot see objects clearly beyond 1.5 meters. What is the nature and power of the lens required to correct this vision defect?"
        ]
      },
      {
        heading: "Section C: Laboratory Practice Insights",
        items: [
          "• Always align the optical bench pins to eliminate parallax error during lens measurements.",
          "• Real images are always inverted and can be projected on a physical screen.",
          "• Virtual images are erect and formed on the same side as the object for a refracting lens."
        ]
      }
    ]
  },
  sm3: {
    title: "CBSE Official Sample Paper Mock Draft",
    type: "Sample Paper",
    subject: "Science",
    className: "Class 10",
    sections: [
      {
        heading: "Section A: General Instructions & Pattern",
        items: [
          "• Time Allowed: 3 Hours | Maximum Marks: 80.",
          "• This paper consists of 39 questions divided into 5 structured sections.",
          "• Section A consists of 20 multiple choice questions carrying 1 mark each.",
          "• Section B consists of 6 short answer questions carrying 2 marks each."
        ]
      },
      {
        heading: "Section B: Selected High-Yield Board Questions",
        items: [
          "Q1. Why does the color of copper sulfate solution change from blue to light green when an iron nail is placed inside it? Write a balanced chemical equation representing this displacement reaction.",
          "Q2. State Ohm's Law. Draw a neat schematic circuit diagram illustrating the components needed to verify this law in a laboratory setup.",
          "Q3. Write down the common name, chemical formula, and two significant industrial applications of Calcium Oxychloride (Bleaching Powder).",
          "Q4. Describe the double circulation of blood in human beings. Why is it biologically necessary to separate oxygenated and deoxygenated blood in mammals?",
          "Q5. Explain the formation of a natural rainbow. Illustrate with a labeled ray diagram showing refraction, dispersion, and total internal reflection of light in a water droplet."
        ]
      },
      {
        heading: "Section C: Model Answer Guidelines",
        items: [
          "1. Underline key terms such as catalysts, chemical names, and mathematical variables.",
          "2. Always draw diagrams using a sharp pencil and write clear, legible labels.",
          "3. Balance all chemical equations to preserve the law of conservation of mass."
        ]
      }
    ]
  },
  sm4: {
    title: "Partnership Accounting Master Question Bank",
    type: "Question Bank",
    subject: "Accountancy",
    className: "Class 12 Commerce",
    sections: [
      {
        heading: "Section A: Core Partnership Provisions",
        items: [
          "• Indian Partnership Act 1932: Governs all operations in the absence of a written Partnership Deed.",
          "• Rules in Absence of Deed: Profit sharing is equal, no interest on capital, no salary, 6% p.a. interest on partner loans.",
          "• Goodwill Valuation Methods: Average Profit, Super Profit, and Capitalization methods."
        ]
      },
      {
        heading: "Section B: Practical Solved Numerical Cases",
        items: [
          "Q1. X and Y are partners sharing profits in the ratio of 3:2. They admit Z into partnership for a 1/5th share in profits. Calculate the new profit-sharing ratio and sacrificing ratio.",
          "Q2. A and B are partners with capitals of $60,000 and $40,000 respectively. Interest on capital is agreed at 6% p.a. If the net profit before interest for the year is $8,000, prepare the Profit & Loss Appropriation Account.",
          "Q3. Explain the accounting treatment of Goodwill when a new partner brings his share of premium in cash vs. when he is unable to bring premium in cash.",
          "Q4. Draft the format of a Partner's Capital Account under both Fixed Capital Method and Fluctuating Capital Method, highlighting where drawing interests are recorded."
        ]
      },
      {
        heading: "Section C: Common Student Board Mistakes",
        items: [
          "• Forgetting to calculate the Sacrificing Ratio during admitting new partners.",
          "• Charging interest on drawings for a full year when drawing dates are unspecified (default to 6 months average).",
          "• Misinterpreting 'Charge against profits' vs. 'Appropriation of profits'."
        ]
      }
    ]
  },
  sm5: {
    title: "All India Board Papers (2018-2025)",
    type: "Previous Year Paper",
    subject: "Physics",
    className: "Class 12 Science",
    sections: [
      {
        heading: "Section A: Past Years Blueprints & Distribution",
        items: [
          "• Unit 1: Electrostatics (8 Marks) — High focus on Gauss law application.",
          "• Unit 2: Current Electricity (7 Marks) — High focus on Kirchhoff's laws & potentiometer.",
          "• Unit 3: Magnetic Effects (8 Marks) — Cyclotron, Biot-Savart, and Ampere loop derivations."
        ]
      },
      {
        heading: "Section B: High-Frequency Derivations (Solved)",
        items: [
          "Q1. Derive an analytical expression for the electric field intensity E at any point on the equatorial line of an electric dipole of length 2a.",
          "Q2. State Gauss's Law. Apply it to find the electric field strength due to an infinitely long, straight, uniformly charged wire having linear charge density λ.",
          "Q3. Explain the working principle of a Step-Up Transformer. Discuss the main sources of energy loss (copper loss, iron loss, flux leakage) and how they are mitigated.",
          "Q4. State Kirchhoff's Junction Rule and Loop Rule. Apply these rules to find currents in a Wheatstone Bridge circuit under balanced null deflection condition."
        ]
      },
      {
        heading: "Section C: Quick Revision Tips",
        items: [
          "1. Always specify the SI units for derived constants (e.g., ε₀, μ₀).",
          "2. Vector quantities must be written with overhead arrows and directional unit vectors.",
          "3. Magnetic fields lines never intersect; mention this when sketching solenoid flux."
        ]
      }
    ]
  },
  sm6: {
    title: "Top 50 Most Repeated Board Economics Questions",
    type: "Important Questions",
    subject: "Economics",
    className: "Class 12 Commerce",
    sections: [
      {
        heading: "Section A: Microeconomics Core Conceptual Questions",
        items: [
          "Q1. Explain the Law of Diminishing Marginal Utility with the help of a numerical schedule and a labeled diagram. State two of its major assumptions.",
          "Q2. Distinguish clearly between a 'Change in Demand' (shift) and a 'Change in Quantity Demanded' (movement along the curve). Use separate graphical representations."
        ]
      },
      {
        heading: "Section B: Macroeconomics Core Conceptual Questions",
        items: [
          "Q3. Define Marginal Propensity to Consume (MPC) and Marginal Propensity to Save (MPS). Establish the mathematical relationship between MPC, MPS, and Investment Multiplier K.",
          "Q4. What is the difference between a Revenue Deficit, Fiscal Deficit, and Primary Deficit? What are the economic implications of a high national fiscal deficit?",
          "Q5. Explain the Credit Creation process of commercial banks with a numerical example, highlighting the role of the Legal Reserve Ratio (LRR)."
        ]
      },
      {
        heading: "Section C: Scoring Tips & Board Presentation",
        items: [
          "• Label all graph axes clearly (e.g., Price on Y-axis, Quantity on X-axis).",
          "• Define key terms like 'Marginal' before starting long answers.",
          "• Use standard tabular columns to show differences between variables."
        ]
      }
    ]
  }
};

/**
 * Shared generic renderer for styled PDF generation
 */
function buildPDF(content: PDFContent, sizeText: string, filename: string) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 20;
  let currentY = 15;

  // Helper to add a new page with a standard layout
  function addNewPage() {
    doc.addPage();
    currentY = 15;
    drawHeaderDecoration();
  }

  // Helper to draw the header decoration band on each page
  function drawHeaderDecoration() {
    // Elegant accent header strip
    doc.setFillColor(15, 23, 42); // slate-900 color
    doc.rect(0, 0, pageWidth, 12, "F");

    // Small primary color accent strip right below
    doc.setFillColor(245, 158, 11); // amber-500 color
    doc.rect(0, 12, pageWidth, 2, "F");

    // Header label text
    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(8);
    doc.text("ACADEMICHUB DIGITAL SYLLABUS LIBRARY", marginX, 8);

    doc.setFont("Helvetica", "normal");
    doc.text("EXAM BOOST SERIES", pageWidth - marginX - 35, 8);

    currentY = 22;
  }

  // Helper to draw the footer page indicator on each page
  function drawFooter(pageNumber: number, totalPagesPlaceholder: string) {
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // slate-400
    
    // Thin line above footer
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.3);
    doc.line(marginX, pageHeight - 15, pageWidth - marginX, pageHeight - 15);

    doc.text("© AcademicHub Learning Portal. All Rights Reserved.", marginX, pageHeight - 10);
    doc.text(`Page ${pageNumber} of ${totalPagesPlaceholder}`, pageWidth - marginX - 20, pageHeight - 10);
  }

  // Begin generating Page 1
  drawHeaderDecoration();

  // Document Badge
  doc.setFillColor(254, 243, 199); // amber-100 background
  doc.rect(marginX, currentY, 55, 7, "F");
  
  doc.setTextColor(146, 64, 14); // amber-800 text
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8);
  doc.text(content.type.toUpperCase(), marginX + 3, currentY + 5);
  currentY += 12;

  // Main Title
  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16);
  
  // Wrap title to fit within margins
  const titleLines = doc.splitTextToSize(content.title, pageWidth - 2 * marginX);
  titleLines.forEach((line: string) => {
    doc.text(line, marginX, currentY);
    currentY += 7;
  });
  currentY += 3;

  // Metadata Grid Bar
  doc.setFillColor(248, 250, 252); // slate-50 background
  doc.setDrawColor(226, 232, 240); // slate-200 border
  doc.setLineWidth(0.5);
  doc.rect(marginX, currentY, pageWidth - 2 * marginX, 16, "DF");

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139); // slate-500
  
  // Column 1: Subject
  doc.text("SUBJECT:", marginX + 5, currentY + 6);
  doc.setTextColor(15, 23, 42);
  doc.text(content.subject, marginX + 5, currentY + 11);

  // Column 2: Target Class
  doc.setTextColor(100, 116, 139);
  doc.text("TARGET CLASS:", marginX + 65, currentY + 6);
  doc.setTextColor(15, 23, 42);
  doc.text(content.className, marginX + 65, currentY + 11);

  // Column 3: Format Size
  doc.setTextColor(100, 116, 139);
  doc.text("SOURCE:", marginX + 130, currentY + 6);
  doc.setTextColor(15, 23, 42);
  doc.text(sizeText, marginX + 130, currentY + 11);

  currentY += 24;

  // Render Sections
  content.sections.forEach((sec) => {
    // Check if section heading fits, otherwise add page
    if (currentY > pageHeight - 40) {
      addNewPage();
    }

    // Section Heading with stylized underline
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(sec.heading, marginX, currentY);
    currentY += 2.5;
    
    doc.setDrawColor(245, 158, 11); // amber-500 underline
    doc.setLineWidth(0.8);
    doc.line(marginX, currentY, marginX + 35, currentY);
    currentY += 8;

    // Render Items under section
    sec.items.forEach((item) => {
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85); // slate-700
      
      // Handle multilines for longer question explanations
      const itemLines = doc.splitTextToSize(item, pageWidth - 2 * marginX);
      const textHeight = itemLines.length * 5.2;

      // Check if item fits, otherwise add page
      if (currentY + textHeight > pageHeight - 20) {
        addNewPage();
      }

      itemLines.forEach((line: string) => {
        doc.text(line, marginX, currentY);
        currentY += 5.2;
      });
      currentY += 4; // space between items
    });

    currentY += 6; // space between sections
  });

  // Stamp page counts
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawFooter(i, totalPages.toString());
  }

  // Save the generated document
  doc.save(filename);
}

/**
 * Generates a beautiful formatted PDF for a Study Material
 * @param material The StudyMaterial object
 */
export function downloadStudyMaterialPDF(material: StudyMaterial) {
  const content = materialsMockContent[material.id] || {
    title: material.title,
    type: material.type,
    subject: material.subject,
    className: material.className,
    sections: [
      {
        heading: "Syllabus Content & Guidelines",
        items: [
          `• Document Subject: ${material.subject}`,
          `• Target Audience: ${material.className}`,
          `• Material Classification: ${material.type}`,
          "• High-yield exam preparation worksheet containing multiple choice questions, formula derivations, and standard solved numeric cases.",
          "• Prepared by AcademicHub senior faculty for board examinations."
        ]
      },
      {
        heading: "Important Practice Problems",
        items: [
          "Q1. Analyze the core definitions in this unit and outline its practical applications.",
          "Q2. State and prove the fundamental theorem/principle associated with this chapter.",
          "Q3. Solve 3 numerical problems from the textbook and verify your steps with standard formulas.",
          "Q4. Review last 5 years board question papers to find recurring themes for this topic."
        ]
      }
    ]
  };

  const safeFileName = content.title.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
  buildPDF(content, material.fileSize, `${safeFileName}_material.pdf`);
}

/**
 * Generates a beautiful formatted PDF for a Lecture Note
 * @param note The Note object
 */
export function downloadNotePDF(note: Note) {
  const content = notesMockContent[note.id] || {
    title: note.title,
    type: "Premium Revision Notes",
    subject: note.subject,
    className: note.classCategory,
    sections: [
      {
        heading: "Revision Scope & Core Definitions",
        items: [
          `• Topic Category: ${note.chapter}`,
          `• Academic Subject: ${note.subject} — ${note.classCategory}`,
          "• High-yield premium study notes detailing core definitions, formula matrices, diagram outlines, and textbook derivations.",
          "• Perfect for quick morning-of-exam revisions and conceptual reviews."
        ]
      },
      {
        heading: "Chapter Practice Recommendations",
        items: [
          "• Review all NCERT/CBSE textbook exemplar questions for this specific chapter.",
          "• Solve at least 3 previous year board questions related to the core derivations listed above.",
          "• Practice drawing all associated schematic block diagrams and electrical/chemical setups."
        ]
      }
    ]
  };

  const safeFileName = content.title.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
  buildPDF(content, "AcademicHub Cloud", `${safeFileName}_lecture_notes.pdf`);
}
