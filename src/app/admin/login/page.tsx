import { loginAdmin } from './actions';

export const dynamic = 'force-dynamic';

interface AdminLoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32">
      <div className="w-full max-w-sm">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Admin</p>
        <h1 className="mt-2 font-serif text-2xl text-neutral-50">Sign in</h1>

        <form action={loginAdmin} className="mt-8 space-y-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-neutral-600"
          />
          {params.error && <p className="text-xs text-red-400">Incorrect password.</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-neutral-100 py-3 text-sm font-semibold uppercase tracking-wide text-black transition-colors hover:bg-white"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
