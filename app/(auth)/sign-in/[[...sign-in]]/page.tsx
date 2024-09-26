import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <SignIn forceRedirectUrl="/destinations" />
    </div>
  );
}
