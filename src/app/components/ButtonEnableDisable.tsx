import { useAppContext } from "@/context/AppContext"

const ButtonEnableDisable = ({ enabled, name }: {enabled: boolean, name: string}) => {
  const context = useAppContext();

  return (
    <button disabled={context.smallDevices && name === "3d"} className={`w-14 h-5 border border-line rounded-full relative cursor-pointer ${context.smallDevices && name === "3d" ? "opacity-50" : ""}`}>
        <div className={`absolute transition-all -top-[3px] bottom-0 p-[12px] w-4 h-full rounded-full ${enabled ? "translate-x-8 bg-accent" : "translate-x-0 bg-secondary"}`}></div>
    </button>
  )
}

export default ButtonEnableDisable