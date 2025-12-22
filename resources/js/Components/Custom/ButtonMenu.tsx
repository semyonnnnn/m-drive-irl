"use client"

import * as React from "react"

import { ToggleMode } from '@/Components/Custom/ToggleMode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-regular-svg-icons';
import { Button } from "@/Components/Button"
import { ButtonGroup } from "@/Components/ButtonGroup"

export function ButtonMenu() {
    const [label, setLabel] = React.useState("personal")

    return (
        <div className="flex justify-center w-full items-center px-10 mt-2 gap-4">
            <a href="" className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faFolder} className="text-4xl dark:text-white select-none cursor-pointer" />
                <span className="text-sm text-nowrap dark:text-white">Крутое название</span>
            </a>
            <div className="flex w-full items-center justify-center">
                <ButtonGroup>
                    <Button variant="main_menu">Проект</Button>
                    <Button variant="main_menu">Обучение</Button>
                    <Button variant="main_menu">Чек-лист</Button>
                    <Button variant="main_menu">Общественная жизнь</Button>
                    <Button variant="main_menu">Команда</Button>
                    <Button variant="main_menu">Диагностика</Button>
                    <Button variant="main_menu">Проектный офис</Button>
                    <Button variant="main_menu">Новости</Button>
                </ButtonGroup>
            </div>
            <ToggleMode />
        </div>
    )
}
