const LoginForm = ({ role, buttonColor }) => (
  <form className="space-y-5">
    <div>
      <label className="block text-sm mb-1">Email</label>
      <input
        type="email"
        placeholder={`${role.toLowerCase()}@example.com`}
        className="w-full px-4 py-2 rounded-xl bg-[#282b44] border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#316aff]/40"
      />
    </div>

    <div>
      <label className="block text-sm mb-1">Password</label>
      <input
        type="password"
        placeholder="••••••••"
        className="w-full px-4 py-2 rounded-xl bg-[#282b44] border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#316aff]/40"
      />
    </div>

    <button
      className={`w-full ${buttonColor} text-white py-2.5 rounded-xl hover:opacity-90 transition`}
    >
      {role} Login
    </button>
  </form>
);

export default LoginForm
