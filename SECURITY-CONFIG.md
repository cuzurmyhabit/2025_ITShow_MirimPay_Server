# Required server configuration

Copy .env.example to .env and populate every required value locally. Never commit real values. JWT_SECRET and ENCRYPTION_SECRET_KEY must be independent random secrets of at least 32 characters (for example, use a local cryptographic random generator). DB credentials and TOSS_SECRET_KEY were already environment-based in the inspected tree; no real hardcoded DB password, JWT secret or Toss server key was found.

Startup now rejects missing/blank DB settings, Toss server secret and missing/short signing/encryption keys. JWT signing and verification use the same required JWT_SECRET. The predictable JWT verifier fallback and AES encryption fallback have been removed. The AES-GCM format and existing scrypt derivation are unchanged to preserve ciphertext compatibility.

## Deployment and rotation caution

If the old JWT fallback was ever used, replace the signing secret and expire/revoke existing sessions as part of a separate authorized deployment. If the old encryption fallback was ever used, treat encrypted billing keys as potentially compromised. Inventory existing records and plan decrypt/re-encrypt migration with the old key stored securely before changing ENCRYPTION_SECRET_KEY; blindly changing it makes existing records unreadable. Do not put the old fallback back in source. Rotate affected Toss billing/server credentials if exposure is established. This audit did not test production, revoke keys, change deployed configuration or rewrite Git history.

Public Toss client identifiers used in browser/mobile apps are not server secrets. Restrict those identifiers by provider-supported domains/app settings; keep TOSS_SECRET_KEY server-side only.
