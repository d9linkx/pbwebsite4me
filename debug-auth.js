// Debug the "Not authorized" error
const debugAuth = async () => {
  console.log('🔍 Debugging "Not authorized" error...');

  // Check current token
  const token = localStorage.getItem('auth_token');
  console.log('📋 Stored token:', token ? `${token.substring(0, 50)}...` : 'No token');

  if (!token) {
    console.log('❌ No token found - need to login first');
    return;
  }

  // Test direct backend call
  console.log('🌐 Testing direct backend call...');
  try {
    const response = await fetch('http://localhost:4000/user/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('📊 Direct backend status:', response.status);
    console.log('📋 Direct backend headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('📦 Direct backend response:', responseText);

  } catch (error) {
    console.error('💥 Direct backend call failed:', error);
  }

  // Test through Next.js proxy
  console.log('🔄 Testing through Next.js proxy...');
  try {
    const response = await fetch('/user/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    });

    console.log('📊 Proxy status:', response.status);
    console.log('📋 Proxy headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('📦 Proxy response:', responseText);

  } catch (error) {
    console.error('💥 Proxy call failed:', error);
  }

  // Check token format
  console.log('🔍 Token analysis:');
  try {
    const parts = token.split('.');
    console.log('📝 Token parts:', parts.length);

    if (parts.length === 3) {
      console.log('✅ Token has valid JWT format');
      console.log('📄 Header:', JSON.parse(atob(parts[0])));
      console.log('📄 Payload:', JSON.parse(atob(parts[1])));
    } else {
      console.log('❌ Token does not have valid JWT format');
    }
  } catch (error) {
    console.error('💥 Token parsing failed:', error);
  }
};

// Test different authorization formats
const testAuthFormats = async () => {
  console.log('🔍 Testing different authorization header formats...');

  const token = localStorage.getItem('auth_token');
  if (!token) {
    console.log('❌ No token found');
    return;
  }

  const testCases = [
    { name: 'Bearer format', headers: { 'Authorization': `Bearer ${token}` } },
    { name: 'Token format', headers: { 'Authorization': `Token ${token}` } },
    { name: 'JWT format', headers: { 'Authorization': `JWT ${token}` } },
    { name: 'No Bearer prefix', headers: { 'Authorization': token } },
    { name: 'x-auth-token header', headers: { 'x-auth-token': token } },
    { name: 'x-access-token header', headers: { 'x-access-token': token } },
  ];

  for (const testCase of testCases) {
    console.log(`\n🌐 Testing: ${testCase.name}`);
    try {
      const response = await fetch('http://localhost:4000/user/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...testCase.headers
        }
      });

      console.log(`📊 Status: ${response.status}`);
      const responseText = await response.text();
      console.log(`📦 Response: ${responseText}`);

      if (response.status === 200) {
        console.log(`✅ SUCCESS! ${testCase.name} works!`);
        break;
      }
    } catch (error) {
      console.error(`💥 Failed: ${error.message}`);
    }
  }
};

// Run the test
testAuthFormats();
