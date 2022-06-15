import { ReactNode } from "react"; 

interface childrenProps {
  children: ReactNode[] | JSX.Element; 
}

const Layout = ({ children }: childrenProps) => {
  return (
    <section className="flex justify-center items-center w-full p-8 flex-col">
      <main className="max-w-[75%] flex justify-center gap-7 items-center flex-col">
        {children}
      </main>
    </section>
  )
} 

export default Layout; 
