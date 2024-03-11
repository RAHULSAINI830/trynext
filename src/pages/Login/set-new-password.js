import { useState } from 'react';
import { useRouter } from 'next/router';
function SetNewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      // Send a POST request to the API endpoint to set the new password
      const response = await fetch('/api/setNewPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: getResetTokenFromURL(), password }),
      });

      if (response.ok) {
        setMessage('Password updated successfully!');

        router.push('/');
      } else {
        const data = await response.json();
        setMessage(data.error || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('Failed to update password');
    }
  }

  // Helper function to extract the reset token from the URL
  function getResetTokenFromURL() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('token');
  }

  return (
    <div className="flex items-center justify-center text-center bg-white h-screen">
  <form novalidate="" onSubmit={handleSubmit} action="" className="flex flex-col w-full max-w-lg p-12 rounded-2xl shadow-lg text-gray-100">
    <label for="new_password" className="self-start text-xs text-black font-semibold">New Password</label>
    <input id="new_password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ri text-gray-900 focus:border-violet-400 focus:ri" required />
    <label for="c_password" className="self-start mt-3 text-xs font-semibold text-black">Confirm New Password</label>
    <input id="c_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ri text-gray-900 focus:border-violet-400 focus:ri" required/>
    <button type="submit" className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded bg-blue-500 text-white">Change Password</button>
    <br></br>
    {message && <p className=" flex flex-col text-black">{message}</p>}
  </form>

</div>

  );
}

export default SetNewPassword;
