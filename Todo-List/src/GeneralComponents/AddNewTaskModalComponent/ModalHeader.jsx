export function ModalHeader ({header,subtitle}) {
  return (
    <>
      <div className ="flex flex-col gap-2 dpy-5">
        <h1 className="text-3xl font-bold">{header}</h1>
        <h1 className = "text-xl text-gray-400">{subtitle}</h1>
      </div>
    </>
  )
}