"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// http://localhost:3000/verify-email?userId=68b3d169000d10a46177&secret=7eef1be431a3569f23471e5c6524386251e0df66fbd2d382f96fbcc02d8b7ca9842a51a830e5628e4d888b518984bbdf5393ae46ffb587573fdac538dee0999b2bba45d6c26e0ccb79ccdf1969e34981879db4d2cdb4e335ac8e5f19d816178a1fa90520dfb1bb30daa4a598eed03ee273858b9390173fa8c77f3457a8d005fc&expire=2025-08-31T05%3A36%3A59.586%2B00%3A00
export default function VerifyEmailPage({ verifyAction }) {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  console.log(userId, secret);
  const handleVerify = async () => {
    setLoading(true);
    try {
      const result = await verifyAction(userId, secret);
      if (result?.success) {
        setSuccess("Email verified successfully! You can now login.");
      }else if (result?.error) {
        setError(result?.error);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Verify Your Email
        </h1>
        <p className="text-gray-700 mb-4">
          Click the button below to verify your email address.
        </p>

        <button
          onClick={handleVerify}
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-200 ease-in-out"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
        <p className="mt-6 text-gray-600 text-sm">
          <Link href="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </p>
        {error && <p className="text-red-600 mt-4">{error}</p>}
        {success && <p className="text-green-600 mt-4">{success}</p>}
      </div>
    </div>
  );
}
