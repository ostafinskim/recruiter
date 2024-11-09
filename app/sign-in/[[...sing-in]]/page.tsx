import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="my-12 flex justify-center">
        <SignIn />
    </div>
  );
}
