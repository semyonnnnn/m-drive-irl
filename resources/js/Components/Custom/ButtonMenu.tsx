"use client"

import * as React from "react"
import {
    ArchiveIcon,
    ArrowLeftIcon,
    CalendarPlusIcon,
    ClockIcon,
    ListFilterIcon,
    MailCheckIcon,
    MoreHorizontalIcon,
    TagIcon,
    Trash2Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export function ButtonMenu() {
    const [label, setLabel] = React.useState("personal")

    return (
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
    )
}
