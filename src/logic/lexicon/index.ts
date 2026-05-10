import lexiconData from '../../../product_assets/lexicon/FERTILITY_LEXICON.json';

export interface LexiconEntry {
  term: string;
  definition: string;
  type?: string;
  purpose?: string;
  side_effects?: string[];
  storage?: string;
}

/**
 * CareState Fertility Lexicon Service
 * Provides contextual definitions and education for patients.
 */
export class LexiconService {
  /**
   * Search for a term in the lexicon.
   */
  search(query: string): LexiconEntry[] {
    const q = query.toLowerCase();
    const results: LexiconEntry[] = [];

    // Search Medications
    lexiconData.medications.forEach(m => {
      if (m.name.toLowerCase().includes(q) || m.type.toLowerCase().includes(q)) {
        results.push({
          term: m.name,
          type: m.type,
          definition: m.purpose,
          purpose: m.purpose,
          side_effects: m.common_side_effects,
          storage: m.storage
        });
      }
    });

    // Search Procedures
    lexiconData.procedures.forEach(p => {
      if (p.term.toLowerCase().includes(q) || p.definition.toLowerCase().includes(q)) {
        results.push(p);
      }
    });

    // Search Physiological Terms
    lexiconData.physiological_terms.forEach(t => {
      if (t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)) {
        results.push(t);
      }
    });

    return results;
  }

  /**
   * Get contextual definitions for terms found in a string.
   */
  getContextualDefinitions(text: string): LexiconEntry[] {
    const found: LexiconEntry[] = [];
    const allTerms = [
      ...lexiconData.medications.map(m => ({ term: m.name, ...m })),
      ...lexiconData.procedures,
      ...lexiconData.physiological_terms
    ];

    allTerms.forEach(entry => {
      const termName = 'term' in entry ? entry.term : entry.name;
      if (text.toLowerCase().includes(termName.toLowerCase())) {
        found.push({
          term: termName,
          definition: 'definition' in entry ? entry.definition : entry.purpose,
          ...entry
        });
      }
    });

    return found;
  }
}
