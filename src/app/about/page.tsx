"use client"
import { Metadata } from "next"
import Image from "next/image";
import DynamicSvgIcon from "../components/svg/DynamicSvgIcon";
import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import Bio from "../components/about/Bio";

// export const metadata: Metadata = {
//   title: "Raj Alam | About",
//   description: "About page portofolio",
//   icons: {
//     icon: "/favicon.ico",
//   },
// }


const About = () => {
  const [personalInfoActive, setPersonalInfoActive] = useState(true)

  const [folders, setFolders] = useState([
    {
      folderName: "bio", 
      files: [
        {fileName: "Bio.jsx", component: Bio},
        {fileName: "Nothing.jsx", component: Bio}
      ], 
      isActiveFolder: true
    },
    {
      folderName: "interest", 
      files: [
        {fileName: "Turu.jsx", component: Bio},
        {fileName: "Kids.jsx", component: Bio},
        {fileName: "XD.jsx", component: Bio},
        {fileName: "HEHE.jsx", component: Bio},
      ], 
      isActiveFolder: false
    },
  ]);

  const contactList = [
    {icon: "mail", href: "", name: "rajalamdev@gmail.com"},
    {icon: "phone", href: "", name:"0896xxxxxxx"},
  ]

  const [activeFiles, setActiveFiles] = useState<any>({
    folderName: "bio", fileName: "Bio.jsx", component: Bio
  })

  const [tabActive, setTabActive] = useState([{folder: "bio", fileName: "Bio.jsx"}])

  function activeFolderHanlder(current: any){
    const folderFindIndex = folders.findIndex(folder => folder.folderName === current.folderName)
    const editedFolder = folders[folderFindIndex] = {
      ...folders[folderFindIndex],
      isActiveFolder: folders[folderFindIndex].isActiveFolder ? false : true
    }

    const updatedFolder = [...folders];
    updatedFolder[folderFindIndex] = editedFolder;
    setFolders(updatedFolder);
  }

  function activeFilesHanlder(folder: any, file: any){
    if(activeFiles.fileName === file.fileName) return
    setActiveFiles({
      folder,
      fileName: file.fileName,
      component: file.component
    })


    if(tabActive.every(tab => tab.fileName != file.fileName)){
      setTabActive([...tabActive, {folder, fileName: file.fileName}])
    }
  }
  
  function removeTabHandler(currentTab: any){
    if(currentTab.fileName === activeFiles.fileName){
      setActiveFiles({})
    }

    const filteredTabActive = tabActive.filter(tab => tab.fileName !== currentTab.fileName)
    setTabActive(filteredTabActive)
  }

  function switchTabHandler(e: any, tab: any){
    if(e.target.id === "switch-tab"){
      const filteredFolder = folders.filter(folder => folder.folderName === tab.folder)
      const filteredFiles = filteredFolder[0].files.filter(file => file.fileName === tab.fileName)
      setActiveFiles(filteredFiles[0])
    }
  }

  useEffect(() => {
    if(tabActive.length === 0) setActiveFiles({})
  }, [tabActive])

  return (
    <div className="flex h-full">
      <section className="flex max-w-[275px] w-full flex-grow-0 flex-shrink-0">
        <div className="px-4 py-4 border-r border-line ">
          <DynamicSvgIcon name="file" className="w-6" />
        </div>
        <div className="flex flex-col flex-1 border-r border-line">
          <div className="max-h-60 overflow-auto">
            <h4 onClick={() => setPersonalInfoActive(!personalInfoActive)} className="sticky top-0 bg-bg-primary z-10 cursor-pointer text-header-primary flex gap-2 p-2 border-b border-line">
              <DynamicSvgIcon name="trianglePrimary" className={`w-[10px] ${personalInfoActive ? "" : "-rotate-90"} transition-all`}/> personal-info
            </h4>
            <div className={`transition-maxHeight ${personalInfoActive ? "max-h-96" : "max-h-0"} overflow-hidden`}>
              {folders.map(folder => {
                return (
                  <div key={folder.folderName}>
                    <div className="flex flex-col">
                      <button onClick={() => activeFolderHanlder(folder)} className={`hover:text-header-primary flex gap-2 items-baseline hover:button-hover px-2 py-2`}>
                        <DynamicSvgIcon name="triangleSecondary" className={`w-2 ${folder.isActiveFolder ? "rotate-90" : ""} transition-all`} />
                        <DynamicSvgIcon name="folder" className="w-4 fill-accent-primary" />
                        <h5>{folder.folderName}</h5>
                      </button>
                      <div className={`max-h-0 transition-maxHeight ${folder.isActiveFolder ? "max-h-56" : ""} overflow-hidden `}>
                        {folder.files.map(file => {
                          return (
                            <button onClick={() => activeFilesHanlder(folder.folderName, file)} key={file.fileName} className={`flex button-hover ${file.fileName === activeFiles.fileName ? "bg-black/20 text-header-primary" : ""} gap-2 w-full px-6 py-2`}>
                              <DynamicSvgIcon name="react" className="w-4 fill-blue-400" />
                              <h6>{file.fileName}</h6>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <h4 className="text-header-primary flex gap-2 p-2 border-y border-line">
              <DynamicSvgIcon name="trianglePrimary" className="w-[10px]"/> contact
            </h4>
            <div className="px-2 space-y-3 py-3">
              {contactList.map(contact => {
                return (
                  <a key={contact.icon} href={contact.href} target="_blank"  className="flex gap-2 w-max cursor-link relative after:block after:absolute after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-accent-primary after:transition-all text-white">
                    <DynamicSvgIcon name={contact.icon} className="w-4" />
                    <p>{contact.name}</p>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="flex-1">
        <div className='flex border-b border-line sticky top-0 bg-bg-primary overlow-auto h-[7%]'>
          {tabActive?.map((tab:any) => (
                  <p key={tab} id="switch-tab" onClick={(e) => switchTabHandler(e, tab)} className={`w-max border-line cursor-pointer px-3 py-2 border-r flex gap-4 ${activeFiles?.fileName === tab.fileName ? "text-white" : ""}`}>{tab.fileName} <button onClick={() => removeTabHandler(tab)}>x</button></p>
                )
              )
          }
        </div>
        <div className="h-[93%]">
        {Object.keys(activeFiles).length !== 0 && <activeFiles.component attr={[tabActive, switchTabHandler, activeFiles, removeTabHandler]} />}
        </div>
      </section>
    </div>
  )
}

export default About