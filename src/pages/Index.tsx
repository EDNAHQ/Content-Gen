import { Link } from "react-router-dom";
import { MessageSquare, Mail, Newspaper, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/Logo";

export default function Index() {
  const features = [
    {
      title: "Social Media",
      description: "Generate engaging social media posts with AI",
      icon: MessageSquare,
      path: "/social-media",
      gradient: "bg-white border-2 border-[#9b87f5]",
    },
    {
      title: "Email Broadcast",
      description: "Create professional email broadcasts",
      icon: Mail,
      path: "/email-broadcast",
      gradient: "bg-white border-2 border-[#9b87f5]",
    },
    {
      title: "Newsletter",
      description: "Manage and create newsletters",
      icon: Newspaper,
      path: "/newsletter",
      gradient: "bg-white border-2 border-[#9b87f5]",
    },
    {
      title: "Article",
      description: "Write and manage articles",
      icon: FileText,
      path: "/article",
      gradient: "bg-white border-2 border-[#9b87f5]",
    },
  ];

  return (
    <div className="container mx-auto px-4 min-h-[calc(100vh-8rem)] flex flex-col justify-start lg:justify-center pt-24 sm:pt-32 lg:pt-0">
      <div className="text-center mb-8 md:mb-12">
        <div className="flex justify-center mb-4 md:mb-6">
          <Logo size={48} className="animate-float md:w-16 md:h-16" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4">Welcome to Content Gen</h1>
        <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12">Your central hub for content creation and management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto w-full">
        {features.map((feature) => (
          <Link key={feature.path} to={feature.path} className="block h-full">
            <Card className="h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-[#9b87f5]">
              <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#9b87f5]/10 backdrop-blur-sm flex items-center justify-center mb-3 md:mb-4">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-[#9b87f5]" />
                </div>
                <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gray-900">{feature.title}</h2>
                <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}