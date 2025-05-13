// Using built-in fetch API
async function testCreateAdmin() {
  try {
    const response = await fetch('http://localhost:3000/api/admin/create-test-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'eluri93@gmail.com',
        name: 'Amulya',
        password: 'testpassword123',
      }),
    });

    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', data);
  } catch (error) {
    console.error('Error testing endpoint:', error);
  }
}

testCreateAdmin();
