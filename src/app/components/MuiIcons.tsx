"use client"
import { FC } from "react"
import * as Icons from "@mui/icons-material"

type IconNames = keyof typeof Icons
type IconProps = {
  iconName: IconNames
}

const MuiIconsComponent: FC<IconProps> = ({
  iconName
}) => {
  const Icon = Icons[iconName]
  return <Icon />
}

export default MuiIconsComponent