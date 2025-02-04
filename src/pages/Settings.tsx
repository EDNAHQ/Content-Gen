import { Settings2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModelList } from "@/components/settings/ModelList";
import { AddModelForm } from "@/components/settings/AddModelForm";
import { useState } from "react";

const Settings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings2 className="h-6 w-6 text-[#7E69AB]" />
          <h1 className="text-2xl font-semibold">Settings</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Model
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New AI Model</DialogTitle>
            </DialogHeader>
            <AddModelForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">AI Models</h2>
          <p className="text-sm text-gray-500">
            Manage the AI models available in your application
          </p>
        </div>
        <ModelList />
      </div>
    </div>
  );
};

export default Settings;