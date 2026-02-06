import db from './db.js';

/**
 * Get user with their role and permissions
 */
export async function getUserWithPermissions(userId) {
  try {
    // Fetch user with role
    const users = await db.query(`
      SELECT u.id, u.email, u.name, u.role_id, r.name as role_name
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.id = ?
    `, [userId]);

    if (users.length === 0) return null;

    const user = users[0];

    // Fetch role permissions
    const rolePerms = await db.query(`
      SELECT p.id, p.name FROM role_permissions rp
      JOIN permissions p ON rp.permission_id = p.id
      WHERE rp.role_id = ?
    `, [user.role_id]);

    // Fetch user-specific permissions
    const userPerms = await db.query(`
      SELECT p.id, p.name FROM user_permissions up
      JOIN permissions p ON up.permission_id = p.id
      WHERE up.user_id = ?
    `, [userId]);

    // Combine permissions
    const allPermissions = [...rolePerms, ...userPerms];
    const uniquePermissions = Array.from(
      new Map(allPermissions.map((p) => [p.id, p.name])).values()
    );

    return {
      ...user,
      permissions: uniquePermissions,
      permissionNames: uniquePermissions,
    };
  } catch (error) {
    console.error('[getRoleWithPermissions] Error:', error);
    return null;
  }
}

/**
 * Check if user has a specific permission
 */
export async function userHasPermission(userId, permissionName) {
  try {
    const user = await getUserWithPermissions(userId);
    if (!user) return false;
    return user.permissionNames.includes(permissionName);
  } catch (error) {
    console.error('[userHasPermission] Error:', error);
    return false;
  }
}

/**
 * Check if user has any of the given permissions
 */
export async function userHasAnyPermission(userId, permissionNames) {
  try {
    const user = await getUserWithPermissions(userId);
    if (!user) return false;
    return permissionNames.some((perm) => user.permissionNames.includes(perm));
  } catch (error) {
    console.error('[userHasAnyPermission] Error:', error);
    return false;
  }
}

/**
 * Check if user has all given permissions
 */
export async function userHasAllPermissions(userId, permissionNames) {
  try {
    const user = await getUserWithPermissions(userId);
    if (!user) return false;
    return permissionNames.every((perm) => user.permissionNames.includes(perm));
  } catch (error) {
    console.error('[userHasAllPermissions] Error:', error);
    return false;
  }
}

/**
 * Get all roles
 */
export async function getAllRoles() {
  try {
    const roles = await db.query('SELECT id, name, description FROM roles');
    return roles;
  } catch (error) {
    console.error('[getAllRoles] Error:', error);
    return [];
  }
}

/**
 * Get all permissions
 */
export async function getAllPermissions() {
  try {
    const permissions = await db.query('SELECT id, name, description FROM permissions');
    return permissions;
  } catch (error) {
    console.error('[getAllPermissions] Error:', error);
    return [];
  }
}

/**
 * Get permissions for a role
 */
export async function getRolePermissions(roleId) {
  try {
    const permissions = await db.query(`
      SELECT p.id, p.name, p.description FROM role_permissions rp
      JOIN permissions p ON rp.permission_id = p.id
      WHERE rp.role_id = ?
    `, [roleId]);
    return permissions;
  } catch (error) {
    console.error('[getRolePermissions] Error:', error);
    return [];
  }
}

/**
 * Check if user is admin (role_id = 1)
 */
export async function isAdmin(userId) {
  try {
    const users = await db.query('SELECT role_id FROM users WHERE id = ?', [userId]);
    return users.length > 0 && users[0].role_id === 1;
  } catch (error) {
    console.error('[isAdmin] Error:', error);
    return false;
  }
}

// Get permission id by name
export async function getPermissionByName(name) {
  try {
    const rows = await db.query('SELECT id FROM permissions WHERE name = ?', [name]);
    return rows.length > 0 ? rows[0].id : null;
  } catch (error) {
    console.error('[getPermissionByName] Error:', error);
    return null;
  }
}

// Create permission if not exists and return id
export async function ensurePermission(name, description = null) {
  try {
    const existing = await db.query('SELECT id FROM permissions WHERE name = ?', [name]);
    if (existing.length > 0) return existing[0].id;
    const result = await db.query('INSERT INTO permissions (name, description) VALUES (?, ?)', [name, description]);
    return result.insertId || null;
  } catch (error) {
    console.error('[ensurePermission] Error:', error);
    return null;
  }
}

export async function grantRolePermission(roleId, permissionName) {
  try {
    const permId = await ensurePermission(permissionName, `Auto-created for ${permissionName}`);
    if (!permId) return false;
    const exists = await db.query('SELECT 1 FROM role_permissions WHERE role_id = ? AND permission_id = ?', [roleId, permId]);
    if (exists.length > 0) return true;
    await db.query('INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [roleId, permId]);
    return true;
  } catch (error) {
    console.error('[grantRolePermission] Error:', error);
    return false;
  }
}

export async function revokeRolePermission(roleId, permissionName) {
  try {
    const permId = await getPermissionByName(permissionName);
    if (!permId) return false;
    await db.query('DELETE FROM role_permissions WHERE role_id = ? AND permission_id = ?', [roleId, permId]);
    return true;
  } catch (error) {
    console.error('[revokeRolePermission] Error:', error);
    return false;
  }
}

export async function grantUserPermission(userId, permissionName) {
  try {
    const permId = await ensurePermission(permissionName, `Auto-created for ${permissionName}`);
    if (!permId) return false;
    const exists = await db.query('SELECT 1 FROM user_permissions WHERE user_id = ? AND permission_id = ?', [userId, permId]);
    if (exists.length > 0) return true;
    await db.query('INSERT INTO user_permissions (user_id, permission_id) VALUES (?, ?)', [userId, permId]);
    return true;
  } catch (error) {
    console.error('[grantUserPermission] Error:', error);
    return false;
  }
}

export async function revokeUserPermission(userId, permissionName) {
  try {
    const permId = await getPermissionByName(permissionName);
    if (!permId) return false;
    await db.query('DELETE FROM user_permissions WHERE user_id = ? AND permission_id = ?', [userId, permId]);
    return true;
  } catch (error) {
    console.error('[revokeUserPermission] Error:', error);
    return false;
  }
}
