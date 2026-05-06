type UserClaims = {
  email?: string | null;
  app_metadata?: Record<string, unknown>;
  user_metadata?: Record<string, unknown>;
};

function includesAdminRole(value: unknown): boolean {
  if (typeof value === "string") {
    return value.toLowerCase() === "admin";
  }

  if (Array.isArray(value)) {
    return value.some((item) => typeof item === "string" && item.toLowerCase() === "admin");
  }

  return false;
}

export function isAdminUser(user: UserClaims, adminEmails: string[]): boolean {
  const email = (user.email || "").toLowerCase();
  if (email && adminEmails.includes(email)) {
    return true;
  }

  const appMetadata = user.app_metadata || {};
  const userMetadata = user.user_metadata || {};

  if (appMetadata.is_admin === true || userMetadata.is_admin === true) {
    return true;
  }

  if (includesAdminRole(appMetadata.role) || includesAdminRole(userMetadata.role)) {
    return true;
  }

  if (includesAdminRole(appMetadata.roles) || includesAdminRole(userMetadata.roles)) {
    return true;
  }

  return false;
}
