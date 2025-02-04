import { Link, useLocation } from "react-router-dom";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { ManagementDropdown } from "@/components/navigation/ManagementDropdown";

interface NavigationLinksProps {
  onNavigate?: () => void;
}

const NavigationLinks = ({ onNavigate }: NavigationLinksProps) => {
  const location = useLocation();

  const links = [
    { path: "/social-media", label: "Social" },
    { path: "/email-broadcast", label: "Email" },
    { path: "/newsletter", label: "Newsletter" },
    { path: "/article", label: "Article" },
    { path: "/transcribe", label: "Transcribe" },
  ];

  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <div className="flex md:flex-row flex-col w-full gap-3">
      {links.map((link) => (
        <NavigationMenuItem key={link.path} className="list-none">
          <Link
            to={link.path}
            onClick={handleClick}
            className={`flex items-center px-3 py-2 text-sm transition-colors md:hover:bg-[#7E69AB] text-[#7E69AB] md:text-white rounded-md ${
              location.pathname === link.path ? "bg-[#7E69AB] text-white" : ""
            }`}
          >
            {link.label}
          </Link>
        </NavigationMenuItem>
      ))}
      <NavigationMenuItem className="list-none">
        <ManagementDropdown onNavigate={onNavigate} />
      </NavigationMenuItem>
    </div>
  );
};

export default NavigationLinks;