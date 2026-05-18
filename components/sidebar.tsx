'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Settings, Radio, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/sales', label: 'Overview', icon: BarChart3 },
  { href: '/sales/settings', label: 'Settings', icon: Settings },
]

export function SidebarContent({ isOpen = true }: { isOpen?: boolean }) {
  const pathname = usePathname()

  return (
    <>
      {/* Logo */}
      <div className={cn("py-8 border-b border-sidebar-border overflow-hidden whitespace-nowrap", isOpen ? "px-6" : "px-0 flex justify-center")}>
        <div className={cn("flex items-center gap-2", !isOpen && "justify-center")}>
          <Radio className="w-6 h-6 text-sidebar-primary shrink-0" />
          {isOpen && (
            <h1 className="text-xl font-bold text-sidebar-foreground text-balance">
              RiengRadio<br />Artist Portal
            </h1>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-hidden">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center rounded-lg transition-all duration-200',
                isOpen ? 'gap-3 px-4 py-3' : 'justify-center p-3',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground font-semibold'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-accent'
              )}
              title={!isOpen ? item.label : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className={cn("py-4 border-t border-sidebar-border text-xs text-sidebar-foreground/60 whitespace-nowrap overflow-hidden", isOpen ? "px-4" : "text-center")}>
        {isOpen ? <p>© 2026 RiengRadio</p> : <p>©</p>}
      </div>
    </>
  )
}

export function Sidebar({ isOpen = true, toggleSidebar }: { isOpen?: boolean, toggleSidebar?: () => void }) {
  return (
    <aside className={cn(
      "hidden md:flex fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex-col pt-0 z-50 transition-all duration-300",
      isOpen ? "w-64" : "w-16"
    )}>
      <SidebarContent isOpen={isOpen} />
      
      {/* Toggle Button */}
      {toggleSidebar && (
        <Button 
          variant="outline" 
          size="icon"
          className="absolute -right-4 top-10 rounded-full w-8 h-8 z-50 bg-background border-border hidden md:flex items-center justify-center shadow-sm"
          onClick={toggleSidebar}
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </Button>
      )}
    </aside>
  )
}
