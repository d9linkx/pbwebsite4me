// Check what your backend expects for JWT verification
const checkBackendAuth = async () => {
  console.log('🔍 Checking backend JWT configuration...');

  const token = localStorage.getItem('auth_token');
  if (!token) {
    console.log('❌ No token found');
    return;
  }

  // Test with different potential backend expectations
  console.log('📋 Current token:', token.substring(0, 50) + '...');

  // Try to see what the backend expects
  console.log('\n🔍 Backend might expect one of these fixes:');

  console.log('1. Check your backend JWT_SECRET environment variable');
  console.log('2. Verify the token signing algorithm (HS256 vs RS256)');
  console.log('3. Check if backend expects different token format');
  console.log('4. Verify backend clock/timestamp settings');

  // Let's also check if the backend accepts the token without Bearer prefix
  console.log('\n🌐 Testing token without Bearer prefix...');
  try {
    const response = await fetch('http://localhost:4000/user/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token // No Bearer prefix
      }
    });

    console.log('📊 Status:', response.status);
    const text = await response.text();
    console.log('📦 Response:', text);
  } catch (error) {
    console.error('💥 Error:', error.message);
  }
};

checkBackendAuth();
