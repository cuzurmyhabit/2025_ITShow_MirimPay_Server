/** Validate configuration without ever including values in error messages. */
export function requireSecret(name: string, value: unknown): string {
  if (typeof value !== 'string' || value.trim().length < 32) {
    throw new Error(name + ' must be configured with at least 32 characters');
  }
  return value;
}

export function validateEnvironment(config: Record<string, unknown>) {
  for (const name of ['DB_HOST', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME', 'TOSS_SECRET_KEY']) {
    if (typeof config[name] !== 'string' || !(config[name] as string).trim()) {
      throw new Error(name + ' is required');
    }
  }
  requireSecret('JWT_SECRET', config.JWT_SECRET);
  requireSecret('ENCRYPTION_SECRET_KEY', config.ENCRYPTION_SECRET_KEY);
  return config;
}
