import { MdErrorOutline } from "react-icons/md";

export function InputError({ isErrorInputOpen, setIsErrorInputOpen, error }) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`
          fixed 
          inset-0 
          bg-black/60 
          backdrop-blur-sm
          z-40
          transition-opacity
          duration-300
          ${isErrorInputOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsErrorInputOpen(false)}
      />

      {/* Error Modal */}
      <div 
        className={`
          ${isErrorInputOpen 
            ? "opacity-100 scale-100 transition-all duration-300 ease-in-out" 
            : "pointer-events-none opacity-0 scale-95 transition-all duration-300 ease-in-out"
          }
          
          bg-slate-800
          z-50
          fixed 
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          
          flex 
          flex-col 
          items-center
          gap-4
          sm:gap-5
          md:gap-6
          
          rounded-xl
          sm:rounded-2xl
          
          shadow-2xl
          
          w-[90%]
          max-w-[340px]
          sm:max-w-md
          md:max-w-lg
          
          p-6
          sm:p-8
          md:p-10
        `}
      >
        {/* Icon Container */}
        <div className="p-2 sm:p-3">
          {/* Outer glow circle */}
          <div className="
            rounded-full 
            bg-white 
            shadow-xl 
            shadow-red-300/50
            sm:shadow-red-300/70
            p-1.5
            sm:p-2
            animate-pulse
          ">
            {/* Inner red circle */}
            <div className="
              rounded-full 
              bg-red-600 
              p-2
              sm:p-2.5
              md:p-3
            ">
              {/* Error Icon */}
              <MdErrorOutline className="
                size-8
                sm:size-10
                md:size-12
                text-white
              " />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="
          font-bold 
          text-xl
          sm:text-2xl
          md:text-3xl
          text-white
          text-center
        ">
          Invalid Input
        </h2>

        {/* Error Message */}
        <p className="
          text-sm
          sm:text-base
          md:text-lg
          text-gray-300 
          text-center
          leading-relaxed
          px-2
        ">
          {error}. Please fill in the information and try again.
        </p>

        {/* Close Button */}
        <button
          onClick={() => setIsErrorInputOpen(false)}
          className="
            w-full
            bg-red-600
            hover:bg-red-700
            active:bg-red-800
            text-white 
            font-semibold
            
            px-6
            py-3
            sm:py-3.5
            md:py-4
            
            rounded-lg
            sm:rounded-xl
            
            cursor-pointer 
            
            transition-all
            duration-200
            
            hover:shadow-lg
            hover:shadow-red-500/30
            hover:-translate-y-0.5
          
            active:translate-y-0
            
            focus:outline-none
            focus:ring-2
            focus:ring-red-500
            focus:ring-offset-2
            focus:ring-offset-slate-800
            
            text-sm
            sm:text-base
            md:text-lg
          "
        >
          Close
        </button>
      </div>
    </>
  )
}