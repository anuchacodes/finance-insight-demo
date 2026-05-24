import { Input } from "@/components/ui/input";

type ProfilePreviewCardProps = {
  email: string;
  fullName: string;
  initials: string;
};

export function ProfilePreviewCard({
  email,
  fullName,
  initials,
}: ProfilePreviewCardProps) {
  return (
    <section
      aria-label="Profile information preview"
      className="overflow-hidden rounded-lg border border-[#c2c6d6] bg-white opacity-60 shadow-[0_1px_3px_rgba(15,23,42,0.05)]"
    >
      <div className="flex flex-col gap-3 border-b border-[#e0e3e5] p-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-[#191c1e]">
            Profile Information
          </h2>
          <p className="mt-1 text-sm text-[#424754]">Update your personal details.</p>
        </div>
        <span className="w-fit rounded border border-[#c2c6d6] bg-[#f2f4f6] px-2 py-1 font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
          Preview
        </span>
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-[96px_1fr]">
        <div className="flex flex-col items-start gap-3">
          <div className="flex size-20 items-center justify-center rounded-lg border-2 border-[#c2c6d6] bg-[#e0e3e5] text-xl font-bold text-[#424754]">
            {initials}
          </div>
          <button className="text-sm font-medium text-[#0058be]" type="button">
            Upload new
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block font-mono text-xs font-medium uppercase tracking-wide text-[#727785]">
              Full Name
            </span>
            <Input
              disabled
              className="h-11 border-[#c2c6d6] bg-[#f2f4f6] shadow-none"
              value={fullName}
            />
          </label>
          <label className="block">
            <span className="mb-2 block font-mono text-xs font-medium uppercase tracking-wide text-[#727785]">
              Email Address
            </span>
            <Input
              disabled
              className="h-11 border-[#c2c6d6] bg-[#f2f4f6] shadow-none"
              type="email"
              value={email}
            />
          </label>
        </div>
      </div>
    </section>
  );
}
