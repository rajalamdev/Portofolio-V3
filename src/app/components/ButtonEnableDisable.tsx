import { useAppContext } from "@/context/AppContext"

const ButtonEnableDisable = ({ enabled }: {enabled: boolean}) => {
  const context = useAppContext();

  return (
    <div className={`w-14 h-5 border border-line rounded-full relative cursor-pointer`}>
        <div className={`absolute transition-all -top-[3px] bottom-0 p-[12px] w-4 h-full rounded-full ${enabled ? "translate-x-8 bg-accent-primary" : "translate-x-0 bg-header-primary"}`}></div>
    </div>
  )
}

export default ButtonEnableDisable