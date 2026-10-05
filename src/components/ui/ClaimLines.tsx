/** Sets a two-sentence brand claim one sentence per line, so it never breaks mid-sentence. */
export function ClaimLines({ claim }: { claim: string }) {
  return claim.split(/(?<=\.)\s+/).map((sentence) => (
    // The trailing space keeps the sentences apart for copy-paste and screen readers.
    <span key={sentence} className="block">
      {sentence}{" "}
    </span>
  ));
}
