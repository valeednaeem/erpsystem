const bcrypt = require('bcrypt');

const passwords = {
  'admin123': 'Admin user password',
  'manager123': 'Manager user password', 
  'staff123': 'Staff user password',
  'client123': 'Client user password'
};

async function generateHashes() {
  console.log('\n=== BCrypt Password Hashes ===\n');
  
  for (const [password, description] of Object.entries(passwords)) {
    try {
      const hash = await bcrypt.hash(password, 10);
      console.log(`Password: ${password}`);
      console.log(`Description: ${description}`);
      console.log(`Hash: ${hash}`);
      console.log('---\n');
    } catch (error) {
      console.error(`Error hashing ${password}:`, error);
    }
  }
}

generateHashes();
