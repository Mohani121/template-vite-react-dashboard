import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  BarChart3,
  ShieldCheck,
  GalleryVerticalEnd,
} from 'lucide-react'
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { NavMain } from '@/components/nav-main'
import { TeamSwitcher } from '@/components/team-switcher'

const data = {
  teams: [
    {
      name: 'My App',
      logo: GalleryVerticalEnd,
      plan: 'Pro',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard/overview',
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: 'Users',
      url: '#',
      icon: Users,
      items: [
        { title: 'All Users', url: '#' },
        { title: 'Roles & Permissions', url: '#' },
      ],
    },
    {
      title: 'Reports',
      url: '#',
      icon: BarChart3,
      items: [
        { title: 'Analytics', url: '#' },
        { title: 'Exports', url: '#' },
      ],
    },
    {
      title: 'Content',
      url: '#',
      icon: FileText,
      items: [
        { title: 'All Posts', url: '#' },
        { title: 'Categories', url: '#' },
      ],
    },
    {
      title: 'Security',
      url: '#',
      icon: ShieldCheck,
      items: [
        { title: 'Audit Logs', url: '#' },
        { title: 'API Keys', url: '#' },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings,
      items: [
        { title: 'General', url: '#' },
        { title: 'Billing', url: '#' },
        { title: 'Notifications', url: '#' },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
