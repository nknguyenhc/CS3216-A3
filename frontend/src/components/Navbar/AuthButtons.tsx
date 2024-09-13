const AuthButtons = () => {
  return (
    <div className="flex gap-4 self-stretch font-bold whitespace-nowrap">
      <button className="gap-2.5 self-start px-4 py-3.5 text-sky-600 rounded-xl border border-sky-600 border-solid min-h-[50px]">
        Login
      </button>
      <button className="gap-2.5 self-stretch p-4 text-white bg-rose-500 rounded-xl">SignUp</button>
    </div>
  );
};

export default AuthButtons;
