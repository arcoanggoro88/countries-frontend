import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import AuthWrapper from "../../wrapper/authWrapper";

const VerificationOTPComponent = () => {
  return (
    <AuthWrapper>
      <main className="h-full flex items-center mx-auto ">
        <div className="w-full    ">
          <h1 className="text-2xl font-bold mb-2 text-center">
            Verification OTP
          </h1>

          <p className="text-sm text-gray-500 mb-6 text-center">
            We sent a 5-digit OTP code to{" "}
            <span className="font-semibold text-gray-700">admin@mail.com</span>
          </p>

          <div className="flex justify-center   mb-6">
            <InputOTP maxLength={5}>
              {[0, 1, 2, 3, 4].map((e) => (
                <InputOTPGroup key={e} className="mx-2">
                  <InputOTPSlot
                    index={e}
                    className="w-12 h-12 text-lg border rounded-lg 
                               focus:ring-2 focus:ring-blue-500"
                  />
                </InputOTPGroup>
              ))}
            </InputOTP>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg 
                       hover:bg-blue-700 transition cursor-pointer"
          >
            Verify
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Didn’t receive code?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Resend
            </span>
          </p>
        </div>
      </main>
    </AuthWrapper>
  );
};

export default VerificationOTPComponent;
