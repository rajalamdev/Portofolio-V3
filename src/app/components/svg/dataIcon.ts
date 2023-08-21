import File from "../../../../public/icons/file.svg"
import Folder from "../../../../public/icons/folder.svg"
import Github from "../../../../public/icons/github.svg"
import Instagram from "../../../../public/icons/instagram.svg"
import Linkedin from "../../../../public/icons/linkedin.svg"
import React from "../../../../public/icons/react.svg"
import TrianglePrimary from "../../../../public/icons/triangle-primary.svg"
import TriangleSecondary from "../../../../public/icons/triangle-secondary.svg"
import NextJS from "../../../../public/icons/nextjs.svg"
import TypeScript from "../../../../public/icons/typescript.svg"
import JavaScript from "../../../../public/icons/javascript.svg"
import Tailwind from "../../../../public/icons/tailwind.svg"
import NodeJS from "../../../../public/icons/nodejs.svg"
import Mail from "../../../../public/icons/mail.svg"
import Phone from "../../../../public/icons/phone.svg"
import Settings from "../../../../public/icons/settings.svg"
import Palette from "../../../../public/icons/palette.svg"
import _3d from "../../../../public/icons/3d.svg"
import Sound from "../../../../public/icons/sound.svg"
import Xmark from "../../../../public/icons/xmark.svg"
import Figma from "../../../../public/icons/figma.svg"
import FramerMotion from "../../../../public/icons/framer-motion.svg"
import Git from "../../../../public/icons/git.svg"
import MySql from "../../../../public/icons/mysql.svg"
import Prisma from "../../../../public/icons/prisma.svg"
import Strapi from "../../../../public/icons/strapi.svg"


interface IIconTypes {
    [name: string]: string
}

const dataIcon: IIconTypes = {
    file: File,
    folder: Folder,
    github: Github,
    instagram: Instagram,
    linkedin: Linkedin,
    trianglePrimary: TrianglePrimary,
    triangleSecondary: TriangleSecondary,
    react: React,
    nextjs: NextJS,
    typescript: TypeScript,
    javascript: JavaScript,
    tailwind: Tailwind,
    nodejs: NodeJS,
    mail: Mail,
    phone: Phone,
    settings: Settings,
    palette: Palette,
    _3d: _3d,
    sound: Sound,
    xmark: Xmark,
    figma: Figma,
    framerMotion: FramerMotion,
    git: Git,
    mysql: MySql,
    prisma: Prisma,
    strapi: Strapi
}

export default dataIcon