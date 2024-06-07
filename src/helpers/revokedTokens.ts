const revokedTokes = new Set<string>();

export function addRevokedToke(token: string): void {
  revokedTokes.add(token);
}

export function isRevokedToken(token: string): boolean {
  return revokedTokes.has(token);
}
