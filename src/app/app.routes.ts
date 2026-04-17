import { Routes } from '@angular/router';


export const routes: Routes = [ 
    {
        "path": "consoles/edit/:uuid",
        "loadComponent": () => import("./gaming-console/gaming-console-edit/gaming-console-edit").then(m => m.GamingConsoleEdit)
    },  
    {
        "path" : "consoles/add",
        "loadComponent" : () => import('./gaming-console/gaming-console-add/gaming-console-add').then(m => m.GamingConsoleAdd)
    },
    {
        "path": "consoles/:uuid",
        "loadComponent": () => import("./gaming-console/gaming-console-detail/gaming-console-detail").then(m => m.GamingConsoleDetail)
    },
    {
        "path" : "consoles",
        "loadComponent" : () => import('./gaming-console/gaming-console-list/gaming-console-list').then(m => m.GamingConsoleList)
    },
    {
        "path": "games/:uuid/edit",
        "loadComponent": () => import("./game/game-edit/game-edit").then(m => m.GameEdit)
    },   
    {
        "path": "games/add",
        "loadComponent": () => import("./game/game-add/game-add").then(m => m.GameAdd)
    },
    {
        "path" : "games",
        "loadComponent" : () => import('./game/game-list/game-list').then(m => m.GameList)
    },
    {
        "path": "",
        "loadComponent": () => import("./home/home-stats/home-stats").then(m => m.HomeStats)
    }
];
