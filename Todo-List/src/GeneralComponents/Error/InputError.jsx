import { MdErrorOutline } from "react-icons/md";
export function InputError({ isErrorInputOpen, setIsErrorInputOpen, error }) {
  return (
    <>
      <div className=
        {`
        ${isErrorInputOpen ? "opacity-100 scale-100 transition-all duration-300 ease-in-out" : "pointer-events-none opacity-0 scale-100 transition-all duration-300 ease-in-out"}
      bg-slate-800
        z-50
        fixed 
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        flex 
        flex-col 
        p-10
        items-center
        rounded-lg 
        gap-5`}>
        <div className="p-3">
          {/* Vòng tròn bên ngoài: Tạo viền mờ (glow) */}
          <div className="rounded-full bg-white shadow-xl shadow-red-300 p-2">
            {/* Vòng tròn bên trong: Màu đỏ đậm */}
            <div className="rounded-full bg-red-600 p-3">
              {/* Icon lỗi */}
              <MdErrorOutline className="size-10 text-white" />
            </div>
          </div>
        </div>
        <p className="font-bold text-3xl text-white">Invalid input</p>
        <p className="text-lg text-gray-300 text-center">{error}. Please fill in the information and try again.</p>
        <button
          onClick={() => setIsErrorInputOpen(!isErrorInputOpen)}
          className="flex-1 bg-blue-500 text-white w-full p-4 rounded-lg font-bold cursor-pointer hover:bg-red-500 hover:-translate-y-1 transition-all">Close</button>
      </div>
    </>
  )
}