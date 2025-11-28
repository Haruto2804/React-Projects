export function ModalHeader ({header,subtitle}) {
  return (
    <>
      <div className ="flex flex-col gap-2 py-5">
        <h1 className="text-3xl font-bold md:text-xs">{header}</h1>
        <h1 className = "text-xl text-gray-400 md:text-sm">{subtitle}</h1>
      </div>
    </>
  )
}