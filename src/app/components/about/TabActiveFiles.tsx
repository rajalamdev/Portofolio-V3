const TabActiveFiles = ({attr}:any) => {
  const [ tabActive, switchTabHandler, activeFiles, removeTabHandler ] = attr;
  return (
    <div className='flex border-b border-line sticky top-0 bg-bg-primary overlow-auto'>
        {tabActive?.map((tab:any) => (
                <p id="switch-tab" onClick={(e) => switchTabHandler(e, tab)} className={`w-max border-line cursor-pointer px-3 py-2 border-r flex gap-4 ${activeFiles?.fileName === tab.fileName ? "text-white" : ""}`}>{tab.fileName} <button onClick={() => removeTabHandler(tab)}>x</button></p>
              )
            )
        }
    </div>
  )
}

export default TabActiveFiles