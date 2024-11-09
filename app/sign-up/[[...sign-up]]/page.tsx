import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="my-12 flex justify-center">
      <SignUp />
    </div>
  );
}
