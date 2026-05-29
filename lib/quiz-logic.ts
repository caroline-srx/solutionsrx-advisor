// ─── Types ───────────────────────────────────────────────────────────────────

export interface Question {
  id: string
  category: string
  text: string
  options: { value: string; label: string }[]
  /** If undefined, always shown. If defined, returns true when the question should be visible. */
  condition?: (answers: Record<string, string>) => boolean
}

export interface Product {
  id: string
  name: string
  dose: string
  url: string
}

export interface Recommendation {
  product: Product
  reason: string
  priority_tag: 'Top Priority' | 'High Priority' | 'Recommended'
}

// ─── Questions ───────────────────────────────────────────────────────────────

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    category: 'Medications',
    text: 'Do you take prescription medication for diabetes, high blood pressure, or high cholesterol?',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
    // always shown — no condition
  },
  {
    id: 'q2',
    category: 'Weight-Loss Medications',
    text: 'Are you taking a GLP-1 or other weight-loss medication — and is it causing nausea, diarrhea, or stomach discomfort?',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
    // always shown — no condition
  },
  {
    id: 'q3',
    category: 'General Health',
    text: 'Are you male or female?',
    options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
    ],
    // ONLY shown if q1=No AND q2=No
    condition: (answers) => answers['q1'] === 'No' && answers['q2'] === 'No',
  },
  {
    id: 'q4',
    category: 'Statin Medications',
    text: 'Do you take a statin medication — such as Lipitor, Crestor, or Zocor?',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
    // always shown — no condition
  },
  {
    id: 'q5',
    category: 'Digestive Health',
    text: 'Do you experience stomach or GI issues — like diarrhea, IBS, bloating, or digestive discomfort?',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
    // always shown — no condition
  },
  {
    id: 'q6',
    category: 'Muscle & Pain',
    text: 'Do you have leg cramps, muscle aches, or frequent headaches?',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
    // always shown — no condition
  },
  {
    id: 'q7',
    category: 'Bone & Immune',
    text: 'Do you have concerns about low vitamin D or calcium?',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
    // always shown — no condition
  },
  {
    id: 'q8',
    category: 'Sleep',
    text: 'Are you having trouble sleeping?',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
    // always shown — no condition
  },
  {
    id: 'q9',
    category: 'Cognitive Health',
    text: 'Do you experience brain fog, memory issues, difficulty focusing, or other cognition concerns?',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
    // always shown — no condition
  },
]

// ─── Products ────────────────────────────────────────────────────────────────

export const PRODUCTS: Record<string, Product> = {
  rx_multi: {
    id: 'rx_multi',
    name: 'Prescription Support Multivitamin',
    dose: '1 capsule, 1–2 times daily',
    url: 'https://solutionsrxproducts.com/drug-nutrient-depletion/',
  },
  mens_multi: {
    id: 'mens_multi',
    name: "Superior Men's Multivitamin",
    dose: '1 tablet twice daily',
    url: 'https://solutionsrxproducts.com/multi-vitamins/',
  },
  womens_multi: {
    id: 'womens_multi',
    name: "Superior Women's Multivitamin",
    dose: '1 tablet twice daily',
    url: 'https://solutionsrxproducts.com/multi-vitamins/',
  },
  digestive_wellness: {
    id: 'digestive_wellness',
    name: 'Digestive Wellness',
    dose: '1 capsule with every meal — eat a meal, take a pill',
    url: 'https://solutionsrxproducts.com/shop/multivitamins-and-supplements/digestive-wellness/',
  },
  superior_omega: {
    id: 'superior_omega',
    name: 'Superior Omega',
    dose: '2 capsules in the morning with a meal · 1 capsule at night with a meal',
    url: 'https://solutionsrxproducts.com/omega/',
  },
  superior_probiotic: {
    id: 'superior_probiotic',
    name: 'Superior Probiotic',
    dose: '2 capsules twice daily while symptoms are present; 2 capsules daily for maintenance',
    url: 'https://solutionsrxproducts.com/probiotic/',
  },
  dk_mag: {
    id: 'dk_mag',
    name: 'D-K-Mag',
    dose: '1 capsule twice daily',
    url: 'https://solutionsrxproducts.com/shop/multivitamins-and-supplements/d-k-mag/',
  },
  mag_bis: {
    id: 'mag_bis',
    name: 'Magnesium Bisglycinate',
    dose: '1–2 capsules as needed (or at bedtime if sleep-related)',
    url: 'https://solutionsrxproducts.com/shop/multivitamins-and-supplements/lc655-leg-cramp-support/',
  },
  superior_sleep: {
    id: 'superior_sleep',
    name: 'Superior Sleep',
    dose: '1–2 capsules at bedtime as needed',
    url: 'https://solutionsrxproducts.com/shop/multivitamins-and-supplements/superior-sleep-support/',
  },
  clarity_support: {
    id: 'clarity_support',
    name: 'Clarity Support',
    dose: '1–2 soft gels twice daily as needed',
    url: 'https://solutionsrxproducts.com/shop/multivitamins-and-supplements/clarity-support/',
  },
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns the array of question IDs that should be shown given the current answers.
 * Preserves original question order. Q3 is conditionally hidden.
 */
export function getVisibleQuestions(answers: Record<string, string>): string[] {
  return QUESTIONS.filter((q) => {
    if (!q.condition) return true
    return q.condition(answers)
  }).map((q) => q.id)
}

/**
 * Given a complete set of answers, computes the ordered list of recommendations.
 * Priority tags are assigned by position: 1st = Top Priority, 2nd = High Priority, rest = Recommended.
 */
export function computeRecommendations(
  answers: Record<string, string>
): Recommendation[] {
  // We build the list in slots to correctly interleave mag_bis, superior_sleep, dk_mag.
  // Overall order: multivitamin → digestive_wellness → superior_omega → superior_probiotic
  //                → [dk_mag + mag_bis + superior_sleep interleaved] → clarity_support

  const results: Array<{ productId: string; reason: string }> = []

  // ── 1. Multivitamin (exactly one) ──────────────────────────────────────────
  if (answers['q1'] === 'Yes') {
    results.push({
      productId: 'rx_multi',
      reason:
        'Prescription medications deplete key nutrients your body needs to feel its best. Prescription Support Multivitamin is specifically formulated to counteract that depletion — with high quality ingredients like CoQ10, B12 (methylcobalamin), Folic Acid (L-methylfolate), and Digestive Enzymes all in one easy-to-swallow capsule. Combat fatigue, ease muscle aches, and get back to feeling like yourself. If you\'re taking a handful of vitamins each day, save money, save hassle, and improve quality by making the switch to Prescription Support.',
    })
  } else if (answers['q2'] === 'Yes') {
    results.push({
      productId: 'rx_multi',
      reason:
        'Prescription medications deplete key nutrients your body needs to feel its best. Prescription Support Multivitamin is specifically formulated to counteract that depletion — with high quality ingredients like CoQ10, B12 (methylcobalamin), Folic Acid (L-methylfolate), and Digestive Enzymes all in one easy-to-swallow capsule. Combat fatigue, ease muscle aches, and get back to feeling like yourself. If you\'re taking a handful of vitamins each day, save money, save hassle, and improve quality by making the switch to Prescription Support.',
    })
  } else if (answers['q3'] === 'Male') {
    results.push({
      productId: 'mens_multi',
      reason:
        "A complete daily multivitamin formulated for men's specific nutritional needs, with added enzymes for better absorption.",
    })
  } else if (answers['q3'] === 'Female') {
    results.push({
      productId: 'womens_multi',
      reason:
        "A complete daily multivitamin formulated for women's specific nutritional needs, with added enzymes for better absorption.",
    })
  }

  // ── 2. GLP-1 digestive support ─────────────────────────────────────────────
  if (answers['q2'] === 'Yes') {
    results.push({
      productId: 'digestive_wellness',
      reason:
        'GLP-1 and weight-loss medications slow the digestive process, which can disrupt your gut microbiome and make it harder for your body to break down food and absorb nutrients properly. Digestive Wellness helps restore healthy gut flora and supports nutrient absorption — while easing the uncomfortable side effects that often come with these medications, including diarrhea, constipation, gas, bloating, and indigestion.',
    })
  }

  // ── 3. Statin omega ────────────────────────────────────────────────────────
  if (answers['q4'] === 'Yes') {
    results.push({
      productId: 'superior_omega',
      reason:
        'Clinical research has shown that high-dose EPA omega-3 therapy may reduce the risk of cardiovascular events by up to 25% in patients already taking statin medications. Individual results vary — talk to your doctor or pharmacist about whether omega-3 therapy is right for you.',
    })
  }

  // ── 4. GI issues ──────────────────────────────────────────────────────────
  if (answers['q5'] === 'Yes') {
    results.push({
      productId: 'superior_probiotic',
      reason:
        'You mentioned GI issues like diarrhea, IBS, or digestive discomfort. This multi-strain probiotic helps restore healthy gut balance and supports digestion.',
    })
  }

  // ── 5–6. Bone/immune + Magnesium + Sleep interleaving ─────────────────────
  //
  // Interleave rules (all relative to the dk_mag / mag_bis / superior_sleep group):
  //   q6=Y & q8=Y  → mag_bis (first), then dk_mag (if q7=Y), then superior_sleep (last)
  //   q6=Y & q8=N  → dk_mag (if q7=Y) in normal position, mag_bis after
  //   q6=N & q8=Y  → superior_sleep first, then dk_mag (if q7=Y), then mag_bis after
  //   q6=N & q8=N  → just dk_mag (if q7=Y)
  //
  // The spec says overall ordering is:
  //   multivitamin → digestive_wellness → superior_omega → superior_probiotic
  //   → [dk_mag + mag_bis + superior_sleep interleaved by rules] → clarity_support
  //
  // Specific interleave rules from spec:
  //   q6=Y & q8=Y  → mag_bis FIRST, superior_sleep LATER  (dk_mag between if applicable)
  //   q6=Y & q8=N  → mag_bis only
  //   q6=N & q8=Y  → superior_sleep FIRST, mag_bis AFTER  (dk_mag between if applicable)

  const q6 = answers['q6'] === 'Yes'
  const q7 = answers['q7'] === 'Yes'
  const q8 = answers['q8'] === 'Yes'

  if (q6 && q8) {
    // mag_bis first
    results.push({
      productId: 'mag_bis',
      reason:
        'You mentioned both muscle cramps or headaches and sleep trouble. Magnesium bisglycinate is a highly absorbable form that eases muscle tension and supports restful sleep.',
    })
    // dk_mag in its natural position (after mag_bis, before superior_sleep)
    if (q7) {
      results.push({
        productId: 'dk_mag',
        reason:
          'If you have concerns about low vitamin D or calcium, D-K-Mag was made for you. This formula combines Vitamins D3 and K2 (MK-7) with Magnesium Bisglycinate to support calcium absorption, direct it into your bones where it belongs, and keep your muscles, energy, and immune system working the way they should.',
      })
    }
    // superior_sleep later
    results.push({
      productId: 'superior_sleep',
      reason:
        'You mentioned trouble sleeping. This pharmacist-formulated formula supports healthy, restful sleep.',
    })
  } else if (q6 && !q8) {
    // dk_mag first (natural bone/immune position), then mag_bis
    if (q7) {
      results.push({
        productId: 'dk_mag',
        reason:
          'If you have concerns about low vitamin D or calcium, D-K-Mag was made for you. This formula combines Vitamins D3 and K2 (MK-7) with Magnesium Bisglycinate to support calcium absorption, direct it into your bones where it belongs, and keep your muscles, energy, and immune system working the way they should.',
      })
    }
    results.push({
      productId: 'mag_bis',
      reason:
        'You mentioned leg cramps, muscle aches, or headaches. Magnesium bisglycinate is a well-absorbed form that helps ease muscle tension, cramps, and related headaches.',
    })
  } else if (!q6 && q8) {
    // superior_sleep first, then dk_mag (if q7), then mag_bis
    results.push({
      productId: 'superior_sleep',
      reason:
        'You mentioned trouble sleeping. This pharmacist-formulated formula supports healthy, restful sleep.',
    })
    if (q7) {
      results.push({
        productId: 'dk_mag',
        reason:
          'If you have concerns about low vitamin D or calcium, D-K-Mag was made for you. This formula combines Vitamins D3 and K2 (MK-7) with Magnesium Bisglycinate to support calcium absorption, direct it into your bones where it belongs, and keep your muscles, energy, and immune system working the way they should.',
      })
    }
    results.push({
      productId: 'mag_bis',
      reason:
        'Magnesium can help relax muscles and calm the nervous system, supporting better sleep quality.',
    })
  } else {
    // q6=N & q8=N — just dk_mag if applicable
    if (q7) {
      results.push({
        productId: 'dk_mag',
        reason:
          'If you have concerns about low vitamin D or calcium, D-K-Mag was made for you. This formula combines Vitamins D3 and K2 (MK-7) with Magnesium Bisglycinate to support calcium absorption, direct it into your bones where it belongs, and keep your muscles, energy, and immune system working the way they should.',
      })
    }
  }

  // ── 7. Cognitive ──────────────────────────────────────────────────────────
  if (answers['q9'] === 'Yes') {
    results.push({
      productId: 'clarity_support',
      reason:
        'You mentioned brain fog, memory concerns, or focus issues. This formula is designed to support cognitive function, mental clarity, and focus.',
    })
  }

  // ── Assign priority tags and map to full Recommendation objects ────────────
  return results.map((item, index) => {
    let priority_tag: Recommendation['priority_tag']
    if (index === 0) priority_tag = 'Top Priority'
    else if (index === 1) priority_tag = 'High Priority'
    else priority_tag = 'Recommended'

    return {
      product: PRODUCTS[item.productId],
      reason: item.reason,
      priority_tag,
    }
  })
}
