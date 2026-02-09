function ThemeSelector() {
  return (
    <div className="dropdown dropdown-end">
        <button tabIndex={0} className="btn btn-ghost btn-circle">
            <PaletteIcon className="size-5"/>
        </button>

        <div tabIndex={0} className="dropdown-content menu p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl">

        </div>
    </div>
  )
}

export default ThemeSelector