"use client"

import dataIcon from "./dataIcon";

const DynamicSvgIcon = (props: any)  => {
  // const Icon = require(`../../../public/icons/vercel.svg`).default
  const Icon = dataIcon[props.name];

  return (
    <Icon {...props} />
  )
}

export default DynamicSvgIcon