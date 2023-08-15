import File from "../../../../public/icons/file.svg"
import Folder from "../../../../public/icons/folder.svg"
import Github from "../../../../public/icons/github.svg"
import Instagram from "../../../../public/icons/instagram.svg"
import Linkedin from "../../../../public/icons/linkedin.svg"
import React from "../../../../public/icons/react.svg"

interface IIconTypes {
    [name: string]: string
}

const dataIcon: IIconTypes = {
    file: File,
    folder: Folder,
    github: Github,
    instagram: Instagram,
    linkedin: Linkedin
}

export default dataIcon