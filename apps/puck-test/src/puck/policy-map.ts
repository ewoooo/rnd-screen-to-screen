// Puck component name → covered policy IDs
// Derived from organism source comments and policy sourceRef fields
export const componentPolicyMap: Record<string, readonly string[]> = {
  // ── nova-mbr-fp (NEW) ──────────────────────────────────
  AuthRequest: [
    "POL-MBR-AUTH-001-01",
    "POL-MBR-AUTH-003-01",
    "POL-MBR-AUTH-003-03",
    "POL-MBR-AUTH-004-01",
    "POL-MBR-AUTH-004-02",
    "POL-MBR-AUTH-005-01",
    "POL-MBR-AUTH-005-03",
    "POL-MBR-AUTH-005-07",
  ],
  AuthSelect: [
    "POL-MBR-AUTH-002-01",
    "POL-MBR-AUTH-002-05",
    "POL-MBR-AUTH-002-09",
  ],

  // ── nova-mbr-fp-legacy (same policy scope) ─────────────
  AuthRequestLegacy: [
    "POL-MBR-AUTH-001-01",
    "POL-MBR-AUTH-003-01",
    "POL-MBR-AUTH-003-03",
    "POL-MBR-AUTH-004-01",
    "POL-MBR-AUTH-004-02",
    "POL-MBR-AUTH-005-01",
    "POL-MBR-AUTH-005-03",
    "POL-MBR-AUTH-005-07",
  ],
  AuthSelectLegacy: [
    "POL-MBR-AUTH-002-01",
    "POL-MBR-AUTH-002-05",
    "POL-MBR-AUTH-002-09",
  ],
  MemberInput: [
    "POL-MBR-INFO-002-03",
    "POL-MBR-INFO-002-04",
    "POL-MBR-INFO-002-05",
    "POL-MBR-INFO-002-06",
    "POL-MBR-INFO-002-08",
  ],
  TermList: ["POL-MBR-TERM-001-06"],
  TermAgree: ["POL-MBR-TERM-001-06"],
  GuardianInput: ["POL-MBR-TERM-002-01", "POL-MBR-TERM-002-05"],
  GuardianResult: ["POL-MBR-TERM-002-01"],
  JoinComplete: [
    "POL-MBR-ACCT-001-09",
    "POL-MBR-SESS-001-03",
    "POL-MBR-SESS-001-04",
    "POL-MBR-SESS-001-07",
  ],

  // ── nova-mbr-legacy ────────────────────────────────────
  TextFieldMemberInfo: [
    "POL-MBR-INFO-002-03",
    "POL-MBR-INFO-002-04",
    "POL-MBR-INFO-002-05",
    "POL-MBR-INFO-002-06",
    "POL-MBR-INFO-002-08",
  ],
  TextFieldGuardianRequest: [
    "POL-MBR-TERM-002-01",
    "POL-MBR-TERM-002-05",
  ],
  JoinCompleteResult: [
    "POL-MBR-ACCT-001-09",
    "POL-MBR-SESS-001-03",
    "POL-MBR-SESS-001-04",
    "POL-MBR-SESS-001-07",
  ],
  SectionMessageJoinCompleteView: [
    "POL-MBR-SESS-001-03",
    "POL-MBR-SESS-001-04",
    "POL-MBR-SESS-001-07",
  ],
};

export function getCoveredPolicyIds(componentTypes: string[]): Set<string> {
  const covered = new Set<string>();
  for (const type of componentTypes) {
    for (const id of componentPolicyMap[type] ?? []) {
      covered.add(id);
    }
  }
  return covered;
}
