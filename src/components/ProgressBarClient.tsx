"use client"
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';


const ProgressBarClient = () => {
  return (
    <>
    <ProgressBar
      height="4px"
      color="var(--accent)"
      options={{ showSpinner: false }}
      shallowRouting
    />
  </>
  )
}

export default ProgressBarClient