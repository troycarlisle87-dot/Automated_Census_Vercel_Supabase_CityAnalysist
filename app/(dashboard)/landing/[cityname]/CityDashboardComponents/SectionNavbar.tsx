import { Button } from '@/app/components/ui/button'
import { cn } from '@/lib/utils'
import { BarChart3,  Calendar,  Users } from 'lucide-react'

// can add more sections later!
const sections = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  //{ id: "financials", label: "Financials", icon: DollarSign },
  { id: "demographics", label: "Demographics", icon: Users },
  { id: "history", label: "History", icon: Calendar },
  //{ id: "administration", label: "Administration", icon: Building2 },
]

interface SectionNavbarProps {
  activeSection: string,
  onSectionChange: (section:string) => void
}

export default function SectionNavbar({
  activeSection,
  onSectionChange,
}: SectionNavbarProps){
  
  return (
    <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-1">
      
      {sections.map((section) => (
        <Button
          key={section.id}
          variant={activeSection === section.id ? "default" : "outline"}
          //  I need responsive sizes... tiny on mobile, small on tablet+, default on desktop
          size="sm"
          className={cn(
            // Smaller font and padding on small screens
            "px-2 py-1 text-xs sm:text-sm",
            // Responsive gap between icon/text
            "gap-1 sm:gap-1.5",
            // Smaller on mobile
            "h-8 sm:h-9"
          )}
          onClick={() => onSectionChange(section.id)} 
        >

          <section.icon className="h-3 w-3 sm:h-4 sm:w-4" /> {/* for small devices.. icons are small.. for big..bigger */}
          <span className="hidden sm:inline">{section.label}</span>


          {/* Show abbreviated text on very small screens */}
          <span className="sm:hidden">
            {section.label.charAt(0).toUpperCase()} {/* will only show the first letter! */}
          </span>
        </Button>
      ))}
    </div>
          
  )
}
