import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <SignUp forceRedirectUrl="/destinations" />
    </div>
  );
}
