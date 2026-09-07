/** Devanagari block (U+0900–U+097F). */
const DEVANAGARI = /[ऀ-ॿ]/;

export const isDevanagari = (text: string) => DEVANAGARI.test(text);

/**
 * Tailwind classes for small label text.
 *
 * Latin labels get the wide uppercase tracking the design calls for.
 * Devanagari must not be letter-spaced or uppercased — tracking pulls the
 * conjuncts and matras apart, and the script has no letter case. It gets a
 * slightly larger size instead, so it still reads as a label.
 */
export const labelClasses = (text: unknown, latin = "uppercase tracking-[0.25em]") =>
  typeof text === "string" && isDevanagari(text)
    ? "text-sm md:text-base"
    : latin;
