<?php

namespace App\Enum;

enum PermissionsEnum: string
{
    case ManageAdmins = 'manage_admins';
    case ManageUsers = 'manage_users';
    case AssignTasks = 'assign_tasks';
    case CompleteTasks = 'complete_tasks';
}
