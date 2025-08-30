import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Verify Your Email</h1>
        <p className="text-gray-700 mb-4">
          A verification email has been sent to your inbox. Please check your email and click on the link to activate your account.
        </p>
        <p className="text-gray-700 mb-6">
          If you don't receive the email, please check your spam folder or click the button below to resend.
        </p>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-200 ease-in-out"
        >
          Resend Verification Email
        </button>
        <p className="mt-6 text-gray-600 text-sm">
          <Link href="/login" className="text-blue-600 hover:underline">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
