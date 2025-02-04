import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface ManagementDropdownProps {
  onNavigate?: () => void;
}

export const ManagementDropdown = ({ onNavigate }: ManagementDropdownProps) => {
  const isMobile = window.innerWidth < 768;
  const managementLinks = [
    { to: "/prompts", label: "Prompts" },
    { to: "/accounts", label: "Social Accounts" },
    { to: "/history", label: "History" },
    { to: "/settings", label: "Settings" },
  ];

  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  if (isMobile) {
    return (
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-[#7E69AB] hover:bg-[#7E69AB] hover:text-white rounded-md">
          Management
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 mt-1">
          {managementLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={handleClick}
              className="block px-6 py-2.5 text-sm text-[#7E69AB] hover:bg-[#7E69AB] hover:text-white rounded-md"
            >
              {link.label}
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className="text-white bg-[#7E69AB]/30 hover:bg-[#7E69AB]/50 px-3 py-2">
            Management
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-1 p-2 bg-white rounded-md shadow-lg">
              {managementLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={handleClick}
                    className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#7E69AB] hover:text-white text-[#7E69AB] text-left font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};