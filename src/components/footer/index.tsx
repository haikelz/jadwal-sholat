import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center text-center pb-4">
      <p className="text-lg font-semibold">
        Dibuat dengan ♥ oleh{" "}
        <Link href="https://github.com/haikelz">
          <span className="cursor-pointer text-blue-500 hover:text-blue-600 hover:underline">
            haikelz
          </span>
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
