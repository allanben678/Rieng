'use client'

import { User, LogOut, Menu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { logoutAction } from '@/app/sales/actions'
import type { SessionPayload } from '@/lib/auth'
import { SidebarContent } from './sidebar'

export function Header({ session }: { session?: SessionPayload | null }) {
  const handleLogout = () => {
    logoutAction()
  }

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-8 z-40 transition-all">
      <div className="md:hidden flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="w-5 h-5 text-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-sidebar border-r border-sidebar-border w-64 sm:max-w-64">
            <div className="flex flex-col h-full overflow-y-auto">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:block" />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-3 hover:bg-primary/10"
          >
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <User className="w-5 h-5 text-accent" />
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-foreground">{session?.stageName || 'Artist'}</p>
              <p className="text-xs text-muted-foreground">Artist</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5">
            <p className="text-sm font-semibold">{session?.stageName || 'Artist'}</p>
            <p className="text-xs text-muted-foreground">{session?.email || 'email@example.com'}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href="/sales/settings" className="cursor-pointer flex items-center">
              <User className="w-4 h-4 mr-2" />
              Profile
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
